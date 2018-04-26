import React from 'react';
import { Container, Menu, Button, Image, Icon } from 'semantic-ui-react';
import { Link, Route, withRouter } from 'react-router-dom';

import './NavBar.css';
import AuthenticationContext from '../AuthenticationContext/AuthenticationContext';

const DashboardNavbarItems = () => (
  <Menu.Item as={Link} to="/addBudget">
    <Icon name="add circle" color="green" />
    Add Budget
  </Menu.Item>
);

const NavBar = (props) => {
  return (
    <AuthenticationContext.Consumer>
      {({ username, token, logout }) => {
        return (
          <Container>
            <Menu.Item as={Link} to="/" active>
              Home
            </Menu.Item>
            <Route path="/dashboard" render={() => <DashboardNavbarItems />} />
            {!username && (
              <Menu.Item position="right">
                <Button as={Link} to="/login">
                  Log in
                </Button>
                <Button as="a" primary style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            )}
            {username && (
              <Menu.Item position="right">
                <div className="username-container">
                  <Image src="https://api.adorable.io/avatars/285/abott@adorable.png" avatar />
                  {username}
                </div>
                <Button
                  basic
                  onClick={() => {
                    logout();
                    props.history.push('/');
                  }}
                >
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
