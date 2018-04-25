import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AuthenticationContext, { AuthenticationProvider } from './components/AuthenticationContext/AuthenticationContext';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LandingView from './views/Landing';
import LoginView from './views/Login';
import DashboardView from './views/Dashboard';
import StickyLayout from './views/StickyLayout';

const App = () => {
  return (
    <AuthenticationProvider>
      <AuthenticationContext.Consumer>
        {({ user, token }) => {
          return (
            <BrowserRouter>
              <StickyLayout
                menu={<NavBar />}
                content={
                  <div>
                    <Route exact path="/" component={LandingView} />
                    <Route exact path="/dashboard" component={DashboardView} />
                    <Route path="/login" component={LoginView} />
                    <Route path="/logout" component={LoginView} />
                  </div>
                }
              >
              </StickyLayout>
            </BrowserRouter>
          );
        }}
      </AuthenticationContext.Consumer>
    </AuthenticationProvider>
  );
};

export default hot(module)(App);
