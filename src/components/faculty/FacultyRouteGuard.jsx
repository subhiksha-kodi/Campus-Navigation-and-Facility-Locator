import React, { useEffect } from 'react';
import { useRole } from '../../context/RoleContext';

export const FacultyRouteGuard = ({ children }) => {
  const { activeRole, switchRole } = useRole();

  useEffect(() => {
    if (activeRole !== 'faculty') {
      switchRole('faculty');
    }
  }, [activeRole, switchRole]);

  return children;
};
