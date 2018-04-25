import React from 'react';
import { Container, Menu, Button, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import AuthenticationContext from '../AuthenticationContext/AuthenticationContext';

const NavBar = (props) => {
  return (
    <AuthenticationContext.Consumer>
      {({ user, token, logout }) => {
        return (
          <Container>
            <Menu.Item as={Link} to="/" active>
              Home
            </Menu.Item>
            {!user && (
              <Menu.Item position="right">
                <Button as={Link} to="/login">
                  Log in
                </Button>
                <Button as="a" primary style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            )}
            {user && (
              <Menu.Item position="right">
                <Image src="https://api.adorable.io/avatars/285/abott@adorable.png" avatar />
                {user}
                <Button onClick={() => {
                  logout();
                  props.history.push("/");
                }}>
                  Log Out
                </Button>
              </Menu.Item>
            )}
          </Container>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default withRouter(NavBar);
