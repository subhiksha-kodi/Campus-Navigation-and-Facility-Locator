// Admin Portal Central Data Services & Mock Database APIs

export const INITIAL_ADMIN_USERS = [
  { id: 'usr_adm_1', name: 'Dean', email: 'dean@campus.edu', phone: '+91 98400 11223', role: 'admin', department: 'Office of the Dean', status: 'Active', created_at: '2025-01-10' },
  { id: 'usr_fac_1', name: 'Dr. Hariharan', email: 'hariharan@campus.edu', phone: '+91 98450 23456', role: 'faculty', department: 'Computer Science & Eng', status: 'Active', created_at: '2025-02-15' },
  { id: 'usr_fac_2', name: 'Dr. Rishitha', email: 'rishitha@campus.edu', phone: '+91 98450 34567', role: 'faculty', department: 'Computer Science & Eng', status: 'Active', created_at: '2025-03-01' },
  { id: 'usr_fac_3', name: 'Prof. Akalya', email: 'akalya@campus.edu', phone: '+91 98450 45678', role: 'faculty', department: 'Computer Science & Eng', status: 'Active', created_at: '2025-03-12' },
  { id: 'usr_fac_4', name: 'Dr. Jeswin', email: 'jeswin@campus.edu', phone: '+91 98450 56789', role: 'faculty', department: 'Information Technology', status: 'Active', created_at: '2025-03-20' },
  { id: 'usr_fac_5', name: 'Prof. Sai Prasath', email: 'saiprasath@campus.edu', phone: '+91 98450 67890', role: 'faculty', department: 'Software Engineering', status: 'Active', created_at: '2025-04-05' },
  { id: 'usr_std_1', name: 'Hariharan S', email: 'hariharan.std@campus.edu', phone: '+91 99001 88901', role: 'student', department: 'Computer Science & Eng', status: 'Active', created_at: '2025-08-01' },
  { id: 'usr_std_2', name: 'Rishitha M', email: 'rishitha.std@campus.edu', phone: '+91 99001 99012', role: 'student', department: 'Information Technology', status: 'Active', created_at: '2025-08-01' },
  { id: 'usr_vis_1', name: 'Sanjana P (Parent)', email: 'sanjana.parent@gmail.com', phone: '+91 99001 01928', role: 'visitor', department: 'Guest / Parent', status: 'Active', created_at: '2026-07-31' }
];

export const INITIAL_DEPARTMENTS = [
  { id: 'DEPT-CSE', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Prof. Akalya', building: 'Sunflower Block', status: 'Active' },
  { id: 'DEPT-ECE', name: 'Electronics & Communication Eng', code: 'ECE', hod: 'Dr. Rohit', building: 'AS Block', status: 'Active' },
  { id: 'DEPT-EEE', name: 'Electrical & Electronics Eng', code: 'EEE', hod: 'Dr. Arjun', building: 'AS Block', status: 'Active' },
  { id: 'DEPT-MECH', name: 'Mechanical Engineering', code: 'MECH', hod: 'Prof. Kishore', building: 'Mechanical Block', status: 'Active' },
  { id: 'DEPT-CIVIL', name: 'Civil Engineering', code: 'CIVIL', hod: 'Dean', building: 'IB Block', status: 'Active' },
  { id: 'DEPT-AIDS', name: 'Artificial Intelligence & Data Science', code: 'AI & DS', hod: 'Dr. Sanjana', building: 'Research Park', status: 'Active' }
];

export const INITIAL_STUDENTS = [
  { id: 'CS-2024-089', name: 'Hariharan S', department: 'CSE', year: 'III', section: 'A', email: 'hariharan.std@campus.edu', phone: '+91 99001 88901', status: 'Active' },
  { id: 'IT-2024-042', name: 'Rishitha M', department: 'IT', year: 'III', section: 'B', email: 'rishitha.std@campus.edu', phone: '+91 99001 99012', status: 'Active' },
  { id: 'CS-2024-104', name: 'Akalya K', department: 'CSE', year: 'III', section: 'A', email: 'akalya.std@campus.edu', phone: '+91 99001 11223', status: 'Active' },
  { id: 'EC-2024-019', name: 'Jeswin R', department: 'ECE', year: 'II', section: 'A', email: 'jeswin.std@campus.edu', phone: '+91 99001 22334', status: 'Active' },
  { id: 'ME-2024-055', name: 'Rohit V', department: 'MECH', year: 'IV', section: 'A', email: 'rohit.std@campus.edu', phone: '+91 99001 33445', status: 'Active' },
  { id: 'AD-2024-108', name: 'Sanjana P', department: 'AI & DS', year: 'II', section: 'B', email: 'sanjana.std@campus.edu', phone: '+91 99001 44556', status: 'Active' },
  { id: 'CS-2024-112', name: 'Akilesh N', department: 'CSE', year: 'III', section: 'B', email: 'akilesh.std@campus.edu', phone: '+91 99001 55667', status: 'Active' },
  { id: 'EC-2024-045', name: 'Sai Prasath', department: 'ECE', year: 'III', section: 'A', email: 'saiprasath.std@campus.edu', phone: '+91 99001 66778', status: 'Active' }
];

export const INITIAL_BUILDINGS = [
  { id: 'BLD-AS', name: 'AS Block', code: 'AS', description: 'Administrative Offices, Seminar Halls & Electronics Labs', floors: 4, contact: 'Dean Office (Ext 100)', openTime: '07:00 AM', closeTime: '10:00 PM', lat: 12.9725, lng: 77.5955, status: 'Active' },
  { id: 'BLD-IB', name: 'IB Block', code: 'IB', description: 'International Block, Digital Archives & Main Auditorium', floors: 4, contact: 'International Cell (Ext 150)', openTime: '08:00 AM', closeTime: '09:30 PM', lat: 12.9718, lng: 77.5950, status: 'Active' },
  { id: 'BLD-SF', name: 'Sunflower Block', code: 'SF', description: 'Computing, Data Science Labs & Smart Classrooms', floors: 4, contact: 'CSE Department (Ext 204)', openTime: '07:30 AM', closeTime: '09:00 PM', lat: 12.9716, lng: 77.5946, status: 'Active' },
  { id: 'BLD-MB', name: 'Mechanical Block', code: 'MB', description: 'Robotics, Thermal Engineering & Advanced CAD Labs', floors: 3, contact: 'MECH Department (Ext 301)', openTime: '08:00 AM', closeTime: '08:00 PM', lat: 12.9720, lng: 77.5962, status: 'Active' },
  { id: 'BLD-RP', name: 'Research Park', code: 'RP', description: 'Advanced AI Research Center, Incubation & Innovation Hub', floors: 5, contact: 'Research Cell (Ext 500)', openTime: '07:00 AM', closeTime: '11:00 PM', lat: 12.9730, lng: 77.5970, status: 'Active' }
];

export const INITIAL_ROOMS = [
  { id: 'RM-SF303', number: 'SF303', building: 'Sunflower Block', floor: 3, type: 'Laboratory', capacity: 60, status: 'Active', lat: 12.9716, lng: 77.5946 },
  { id: 'RM-MB204', number: 'MB204', building: 'Mechanical Block', floor: 2, type: 'Classroom', capacity: 45, status: 'Active', lat: 12.9720, lng: 77.5962 },
  { id: 'RM-AS202', number: 'AS-202', building: 'AS Block', floor: 2, type: 'Seminar Hall', capacity: 120, status: 'Active', lat: 12.9725, lng: 77.5955 },
  { id: 'RM-IBAUD', number: 'Auditorium-1', building: 'IB Block', floor: 1, type: 'Auditorium', capacity: 350, status: 'Active', lat: 12.9718, lng: 77.5950 },
  { id: 'RM-SF101', number: 'SF101', building: 'Sunflower Block', floor: 1, type: 'Classroom', capacity: 50, status: 'Active', lat: 12.9716, lng: 77.5946 },
  { id: 'RM-MB301', number: 'MB301', building: 'Mechanical Block', floor: 3, type: 'Meeting Room', capacity: 25, status: 'Active', lat: 12.9720, lng: 77.5962 }
];

export const INITIAL_SUBJECTS = [
  { code: 'CS301', name: 'Database Management Systems', department: 'CSE', semester: 'V', credits: 4, type: 'Core Theory' },
  { code: 'CS304', name: 'Operating Systems', department: 'CSE', semester: 'V', credits: 4, type: 'Core Theory' },
  { code: 'CS303L', name: 'DBMS Advanced Laboratory', department: 'CSE', semester: 'V', credits: 2, type: 'Practical Lab' },
  { code: 'CS401', name: 'System Architecture Seminar', department: 'CSE', semester: 'VII', credits: 2, type: 'Seminar' },
  { code: 'IT302', name: 'Computer Networks', department: 'IT', semester: 'V', credits: 4, type: 'Core Theory' },
  { code: 'AI305', name: 'Machine Learning Algorithms', department: 'AI & DS', semester: 'V', credits: 4, type: 'Core Theory' }
];

export const INITIAL_CLASSES = [
  { id: 'CLS-CSE-3A', department: 'CSE', year: 'III', section: 'A', semester: 'V', academicYear: '2026-2027', strength: 60 },
  { id: 'CLS-CSE-3B', department: 'CSE', year: 'III', section: 'B', semester: 'V', academicYear: '2026-2027', strength: 58 },
  { id: 'CLS-CSE-4A', department: 'CSE', year: 'IV', section: 'A', semester: 'VII', academicYear: '2026-2027', strength: 55 },
  { id: 'CLS-IT-3B', department: 'IT', year: 'III', section: 'B', semester: 'V', academicYear: '2026-2027', strength: 62 }
];

export const INITIAL_FACULTY_ALLOCATIONS = [
  { id: 'ALLOC-101', classId: 'CLS-CSE-3A', className: 'CSE III-A', subjectCode: 'CS301', subjectName: 'DBMS', facultyId: 'FAC-9402', facultyName: 'Dr. Hariharan' },
  { id: 'ALLOC-102', classId: 'CLS-CSE-3B', className: 'CSE III-B', subjectCode: 'CS304', subjectName: 'Operating Systems', facultyId: 'FAC-8120', facultyName: 'Dr. Rishitha' },
  { id: 'ALLOC-103', classId: 'CLS-CSE-4A', className: 'CSE IV-A', subjectCode: 'CS401', subjectName: 'System Architecture', facultyId: 'FAC-7491', facultyName: 'Prof. Akalya' }
];

export const INITIAL_CLASSROOM_ALLOCATIONS = [
  { id: 'CALLOC-1', className: 'CSE III-A', subject: 'DBMS (CS301)', faculty: 'Dr. Hariharan', day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', building: 'Sunflower Block', floor: 3, room: 'SF303' },
  { id: 'CALLOC-2', className: 'CSE III-B', subject: 'Operating Systems (CS304)', faculty: 'Dr. Rishitha', day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM', building: 'Mechanical Block', floor: 2, room: 'MB204' },
  { id: 'CALLOC-3', className: 'CSE III-A', subject: 'DBMS Lab (CS303L)', faculty: 'Dr. Hariharan', day: 'Monday', startTime: '02:00 PM', endTime: '04:00 PM', building: 'AS Block', floor: 3, room: 'AS303 (AI Lab)' }
];

export const INITIAL_EVENTS = [
  { id: 1, title: 'Annual Campus Science & Tech Symposium', date: '2026-08-15', time: '09:30 AM', venue: 'IB Block Auditorium', audience: 'Everyone' },
  { id: 2, title: 'Faculty Curriculum Development Workshop', date: '2026-08-10', time: '02:00 PM', venue: 'AS Block Seminar Hall 2', audience: 'Faculty' },
  { id: 3, title: 'Student Placement Orientation Drive', date: '2026-08-05', time: '11:00 AM', venue: 'Sunflower Block SF303', audience: 'Students' }
];

export const INITIAL_NOTICES = [
  { id: 1, title: 'Urgent Maintenance Shutdown: Mechanical Block Elevator B', priority: 'Urgent', target: 'Everyone', date: '2026-07-31' },
  { id: 2, title: 'Faculty Research Grant Applications Extended to Aug 15', priority: 'Important', target: 'Faculty', date: '2026-07-30' },
  { id: 3, title: 'Library Extended Hours for End-Semester Examinations', priority: 'Normal', target: 'Students', date: '2026-07-28' }
];

export const INITIAL_BROADCASTS = [
  { id: 1, role: 'Everyone', title: 'Campus Security Alert: Drive Carefully Near North Gate', message: 'Roadwork underway near North Gate entrance.', timestamp: '2026-07-31 08:30 AM' }
];

export const INITIAL_FACILITIES = [
  { id: 'FACIL-101', name: 'Sunflower Central Printer Station', category: 'Printer', building: 'Sunflower Block', floor: 2, room: 'SF-201', hours: '08:00 AM - 08:00 PM', availability: 'Available', lat: 12.9716, lng: 77.5946 },
  { id: 'FACIL-102', name: 'Campus High-Speed Wi-Fi Router Hub 3', category: 'Wi-Fi', building: 'AS Block', floor: 3, room: 'AS-305', hours: '24 Hours', availability: 'Available', lat: 12.9725, lng: 77.5955 },
  { id: 'FACIL-103', name: 'Cold Drinking Water Dispenser', category: 'Drinking Water', building: 'Mechanical Block', floor: 1, room: 'MB-102', hours: '24 Hours', availability: 'Available', lat: 12.9720, lng: 77.5962 },
  { id: 'FACIL-104', name: 'National Bank Campus ATM', category: 'ATM', building: 'AS Block', floor: 1, room: 'Main Foyer', hours: '24 Hours', availability: 'Available', lat: 12.9725, lng: 77.5955 },
  { id: 'FACIL-105', name: 'North Wing Passenger Lift 2', category: 'Lift', building: 'Sunflower Block', floor: 1, room: 'Elevator Shaft B', hours: '07:00 AM - 10:00 PM', availability: 'Available', lat: 12.9716, lng: 77.5946 },
  { id: 'FACIL-106', name: 'Main Campus Cafeteria', category: 'Cafeteria', building: 'IB Block', floor: 1, room: 'Ground Dining', hours: '07:30 AM - 09:00 PM', availability: 'Available', lat: 12.9718, lng: 77.5950 }
];

export const INITIAL_CAMPUS_ROUTES = [
  { id: 'RTE-101', startLocation: 'Main Gate Entrance', destination: 'Sunflower Block', distance: '180m', estTime: '2 min', pathType: 'Pedestrian Walkway', accessible: true, stairs: false, lift: true, status: 'Active' },
  { id: 'RTE-102', startLocation: 'Sunflower Block', destination: 'Mechanical Block', distance: '240m', estTime: '3 min', pathType: 'Covered Corridor', accessible: true, stairs: false, lift: true, status: 'Active' },
  { id: 'RTE-103', startLocation: 'AS Block Foyer', destination: 'IB Block Auditorium', distance: '310m', estTime: '4 min', pathType: 'Central Avenue', accessible: false, stairs: true, lift: false, status: 'BLOCKED', blockReason: 'Pavement resurfacing work in progress. Alternative path available via East Quad Corridor.' }
];

export const INITIAL_VISITOR_REQUESTS = [
  { id: 'VIS-88392', visitorName: 'Sarah Jenkins', contact: '+1 (555) 019-2831', host: 'Dr. Gayathri Devi', department: 'CSE', purpose: 'Guest Lecture / Curriculum Consultation', visitDate: '2026-07-31', entryStatus: 'Checked In', exitStatus: 'Pending', approvalStatus: 'Approved' },
  { id: 'VIS-91042', visitorName: 'Michael Chang', contact: '+1 (555) 443-1199', host: 'HOD Mechanical', department: 'MECH', purpose: 'Lab Equipment Vendor Inspection', visitDate: '2026-08-01', entryStatus: 'Not Arrived', exitStatus: 'Pending', approvalStatus: 'Pending' },
  { id: 'VIS-77103', visitorName: 'Dr. Aris Thorne', contact: '+1 (555) 778-9900', host: 'Dean R&D', department: 'R&D Cell', purpose: 'Research Grant Review Committee', visitDate: '2026-08-02', entryStatus: 'Not Arrived', exitStatus: 'Pending', approvalStatus: 'Approved' }
];

export const INITIAL_COMPLAINTS_MONITORING = [
  { id: 'CMP-409', title: 'Projector Lamp Dim in SF303', category: 'Classroom Issue', department: 'IT Support', building: 'Sunflower Block', room: 'SF303', reportedBy: 'Dr. Gayathri Devi', reportedDate: '2026-07-30', status: 'Working', assignedTo: 'Technician Rajesh', priority: 'Important' },
  { id: 'CMP-412', title: 'Water Leakage in MB 2nd Floor Restroom', category: 'Water', department: 'Plumbing & Sanitation', building: 'Mechanical Block', room: 'MB204 Restroom', reportedBy: 'Prof. Kiruthika', reportedDate: '2026-07-31', status: 'Assigned', assignedTo: 'Plumbing Ops', priority: 'Urgent' },
  { id: 'CMP-398', title: 'Wi-Fi Deadzone near AS Block Elevator 2', category: 'Internet', department: 'Network Ops', building: 'AS Block', room: 'Floor 3 Corridor', reportedBy: 'Dr. Manjula', reportedDate: '2026-07-28', status: 'Completed', assignedTo: 'Network Engineer', priority: 'Normal' }
];

export const INITIAL_HEATMAP_DATA = [
  { building: 'Sunflower Block', occupancyPercent: 85, activeClassrooms: 18, crowdLevel: 'High', peakTime: '10:00 AM - 12:00 PM' },
  { building: 'Mechanical Block', occupancyPercent: 68, activeClassrooms: 12, crowdLevel: 'Moderate', peakTime: '11:00 AM - 01:00 PM' },
  { building: 'AS Block', occupancyPercent: 92, activeClassrooms: 24, crowdLevel: 'Very High', peakTime: '09:00 AM - 02:00 PM' },
  { building: 'IB Block', occupancyPercent: 78, activeClassrooms: 14, crowdLevel: 'High', peakTime: '02:00 PM - 04:00 PM' }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-9001', action: 'User Activated', user: 'Eleanor Vance (Admin)', timestamp: '2026-07-31 09:15 AM', module: 'User Management', prevValue: 'Status: Deactivated', newValue: 'Status: Active' },
  { id: 'LOG-9002', action: 'Faculty Allocated', user: 'Eleanor Vance (Admin)', timestamp: '2026-07-31 10:30 AM', module: 'Faculty Allocation', prevValue: 'Unassigned', newValue: 'Assigned Prof. Kiruthika to CS304' },
  { id: 'LOG-9003', action: 'Route Blocked', user: 'Eleanor Vance (Admin)', timestamp: '2026-07-31 11:45 AM', module: 'Campus Routes', prevValue: 'Status: Active', newValue: 'Status: BLOCKED (Resurfacing)' },
  { id: 'LOG-9004', action: 'Substitution Assigned', user: 'Eleanor Vance (Admin)', timestamp: '2026-07-31 01:20 PM', module: 'Faculty Substitution', prevValue: 'Pending', newValue: 'Assigned Prof. Kiruthika for Dr. Gayathri Devi' }
];

export const INITIAL_SYSTEM_SETTINGS = {
  campusName: 'WayFindYou Campus Control Center',
  academicYear: '2026-2027',
  currentSemester: 'Fall / Odd Semester',
  workingHours: '07:30 AM - 09:00 PM',
  buildingTimings: '07:00 AM - 10:00 PM',
  maintenanceMode: false,
  notificationAlertsEnabled: true,
  auditLoggingEnabled: true
};
