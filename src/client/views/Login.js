import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import login from '../api/login';
import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';
import LoginForm from '../components/LoginForm/LoginForm';
import PaddedPage from '../components/PaddedPage/PaddedPage';

class Login extends React.Component {
  static propTypes = {
    from: PropTypes.string,
  };

  state = {
    redirectToReferrer: false,
    errorPresent: false,
  };

  onLoginFormSuccess = () => {
    this.setState({
      errorPresent: false,
      redirectToReferrer: true,
    });
  };

  onLoginFormError = () => {
    this.setState({ errorPresent: true });
  };

  render() {
    if (this.state.redirectToReferrer) {
      const redirectLocation = this.props.from || '/dashboard';
      return <Redirect to={redirectLocation} />;
    }

    return (
      <PaddedPage>
        <Container>
          <AuthenticationContext.Consumer>
            {({ setIdentity }) => {
              return (
                <LoginForm
                  showError={this.state.errorPresent}
                  onSubmit={({ username, password }) => {
                    login({ username, password })
                      .then(({ token, id }) => {
                        setIdentity({ token, username, id });
                      })
                      .then(this.onLoginFormSuccess)
                      .catch(this.onLoginFormError);
                  }}
                />
              );
            }}
          </AuthenticationContext.Consumer>
        </Container>
      </PaddedPage>
    );
  }
}

export default Login;
