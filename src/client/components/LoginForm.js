import React from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <input value="Foo3" type="text" name="username" placeholder="Username" />
        <input value="Foo3" type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </div>
    );
  }
}

export default LoginForm;
