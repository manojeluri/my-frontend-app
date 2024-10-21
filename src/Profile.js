// Profile.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { name, email, password } = formData;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile data
    fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate('/login');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFormData({ name: data.name, email: data.email, password: '' });
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setMessage('An error occurred while fetching profile data.');
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully');
      } else {
        setMessage(data.message || 'An error occurred while updating profile.');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('An error occurred while updating profile.');
    }
  };

  // Navigate back to the Dashboard page
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="profile-input"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          /><br />
          <input
            className="profile-input"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          /><br />
          <input
            className="profile-input"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="New Password (leave empty if unchanged)"
          /><br />
          <button className="profile-submit-button" type="submit">
            Update Profile
          </button>
        </form>
        <p className="profile-message">{message}</p>
        {/* Add the Dashboard button */}
        <button className="profile-dashboard-button" onClick={goToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
