// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Navigate to the Profile page
  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-message">{message}</p>
        <div className="dashboard-buttons">
          <button className="dashboard-profile-button" onClick={goToProfile}>
            Profile
          </button>
          <button className="dashboard-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
