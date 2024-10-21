import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import './App.css'; // Ensure styles for light and dark themes are applied

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
