import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Icon, Container } from 'semantic-ui-react';

import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';
import BudgetsSummaryList from '../components/BudgetsSummaryList/BudgetsSummaryList';
import NoBudgets from './NoBudgets';

const GET_BUDGETS = gql`
  query UserQuery($userId: String!) {
    user(_id: $userId) {
      _id
      username
      budgets {
        _id
        displayName
      }
    }
  }
`;

const Dashboard = () => {
  return (
    <AuthenticationContext.Consumer>
      {({ id }) => {
        return (
          <Query query={GET_BUDGETS} variables={{ userId: id }} pollInterval={500}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;

              return (
                <div>
                  {data.user.budgets.length === 0 && <NoBudgets />}
                  {data.user.budgets.length > 0 && (
                    <div>
                      <Header as="h1" block>
                        Summary of Budgets
                      </Header>
                      <BudgetsSummaryList budgets={data.user.budgets} />
                    </div>
                  )}
                </div>
              );
            }}
          </Query>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default Dashboard;
