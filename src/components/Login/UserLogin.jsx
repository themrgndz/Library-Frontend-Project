import React from 'react';

const UserLogin = () => {
  return (
    <div className="form-container active">
      <h4>User Login</h4>
      <form>
        <div className="form-group">
          <label htmlFor="userIdentifier">Username / Email:</label>
          <input type="text" className="form-control" id="userIdentifier" placeholder="Username / Email:" required />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password:</label>
          <input type="password" className="form-control" id="userPassword" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
        <div className="mt-3 row">
          <a href="./homepage" className="col">Forgot Password</a>
          <a href="#" className="col">Register</a>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
