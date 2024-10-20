import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('https://your-heroku-app.herokuapp.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.name}!`);
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Optionally, redirect to dashboard
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={email} onChange={handleChange} placeholder="Email" /><br />
        <input name="password" type="password" value={password} onChange={handleChange} placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
