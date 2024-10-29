import React, { useState, useEffect } from 'react';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import EditProfile from '../../components/Profile/EditProfile';
import './Profile.css';

const Profile = ({ userInfo }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [profileData, setProfileData] = useState(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfo && userInfo.userId) {
        try {
          const response = await fetch(`https://localhost:5001/api/user/22`); 
          if (!response.ok) {
            throw new Error('Kullanıcı bilgileri alınamadı');
          }
          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userInfo]); 

  return (
    <div className='Profile'>
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

          {isEditing ? <EditProfile toggleEdit={toggleEdit} /> : <ProfileInfo userInfo={profileData} />}

          <div className="d-grid mt-4">
            <button onClick={toggleEdit} className="btn btn-outline-primary my-2">
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            <a href="./homepage" className="btn btn-outline-success my-2">
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
