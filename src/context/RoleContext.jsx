import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateSessionToken, authenticateUser } from '../services/authService';

const RoleContext = createContext();

export const DEMO_USERS = {
  student: {
    id: 'usr_std_1',
    name: 'Alex Vance',
    role: 'student',
    roleLabel: 'Student',
    department: 'Computer Science & Eng',
    idNumber: 'CS-2024-089',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'alex.vance@campus.edu'
  },
  faculty: {
    id: 'usr_fac_1',
    name: 'Dr. Gayathri Devi',
    role: 'faculty',
    roleLabel: 'Faculty',
    department: 'Department of Computing',
    idNumber: 'FAC-9402',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'gayathri.devi@campus.edu'
  },
  visitor: {
    id: 'usr_vis_1',
    name: 'Sarah Jenkins',
    role: 'visitor',
    roleLabel: 'Campus Visitor',
    department: 'Guest / Parent',
    idNumber: 'PASS-88392',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'sarah.j@gmail.com'
  },
  security: {
    id: 'usr_sec_1',
    name: 'Officer Marcus Drake',
    role: 'security',
    roleLabel: 'Campus Security',
    department: 'Safety & Dispatch',
    idNumber: 'SEC-402',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'security.drake@campus.edu'
  },
  admin: {
    id: 'usr_adm_1',
    name: 'Eleanor Vance',
    role: 'admin',
    roleLabel: 'System Administrator',
    department: 'Facility & IT Ops',
    idNumber: 'ADM-001',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    email: 'admin.vance@campus.edu'
  }
};

export const getRoleLabel = (role) => {
  const labels = {
    student: 'Student',
    faculty: 'Faculty & Staff',
    visitor: 'Campus Visitor',
    security: 'Campus Security',
    admin: 'System Administrator'
  };
  return labels[role] || 'Student';
};

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const validated = validateSessionToken();
    if (validated) {
      const savedUser = localStorage.getItem('wayfindyou_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        return {
          ...u,
          roleLabel: getRoleLabel(u.role)
        };
      }
    }
    return {
      ...DEMO_USERS.student,
      roleLabel: 'Student'
    };
  });

  const [activeRole, setActiveRole] = useState(() => {
    const validated = validateSessionToken();
    return validated ? validated.role : 'student';
  });

  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setActiveRole(newRole);
      const fullUser = {
        ...DEMO_USERS[newRole],
        roleLabel: getRoleLabel(newRole)
      };
      setUser(fullUser);
      localStorage.setItem('wayfindyou_user', JSON.stringify(fullUser));
      const mockToken = btoa(JSON.stringify({ id: fullUser.id, role: newRole, exp: Date.now() + 3600000 }));
      localStorage.setItem('wayfindyou_token', mockToken);
    }
  };

  const login = async (email, password) => {
    const { user: authenticatedUser } = await authenticateUser(email, password);
    const fullUser = {
      ...authenticatedUser,
      roleLabel: getRoleLabel(authenticatedUser.role),
      avatar: DEMO_USERS[authenticatedUser.role]?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'
    };
    setUser(fullUser);
    setActiveRole(authenticatedUser.role);
    localStorage.setItem('wayfindyou_user', JSON.stringify(fullUser));
    return fullUser;
  };

  const logout = () => {
    localStorage.removeItem('wayfindyou_token');
    localStorage.removeItem('wayfindyou_user');
    setUser({
      ...DEMO_USERS.student,
      roleLabel: 'Student'
    });
    setActiveRole('student');
  };

  return (
    <RoleContext.Provider value={{ activeRole, switchRole, user, login, logout, allRoles: Object.keys(DEMO_USERS) }}>
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
