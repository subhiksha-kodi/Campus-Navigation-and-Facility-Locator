import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, UserCheck, ChevronDown, Compass, LogOut, Check } from 'lucide-react';
import { useRole, DEMO_ROLES } from '../../context/RoleContext';
import { useStudent } from '../../context/StudentContext';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { SearchBar } from '../ui/SearchBar';

export const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { activeRole, switchRole, logout } = useRole();
  const { student, notifications, markAllAsRead } = useStudent();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleGlobalSearch = (query) => {
    if (!query) return;
    if (query.toLowerCase().includes('cs') || query.toLowerCase().includes('room') || query.toLowerCase().includes('lab')) {
      navigate(`/classrooms?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/facilities?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      {/* Left: Mobile Menu Toggle & Brand Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Compact Logo for Topbar */}
        <NavLink to="/student/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">WayFindYou</span>
        </NavLink>
      </div>

      {/* Center: Search Bar for Medium/Large Screens */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <SearchBar
          placeholder="Search rooms, facilities, notices, events..."
          onSearch={handleGlobalSearch}
          size="sm"
          suggestions={['Room CS302', 'Central Library', 'Main Cafeteria', 'Medical Centre', 'Lab 3']}
        />
      </div>

      {/* Right: Role Switcher, Notifications, User Avatar */}
      <div className="flex items-center gap-2.5">
        {/* Role Switcher Pill */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-medium text-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Role: <strong className="text-slate-900 capitalize">{activeRole}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          }
        >
          <div className="p-2 border-b border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Switch Portal Role</p>
          </div>
          <div className="py-1">
            {Object.keys(DEMO_ROLES).map((r) => {
              const info = DEMO_ROLES[r];
              const isCurrent = activeRole === r;
              return (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    isCurrent ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{info.roleLabel}</span>
                  {isCurrent && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </Dropdown>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-dropdown z-50 py-2 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Student Alerts</h4>
                <Badge variant="info" size="sm">{unreadCount} Unread</Badge>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <h5 className="text-xs font-semibold text-slate-800">{n.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <NavLink
                  to="/student/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  View All Notifications Feed →
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-slate-200">
                {student.name.charAt(0)}
              </div>
            </button>
          }
        >
          <div className="p-3 border-b border-slate-100">
            <h5 className="text-xs font-semibold text-slate-900">{student.name}</h5>
            <p className="text-[10px] text-slate-500">{student.email}</p>
            <div className="mt-1">
              <Badge variant="info" size="sm">{student.department} • {student.id}</Badge>
            </div>
          </div>
          <div className="py-1">
            <NavLink to="/student/profile" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
              Student Profile
            </NavLink>
            <NavLink to="/student/settings" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
              Settings & Preferences
            </NavLink>
            <button
              onClick={() => {
                logout();
                navigate('/student/login');
              }}
              className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
            >
              Sign Out
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
