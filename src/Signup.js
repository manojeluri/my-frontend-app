import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred during signup.');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            className="signup-input"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            className="signup-input"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="signup-input"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="signup-input"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <button className="signup-button" type="submit">Signup</button>
        </form>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <p className="signup-message">{message}</p>
        <p className="signup-login-prompt">
          Already have an account?{' '}
          <button className="signup-login-button" onClick={goToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
