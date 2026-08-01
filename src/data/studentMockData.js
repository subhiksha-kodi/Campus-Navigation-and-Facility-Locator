export const INITIAL_STUDENT_DATA = {
  id: "23CB001",
  name: "Sharmila",
  department: "CSBS",
  year: "II",
  section: "A",
  email: "sharmila.csbs@campus.edu",
  phone: "+91 98765 43210",
  cgpa: 8.92,
  creditsEarned: 48,
  completedCourses: 12
};

export const MOCK_ATTENDANCE = {
  overallPercentage: 91.5,
  totalClasses: 160,
  attendedClasses: 146,
  subjectWise: [
    { code: "CS301", name: "Data Structures & Algorithms", attended: 32, total: 35, percentage: 91.4, faculty: "Dr. Kumar" },
    { code: "CS302", name: "Database Management Systems", attended: 28, total: 30, percentage: 93.3, faculty: "Prof. Anitha" },
    { code: "CS303", name: "Operating Systems", attended: 26, total: 30, percentage: 86.7, faculty: "Dr. R. Sundar" },
    { code: "CS304", name: "Python Programming Lab", attended: 20, total: 20, percentage: 100.0, faculty: "Prof. Vignesh" },
    { code: "MA301", name: "Discrete Mathematics", attended: 40, total: 45, percentage: 88.9, faculty: "Dr. Meenakshi" }
  ]
};

export const MOCK_TIMETABLE = [
  { time: "09:00 AM - 10:00 AM", subject: "Database Management Systems", code: "CS302", room: "CS302", building: "Academic Block B", faculty: "Prof. Anitha", day: "Today" },
  { time: "10:00 AM - 11:00 AM", subject: "Operating Systems", code: "CS303", room: "CS304", building: "Academic Block B", faculty: "Dr. R. Sundar", day: "Today" },
  { time: "11:00 AM - 11:15 AM", subject: "Morning Break", code: "BREAK", room: "Student Lounge", building: "Academic Block B", faculty: "-", day: "Today" },
  { time: "11:15 AM - 12:15 PM", subject: "Discrete Mathematics", code: "MA301", room: "CS201", building: "Academic Block A", faculty: "Dr. Meenakshi", day: "Today" },
  { time: "01:15 PM - 03:15 PM", subject: "Python Programming Lab", code: "CS304", room: "Lab 3", building: "IT & Computing Wing", faculty: "Prof. Vignesh", day: "Today" }
];

export const MOCK_NOTICES = [
  {
    id: 1,
    title: "Semester Exam Schedule Released",
    category: "Academic",
    date: "Jul 31, 2026",
    urgent: true,
    summary: "The official end-semester examination timetable for II Year CSBS has been published on the student portal.",
    pdfName: "Semester_Exam_Schedule_2026.pdf"
  },
  {
    id: 2,
    title: "Central Library Extended Hours During Exams",
    category: "Facilities",
    date: "Jul 30, 2026",
    urgent: false,
    summary: "Central Library will remain open until 11:30 PM on weekdays starting next Monday.",
    pdfName: "Library_Notice.pdf"
  },
  {
    id: 3,
    title: "Annual Hackathon 2026 Registration Open",
    category: "Events",
    date: "Jul 28, 2026",
    urgent: false,
    summary: "Registrations are open for all 24-hour inter-college hackathon tracks. Cash prizes up to ₹1,50,000.",
    pdfName: "Hackathon_Guidelines.pdf"
  },
  {
    id: 4,
    title: "Placement Preparation Workshop Series",
    category: "Career",
    date: "Jul 25, 2026",
    urgent: false,
    summary: "Weekly mock interviews and coding rounds organized by the Career Guidance Cell.",
    pdfName: "Placement_Prep.pdf"
  }
];

export const MOCK_EVENTS = [
  {
    id: 101,
    title: "AI & Machine Learning Workshop",
    time: "02:00 PM - 05:00 PM",
    date: "Aug 02, 2026",
    venue: "Main Auditorium",
    building: "Academic Block A",
    category: "Workshop",
    poster: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    description: "Hands-on workshop covering Neural Networks, PyTorch basics, and real-world computer vision pipelines."
  },
  {
    id: 102,
    title: "Campus Web Dev Hackathon",
    time: "09:00 AM - 09:00 PM",
    date: "Aug 08, 2026",
    venue: "Innovation Centre Lab 1",
    building: "Tech Block C",
    category: "Hackathon",
    poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    description: "Build full-stack web applications to solve campus accessibility and sustainability challenges."
  },
  {
    id: 103,
    title: "Cybersecurity & Cloud Security Seminar",
    time: "11:00 AM - 01:00 PM",
    date: "Aug 12, 2026",
    venue: "Seminar Hall 2",
    building: "Academic Block B",
    category: "Seminar",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    description: "Industry experts from AWS and Cisco present cloud security threat modeling and Zero Trust architectures."
  }
];

export const MOCK_CAFETERIA_MENU = [
  { id: 1, name: "Special Masala Dosa", category: "Breakfast", price: "₹50", status: "Available" },
  { id: 2, name: "Idli Sambar (2 pcs)", category: "Breakfast", price: "₹35", status: "Available" },
  { id: 3, name: "South Indian Special Meals", category: "Lunch", price: "₹90", status: "Limited" },
  { id: 4, name: "Veg Fried Rice & Manchurian", category: "Lunch", price: "₹110", status: "Available" },
  { id: 5, name: "Fresh Watermelon Juice", category: "Juices", price: "₹40", status: "Available" },
  { id: 6, name: "Cold Coffee with Ice Cream", category: "Juices", price: "₹60", status: "Out of Stock" }
];

export const MOCK_EMERGENCY_CONTACTS = [
  { title: "Campus Security Office", number: "+91 44 2257 8888", subtitle: "24/7 Gate & Patrol Control", icon: "Shield" },
  { title: "Campus Medical Centre", number: "+91 44 2257 9999", subtitle: "Ambulance & Urgent Care", icon: "HeartPulse" },
  { title: "Anti-Ragging Squad Cell", number: "1800-180-5522", subtitle: "National Toll-Free Helpline", icon: "AlertTriangle" },
  { title: "Women's Safety Helpline", number: "+91 44 2257 7777", subtitle: "Internal Complaints Committee", icon: "Users" }
];

export const INITIAL_COMPLAINTS = [
  {
    id: "CMP-0001",
    type: "Projector Not Working",
    location: "Academic Block B (Room CS302)",
    description: "HDMI port loose and projector flickers during lectures.",
    date: "2026-07-29",
    status: "Working",
    assignedTo: "Tech Maintenance Team A"
  },
  {
    id: "CMP-0002",
    type: "Water Leakage",
    location: "Student Centre 2nd Floor Washroom",
    description: "Water dripping near the sink area causing slippery floor.",
    date: "2026-07-30",
    status: "Pending",
    assignedTo: "Unassigned"
  }
];

export const INITIAL_BOOKMARKS = [
  { id: "b1", name: "Central Library", building: "Academic Block A", type: "Study", icon: "BookOpen" },
  { id: "b2", name: "Computer Science Lab 3", building: "IT Wing", type: "Lab", icon: "Monitor" },
  { id: "b3", name: "Student Cafeteria", building: "Food Court Block", type: "Dining", icon: "Coffee" }
];

export const INITIAL_NOTIFICATIONS = [
  { id: "n1", title: "Complaint CMP-0001 status changed to 'Working'", time: "1 hour ago", read: false, type: "complaint" },
  { id: "n2", title: "New Notice: Semester Exam Schedule Released", time: "3 hours ago", read: false, type: "notice" },
  { id: "n3", title: "Reminder: AI Workshop starts at 2:00 PM in Main Auditorium", time: "5 hours ago", read: true, type: "event" },
  { id: "n4", title: "Cafeteria Token #101 Ready for Pick Up", time: "1 day ago", read: true, type: "cafeteria" }
];
