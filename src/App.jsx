import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider, useRole } from './context/RoleContext';
import { ToastProvider } from './context/ToastContext';
import { SubstitutionProvider } from './context/SubstitutionContext';
import { AdminProvider } from './context/AdminContext';
import { StudentProvider } from './context/StudentContext';

// Core Student & Public Pages
import { LandingPage } from './pages/LandingPage';
import { HomeDashboard } from './pages/HomeDashboard';
import { CampusMapPage } from './pages/CampusMapPage';
import { ClassroomFinderPage } from './pages/ClassroomFinderPage';
import { FacilityLocatorPage } from './pages/FacilityLocatorPage';
import { VoiceNavPage } from './pages/VoiceNavPage';
import { IBBlock } from './pages/IBBlock';
import { ASBlock } from './pages/ASBlock';
import { SFBlock } from './pages/SFBlock';
import { StudentSOSPage } from './pages/student/StudentSOSPage';
import {
  LoginPage,
  RegisterPage,
  OTPPage,
  ForgotPasswordPage
} from './pages/AuthenticationPages';
import {
  NoticesPage,
  ComplaintsPage,
  TimetablePage,
  VisitorPortalPage,
  EmergencyPage,
  ProfileSettingsPage
} from './pages/CampusServicesPages';

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
import { NotificationPage } from './pages/student/NotificationPage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

// Faculty Module Dedicated Pages
import { FacultyLoginPage } from './pages/faculty/FacultyLoginPage';
import { FacultyDashboardPage } from './pages/faculty/FacultyDashboardPage';
import { FacultyTimetablePage } from './pages/faculty/FacultyTimetablePage';
import { FacultyCurrentClassPage } from './pages/faculty/FacultyCurrentClassPage';
import { FacultyCampusMapPage } from './pages/faculty/FacultyCampusMapPage';
import { FacultySubstitutionPage } from './pages/faculty/FacultySubstitutionPage';
import { FacultyNoticesPage } from './pages/faculty/FacultyNoticesPage';
import { FacultyEventsPage } from './pages/faculty/FacultyEventsPage';
import { FacultyNotificationsPage } from './pages/faculty/FacultyNotificationsPage';
import { FacultyProfilePage } from './pages/faculty/FacultyProfilePage';
import { FacultyVenueBookingPage } from './pages/faculty/FacultyVenueBookingPage';

// Admin Portal 1-to-1 Dedicated Control Pages
import { AdminOperationsPage } from './pages/admin/AdminOperationsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';
import { AdminDepartmentManagementPage } from './pages/admin/AdminDepartmentManagementPage';
import { AdminFacultyManagementPage } from './pages/admin/AdminFacultyManagementPage';
import { AdminStudentManagementPage } from './pages/admin/AdminStudentManagementPage';
import { AdminBuildingManagementPage } from './pages/admin/AdminBuildingManagementPage';
import { AdminRoomManagementPage } from './pages/admin/AdminRoomManagementPage';
import { AdminSubjectManagementPage } from './pages/admin/AdminSubjectManagementPage';
import { AdminClassSectionPage } from './pages/admin/AdminClassSectionPage';
import { AdminFacultyAllocationPage } from './pages/admin/AdminFacultyAllocationPage';
import { AdminClassroomAllocationPage } from './pages/admin/AdminClassroomAllocationPage';
import { AdminTimetableManagementPage } from './pages/admin/AdminTimetableManagementPage';
import { AdminFacultySubstitutionPage } from './pages/admin/AdminFacultySubstitutionPage';
import { AdminFacilityManagementPage } from './pages/admin/AdminFacilityManagementPage';
import { AdminCampusMapPage } from './pages/admin/AdminCampusMapPage';
import { AdminEventsManagementPage } from './pages/admin/AdminEventsManagementPage';
import { AdminNoticesManagementPage } from './pages/admin/AdminNoticesManagementPage';
import { AdminVisitorManagementPage } from './pages/admin/AdminVisitorManagementPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminComplaintsMonitoringPage } from './pages/admin/AdminComplaintsMonitoringPage';
import { AdminHeatmapPage } from './pages/admin/AdminHeatmapPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSystemSettingsPage } from './pages/admin/AdminSystemSettingsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminRouteGuard } from './components/admin/AdminRouteGuard';
import { FacultyRouteGuard } from './components/faculty/FacultyRouteGuard';

function AppRoutes() {
  const { activeRole } = useRole();

  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Authentication Suite */}
      <Route path="/login" element={activeRole === 'student' ? <Navigate to="/student/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Student / Visitor Core Modules */}
      <Route path="/home" element={activeRole === 'student' ? <StudentDashboard /> : <HomeDashboard />} />
      <Route path="/map" element={<CampusMapPage />} />
      <Route path="/classrooms" element={<ClassroomFinderPage />} />
      <Route path="/facilities" element={<FacilityLocatorPage />} />
      <Route path="/voice-navigation" element={<VoiceNavPage />} />

      {/* General Campus Services */}
      <Route path="/notices" element={activeRole === 'student' ? <StudentNoticesPage /> : <NoticesPage />} />
      <Route path="/complaints" element={activeRole === 'student' ? <ComplaintPage /> : <ComplaintsPage />} />
      <Route path="/timetable" element={activeRole === 'student' ? <StudentTimetablePage /> : <TimetablePage />} />
      <Route path="/visitors" element={<VisitorPortalPage />} />
      <Route path="/emergency" element={activeRole === 'student' ? <StudentSOSPage /> : <EmergencyPage />} />
      <Route path="/profile" element={activeRole === 'admin' ? <AdminRouteGuard><AdminProfilePage /></AdminRouteGuard> : activeRole === 'faculty' ? <FacultyRouteGuard><FacultyProfilePage /></FacultyRouteGuard> : activeRole === 'student' ? <StudentProfile /> : <ProfileSettingsPage />} />
      <Route path="/settings" element={activeRole === 'admin' ? <AdminRouteGuard><AdminSystemSettingsPage /></AdminRouteGuard> : activeRole === 'student' ? <StudentSettingsPage /> : <ProfileSettingsPage />} />

      {/* Dedicated Student Module Routes */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/attendance" element={<StudentAttendancePage />} />
      <Route path="/student/timetable" element={<StudentTimetablePage />} />
      <Route path="/student/complaints" element={<ComplaintPage />} />
      <Route path="/student/complaints-history" element={<ComplaintHistoryPage />} />
      <Route path="/student/feedback" element={<FeedbackPage />} />
      <Route path="/student/notices" element={<StudentNoticesPage />} />
      <Route path="/student/events" element={<StudentEventsPage />} />
      <Route path="/student/cafeteria" element={<StudentCafeteriaPage />} />
      <Route path="/student/notifications" element={<NotificationPage />} />
      <Route path="/student/settings" element={<StudentSettingsPage />} />

      {/* Dedicated Faculty Module Protected Routes */}
      <Route path="/faculty/login" element={<FacultyLoginPage />} />
      <Route path="/faculty/dashboard" element={<FacultyRouteGuard><FacultyDashboardPage /></FacultyRouteGuard>} />
      <Route path="/faculty/timetable" element={<FacultyRouteGuard><FacultyTimetablePage /></FacultyRouteGuard>} />
      <Route path="/faculty/venue-booking" element={<FacultyRouteGuard><FacultyVenueBookingPage /></FacultyRouteGuard>} />
      <Route path="/faculty/current-class" element={<FacultyRouteGuard><FacultyCurrentClassPage /></FacultyRouteGuard>} />
      <Route path="/faculty/map" element={<FacultyRouteGuard><FacultyCampusMapPage /></FacultyRouteGuard>} />
      <Route path="/faculty/substitution" element={<FacultyRouteGuard><FacultySubstitutionPage /></FacultyRouteGuard>} />
      <Route path="/faculty/notices" element={<FacultyRouteGuard><FacultyNoticesPage /></FacultyRouteGuard>} />
      <Route path="/faculty/events" element={<FacultyRouteGuard><FacultyEventsPage /></FacultyRouteGuard>} />
      <Route path="/faculty/notifications" element={<FacultyRouteGuard><FacultyNotificationsPage /></FacultyRouteGuard>} />
      <Route path="/faculty/profile" element={<FacultyRouteGuard><FacultyProfilePage /></FacultyRouteGuard>} />

      {/* 1-to-1 Admin Portal Dedicated Pages */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminRouteGuard><AdminDashboardPage /></AdminRouteGuard>} />
      <Route path="/admin/dashboard" element={<AdminRouteGuard><AdminDashboardPage /></AdminRouteGuard>} />
      <Route path="/admin/users" element={<AdminRouteGuard><AdminUserManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/departments" element={<AdminRouteGuard><AdminDepartmentManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/faculty" element={<AdminRouteGuard><AdminFacultyManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/students" element={<AdminRouteGuard><AdminStudentManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/buildings" element={<AdminRouteGuard><AdminBuildingManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/rooms" element={<AdminRouteGuard><AdminRoomManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/subjects" element={<AdminRouteGuard><AdminSubjectManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/classes" element={<AdminRouteGuard><AdminClassSectionPage /></AdminRouteGuard>} />
      <Route path="/admin/faculty-allocation" element={<AdminRouteGuard><AdminFacultyAllocationPage /></AdminRouteGuard>} />
      <Route path="/admin/class-allocation" element={<AdminRouteGuard><AdminClassroomAllocationPage /></AdminRouteGuard>} />
      <Route path="/admin/timetable" element={<AdminRouteGuard><AdminTimetableManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/substitution" element={<AdminRouteGuard><AdminFacultySubstitutionPage /></AdminRouteGuard>} />
      <Route path="/admin/facilities" element={<AdminRouteGuard><AdminFacilityManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/map" element={<AdminRouteGuard><AdminCampusMapPage /></AdminRouteGuard>} />
      <Route path="/admin/routes" element={<AdminRouteGuard><AdminCampusMapPage /></AdminRouteGuard>} />
      <Route path="/admin/events" element={<AdminRouteGuard><AdminEventsManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/notices" element={<AdminRouteGuard><AdminNoticesManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/visitors" element={<AdminRouteGuard><AdminVisitorManagementPage /></AdminRouteGuard>} />
      <Route path="/admin/notifications" element={<AdminRouteGuard><AdminNotificationsPage /></AdminRouteGuard>} />
      <Route path="/admin/complaints" element={<AdminRouteGuard><AdminComplaintsMonitoringPage /></AdminRouteGuard>} />
      <Route path="/admin/issues" element={<AdminRouteGuard><AdminComplaintsMonitoringPage /></AdminRouteGuard>} />
      <Route path="/admin/heatmap" element={<AdminRouteGuard><AdminHeatmapPage /></AdminRouteGuard>} />
      <Route path="/admin/analytics" element={<AdminRouteGuard><AdminAnalyticsPage /></AdminRouteGuard>} />
      <Route path="/admin/feedback" element={<AdminRouteGuard><AdminFeedbackPage /></AdminRouteGuard>} />
      <Route path="/admin/reports" element={<AdminRouteGuard><AdminReportsPage /></AdminRouteGuard>} />
      <Route path="/admin/audit-logs" element={<AdminRouteGuard><AdminAuditLogsPage /></AdminRouteGuard>} />
      <Route path="/admin/settings" element={<AdminRouteGuard><AdminSystemSettingsPage /></AdminRouteGuard>} />
      <Route path="/admin/profile" element={<AdminRouteGuard><AdminProfilePage /></AdminRouteGuard>} />
      <Route path="/admin/operations" element={<AdminRouteGuard><AdminOperationsPage /></AdminRouteGuard>} />

      {/* 3D Interactive Building Block Viewers & Emergency SOS */}
      <Route path="/as" element={<ASBlock />} />
      <Route path="/as-block" element={<ASBlock />} />
      <Route path="/ib" element={<IBBlock />} />
      <Route path="/ib-block" element={<IBBlock />} />
      <Route path="/sf" element={<SFBlock />} />
      <Route path="/sf-block" element={<SFBlock />} />
      <Route path="/student/emergency" element={<StudentSOSPage />} />

      {/* Catch-all Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <RoleProvider>
      <ToastProvider>
        <SubstitutionProvider>
          <AdminProvider>
            <StudentProvider>
              <Router>
                <AppRoutes />
              </Router>
            </StudentProvider>
          </AdminProvider>
        </SubstitutionProvider>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
