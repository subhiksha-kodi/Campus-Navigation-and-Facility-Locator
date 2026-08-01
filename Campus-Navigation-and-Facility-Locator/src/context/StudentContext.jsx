import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_STUDENT_DATA,
  MOCK_ATTENDANCE,
  MOCK_TIMETABLE,
  MOCK_NOTICES,
  MOCK_EVENTS,
  MOCK_CAFETERIA_MENU,
  MOCK_EMERGENCY_CONTACTS,
  INITIAL_COMPLAINTS,
  INITIAL_BOOKMARKS,
  INITIAL_NOTIFICATIONS
} from '../data/studentMockData';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(INITIAL_STUDENT_DATA);
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);
  const [timetable, setTimetable] = useState(MOCK_TIMETABLE);
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [eventRegistrations, setEventRegistrations] = useState([101]);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [bookmarks, setBookmarks] = useState(INITIAL_BOOKMARKS);
  const [cafeteriaMenu, setCafeteriaMenu] = useState(MOCK_CAFETERIA_MENU);
  const [activeCafeteriaToken, setActiveCafeteriaToken] = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Counter for complaint IDs (CMP-0003, CMP-0004...)
  const [complaintCounter, setComplaintCounter] = useState(3);
  // Counter for digital cafeteria tokens (Token #101...)
  const [tokenCounter, setTokenCounter] = useState(101);

  // Update Profile
  const updateProfile = (fields) => {
    setStudent((prev) => ({ ...prev, ...fields }));
  };

  // Submit Complaint with dynamic ID
  const submitComplaint = ({ type, location, description, photoName }) => {
    const formattedId = `CMP-${String(complaintCounter).padStart(4, '0')}`;
    const newComplaint = {
      id: formattedId,
      type,
      location,
      description,
      photoName: photoName || null,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: 'Unassigned'
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    setComplaintCounter((prev) => prev + 1);

    // Add to notifications
    addNotification({
      title: `Complaint ${formattedId} submitted successfully.`,
      type: 'complaint'
    });

    return newComplaint;
  };

  // Toggle Bookmark
  const toggleBookmark = (locationObj) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === locationObj.id || b.name === locationObj.name);
      if (exists) {
        return prev.filter((b) => b.id !== locationObj.id && b.name !== locationObj.name);
      } else {
        return [...prev, { id: locationObj.id || `b_${Date.now()}`, name: locationObj.name, building: locationObj.building || 'Campus', type: locationObj.category || 'Facility' }];
      }
    });
  };

  // Event Registration
  const toggleEventRegistration = (eventId) => {
    setEventRegistrations((prev) => {
      if (prev.includes(eventId)) {
        addNotification({ title: `Cancelled registration for event #${eventId}`, type: 'event' });
        return prev.filter((id) => id !== eventId);
      } else {
        addNotification({ title: `Successfully registered for event #${eventId}`, type: 'event' });
        return [...prev, eventId];
      }
    });
  };

  // Generate Digital Cafeteria Token
  const generateCafeteriaToken = () => {
    const newTokenNum = tokenCounter;
    const tokenObj = {
      tokenNumber: newTokenNum,
      queuePosition: Math.floor(Math.random() * 8) + 5,
      estimatedWaitMins: Math.floor(Math.random() * 10) + 5,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveCafeteriaToken(tokenObj);
    setTokenCounter((prev) => prev + 1);

    addNotification({
      title: `Digital Token #${newTokenNum} generated for Main Cafeteria`,
      type: 'cafeteria'
    });

    return tokenObj;
  };

  // Trigger Emergency SOS
  const triggerSOSAlert = (userLocation = 'Academic Block B') => {
    const sosRecord = {
      id: `SOS-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      department: student.department,
      location: userLocation,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      status: 'Active Dispatch'
    };
    setEmergencyAlerts((prev) => [sosRecord, ...prev]);

    addNotification({
      title: `🚨 EMERGENCY SOS BROADCASTED from ${userLocation}`,
      type: 'emergency'
    });

    return sosRecord;
  };

  // Submit Feedback
  const submitFeedback = ({ category, rating, comment }) => {
    const newFb = {
      id: `FB-${Date.now()}`,
      category,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };
    setFeedbacks((prev) => [newFb, ...prev]);
    addNotification({ title: `Thank you! Feedback submitted for ${category}`, type: 'feedback' });
    return newFb;
  };

  // Notifications logic
  const addNotification = ({ title, type }) => {
    const newNotif = {
      id: `n_${Date.now()}`,
      title,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        updateProfile,
        attendance,
        timetable,
        notices,
        events,
        eventRegistrations,
        toggleEventRegistration,
        complaints,
        submitComplaint,
        bookmarks,
        toggleBookmark,
        cafeteriaMenu,
        activeCafeteriaToken,
        generateCafeteriaToken,
        notifications,
        markAllAsRead,
        addNotification,
        emergencyAlerts,
        triggerSOSAlert,
        feedbacks,
        submitFeedback,
        emergencyContacts: MOCK_EMERGENCY_CONTACTS
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
