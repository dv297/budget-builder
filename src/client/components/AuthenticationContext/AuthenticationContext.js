import React from 'react';

const LOCAL_STORAGE_TOKEN_KEY = 'budget-builder.token';
const LOCAL_STORAGE_USERNAME_KEY = 'budget-builder.username';
const LOCAL_STORAGE_USERID_KEY = 'budget-builder.userId';

const AuthenticationContext = React.createContext();

class AuthenticationProvider extends React.Component {
  state = {
    token: null,
    username: null,
    id: null,
    setIdentity: ({ token, username, id }) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
      localStorage.setItem(LOCAL_STORAGE_USERID_KEY, id);
      this.setState({ token, username, id });
    },
    logout: () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USERID_KEY);
      this.setState({
        token: null,
        username: null,
        id: null,
      });
    },
  };

  componentWillMount() {
    const previousToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const previousUsername = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    const previousUserId = localStorage.getItem(LOCAL_STORAGE_USERID_KEY);

    this.setState({
      token: previousToken,
      username: previousUsername,
      id: previousUserId,
    });
  }

  render() {
    return <AuthenticationContext.Provider value={this.state}>{this.props.children}</AuthenticationContext.Provider>;
  }
}

export default AuthenticationContext;
export { AuthenticationProvider };
