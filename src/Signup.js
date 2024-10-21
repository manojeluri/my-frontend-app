// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate(); // Hook for navigation
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
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect to Dashboard
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred during signup.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={name} onChange={handleChange} placeholder="Name" required /><br />
        <input name="email" type="email" value={email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="password" type="password" value={password} onChange={handleChange} placeholder="Password" required /><br />
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        /><br />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
