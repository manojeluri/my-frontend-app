import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState('');
  const [lastLogin, setLastLogin] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
          setLastLogin(new Date(data.lastLogin).toLocaleString());
        }
      })
      .catch(() => {
        setMessage('An error occurred while fetching data.');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-message">{message}</p>
        <p className="dashboard-last-login">Last Login: {lastLogin}</p>
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
