import React from 'react';

const ProfileInfo = ({ userInfo }) => {
  return (
    <div id="profileInfo" className="profile-info">
      {userInfo ? (
        <>
          <p><strong>Username:</strong> <span id="username">{userInfo.username}</span></p>
          <p><strong>E-Mail:</strong> <span id="email">{userInfo.email}</span></p>
        </>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </div>
  );
};

export default ProfileInfo;
