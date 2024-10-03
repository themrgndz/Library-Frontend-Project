import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileInfo from './ProfileInfo';
import EditProfileForm from './EditProfileForm';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    // Backend'deki API'den kullanıcı verilerini çekiyoruz
    axios.get('http://localhost:8080/user/1') // ID'ye göre API çağrısı
      .then(response => {
        setUserData(response.data); // Veriyi state içine kaydet
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="container text-light">
      <div className="profile-container bg-dark">
        <h2 className="text-center">Profile</h2>
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="profile-img"
          />
        </div>

        {userData ? (
          isEditing ? (
            <EditProfileForm userData={userData} />
          ) : (
            <ProfileInfo userData={userData} />
          )
        ) : (
          <p>Loading...</p>
        )}

        <div className="d-grid mt-4">
          <button className="btn btn-outline-primary my-2" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <a href="./homepage" className="btn btn-outline-success my-2">Return Homepage</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
