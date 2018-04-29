import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Header, Container } from 'semantic-ui-react';

import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';
import BudgetsSummaryList from '../components/BudgetsSummaryList/BudgetsSummaryList';
import PaddedPage from '../components/PaddedPage/PaddedPage';
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
    <PaddedPage>
      <Container>
        <AuthenticationContext.Consumer>
          {({ id }) => {
            return (
              <Query query={GET_BUDGETS} variables={{ userId: id }} pollInterval={500}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return `Error!: ${error}`;

                  return (
                    <Container>
                      {data.user.budgets.length === 0 && <NoBudgets />}
                      {data.user.budgets.length > 0 && (
                        <div>
                          <Header as="h1" dividing>
                            Summary of Budgets
                          </Header>
                          <BudgetsSummaryList budgets={data.user.budgets} />
                        </div>
                      )}
                    </Container>
                  );
                }}
              </Query>
            );
          }}
        </AuthenticationContext.Consumer>
      </Container>
    </PaddedPage>
  );
};

export default Dashboard;
