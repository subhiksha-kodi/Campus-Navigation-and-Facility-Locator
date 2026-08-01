import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const DEMO_ROLES = {
  student: { role: 'student', roleLabel: 'Student Portal' },
  faculty: { role: 'faculty', roleLabel: 'Faculty & Staff' },
  visitor: { role: 'visitor', roleLabel: 'Campus Visitor' },
  security: { role: 'security', roleLabel: 'Campus Security' },
  admin: { role: 'admin', roleLabel: 'Administrator' }
};

export const RoleProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState('student');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const switchRole = (newRole) => {
    if (DEMO_ROLES[newRole]) {
      setActiveRole(newRole);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const login = (role = 'student') => {
    setActiveRole(role);
    setIsAuthenticated(true);
  };

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        switchRole,
        isAuthenticated,
        login,
        logout,
        allRoles: Object.keys(DEMO_ROLES)
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
