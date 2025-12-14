import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setUserData(response.data);
          setLoading(false);
        }
      } catch (error) {
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setError(error.message || 'Error fetching user data');
          setLoading(false);
        }
      }
    };

    // Check if userId is a valid integer
    const isValidUserId = Number.isInteger(parseInt(userId));

    if (isValidUserId) {
      fetchUserData();
    } else {
      // Check if the component is still mounted before updating state
      if (isMounted) {
        setError('Invalid user ID');
        setLoading(false);
      }
    }

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if userData is not available yet
  if (!userData) {
    return <div>User not found</div>;
  }

  // Check if userData.skills is not an array
  if (!Array.isArray(userData.skills)) {
    // If skills is not an array, set it to an empty array
    userData.skills = [];
  }

  // Check if userData.interests is not an array
  if (!Array.isArray(userData.interests)) {
    // If interests is not an array, set it to an empty array
    userData.interests = [];
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={userData.profileImage} alt={`Profile of ${userData.name}`} />
        </div>
        <div className="profile-details">
          <h1>{userData.name}</h1>
          <p id="lightcol">{userData.email}</p>
        </div>
      </div>
      <div className="skills-interests">
        <div className="profile-skills">
          <h2>Skills:</h2>
          <div className="collection">
            {userData.skills.map((skill, index) => (
              <div className="chip" key={index}>{skill}</div>
            ))}
          </div>
        </div>
        <div className="profile-interests">
          <h2>Interests:</h2>
          <div className="collection">
            {userData.interests.map((interest, index) => (
              <div className="chip" key={index}>{interest}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
