import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Users,
  Building,
  Building2,
  Layers,
  BookOpen,
  Calendar,
  UserCheck,
  UserPlus,
  Clock,
  Shield,
  Map,
  CalendarDays,
  Bell,
  MessageSquare,
  BarChart2,
  FileText,
  Activity,
  Settings,
  User,
  LogOut,
  X,
  FileSpreadsheet,
  Star
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { switchRole, logout, user } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const navSections = [
    {
      title: 'Main Control',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'User Management', path: '/admin/users', icon: Users },
        { name: 'Department Management', path: '/admin/departments', icon: Building }
      ]
    },
    {
      title: 'Academic & Staff',
      items: [
        { name: 'Faculty Management', path: '/admin/faculty', icon: UserCheck },
        { name: 'Student Management', path: '/admin/students', icon: Users },
        { name: 'Subject Management', path: '/admin/subjects', icon: BookOpen },
        { name: 'Class / Section', path: '/admin/classes', icon: Layers },
        { name: 'Faculty Allocation', path: '/admin/faculty-allocation', icon: UserPlus },
        { name: 'Class Allocation', path: '/admin/class-allocation', icon: Clock },
        { name: 'Timetable Management', path: '/admin/timetable', icon: Calendar },
        { name: 'Faculty Substitution', path: '/admin/substitution', icon: UserCheck, badge: '4' }
      ]
    },
    {
      title: 'Infrastructure',
      items: [
        { name: 'Building Management', path: '/admin/buildings', icon: Building2 },
        { name: 'Room / Classroom', path: '/admin/rooms', icon: Layers },
        { name: 'Facility Management', path: '/admin/facilities', icon: Shield }
      ]
    },
    {
      title: 'Operations & Communication',
      items: [
        { name: 'Events Management', path: '/admin/events', icon: CalendarDays },
        { name: 'Notices Management', path: '/admin/notices', icon: FileText },
        { name: 'Visitor Management', path: '/admin/visitors', icon: Users, badge: '12' },
        { name: 'Visitor Feedback', path: '/admin/feedback', icon: Star },
        { name: 'System Notifications', path: '/admin/notifications', icon: Bell },
        { name: 'Complaints Monitoring', path: '/admin/complaints', icon: MessageSquare, badge: '8' }
      ]
    },
    {
      title: 'Analytics & Security',
      items: [
        { name: 'Campus Heatmap', path: '/admin/heatmap', icon: Activity },
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
        { name: 'Reports & Export', path: '/admin/reports', icon: FileSpreadsheet },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: Clock },
        { name: 'System Settings', path: '/admin/settings', icon: Settings },
        { name: 'Admin Profile', path: '/admin/profile', icon: User }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Admin Navigation Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <NavLink to="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-sm group-hover:bg-amber-400 transition-colors">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-white tracking-tight leading-tight">WayFindYou</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Admin Control Center</span>
            </div>
          </NavLink>

          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile Summary Card */}
        <div className="p-3 mx-3 mt-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-amber-400 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white truncate">{user.name}</h5>
            <p className="text-[10px] text-amber-400 font-semibold truncate">{user.roleLabel}</p>
            <p className="text-[9px] text-slate-400 truncate">{user.department}</p>
          </div>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => { if (isOpen) onClose(); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Admin</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 text-center flex items-center justify-between">
          <span>Admin Portal v2.0</span>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Highest Auth
          </span>
        </div>
      </aside>
    </>
  );
};
