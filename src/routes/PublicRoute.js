import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const role = user?.role;

  if (isAuthenticated) {
    if (role === 'user') {
      return <Navigate to="/user/create-notarization-profile" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === 'notary') {
      return <Navigate to="/notary/dashboard" replace />;
    }
  }

  return children;
};

export default PublicRoute;
