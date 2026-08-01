import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { ToastProvider } from './context/ToastContext';
import { StudentProvider } from './context/StudentContext';

// Core Navigation Pages
import { LandingPage } from './pages/LandingPage';
import { CampusMapPage } from './pages/CampusMapPage';
import { ClassroomFinderPage } from './pages/ClassroomFinderPage';
import { FacilityLocatorPage } from './pages/FacilityLocatorPage';
import { VoiceNavPage } from './pages/VoiceNavPage';
import { IBBlock } from './pages/IBBlock';
import { ASBlock } from './pages/ASBlock';
import { SFBlock } from './pages/SFBlock';
import { Home } from './pages/Home';

// Student Module Pages
import { StudentLogin } from './pages/student/StudentLogin';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { StudentTimetablePage } from './pages/student/StudentTimetablePage';
import { ComplaintPage } from './pages/student/ComplaintPage';
import { ComplaintHistoryPage } from './pages/student/ComplaintHistoryPage';
import { FeedbackPage } from './pages/student/FeedbackPage';
import { StudentNoticesPage } from './pages/student/StudentNoticesPage';
import { StudentEventsPage } from './pages/student/StudentEventsPage';
import { StudentCafeteriaPage } from './pages/student/StudentCafeteriaPage';
import { StudentSOSPage } from './pages/student/StudentSOSPage';
import { NotificationPage } from './pages/student/NotificationPage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

export function App() {
  return (
    <RoleProvider>
      <ToastProvider>
        <StudentProvider>
          <Router>
            <Routes>
              {/* Public Landing */}
              <Route path="/" element={<LandingPage />} />

              {/* Student Authentication */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/login" element={<StudentLogin />} />

              {/* Student Module Dashboard & Features */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/home" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/student/attendance" element={<StudentAttendancePage />} />
              <Route path="/student/timetable" element={<StudentTimetablePage />} />
              <Route path="/timetable" element={<StudentTimetablePage />} />

              {/* Student Complaints & Feedback */}
              <Route path="/student/complaints" element={<ComplaintPage />} />
              <Route path="/complaints" element={<ComplaintPage />} />
              <Route path="/student/complaints-history" element={<ComplaintHistoryPage />} />
              <Route path="/student/feedback" element={<FeedbackPage />} />

              {/* Student Campus Services */}
              <Route path="/student/notices" element={<StudentNoticesPage />} />
              <Route path="/notices" element={<StudentNoticesPage />} />
              <Route path="/student/events" element={<StudentEventsPage />} />
              <Route path="/student/cafeteria" element={<StudentCafeteriaPage />} />

              {/* Emergency & SOS */}
              <Route path="/student/emergency" element={<StudentSOSPage />} />
              <Route path="/emergency" element={<StudentSOSPage />} />

              {/* Notifications & Settings */}
              <Route path="/student/notifications" element={<NotificationPage />} />
              <Route path="/student/settings" element={<StudentSettingsPage />} />
              <Route path="/settings" element={<StudentSettingsPage />} />

              {/* Campus Core Navigation */}
              <Route path="/map" element={<CampusMapPage />} />
              <Route path="/classrooms" element={<ClassroomFinderPage />} />
              <Route path="/facilities" element={<FacilityLocatorPage />} />
              <Route path="/voice-navigation" element={<VoiceNavPage />} />
              <Route path="/ib" element={<IBBlock />} />
              <Route path="/ib-block" element={<IBBlock />} />
              <Route path="/as" element={<ASBlock />} />
              <Route path="/as-block" element={<ASBlock />} />
              <Route path="/sf" element={<SFBlock />} />
              <Route path="/sf-block" element={<SFBlock />} />
              <Route path="/home" element={<Home />} />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
            </Routes>
          </Router>
        </StudentProvider>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
