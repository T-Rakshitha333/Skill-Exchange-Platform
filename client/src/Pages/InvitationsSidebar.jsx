// InvitationsSidebar.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';





const InvitationsSidebar = () => {
  // Dummy invitation data (replace with actual data)
  const invitations = [
    { id: 1, name: 'John Doe', profileImage: 'https://picsum.photos/212/300', userId: 'user-1' },
    { id: 2, name: 'Jane Doe', profileImage: 'https://picsum.photos/213/300', userId: 'user-2' },
    { id: 3, name: 'Alice Doe', profileImage: 'https://picsum.photos/214/300', userId: 'user-3' },
    // Add more invitations as needed
  ];

  const handleAccept = (userId) => {
    alert(`Invitation from user ${userId} is accepted`);
  };

  const handleReject = (userId) => {
    alert(`Invitation from user ${userId} is rejected`);
  };

  return (
    <div className="invitations-sidebar">
      <h2>Invitations</h2>
      {invitations.map((invitation) => (
        <div className="invitation" key={invitation.id}>
          <img
            src={invitation.profileImage}
            alt={`${invitation.name}'s Profile`}
            className="invitation-profile"
          />
          <div className="invitation-details">
            <p>{invitation.name} </p>
          </div>
          <div className="invitation-buttons">
  <button onClick={() => handleAccept(invitation.userId)}>
    <FontAwesomeIcon icon={faCheck} style={{ color: 'green', fontWeight: 'bold' }} />
  </button>

  <button onClick={() => handleReject(invitation.userId)}>
    <FontAwesomeIcon icon={faTimes} style={{ color: 'red', fontWeight: 'bold' }} />
  </button>
</div>
        </div>
      ))}
    </div>
  );
};

export default InvitationsSidebar;
