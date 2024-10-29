import React from 'react';

const EditProfile = ({ toggleEdit }) => {
  return (
    <div id="editProfile">
      <form action="/profile/update" method="POST" enctype="multipart/form-data">
        
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput" name="username" defaultValue="..." required />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">E-Mail</label>
          <input type="email" className="form-control" id="emailInput" name="email" defaultValue="...@example.com" required />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control bg-dark text-light" id="passwordInput" name="password" placeholder="Yeni şifre giriniz (değiştirmek için)" />
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
