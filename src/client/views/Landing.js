import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react';

import AuthenticationContext from '../components/AuthenticationContext/AuthenticationContext';

const Landing = () => (
  <AuthenticationContext>
    {({ token }) => {
      if (token) {
        return <Redirect to="/dashboard" />;
      }

      return (
        <Segment textAlign="center" vertical inverted>
          <Container text style={{ padding: '20px' }}>
            <Header as="h1" content="Budget Builder" inverted />
            <Header as="h2" content="Quick and Easy Way to Track Expenses and Savings" inverted />
            <Button as={Link} primary size="huge" to="/login">
              Get Started
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Segment>
      );
    }}
  </AuthenticationContext>
);

export default Landing;
