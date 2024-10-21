import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.name}!`);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            className="login-input"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="login-input"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
        <p className="login-message">{message}</p>
        <p className="login-signup-prompt">
          Don't have an account?{' '}
          <button
            className="login-signup-button"
            onClick={goToSignup}
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
