import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRole } from '../../context/RoleContext';

export const AdminRouteGuard = ({ children }) => {
  const { activeRole, switchRole } = useRole();

  if (activeRole !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">Admin Access Restricted</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You are currently logged in as <strong>{activeRole.toUpperCase()}</strong>. Access to the Central Campus Control Center is restricted to authorized System Administrators.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={LogIn}
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Sign In as Administrator
            </Button>

            <NavLink to="/home" className="block text-xs font-semibold text-slate-400 hover:text-white pt-2">
              Return to Main Campus Portal →
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
