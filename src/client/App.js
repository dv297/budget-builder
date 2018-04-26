import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AuthenticationProvider } from './components/AuthenticationContext/AuthenticationContext';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LandingView from './views/Landing';
import LoginView from './views/Login';
import DashboardView from './views/Dashboard';
import AddBudgetView from './views/AddBudget';
import StickyLayout from './views/StickyLayout';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthenticationProvider>
        <BrowserRouter>
          <StickyLayout
            menu={<NavBar />}
            content={
              <div>
                <Route exact path="/" component={LandingView} />
                <PrivateRoute exact path="/dashboard" component={DashboardView} />
                <PrivateRoute exact path="/addBudget" component={AddBudgetView} />
                <Route path="/login" component={LoginView} />
                <Route path="/logout" component={LoginView} />
              </div>
            }
          />
        </BrowserRouter>
      </AuthenticationProvider>
    </ApolloProvider>
  );
};

export default hot(module)(App);
