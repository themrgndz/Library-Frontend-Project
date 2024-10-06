// EditProfileForm.jsx
import React from 'react';

const EditProfileForm = ({ userData }) => {
  return (
    <div id="editProfile" className="bg-dark text-light">
      <form action="/profile/update" method="POST" enctype="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">Name</label>
          <input type="text" className="form-control" id="firstNameInput" name="firstName" defaultValue={userData.firstName} required />
        </div>

        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">Surname</label>
          <input type="text" className="form-control" id="lastNameInput" name="lastName" defaultValue={userData.lastName} required />
        </div>

        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput" name="username" defaultValue={userData.username} required />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">E-Mail</label>
          <input type="email" className="form-control" id="emailInput" name="email" defaultValue={userData.email} required />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Yeni şifre giriniz (değiştirmek için)" />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
