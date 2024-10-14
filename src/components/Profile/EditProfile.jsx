import React from 'react';

const EditProfile = ({ toggleEdit }) => {
  return (
    <div id="editProfile" className="bg-dark text-light">
      <form action="/profile/update" method="POST" enctype="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">Name</label>
          <input type="text" className="form-control" id="firstNameInput" name="firstName" defaultValue="Ahmet" required />
        </div>

        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">Surname</label>
          <input type="text" className="form-control" id="lastNameInput" name="lastName" defaultValue="Yılmaz" required />
        </div>

        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput" name="username" defaultValue="ahmet_yilmaz" required />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">E-Mail</label>
          <input type="email" className="form-control" id="emailInput" name="email" defaultValue="ahmet.yilmaz@example.com" required />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label bg-dark text-light">Password</label>
          <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Yeni şifre giriniz (değiştirmek için)" />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
