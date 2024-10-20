import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://your-heroku-app.herokuapp.com/auth/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
