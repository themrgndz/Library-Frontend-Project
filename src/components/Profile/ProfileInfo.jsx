// ProfileInfo.jsx
import React from 'react';

const ProfileInfo = ({ userData }) => {
  return (
    <div id="profileInfo" className="profile-info">
      <p><strong>Name:</strong> {userData.firstName}</p>
      <p><strong>Surname:</strong> {userData.lastName}</p>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>E-Mail:</strong> {userData.email}</p>
    </div>
  );
};

export default ProfileInfo;
