import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  onSubmit = () => {
    this.props.onSubmit({ username: this.state.username, password: this.state.password });
  };

  onUserNameChange = (event) => {
    const username = event.target.value;
    this.setState({ username });
  };

  onPasswordChange = (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  render() {
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1">Log in to Your Account</Header>
            <Form size="large" error={this.props.showError}>
              <Segment>
                <Form.Input
                  value={this.state.username}
                  onChange={this.onUserNameChange}
                  type="text"
                  name="username"
                  placeholder="Username"
                  icon="user"
                  iconPosition="left"
                />
                <Form.Input
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  icon="lock"
                  iconPosition="left"
                />
                <Button onClick={this.onSubmit} fluid size="large">
                  Submit
                </Button>
                <Message error header="Invalid Credentials" content="Invalid username or password" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default LoginForm;
