// Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvitationsSidebar from './InvitationsSidebar'; // Import InvitationsSidebar
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((response) => {
        // Initialize connection status for each user as 'Connect'
        const initialStatus = {};
        response.data.forEach((user) => {
          initialStatus[user.id] = 'Connect';
        });
        setConnectionStatus(initialStatus);

        setData(response.data);
      });
  }, []);

  const handleConnect = async (event, userId) => {
    event.preventDefault();

    // Set the connection status to 'Pending'
    setConnectionStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: 'Pending',
    }));

    try {
      // Simulate an asynchronous action (e.g., API call)
      await axios.post(`http://localhost:3000/connect/${userId}`);

      // If the action is successful, update the connection status to 'Connected'
      setConnectionStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: 'Pending',
      }));

      console.log(`Pending Connection  with user ${userId}`);
    } catch (error) {
      // If there's an error, update the connection status back to 'Connect'
      setConnectionStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: 'Connect',
      }));

      console.error(`Error connecting with user ${userId}:`, error);
    }
  };

  return (
    <div className="home-container">
      <InvitationsSidebar />
      <div className="users-container">
        <div className="users-list">
          {data.length > 0
            ? data.map((user) => (
              <div key={user.id} className="user-card">
                <Link to={`/Profile/${user.id}`} className="user-link">

                  <div className="user-profile">
                    <img src={user.profileImage} alt="Profile Icon" className="profile-icon" />
                    <button
                      onClick={(e) => handleConnect(e, user.id)}
                      className={`connect-button ${connectionStatus[user.id] === 'Pending' ? 'pending' : ''
                        }`}
                    >
                      {connectionStatus[user.id]}
                    </button>
                    <div className="user-details">
                      <h3 className="user-name">{user.name}</h3>
                      {/* <p className="user-email">{user.email}</p> */}
                    </div>
                  </div>
                  {/* <div className="user-skills-interests">
                    <p className="user-skills">
                      Skills: {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills}
                    </p>
                    <p className="user-interests">
                      Interests: {Array.isArray(user.interests) ? user.interests.join(', ') : user.interests}
                    </p>
                  </div> */}
                </Link>
              </div>
            ))
            : (
              <p className="no-users-found">No users found.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
