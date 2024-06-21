import React from 'react';
import { Navigate } from 'react-router-dom';

// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('userEmail');
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
