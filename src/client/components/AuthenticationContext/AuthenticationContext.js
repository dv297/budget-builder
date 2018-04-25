import React from 'react';

const LOCAL_STORAGE_TOKEN_KEY = 'budget-builder.token';
const LOCAL_STORAGE_USER_KEY = 'budget-builder.user';

const AuthenticationContext = React.createContext();

class AuthenticationProvider extends React.Component {
  state = {
    token: null,
    user: null,
    setToken: (token) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      this.setState({ token });
    },
    setUser: (user) => {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, user);
      this.setState({ user });
    },
    logout: () => {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      this.setState({ user: null, token: null });
    },
  };

  componentWillMount() {
    const previousToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const previousUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    this.setState({
      token: previousToken,
      user: previousUser,
    });
  }

  render() {
    return (
      <AuthenticationContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

export default AuthenticationContext;
export { AuthenticationProvider };
