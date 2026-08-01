import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SUBSTITUTIONS,
  FACULTY_NOTIFICATIONS,
  ALL_FACULTY_MEMBERS,
  INITIAL_ADMIN_NOTIFICATIONS,
  INITIAL_FACULTY_PROFILE
} from '../services/facultyData';

const SubstitutionContext = createContext();

const getInitialState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`sub_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    return fallback;
  }
};

export const SubstitutionProvider = ({ children }) => {
  const [substitutions, setSubstitutions] = useState(() => getInitialState('substitutions', INITIAL_SUBSTITUTIONS));
  const [adminNotifications, setAdminNotifications] = useState(() => getInitialState('adminNotifs', INITIAL_ADMIN_NOTIFICATIONS));
  const [facultyNotifications, setFacultyNotifications] = useState(() => getInitialState('facultyNotifs', FACULTY_NOTIFICATIONS));
  const [allFaculty] = useState(ALL_FACULTY_MEMBERS);

  useEffect(() => { localStorage.setItem('sub_substitutions', JSON.stringify(substitutions)); }, [substitutions]);
  useEffect(() => { localStorage.setItem('sub_adminNotifs', JSON.stringify(adminNotifications)); }, [adminNotifications]);
  useEffect(() => { localStorage.setItem('sub_facultyNotifs', JSON.stringify(facultyNotifications)); }, [facultyNotifications]);

  // Faculty submits a substitution request -> Admin is notified instantly
  const addSubstitutionRequest = (requestData) => {
    const newId = `sub_${Math.floor(Math.random() * 9000 + 1000)}`;
    const newReq = {
      id: newId,
      original_faculty_id: requestData.original_faculty_id || INITIAL_FACULTY_PROFILE.faculty_id,
      original_faculty_name: requestData.original_faculty_name || INITIAL_FACULTY_PROFILE.name,
      substitute_faculty_id: null,
      substitute_faculty_name: 'Unassigned (Awaiting Admin)',
      subject: requestData.subject,
      class_name: requestData.className || requestData.class_name,
      date: requestData.date,
      period: requestData.period,
      room: requestData.room || 'SF303',
      building: requestData.building || 'Sunflower Block',
      reason: requestData.reason,
      status: 'Pending',
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
    };

    setSubstitutions((prev) => [newReq, ...prev]);

    const adminNotif = {
      id: `an_${Date.now()}`,
      title: '⚠️ New Faculty Substitution Request',
      message: `${newReq.original_faculty_name} requested substitution for ${newReq.subject} on ${newReq.date} (${newReq.period}) due to "${newReq.reason}". Action required: Arrange free faculty.`,
      type: 'substitution_request',
      request_id: newId,
      read_status: false,
      created_at: 'Just now'
    };
    setAdminNotifications((prev) => [adminNotif, ...prev]);

    return newReq;
  };

  const getFreeFacultyForSlot = (period, originalFacultyId = null) => {
    return allFaculty.filter((fac) => {
      if (originalFacultyId && fac.id === originalFacultyId) return false;
      const isFree = fac.freeSlots.some((slot) => slot.toLowerCase().includes(period.toLowerCase()) || period.toLowerCase().includes(slot.toLowerCase())) ||
        !fac.busySlots.some((slot) => slot.toLowerCase().includes(period.toLowerCase()) || period.toLowerCase().includes(slot.toLowerCase()));
      return isFree;
    });
  };

  const assignSubstitute = (requestId, substituteFaculty) => {
    let targetReq = null;

    setSubstitutions((prev) =>
      prev.map((sub) => {
        if (sub.id === requestId) {
          targetReq = {
            ...sub,
            status: 'Approved',
            substitute_faculty_id: substituteFaculty.id,
            substitute_faculty_name: substituteFaculty.name
          };
          return targetReq;
        }
        return sub;
      })
    );

    if (!targetReq) return;

    const facNotifOriginal = {
      id: `fn_${Date.now()}_1`,
      title: '✅ Substitute Arranged by Admin',
      message: `Admin has assigned ${substituteFaculty.name} as substitute for your ${targetReq.subject} class on ${targetReq.date} (${targetReq.period}).`,
      type: 'substitute',
      read_status: false,
      created_at: 'Just now'
    };

    const facNotifSubstitute = {
      id: `fn_${Date.now()}_2`,
      title: '📋 Class Substitution Assigned to You',
      message: `Admin assigned you to substitute for ${targetReq.original_faculty_name}'s class: ${targetReq.subject} (${targetReq.class_name}) on ${targetReq.date} at ${targetReq.period} in Room ${targetReq.room}.`,
      type: 'substitute',
      read_status: false,
      created_at: 'Just now'
    };

    setFacultyNotifications((prev) => [facNotifOriginal, facNotifSubstitute, ...prev]);

    setAdminNotifications((prev) =>
      prev.map((n) =>
        n.request_id === requestId
          ? { ...n, read_status: true, title: '✅ Substitution Arranged' }
          : n
      )
    );
  };

  const markAdminNotificationRead = (id) => {
    setAdminNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_status: true } : n))
    );
  };

  const markFacultyNotificationRead = (id) => {
    setFacultyNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_status: true } : n))
    );
  };

  const clearFacultyNotifications = () => {
    setFacultyNotifications([]);
  };

  const unreadAdminNotifCount = adminNotifications.filter((n) => !n.read_status).length;
  const unreadFacultyNotifCount = facultyNotifications.filter((n) => !n.read_status).length;
  const pendingSubstitutionsCount = substitutions.filter((s) => s.status === 'Pending').length;

  return (
    <SubstitutionContext.Provider
      value={{
        substitutions,
        adminNotifications,
        facultyNotifications,
        allFaculty,
        addSubstitutionRequest,
        getFreeFacultyForSlot,
        assignSubstitute,
        markAdminNotificationRead,
        markFacultyNotificationRead,
        clearFacultyNotifications,
        unreadAdminNotifCount,
        unreadFacultyNotifCount,
        pendingSubstitutionsCount
      }}
    >
      {children}
    </SubstitutionContext.Provider>
  );
};

export const useSubstitution = () => {
  const context = useContext(SubstitutionContext);
  if (!context) {
    throw new Error('useSubstitution must be used within a SubstitutionProvider');
  }
  return context;
};
