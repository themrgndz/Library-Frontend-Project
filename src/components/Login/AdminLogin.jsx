import React from 'react';

const AdminLogin = () => {
  return (
    <div className="form-container active">
      <h4>Admin Login</h4>
      <form>
        <div className="form-group">
          <label htmlFor="adminIdentifier">Username / Email:</label>
          <input type="text" className="form-control" id="adminIdentifier" placeholder="Username / Email:" required />
        </div>
        <div className="form-group">
          <label htmlFor="adminPassword">Password:</label>
          <input type="password" className="form-control" id="adminPassword" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
        <div className="mt-3 row">
          <a href="#" className="col">Forgot Password</a>
          <a href="#" className="col">Register</a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
