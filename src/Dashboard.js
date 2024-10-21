// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return;
    }

    fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer prefix
      },
    })
      .then((response) => {
        if (response.status === 401) {
          // Unauthorized, redirect to login
          navigate('/login');
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred while fetching data.');
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
