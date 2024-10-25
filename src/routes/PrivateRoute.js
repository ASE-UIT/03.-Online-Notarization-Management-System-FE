import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  if (role === 'user') {
    return <Navigate to="/user/create-notarization-profile" replace />;
  } else if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
