import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';

export const FacultyRouteGuard = ({ children }) => {
  const { activeRole } = useRole();

  if (activeRole !== 'faculty') {
    // Redirect non-faculty users attempting to access /faculty/* routes
    return <Navigate to="/login" replace />;
  }

  return children;
};
