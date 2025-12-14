// UserProfile.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';

const UserProfile = () => {
  const { userId } = useParams();

  // For now, let's assume userId is the ID of the current user
  const currentUserId = userId || '1'; // Default to user with ID 1 if userId is not provided

  // Fetch user data based on currentUserId
  // Example: const userData = fetchUserData(currentUserId);

  // For now, let's assume userData is a placeholder
  const userData = {
    id: currentUserId,
    name: 'Current User',
    email: 'currentuser@example.com',
    skills: 'Some Skills',
    interests: 'Some Interests',
    profileImage: `https://picsum.photos/2${currentUserId}/300`,
  };

  return <Profile userData={userData} />;
};

export default UserProfile;
