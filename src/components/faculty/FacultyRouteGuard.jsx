import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRole } from '../../context/RoleContext';

export const FacultyRouteGuard = ({ children }) => {
  const { activeRole } = useRole();

  if (activeRole !== 'faculty') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">Faculty Access Restricted</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You are currently logged in as <strong>{activeRole.toUpperCase()}</strong>. Access to the Faculty Portal is restricted to authorized Faculty & Staff members.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={LogIn}
              onClick={() => {
                window.location.href = '/login?switchRole=faculty';
              }}
            >
              Sign In as Faculty
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
