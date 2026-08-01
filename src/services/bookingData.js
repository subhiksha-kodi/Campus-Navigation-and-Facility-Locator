// Faculty Venue & Slot Booking Data Service

export const BOOKING_PURPOSES = [
  'Extra Class',
  'Make-up Class',
  'Guest Lecture',
  'Seminar',
  'Workshop',
  'Meeting',
  'Project Review',
  'Lab Session',
  'Department Event',
  'Other'
];

export const VENUE_TYPES = [
  'Classroom',
  'Laboratory',
  'Seminar Hall',
  'Meeting Room',
  'Auditorium',
  'Conference Hall'
];

export const BOOKING_BUILDINGS = [
  'AS Block',
  'IB Block',
  'Sunflower Block',
  'Mechanical Block',
  'Research Park'
];

export const BOOKING_FLOORS = [
  'Floor 1',
  'Floor 2',
  'Floor 3',
  'Floor 4'
];

export const BOOKING_SUBJECTS = [
  'Database Management Systems (CS301)',
  'Operating Systems (CS304)',
  'Data Structures & Algorithms (CS201)',
  'System Architecture (CS401)',
  'Artificial Intelligence (AI302)',
  'Computer Networks (CS305)'
];

export const BOOKING_CLASSES = [
  'CSE III-A',
  'CSE III-B',
  'CSE IV-A',
  'IT III-B',
  'ECE II-A',
  'AI & DS II-B'
];

export const INITIAL_VENUE_BOOKINGS = [
  {
    id: 'BKG-901',
    facultyId: 'FAC-9402',
    facultyName: 'Dr. Hariharan',
    department: 'Computer Science & Eng',
    subject: 'Database Management Systems (CS301)',
    className: 'CSE III-A',
    venueType: 'Seminar Hall',
    building: 'Sunflower Block',
    floor: 'Floor 3',
    room: 'SF303',
    purpose: 'Guest Lecture',
    description: 'Special guest lecture on Distributed Cloud Databases by industry experts.',
    participants: 55,
    bookingDate: '2026-08-05',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    status: 'Approved',
    createdAt: '2026-08-01 09:30 AM'
  },
  {
    id: 'BKG-902',
    facultyId: 'FAC-9402',
    facultyName: 'Dr. Hariharan',
    department: 'Computer Science & Eng',
    subject: 'Operating Systems (CS304)',
    className: 'CSE III-B',
    venueType: 'Laboratory',
    building: 'AS Block',
    floor: 'Floor 3',
    room: 'AS303 (AI Lab)',
    purpose: 'Lab Session',
    description: 'Hands-on Linux kernel compilation and process scheduling lab review.',
    participants: 40,
    bookingDate: '2026-08-06',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    status: 'Pending',
    createdAt: '2026-08-01 10:15 AM'
  },
  {
    id: 'BKG-903',
    facultyId: 'FAC-8120',
    facultyName: 'Dr. Rishitha',
    department: 'Computer Science & Eng',
    subject: 'Artificial Intelligence (AI302)',
    className: 'AI & DS II-B',
    venueType: 'Auditorium',
    building: 'IB Block',
    floor: 'Floor 1',
    room: 'IB-AUD-101',
    purpose: 'Workshop',
    description: 'Deep Learning model deployment hackathon preparation workshop.',
    participants: 90,
    bookingDate: '2026-08-07',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    status: 'Approved',
    createdAt: '2026-07-31 03:20 PM'
  },
  {
    id: 'BKG-904',
    facultyId: 'FAC-7491',
    facultyName: 'Prof. Akalya',
    department: 'Computer Science & Eng',
    subject: 'Data Structures & Algorithms (CS201)',
    className: 'CSE III-A',
    venueType: 'Classroom',
    building: 'Mechanical Block',
    floor: 'Floor 2',
    room: 'MB204',
    purpose: 'Extra Class',
    description: 'Extra remedial problem solving session for Graph algorithms.',
    participants: 45,
    bookingDate: '2026-08-04',
    startTime: '03:00 PM',
    endTime: '04:30 PM',
    status: 'Rejected',
    createdAt: '2026-07-30 11:00 AM'
  },
  {
    id: 'BKG-905',
    facultyId: 'FAC-9402',
    facultyName: 'Dr. Hariharan',
    department: 'Computer Science & Eng',
    subject: 'System Architecture (CS401)',
    className: 'CSE IV-A',
    venueType: 'Conference Hall',
    building: 'Research Park',
    floor: 'Floor 2',
    room: 'RP-CONF-202',
    purpose: 'Project Review',
    description: 'Final Year Major Project Milestone II review with external examiners.',
    participants: 25,
    bookingDate: '2026-08-08',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    status: 'Approved',
    createdAt: '2026-08-01 08:45 AM'
  }
];
