import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider, useRole } from './context/RoleContext';
import { ToastProvider } from './context/ToastContext';
import { SubstitutionProvider } from './context/SubstitutionContext';
import { AdminProvider } from './context/AdminContext';

// Core Student & Public Pages
import { LandingPage } from './pages/LandingPage';
import { HomeDashboard } from './pages/HomeDashboard';
import { CampusMapPage } from './pages/CampusMapPage';
import { ClassroomFinderPage } from './pages/ClassroomFinderPage';
import { FacilityLocatorPage } from './pages/FacilityLocatorPage';
import { VoiceNavPage } from './pages/VoiceNavPage';
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Student / Visitor Core Modules */}
      <Route path="/home" element={<HomeDashboard />} />
      <Route path="/map" element={<CampusMapPage />} />
      <Route path="/classrooms" element={<ClassroomFinderPage />} />
      <Route path="/facilities" element={<FacilityLocatorPage />} />
      <Route path="/voice-navigation" element={<VoiceNavPage />} />

      {/* General Campus Services */}
      <Route path="/notices" element={<NoticesPage />} />
      <Route path="/complaints" element={<ComplaintsPage />} />
      <Route path="/timetable" element={<TimetablePage />} />
      <Route path="/visitors" element={<VisitorPortalPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/profile" element={activeRole === 'admin' ? <AdminProfilePage /> : activeRole === 'faculty' ? <FacultyProfilePage /> : <ProfileSettingsPage />} />
      <Route path="/settings" element={activeRole === 'admin' ? <AdminSystemSettingsPage /> : <ProfileSettingsPage />} />

      {/* Dedicated Faculty Module Protected Routes */}
      <Route path="/faculty/login" element={<FacultyLoginPage />} />
      <Route path="/faculty/dashboard" element={<FacultyDashboardPage />} />
      <Route path="/faculty/timetable" element={<FacultyTimetablePage />} />
      <Route path="/faculty/venue-booking" element={<FacultyVenueBookingPage />} />
      <Route path="/faculty/current-class" element={<FacultyCurrentClassPage />} />
      <Route path="/faculty/map" element={<FacultyCampusMapPage />} />
      <Route path="/faculty/substitution" element={<FacultySubstitutionPage />} />
      <Route path="/faculty/notices" element={<FacultyNoticesPage />} />
      <Route path="/faculty/events" element={<FacultyEventsPage />} />
      <Route path="/faculty/notifications" element={<FacultyNotificationsPage />} />
      <Route path="/faculty/profile" element={<FacultyProfilePage />} />

      {/* 1-to-1 Admin Portal Dedicated Pages */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUserManagementPage />} />
      <Route path="/admin/departments" element={<AdminDepartmentManagementPage />} />
      <Route path="/admin/faculty" element={<AdminFacultyManagementPage />} />
      <Route path="/admin/students" element={<AdminStudentManagementPage />} />
      <Route path="/admin/buildings" element={<AdminBuildingManagementPage />} />
      <Route path="/admin/rooms" element={<AdminRoomManagementPage />} />
      <Route path="/admin/subjects" element={<AdminSubjectManagementPage />} />
      <Route path="/admin/classes" element={<AdminClassSectionPage />} />
      <Route path="/admin/faculty-allocation" element={<AdminFacultyAllocationPage />} />
      <Route path="/admin/class-allocation" element={<AdminClassroomAllocationPage />} />
      <Route path="/admin/timetable" element={<AdminTimetableManagementPage />} />
      <Route path="/admin/substitution" element={<AdminFacultySubstitutionPage />} />
      <Route path="/admin/facilities" element={<AdminFacilityManagementPage />} />
      <Route path="/admin/map" element={<AdminCampusMapPage />} />
      <Route path="/admin/routes" element={<AdminCampusMapPage />} />
      <Route path="/admin/events" element={<AdminEventsManagementPage />} />
      <Route path="/admin/notices" element={<AdminNoticesManagementPage />} />
      <Route path="/admin/visitors" element={<AdminVisitorManagementPage />} />
      <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
      <Route path="/admin/complaints" element={<AdminComplaintsMonitoringPage />} />
      <Route path="/admin/issues" element={<AdminComplaintsMonitoringPage />} />
      <Route path="/admin/heatmap" element={<AdminHeatmapPage />} />
      <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      <Route path="/admin/reports" element={<AdminReportsPage />} />
      <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
      <Route path="/admin/settings" element={<AdminSystemSettingsPage />} />
      <Route path="/admin/profile" element={<AdminProfilePage />} />
      <Route path="/admin/operations" element={<AdminOperationsPage />} />

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
            <Router>
              <AppRoutes />
            </Router>
          </AdminProvider>
        </SubstitutionProvider>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
