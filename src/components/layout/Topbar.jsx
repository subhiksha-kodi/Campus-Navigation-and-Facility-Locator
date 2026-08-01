import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Shield, UserCheck, Compass, LogOut, ChevronDown, Check } from 'lucide-react';
import { useRole, getRoleLabel, DEMO_USERS } from '../../context/RoleContext';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';

export const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { activeRole, user, logout } = useRole();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Null-safe user values for when unauthenticated
  const userName = user?.name ?? 'Guest';
  const userEmail = user?.email ?? '';
  const userAvatar = user?.avatar ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80';
  const userRoleLabel = user?.roleLabel ?? getRoleLabel(activeRole);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'Central Library Closed Today', time: '10 mins ago', unread: true },
    { id: 2, title: 'Bus Route #4 Schedule Change', time: '1 hour ago', unread: true },
    { id: 3, title: 'Classroom CS303 Projector Repaired', time: '3 hours ago', unread: false },
  ];

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
        <NavLink to="/home" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">WayFindYou</span>
        </NavLink>
      </div>

      {/* Center: Quick Search Bar for Large Screens */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Quick search classrooms, buildings, facilities..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all h-9"
          />
        </div>
      </div>

      {/* Right: Role Switcher, Notifications, User Avatar */}
      <div className="flex items-center gap-2.5">
        {/* Role Switcher Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700">
          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Role: <strong className="text-slate-900 capitalize">{getRoleLabel(activeRole)}</strong></span>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-dropdown z-50 py-2 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Campus Alerts</h4>
                <Badge variant="info" size="sm">3 New</Badge>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <h5 className="text-xs font-semibold text-slate-800">{n.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <NavLink
                  to="/notices"
                  onClick={() => setNotificationsOpen(false)}
                >
                  View All Campus Notices →
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <img
                src={userAvatar}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>
          }
        >
          <div className="p-3 border-b border-slate-100">
            <h5 className="text-xs font-semibold text-slate-900">{userName}</h5>
            <p className="text-[10px] text-slate-500">{userEmail}</p>
            <div className="mt-1">
              <Badge variant="info" size="sm">{userRoleLabel}</Badge>
            </div>
          </div>
          <div className="py-1">
            <NavLink to={activeRole === 'admin' ? '/admin/profile' : activeRole === 'faculty' ? '/faculty/profile' : '/profile'} className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
              My Profile
            </NavLink>
            <NavLink to={activeRole === 'admin' ? '/admin/settings' : '/settings'} className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
              Settings & Accessibility
            </NavLink>
            <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium">
              Sign Out
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
