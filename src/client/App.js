import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LoginView from './views/Login';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>App</h1>
        <Link to="/login">Login</Link>
        <Route path="/login" component={LoginView} />
      </div>
    </BrowserRouter>
  )
};

export default App;
