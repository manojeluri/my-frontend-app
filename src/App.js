// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h2>Welcome to the App</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
