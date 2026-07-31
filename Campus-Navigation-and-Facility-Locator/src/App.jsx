import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { ToastProvider } from './context/ToastContext';

// Pages Imports
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
  AdminDashboardPage,
  ProfileSettingsPage
} from './pages/CampusServicesPages';

export function App() {
  return (
    <RoleProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Authentication Suite */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Campus Core Modules */}
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/map" element={<CampusMapPage />} />
            <Route path="/classrooms" element={<ClassroomFinderPage />} />
            <Route path="/facilities" element={<FacilityLocatorPage />} />
            <Route path="/voice-navigation" element={<VoiceNavPage />} />

            {/* Campus Services & Operations */}
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/visitors" element={<VisitorPortalPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/profile" element={<ProfileSettingsPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />

            {/* Catch-all Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
