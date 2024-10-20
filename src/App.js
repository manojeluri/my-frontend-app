import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <h1>React Frontend</h1>
        <nav>
          <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </nav>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/">
            <h2>Welcome to the App</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
