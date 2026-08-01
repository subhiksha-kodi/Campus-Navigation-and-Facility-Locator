// Faculty Module Data Models & Mock Data Services

export const INITIAL_FACULTY_PROFILE = {
  id: 'fac_101',
  faculty_id: 'FAC-9402',
  name: 'Dr. Gayathri Devi',
  department: 'Department of Computer Science & Engineering',
  designation: 'Associate Professor',
  email: 'gayathri.devi@campus.edu',
  phone: '+1 (555) 234-5678',
  specialization: 'Database Systems & Operating Systems',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
  office_location: 'Mechanical Block, Room MB-204',
  building: 'Mechanical Block',
  floor: 2,
  room: 'MB-204',
  coordinates: { lat: 12.9718, lng: 77.5950 }
};

export const FACULTY_TIMETABLE = [
  {
    id: 'tt_1',
    day: 'Monday',
    subject: 'Database Management Systems',
    subject_code: 'CS301',
    class_name: 'CSE - III Year (Sec A)',
    building: 'Sunflower Block',
    floor: 3,
    room: 'SF303',
    start_time: '09:00 AM',
    end_time: '10:00 AM',
    status: 'Scheduled',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'tt_2',
    day: 'Monday',
    subject: 'Operating Systems',
    subject_code: 'CS304',
    class_name: 'CSE - III Year (Sec B)',
    building: 'Mechanical Block',
    floor: 2,
    room: 'MB204',
    start_time: '10:00 AM',
    end_time: '11:00 AM',
    status: 'Scheduled',
    lat: 12.9720,
    lng: 77.5962
  },
  {
    id: 'tt_3',
    day: 'Monday',
    subject: 'DBMS Advanced Laboratory',
    subject_code: 'CS303L',
    class_name: 'CSE - III Year (Sec A)',
    building: 'AS Block',
    floor: 3,
    room: 'AS303 (AI Lab)',
    start_time: '02:00 PM',
    end_time: '04:00 PM',
    status: 'Scheduled',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'tt_4',
    day: 'Tuesday',
    subject: 'Database Management Systems',
    subject_code: 'CS301',
    class_name: 'CSE - III Year (Sec A)',
    building: 'Sunflower Block',
    floor: 3,
    room: 'SF303',
    start_time: '10:00 AM',
    end_time: '11:00 AM',
    status: 'Scheduled',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'tt_5',
    day: 'Wednesday',
    subject: 'Operating Systems',
    subject_code: 'CS304',
    class_name: 'CSE - III Year (Sec B)',
    building: 'Mechanical Block',
    floor: 2,
    room: 'MB204',
    start_time: '11:00 AM',
    end_time: '12:00 PM',
    status: 'Scheduled',
    lat: 12.9720,
    lng: 77.5962
  },
  {
    id: 'tt_6',
    day: 'Thursday',
    subject: 'Database Management Systems',
    subject_code: 'CS301',
    class_name: 'CSE - III Year (Sec A)',
    building: 'IB Block',
    floor: 3,
    room: 'IB303',
    start_time: '09:00 AM',
    end_time: '10:00 AM',
    status: 'Scheduled',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'tt_7',
    day: 'Friday',
    subject: 'Operating Systems',
    subject_code: 'CS304',
    class_name: 'CSE - III Year (Sec B)',
    building: 'Mechanical Block',
    floor: 2,
    room: 'MB204',
    start_time: '10:00 AM',
    end_time: '11:00 AM',
    status: 'Ongoing',
    lat: 12.9720,
    lng: 77.5962
  },
  {
    id: 'tt_8',
    day: 'Friday',
    subject: 'System Architecture Seminar',
    subject_code: 'CS401',
    class_name: 'CSE - IV Year',
    building: 'AS Block',
    floor: 2,
    room: 'AS-202',
    start_time: '02:00 PM',
    end_time: '03:30 PM',
    status: 'Upcoming',
    lat: 12.9725,
    lng: 77.5955
  }
];

export const INITIAL_SUBSTITUTIONS = [
  {
    id: 'sub_101',
    original_faculty_id: 'FAC-9402',
    original_faculty_name: 'Dr. Gayathri Devi',
    substitute_faculty_id: 'FAC-8120',
    substitute_faculty_name: 'Prof. Kiruthika',
    subject: 'Operating Systems (CS304)',
    class_name: 'CSE - III Year (Sec B)',
    date: '2026-08-04',
    period: '10:00 AM - 11:00 AM',
    room: 'MB204',
    building: 'Mechanical Block',
    reason: 'Official Duty (National AI Conference)',
    status: 'Approved',
    created_at: '2026-07-30'
  },
  {
    id: 'sub_102',
    original_faculty_id: 'FAC-9402',
    original_faculty_name: 'Dr. Gayathri Devi',
    substitute_faculty_id: null,
    substitute_faculty_name: 'Unassigned',
    subject: 'Database Management Systems (CS301)',
    class_name: 'CSE - III Year (Sec A)',
    date: '2026-08-06',
    period: '09:00 AM - 10:00 AM',
    room: 'SF303',
    building: 'Sunflower Block',
    reason: 'Academic Work / Curriculum Review',
    status: 'Pending',
    created_at: '2026-07-31'
  }
];

export const FACULTY_EVENTS = [
  {
    id: 'evt_1',
    title: 'CSE Department Faculty Meeting',
    event_type: 'Department Meeting',
    date: '2026-07-31',
    start_time: '03:00 PM',
    end_time: '04:30 PM',
    venue: 'AS Block Auditorium',
    building: 'AS Block',
    floor: 2,
    room: 'AS-202',
    organizer: 'HOD Computer Science',
    description: 'Quarterly review of syllabus progress, accreditation documents, and lab infrastructure.',
    lat: 12.9720,
    lng: 77.5962
  },
  {
    id: 'evt_2',
    title: 'National AI & Cloud Computing Workshop',
    event_type: 'Workshop',
    date: '2026-08-05',
    start_time: '09:30 AM',
    end_time: '04:00 PM',
    venue: 'IB Block Seminar Hall',
    building: 'IB Block',
    floor: 1,
    room: 'IB-Auditorium',
    organizer: 'Research & Development Cell',
    description: 'Hands-on faculty development workshop on distributed computing and cloud virtualization.',
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'evt_3',
    title: 'Academic Committee Curriculum Review',
    event_type: 'Faculty Meeting',
    date: '2026-08-08',
    start_time: '11:00 AM',
    end_time: '01:00 PM',
    venue: 'Mechanical Block Conference Room',
    building: 'Mechanical Block',
    floor: 3,
    room: 'MB-301',
    organizer: 'Dean of Academic Affairs',
    description: 'Reviewing 2026-2027 curriculum changes and elective offerings.',
    lat: 12.9720,
    lng: 77.5962
  }
];

export const FACULTY_NOTICES = [
  {
    id: 'not_1',
    title: 'URGENT: Mid-Semester Exam Question Paper Submission Deadline',
    category: 'Academic',
    priority: 'High',
    posted_by: 'Office of Controller of Examinations',
    date: '2026-07-30',
    time: '04:00 PM',
    description: 'CRITICAL NOTICE: All faculty members must submit encrypted question paper sets to the exam cell by August 5th without delay.'
  },
  {
    id: 'not_2',
    title: 'Department Research Grant Applications Open',
    category: 'Department',
    priority: 'Normal',
    posted_by: 'Dean R&D',
    date: '2026-07-28',
    time: '11:30 AM',
    description: 'Proposals for internal campus research seed grants up to $10,000 are now open for faculty submission.'
  },
  {
    id: 'not_3',
    title: 'HIGH PRIORITY: Emergency CSE Faculty Meeting at AS Block',
    category: 'Meeting',
    priority: 'High',
    posted_by: 'HOD Computer Science',
    date: '2026-07-31',
    time: '09:00 AM',
    description: 'MANDATORY ATTENDANCE: All CSE faculty members must attend the emergency department meeting at AS Block Hall 2 today.'
  }
];

export const FACULTY_NOTIFICATIONS = [
  {
    id: 'n_1',
    title: 'Substitute Request Approved',
    message: 'Prof. Kiruthika was assigned as substitute for your OS class on Aug 4 in Mechanical Block.',
    type: 'substitute',
    read_status: false,
    created_at: '10 mins ago'
  },
  {
    id: 'n_2',
    title: 'Department Meeting Reminder',
    message: 'CSE Faculty Meeting begins at 3:00 PM today in AS Block Hall 2.',
    type: 'meeting',
    read_status: false,
    created_at: '1 hour ago'
  },
  {
    id: 'n_3',
    title: 'Venue Confirmed for AI Workshop',
    message: 'IB Block Seminar Hall reserved for August 5th Workshop.',
    type: 'event',
    read_status: true,
    created_at: 'Yesterday'
  }
];

export const ALL_FACULTY_MEMBERS = [
  {
    id: 'FAC-9402',
    name: 'Dr. Gayathri Devi',
    designation: 'Associate Professor',
    department: 'Computer Science & Eng',
    specialization: 'Database Systems & OS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    freeSlots: ['11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM'],
    busySlots: ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '02:00 PM - 04:00 PM']
  },
  {
    id: 'FAC-8120',
    name: 'Prof. Kiruthika',
    designation: 'Assistant Professor',
    department: 'Computer Science & Eng',
    specialization: 'Cybersecurity & Networks',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    freeSlots: ['09:00 AM - 10:00 AM', '02:00 PM - 04:00 PM'],
    busySlots: ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM']
  },
  {
    id: 'FAC-7491',
    name: 'Dr. Manjula',
    designation: 'Professor',
    department: 'Computer Science & Eng',
    specialization: 'Artificial Intelligence & ML',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    freeSlots: ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '02:00 PM - 04:00 PM'],
    busySlots: ['11:00 AM - 12:00 PM']
  },
  {
    id: 'FAC-6302',
    name: 'Prof. Kalaiyarasi',
    designation: 'Associate Professor',
    department: 'Information Technology',
    specialization: 'Data Mining & Big Data',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    freeSlots: ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'],
    busySlots: ['02:00 PM - 04:00 PM']
  },
  {
    id: 'FAC-5219',
    name: 'Dr. Revathi',
    designation: 'Assistant Professor',
    department: 'Software Engineering',
    specialization: 'Cloud Computing & DevOps',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    freeSlots: ['09:00 AM - 10:00 AM', '02:00 PM - 04:00 PM'],
    busySlots: ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM']
  }
];

export const INITIAL_ADMIN_NOTIFICATIONS = [
  {
    id: 'an_1',
    title: 'New Faculty Substitution Request',
    message: 'Dr. Gayathri Devi requested substitution for Database Management Systems (CS301) on 2026-08-06 (09:00 AM - 10:00 AM) in Sunflower Block.',
    type: 'substitution_request',
    request_id: 'sub_102',
    read_status: false,
    created_at: '2 hours ago'
  },
  {
    id: 'an_2',
    title: 'Substitution Approved & Arranged',
    message: 'Prof. Kiruthika assigned as substitute for Dr. Gayathri Devi on 2026-08-04 (10:00 AM - 11:00 AM) in Mechanical Block.',
    type: 'substitution_approved',
    request_id: 'sub_101',
    read_status: true,
    created_at: 'Yesterday'
  }
];
