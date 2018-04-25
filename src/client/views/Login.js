import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import login from '../api/login';
import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';
import LoginForm from '../components/LoginForm/LoginForm';

class Login extends React.Component {
  static propTypes = {
    from: PropTypes.string,
    onLoginSuccess: PropTypes.func.isRequired,
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
      <AuthenticationContext.Consumer>
        {({ setUser, setToken }) => {
          return (
            <div>
              <LoginForm
                showError={this.state.errorPresent}
                onSubmit={({ username, password }) => {
                  login({ username, password })
                    .then((token) => {
                      setUser(username);
                      setToken(token);
                    })
                    .then(this.onLoginFormSuccess)
                    .catch(this.onLoginFormError);
                }}
              />
            </div>
          );
        }}
      </AuthenticationContext.Consumer>
    );
  }
}

export default Login;
