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
  Shield,
  HelpCircle,
  Plus,
  QrCode
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { Badge } from '../ui/Badge';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeRole, user } = useRole();
  const location = useLocation();

  // Navigation Items defined dynamically per role
  const navSections = activeRole === 'visitor' ? [
    {
      title: 'Overview',
      items: [
        { name: 'Visitor Home', path: '/home?tab=home', icon: LayoutDashboard, roles: ['visitor'] }
      ]
    },
    {
      title: 'Visit Management',
      items: [
        { name: 'Request Campus Visit', path: '/home?tab=request', icon: Plus, roles: ['visitor'] },
        { name: 'My Passes & Status', path: '/home?tab=passes', icon: QrCode, roles: ['visitor'] },
      ]
    },
    {
      title: 'Campus Navigation',
      items: [
        { name: 'Campus Map', path: '/home?tab=guide', icon: Map, roles: ['visitor'] },
        { name: 'Facility Locator', path: '/home?tab=guide', icon: Building2, roles: ['visitor'] },
        { name: 'Voice Assistant', path: '/home?tab=voice', icon: Mic, roles: ['visitor'] },
      ]
    },
    {
      title: 'Announcements',
      items: [
        { name: 'Notifications', path: '/home?tab=alerts', icon: Bell, roles: ['visitor'] },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'My Profile', path: '/profile', icon: User, roles: ['visitor'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['visitor'] },
      ]
    }
  ] : [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/home', icon: LayoutDashboard, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] }
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
      title: 'Campus Life',
      items: [
        { name: 'Timetable', path: '/timetable', icon: Calendar, roles: ['student', 'faculty'] },
        { name: 'Notices & Updates', path: '/notices', icon: Bell, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
      ]
    },
    {
      title: 'Services & Operations',
      items: [
        { name: 'Complaints & Issues', path: '/complaints', icon: MessageSquare, roles: ['student', 'faculty', 'security', 'admin'] },
        { name: 'Visitor Passes', path: '/visitors', icon: Users, roles: ['visitor', 'security', 'admin'] },
        { name: 'Admin Operations', path: '/admin', icon: Shield, roles: ['admin'] },
      ]
    },
    {
      title: 'Safety',
      items: [
        { name: 'Emergency / SOS', path: '/emergency', icon: ShieldAlert, badge: '24/7', roles: ['student', 'faculty', 'security', 'admin'] },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'My Profile', path: '/profile', icon: User, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
        { name: 'Settings', path: '/settings', icon: Settings, roles: ['student', 'faculty', 'visitor', 'security', 'admin'] },
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
          <NavLink to="/home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-500 transition-colors">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-tight">
                WayFindYou
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Campus Portal</span>
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
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-600"
          />
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-white truncate">{user.name}</h5>
            <p className="text-[10px] text-slate-400 truncate">{user.roleLabel}</p>
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
                  const isActive = item.path.includes('?')
                    ? location.pathname === item.path.split('?')[0] && (location.search === '?' + item.path.split('?')[1] || (item.path.split('?')[1] === 'tab=home' && !location.search))
                    : location.pathname === item.path;

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
          <span>WayFindYou v1.0</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            System Normal
          </span>
        </div>
      </aside>
    </>
  );
};
