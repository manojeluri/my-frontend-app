// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        {/* Add a catch-all route for 404 Not Found */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => <h2>404 Not Found</h2>} />
      </Switch>
    </Router>
  );
}

export default App;
