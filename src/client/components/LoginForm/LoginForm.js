import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <input
          value={this.state.username}
          onChange={this.onUserNameChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={this.onSubmit}>Submit</button>
        <br />
        {this.props.showError && <small>Invalid username or password</small>}
      </div>
    );
  }
}

export default LoginForm;
