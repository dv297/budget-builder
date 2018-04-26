/**
 * @license
 * Copyright &copy 2018 Cerner Corporation
 *
 * @author Daniel Vu
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';

const CREATE_BUDGET = gql`
  mutation createBudget($displayName: String!) {
    createBudget(createBudgetInput: { displayName: $displayName }) {
      _id
    }
  }
`;

const ADD_BUDGET_TO_USER = gql`
  mutation addBudgetToUser($budgetId: String!, $userId: String!) {
    addBudgetToUser(addBudgetToUserInput: { budgetId: $budgetId, userId: $userId }) {
      username
    }
  }
`;

class AddBudget extends React.Component {
  state = {
    displayName: '',
  };

  handleDisplayNameChange = (event) => {
    const displayName = event.target.value;
    this.setState({ displayName });
  };

  render() {
    return (
      <AuthenticationContext.Consumer>
        {({ id: userId }) => (
          <div>
            <h1>Create a Budget</h1>
            <Form>
              <Form.Group>
                <Form.Field>
                  <label>Budget Name</label>
                  <input
                    placeholder="Budget Name"
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.handleDisplayNameChange}
                  />
                </Form.Field>
                <Mutation mutation={CREATE_BUDGET}>
                  {(createBudget) => (
                    <Mutation mutation={ADD_BUDGET_TO_USER}>
                      {(addBudgetToUser) => (
                        <Button
                          onClick={() => {
                            createBudget({ variables: { displayName: this.state.displayName } })
                              .then((result) => {
                                const budgetId = result.data.createBudget._id;
                                addBudgetToUser({ variables: { budgetId, userId } });
                              })
                              .then(() => {
                                this.props.history.push('/dashboard');
                              });
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              </Form.Group>
            </Form>
          </div>
        )}
      </AuthenticationContext.Consumer>
    );
  }
}

export default withRouter(AddBudget);
