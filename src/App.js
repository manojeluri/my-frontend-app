import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import { ThemeProvider } from './ThemeContext'; // Only keep ThemeProvider if ThemeContext is not directly used
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
