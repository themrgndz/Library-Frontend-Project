import React, { useState } from 'react';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState('user');

  return (
    <div className="login p-4">
      <h2 className="text-center">Uzmar Library</h2>
      <div className="text-center mb-4">
        <button
          className="btn btn-outline-danger mx-2"
          onClick={() => setActiveForm('user')}
        >
          User
        </button>
        <button
          className="btn btn-outline-success mx-2"
          onClick={() => setActiveForm('admin')}
        >
          Admin
        </button>
      </div>
      
      {activeForm === 'user' && <UserLogin />}
      {activeForm === 'admin' && <AdminLogin />}
    </div>
  );
};

export default LoginPage;
