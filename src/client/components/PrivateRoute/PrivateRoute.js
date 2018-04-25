import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthenticationContext from '../AuthenticationContext/AuthenticationContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthenticationContext.Consumer>
    {({ token }) => (
      <Route
        {...rest}
        render={(props) =>
          token !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )}
  </AuthenticationContext.Consumer>
);

export default PrivateRoute;
