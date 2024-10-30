import React from 'react';

const ProfileInfo = () => {
  return (
    <div id="profileInfo" className="profile-info">
      <p><strong>Name:</strong> <span id="firstName">Ahmet</span></p>
      <p><strong>Surname:</strong> <span id="lastName">Yılmaz</span></p>
      <p><strong>Username:</strong> <span id="username">ahmet_yilmaz</span></p>
      <p><strong>E-Mail:</strong> <span id="email">ahmet.yilmaz@example.com</span></p>
    </div>
  );
};

export default ProfileInfo;
