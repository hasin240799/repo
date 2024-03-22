// ProtectedRoute.js

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // Assuming you have an AuthContext for managing authentication

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
