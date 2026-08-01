import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_STUDENTS,
  INITIAL_BUILDINGS,
  INITIAL_ROOMS,
  INITIAL_SUBJECTS,
  INITIAL_CLASSES,
  INITIAL_FACULTY_ALLOCATIONS,
  INITIAL_CLASSROOM_ALLOCATIONS,
  INITIAL_EVENTS,
  INITIAL_NOTICES,
  INITIAL_BROADCASTS,
  INITIAL_FACILITIES,
  INITIAL_CAMPUS_ROUTES,
  INITIAL_VISITOR_REQUESTS,
  INITIAL_COMPLAINTS_MONITORING,
  INITIAL_HEATMAP_DATA,
  INITIAL_AUDIT_LOGS,
  INITIAL_SYSTEM_SETTINGS
} from '../services/adminData';
import { ALL_FACULTY_MEMBERS } from '../services/facultyData';
import { INITIAL_VENUE_BOOKINGS } from '../services/bookingData';

const AdminContext = createContext();

const getInitialState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`admin_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    return fallback;
  }
};

const sanitizeStudents = (rawStudents) => {
  const oldNames = ['Alex Vance', 'Samantha Reed', 'David Miller', 'Priya Sharma', 'Rohan Gupta', 'Gajal'];
  const cleaned = (rawStudents || [])
    .filter(s => s && s.name && !oldNames.includes(s.name) && s.name.toLowerCase() !== 'jsdbk')
    .map(s => ({
      ...s,
      name: s.name.replace(/\.$/, '').trim()
    }));
  if (cleaned.length === 0) {
    return INITIAL_STUDENTS;
  }
  return cleaned;
};

const sanitizeFaculty = (rawFaculty) => {
  const cleaned = (rawFaculty || []).filter(f => f && f.name && f.name.toLowerCase() !== 'jsdbk');
  if (cleaned.length === 0) return ALL_FACULTY_MEMBERS;
  return cleaned.map(f => ({
    ...f,
    office_location: (!f.office_location || f.office_location.toLowerCase().includes('jsdbk'))
      ? 'Sunflower Block, Room SF-303'
      : f.office_location
  }));
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('admin_users');
    if (saved) return JSON.parse(saved);
    return INITIAL_ADMIN_USERS.map((user) => ({
      ...user,
      status: user.status === 'Active' ? 'approved' : 'pending',
      approved_by: 'system',
      approved_at: new Date().toISOString(),
      rejection_reason: null,
    }));
  });
  const [departments, setDepartments] = useState(() => getInitialState('departments', INITIAL_DEPARTMENTS));
  const [students, setStudents] = useState(() => sanitizeStudents(getInitialState('students', INITIAL_STUDENTS)));
  const [faculty, setFaculty] = useState(() => sanitizeFaculty(getInitialState('faculty', ALL_FACULTY_MEMBERS)));
  const [buildings, setBuildings] = useState(() => getInitialState('buildings', INITIAL_BUILDINGS));
  const [rooms, setRooms] = useState(() => getInitialState('rooms', INITIAL_ROOMS));
  const [subjects, setSubjects] = useState(() => getInitialState('subjects', INITIAL_SUBJECTS));
  const [classes, setClasses] = useState(() => getInitialState('classes', INITIAL_CLASSES));
  const [facultyAllocations, setFacultyAllocations] = useState(() => getInitialState('facultyAllocations', INITIAL_FACULTY_ALLOCATIONS));
  const [classroomAllocations, setClassroomAllocations] = useState(() => getInitialState('classroomAllocations', INITIAL_CLASSROOM_ALLOCATIONS));
  const [events, setEvents] = useState(() => getInitialState('events', INITIAL_EVENTS));
  const [notices, setNotices] = useState(() => getInitialState('notices', INITIAL_NOTICES));
  const [broadcasts, setBroadcasts] = useState(() => getInitialState('broadcasts', INITIAL_BROADCASTS));
  const [facilities, setFacilities] = useState(() => getInitialState('facilities', INITIAL_FACILITIES));
  const [routes, setRoutes] = useState(() => getInitialState('routes', INITIAL_CAMPUS_ROUTES));
  const [visitors, setVisitors] = useState(() => getInitialState('visitors', INITIAL_VISITOR_REQUESTS));
  const [complaints, setComplaints] = useState(() => getInitialState('complaints', INITIAL_COMPLAINTS_MONITORING));
  const [venueBookings, setVenueBookings] = useState(() => getInitialState('venueBookings', INITIAL_VENUE_BOOKINGS));
  const [heatmap] = useState(INITIAL_HEATMAP_DATA);
  const [auditLogs, setAuditLogs] = useState(() => getInitialState('auditLogs', INITIAL_AUDIT_LOGS));
  const [settings, setSettings] = useState(() => getInitialState('settings', INITIAL_SYSTEM_SETTINGS));

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('admin_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('admin_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('admin_faculty', JSON.stringify(faculty)); }, [faculty]);
  useEffect(() => { localStorage.setItem('admin_buildings', JSON.stringify(buildings)); }, [buildings]);
  useEffect(() => { localStorage.setItem('admin_rooms', JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem('admin_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('admin_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('admin_facultyAllocations', JSON.stringify(facultyAllocations)); }, [facultyAllocations]);
  useEffect(() => { localStorage.setItem('admin_classroomAllocations', JSON.stringify(classroomAllocations)); }, [classroomAllocations]);
  useEffect(() => { localStorage.setItem('admin_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('admin_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('admin_broadcasts', JSON.stringify(broadcasts)); }, [broadcasts]);
  useEffect(() => { localStorage.setItem('admin_facilities', JSON.stringify(facilities)); }, [facilities]);
  useEffect(() => { localStorage.setItem('admin_routes', JSON.stringify(routes)); }, [routes]);
  useEffect(() => { localStorage.setItem('admin_visitors', JSON.stringify(visitors)); }, [visitors]);
  useEffect(() => { localStorage.setItem('admin_complaints', JSON.stringify(complaints)); }, [complaints]);
  useEffect(() => { localStorage.setItem('admin_venueBookings', JSON.stringify(venueBookings)); }, [venueBookings]);
  useEffect(() => { localStorage.setItem('admin_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('admin_settings', JSON.stringify(settings)); }, [settings]);

  // Hook up mock db initialization and storage change listener
  useEffect(() => {
    const initDb = async () => {
      const { initializeMockDatabase } = await import('../services/authService');
      const initialized = await initializeMockDatabase();
      setUsers(initialized);
    };
    initDb();

    const handleStorageChange = () => {
      const latestUsers = localStorage.getItem('admin_users');
      if (latestUsers) {
        setUsers(JSON.parse(latestUsers));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Audit Logging Helper
  const logAuditAction = (action, moduleName, prevVal, newVal) => {
    const newLog = {
      id: `LOG-${Math.floor(Math.random() * 9000 + 1000)}`,
      action,
      user: 'Eleanor Vance (Admin)',
      timestamp: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      module: moduleName,
      prevValue: prevVal || 'N/A',
      newValue: newVal || 'N/A'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // User Management
  const addUser = (userData, creatorAdminId = 'usr_adm_1') => {
    const newUser = {
      id: `usr_${userData.role.substring(0, 3)}_${Math.floor(Math.random() * 900 + 100)}`,
      ...userData,
      status: 'approved',
      approved_by: creatorAdminId,
      approved_at: new Date().toISOString(),
      rejection_reason: null,
      created_at: new Date().toISOString().split('T')[0]
    };
    setUsers((prev) => [newUser, ...prev]);

    if (userData.role === 'faculty') {
      const newFaculty = {
        id: `FAC-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: userData.name,
        email: userData.email,
        department: userData.department,
        designation: userData.designation || 'Assistant Professor',
        office_location: userData.office || 'Sunflower Block SF-201',
        avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&q=80&w=200`,
        busySlots: ['09:00 AM - 10:00 AM'],
        freeSlots: ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '02:00 PM - 03:00 PM']
      };
      setFaculty((prev) => [newFaculty, ...prev]);
    } else if (userData.role === 'student') {
      const newStudent = {
        id: `ST-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: userData.name,
        email: userData.email,
        department: userData.department,
        year: userData.year || 'III',
        section: userData.section || 'A',
        phone: userData.phone || '+91 99001 98765',
        status: 'Active'
      };
      setStudents((prev) => [newStudent, ...prev]);
    }

    logAuditAction('User Created', 'User Management', 'None', `Added ${newUser.name} (${newUser.role})`);
    return newUser;
  };

  const approveUser = (userId, adminId = 'usr_adm_1') => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          logAuditAction('User Approved', 'User Management', `Status: ${u.status}`, 'Status: approved');
          return {
            ...u,
            status: 'approved',
            approved_by: adminId,
            approved_at: new Date().toISOString(),
            rejection_reason: null
          };
        }
        return u;
      })
    );
  };

  const rejectUser = (userId, reason = '') => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          logAuditAction('User Rejected', 'User Management', `Status: ${u.status}`, `Status: rejected (${reason})`);
          return {
            ...u,
            status: 'rejected',
            rejection_reason: reason,
            approved_by: null,
            approved_at: null
          };
        }
        return u;
      })
    );
  };

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' || u.status === 'approved' ? 'Deactivated' : 'Active';
          logAuditAction('User Status Changed', 'User Management', `Status: ${u.status}`, `Status: ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Department Management
  const addDepartment = (deptData) => {
    const newDept = {
      id: `DEPT-${deptData.code.toUpperCase()}`,
      status: 'Active',
      ...deptData
    };
    setDepartments((prev) => [newDept, ...prev]);
    logAuditAction('Department Created', 'Department Management', 'None', `Created ${newDept.name}`);
  };

  // Building & Room Management
  const addBuilding = (bldData) => {
    const newBld = {
      id: `BLD-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'Active',
      ...bldData
    };
    setBuildings((prev) => [newBld, ...prev]);
    logAuditAction('Building Added', 'Building Management', 'None', `Added Building ${newBld.name}`);
  };

  const addRoom = (roomData) => {
    const newRoom = {
      id: `RM-${roomData.number}`,
      status: 'Active',
      ...roomData
    };
    setRooms((prev) => [newRoom, ...prev]);
    logAuditAction('Room Added', 'Room Management', 'None', `Added Room ${newRoom.number} (${newRoom.building})`);
  };

  // Subjects & Classes Management
  const addSubject = (subjData) => {
    const newSubj = {
      code: subjData.code.toUpperCase(),
      name: subjData.name,
      department: subjData.department,
      semester: subjData.semester,
      credits: Number(subjData.credits),
      type: subjData.type
    };
    setSubjects((prev) => [newSubj, ...prev]);
    logAuditAction('Subject Added', 'Subject Management', 'None', `Added Subject ${newSubj.name} (${newSubj.code})`);
  };

  const addClassSection = (classData) => {
    const newClass = {
      id: `CLS-${classData.department}-${classData.year}${classData.section}`,
      department: classData.department,
      year: classData.year,
      section: classData.section,
      semester: classData.semester,
      academicYear: '2026-2027',
      strength: Number(classData.strength)
    };
    setClasses((prev) => [newClass, ...prev]);
    logAuditAction('Class Section Created', 'Class Management', 'None', `Created ${newClass.id}`);
  };

  // Operations: Events, Notices & Broadcast Notifications
  const addEvent = (eventData) => {
    const newEvt = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      venue: eventData.venue,
      audience: eventData.audience
    };
    setEvents((prev) => [newEvt, ...prev]);
    logAuditAction('Event Created', 'Events Management', 'None', `Created Event ${newEvt.title}`);
  };

  const addNotice = (noticeData) => {
    const newNotice = {
      id: Date.now(),
      title: noticeData.title,
      priority: noticeData.priority,
      target: noticeData.target,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices((prev) => [newNotice, ...prev]);
    logAuditAction('Notice Published', 'Notices Management', 'None', `Published ${newNotice.priority} Notice: ${newNotice.title}`);
  };

  const addBroadcastNotification = (broadcastData) => {
    const newBcast = {
      id: Date.now(),
      role: broadcastData.role,
      title: broadcastData.title,
      message: broadcastData.message,
      timestamp: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };
    setBroadcasts((prev) => [newBcast, ...prev]);
    logAuditAction('Notification Broadcasted', 'System Notifications', 'None', `Dispatched alert to ${broadcastData.role}: ${broadcastData.title}`);
  };

  // Faculty & Classroom Allocation
  const addFacultyAllocation = (allocData) => {
    const newAlloc = {
      id: `ALLOC-${Math.floor(Math.random() * 900 + 100)}`,
      classId: `CLS-${allocData.className}`,
      className: allocData.className,
      subjectCode: 'SUBJ',
      subjectName: allocData.subjectName,
      facultyId: 'FAC-001',
      facultyName: allocData.facultyName
    };
    setFacultyAllocations((prev) => [newAlloc, ...prev]);
    logAuditAction('Faculty Allocated', 'Faculty Allocation', 'None', `Assigned ${allocData.facultyName} to ${allocData.subjectName}`);
  };

  const checkAllocationConflicts = (allocData) => {
    const roomConflict = classroomAllocations.find(
      (a) => a.building === allocData.building && a.room === allocData.room && a.day === allocData.day && a.startTime === allocData.startTime
    );

    const facultyConflict = classroomAllocations.find(
      (a) => a.faculty === allocData.faculty && a.day === allocData.day && a.startTime === allocData.startTime
    );

    if (roomConflict) {
      return `WARNING: Room ${allocData.room} in ${allocData.building} is already occupied by ${roomConflict.className} on ${allocData.day} at ${allocData.startTime}!`;
    }

    if (facultyConflict) {
      return `WARNING: Faculty ${allocData.faculty} is already assigned to ${facultyConflict.subject} on ${allocData.day} at ${allocData.startTime}!`;
    }

    return null;
  };

  const addClassroomAllocation = (allocData) => {
    const conflictWarning = checkAllocationConflicts(allocData);
    const newAlloc = {
      id: `CALLOC-${Math.floor(Math.random() * 900 + 100)}`,
      ...allocData
    };
    setClassroomAllocations((prev) => [newAlloc, ...prev]);
    logAuditAction('Classroom Allocated', 'Classroom Allocation', 'Unallocated', `Assigned ${allocData.className} to Room ${allocData.room}`);
    return conflictWarning;
  };

  // Route Management & Path Blocking
  const toggleRouteBlockedStatus = (routeId, blockReason = '') => {
    setRoutes((prev) =>
      prev.map((r) => {
        if (r.id === routeId) {
          const isCurrentlyBlocked = r.status === 'BLOCKED';
          const nextStatus = isCurrentlyBlocked ? 'Active' : 'BLOCKED';
          logAuditAction('Route Block Status Updated', 'Route Management', `Status: ${r.status}`, `Status: ${nextStatus}`);
          return {
            ...r,
            status: nextStatus,
            blockReason: nextStatus === 'BLOCKED' ? blockReason || 'Maintenance in progress. Follow detour.' : ''
          };
        }
        return r;
      })
    );
  };

  // Visitor Request Approval / Rejection
  const updateVisitorStatus = (visitorId, newStatus) => {
    setVisitors((prev) =>
      prev.map((v) => {
        if (v.id === visitorId) {
          logAuditAction('Visitor Status Changed', 'Visitor Management', `Status: ${v.approvalStatus}`, `Status: ${newStatus}`);
          return { ...v, approvalStatus: newStatus };
        }
        return v;
      })
    );
  };

  // Complaint & Issue Status Monitoring
  const updateComplaintStatus = (complaintId, newStatus, assignedTech = '') => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          logAuditAction('Complaint Status Monitored', 'Complaints & Issues', `Status: ${c.status}`, `Status: ${newStatus}`);
          return {
            ...c,
            status: newStatus,
            assignedTo: assignedTech || c.assignedTo
          };
        }
        return c;
      })
    );
  };

  // Facility Management
  const addFacility = (facilData) => {
    const newFacil = {
      id: `FACIL-${Math.floor(Math.random() * 900 + 100)}`,
      availability: 'Available',
      ...facilData
    };
    setFacilities((prev) => [newFacil, ...prev]);
    logAuditAction('Facility Added', 'Facility Management', 'None', `Added ${newFacil.name}`);
  };

  // Metrics Counters
  const metrics = {
    totalStudents: 4250 + (students.length - INITIAL_STUDENTS.length),
    totalFaculty: faculty.length,
    totalDepartments: departments.length,
    totalBuildings: buildings.length,
    totalClassrooms: rooms.length,
    totalFacilities: facilities.length,
    todaysClasses: 146 + (classroomAllocations.length - INITIAL_CLASSROOM_ALLOCATIONS.length),
    pendingVisitors: visitors.filter((v) => v.approvalStatus === 'Pending').length,
    activeComplaints: complaints.filter((c) => c.status !== 'Completed').length,
    campusOccupancy: '72%'
  };

  // Venue & Slot Booking Handlers
  const addVenueBooking = (bookingData) => {
    // Conflict Check: Check if room + date + overlapping time already exists in venueBookings (excluding Cancelled/Rejected)
    const hasConflict = venueBookings.some(b => 
      b.room.toLowerCase() === bookingData.room.toLowerCase() &&
      b.bookingDate === bookingData.bookingDate &&
      b.status !== 'Cancelled' &&
      b.status !== 'Rejected' &&
      (
        (bookingData.startTime >= b.startTime && bookingData.startTime < b.endTime) ||
        (bookingData.endTime > b.startTime && bookingData.endTime <= b.endTime) ||
        (bookingData.startTime <= b.startTime && bookingData.endTime >= b.endTime)
      )
    );

    if (hasConflict) {
      return {
        success: false,
        message: 'This venue is already reserved for the selected time.'
      };
    }

    const newBooking = {
      id: `BKG-${Math.floor(900 + Math.random() * 100)}`,
      ...bookingData,
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setVenueBookings(prev => [newBooking, ...prev]);
    logAuditAction('CREATE_VENUE_BOOKING', 'Venue & Slot Booking', null, newBooking.id);
    return { success: true, booking: newBooking };
  };

  const cancelVenueBooking = (bookingId) => {
    setVenueBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    logAuditAction('CANCEL_VENUE_BOOKING', 'Venue & Slot Booking', bookingId, 'Cancelled');
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setVenueBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    logAuditAction('UPDATE_VENUE_BOOKING_STATUS', 'Venue & Slot Booking', bookingId, newStatus);
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        departments,
        students,
        faculty,
        buildings,
        rooms,
        subjects,
        classes,
        facultyAllocations,
        classroomAllocations,
        events,
        notices,
        broadcasts,
        facilities,
        routes,
        visitors,
        complaints,
        venueBookings,
        heatmap,
        auditLogs,
        settings,
        metrics,
        addUser,
        approveUser,
        rejectUser,
        toggleUserStatus,
        addDepartment,
        addBuilding,
        addRoom,
        addSubject,
        addClassSection,
        addEvent,
        addNotice,
        addBroadcastNotification,
        addFacultyAllocation,
        addClassroomAllocation,
        checkAllocationConflicts,
        toggleRouteBlockedStatus,
        updateVisitorStatus,
        updateComplaintStatus,
        addVenueBooking,
        cancelVenueBooking,
        updateBookingStatus,
        addFacility,
        logAuditAction,
        setSettings
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
