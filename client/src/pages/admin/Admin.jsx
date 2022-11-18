import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import Navbar from '../../components/navbar/Navbar.jsx';

import UserAdmin from './components/UserAdmin.jsx';
import LocationAdmin from './components/LocationAdmin.jsx';
import RoomAdmin from './components/RoomAdmin.jsx';

import './admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  } else if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-container">
      <Navbar />
      <UserAdmin />
      <LocationAdmin />
      <RoomAdmin />
    </div>
  );
};

export default Admin;
