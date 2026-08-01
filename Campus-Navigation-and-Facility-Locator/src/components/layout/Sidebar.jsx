import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  Map,
  Search,
  Building2,
  Mic,
  Calendar,
  Bell,
  MessageSquare,
  Users,
  ShieldAlert,
  User,
  Settings,
  X,
  LayoutDashboard,
  Award,
  Coffee,
  ListOrdered,
  Star
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { useStudent } from '../../context/StudentContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeRole } = useRole();
  const { student } = useStudent();
  const location = useLocation();

  const navSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Student Dashboard', path: '/student/dashboard', icon: LayoutDashboard, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] }
      ]
    },
    {
      title: 'Navigate',
      items: [
        { name: 'Campus Map', path: '/map', icon: Map, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Classroom Finder', path: '/classrooms', icon: Search, roles: ['student', 'faculty', 'security', 'admin'] },
        { name: 'Facility Locator', path: '/facilities', icon: Building2, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Voice Navigation', path: '/voice-navigation', icon: Mic, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
      ]
    },
    {
      title: 'Academic & Campus Life',
      items: [
        { name: 'Timetable', path: '/student/timetable', icon: Calendar, roles: ['student', 'faculty'] },
        { name: 'Attendance & CGPA', path: '/student/attendance', icon: Award, roles: ['student'] },
        { name: 'Smart Cafeteria', path: '/student/cafeteria', icon: Coffee, roles: ['student', 'faculty', 'visitor'] },
        { name: 'Notices & Updates', path: '/student/notices', icon: Bell, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Events & Workshops', path: '/student/events', icon: Calendar, roles: ['student', 'faculty', 'visitor'] },
      ]
    },
    {
      title: 'Services & Feedback',
      items: [
        { name: 'Report Complaint', path: '/student/complaints', icon: MessageSquare, roles: ['student', 'faculty', 'security', 'admin'] },
        { name: 'Complaint History', path: '/student/complaints-history', icon: ListOrdered, roles: ['student', 'faculty'] },
        { name: 'Facility Feedback', path: '/student/feedback', icon: Star, roles: ['student', 'faculty', 'visitor'] },
      ]
    },
    {
      title: 'Safety & Emergency',
      items: [
        { name: 'Emergency SOS', path: '/student/emergency', icon: ShieldAlert, badge: '24/7', roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
      ]
    },
    {
      title: 'Account & Settings',
      items: [
        { name: 'My Profile', path: '/student/profile', icon: User, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Notifications Feed', path: '/student/notifications', icon: Bell, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Settings', path: '/student/settings', icon: Settings, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header / Brand Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <NavLink to="/student/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-500 transition-colors">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-tight">
                WayFindYou
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Student Module</span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Profile Pill */}
        <div className="p-3.5 mx-3 mt-3 rounded-xl bg-slate-800/80 border border-slate-750 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-slate-600 shrink-0">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-white truncate">{student.name}</h5>
            <p className="text-[10px] text-slate-400 truncate">Dept: {student.department} • {student.id}</p>
          </div>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
        </div>

        {/* Navigation Links Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, idx) => {
            const filteredItems = section.items.filter((item) =>
              item.roles.includes(activeRole)
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {section.title}
                </div>
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => { if (isOpen) onClose(); }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 text-center flex items-center justify-between">
          <span>WayFindYou Student</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Online
          </span>
        </div>
      </aside>
    </>
  );
};
