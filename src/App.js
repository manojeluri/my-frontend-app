import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import './App.css'; // Ensure styles for light and dark themes are applied

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <header className="app-header">
          <h1>Welcome to the Theme System</h1>
          <button onClick={toggleTheme} className="theme-toggle-button">
            Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected route for the dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Protected route for the profile */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          {/* 404 Not Found Route */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
