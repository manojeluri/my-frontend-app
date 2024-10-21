// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Hook for navigation
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
        console.log('Login successful:', data);
        setMessage(`Welcome, ${data.name}!`);
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect to Dashboard
        navigate('/dashboard');
      } else {
        console.log('Login failed:', data);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login.');
    }
  };

  // Handle navigation to the Signup page
  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      {/* Add the Signup button */}
      <p>
        Don't have an account?{' '}
        <button
          onClick={goToSignup}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;
