import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const role = user?.role;

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
  } else if (role === 'notary') {
    return <Navigate to="/notary/dashboard" replace />;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
