import React, { useState } from 'react';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import EditProfile from '../../components/Profile/EditProfile';
import './Profile.css'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container text-light">
      <div className="profile-container bg-dark">
        <h2 className="text-center">Profile</h2>

        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profil Resmi"
            className="profile-img"
          />
        </div>

        {isEditing ? <EditProfile toggleEdit={toggleEdit} /> : <ProfileInfo />}

        <div className="d-grid mt-4">
          <button onClick={toggleEdit} className="btn btn-outline-primary my-2">
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <a href="./" className="btn btn-outline-success my-2">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
