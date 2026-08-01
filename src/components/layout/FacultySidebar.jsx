import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Calendar,
  Clock,
  Map,
  Navigation,
  UserCheck,
  Bell,
  CalendarDays,
  User,
  LogOut,
  X,
  FileText
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { INITIAL_FACULTY_PROFILE } from '../../services/facultyData';

export const FacultySidebar = ({ isOpen, onClose }) => {
  const { switchRole, logout } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { name: 'My Timetable', path: '/faculty/timetable', icon: Calendar },
    { name: 'Current Class', path: '/faculty/current-class', icon: Clock },
    { name: 'Campus Map', path: '/faculty/map', icon: Map },
    { name: 'Substitution', path: '/faculty/substitution', icon: UserCheck },
    { name: 'Notices', path: '/faculty/notices', icon: FileText },
    { name: 'Events & Meetings', path: '/faculty/events', icon: CalendarDays },
    { name: 'Notifications', path: '/faculty/notifications', icon: Bell, badge: '2' },
    { name: 'Profile', path: '/faculty/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Faculty Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <NavLink to="/faculty/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-500 transition-colors">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-tight">WayFindYou</span>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Faculty Portal</span>
            </div>
          </NavLink>

          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Summary Pill */}
        <div className="p-3.5 mx-3 mt-3 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-3">
          <img
            src={INITIAL_FACULTY_PROFILE.avatar}
            alt={INITIAL_FACULTY_PROFILE.name}
            className="w-9 h-9 rounded-full object-cover border border-blue-400 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white truncate">{INITIAL_FACULTY_PROFILE.name}</h5>
            <p className="text-[10px] text-slate-400 truncate">{INITIAL_FACULTY_PROFILE.designation}</p>
            <p className="text-[9px] text-blue-400 font-mono truncate">{INITIAL_FACULTY_PROFILE.office_location}</p>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Faculty Workspace
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (isOpen) onClose(); }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-500 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-4 border-t border-slate-800 mt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 text-center flex items-center justify-between">
          <span>Faculty Portal</span>
          <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sync Active
          </span>
        </div>
      </aside>
    </>
  );
};
