// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to login
      history.push('/login');
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
          history.push('/login');
        }
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred while fetching data.');
      });
  }, [history]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
