import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { useRole } from '../../context/RoleContext';

export const FacultyLoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { switchRole } = useRole();

  const [email, setEmail] = useState('hariharan@campus.edu');
  const [facultyId, setFacultyId] = useState('FAC-9402');
  const [password, setPassword] = useState('••••••••');

  const handleFacultyLogin = (e) => {
    e.preventDefault();
    switchRole('faculty');
    addToast('Authenticated as Dr. Hariharan (Faculty Portal)', 'success');
    navigate('/faculty/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <NavLink to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-700 transition-colors">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">WayFindYou</span>
          </NavLink>
          <h2 className="text-xl font-extrabold text-slate-900">Faculty Portal Sign In</h2>
          <p className="text-xs text-slate-500">Access your faculty schedule, classroom navigation & timetable</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-5">
            <form onSubmit={handleFacultyLogin} className="space-y-4">
              <Input
                label="Faculty Email"
                type="email"
                icon={Mail}
                placeholder="r.chen@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Faculty ID Number"
                type="text"
                icon={KeyRound}
                placeholder="FAC-9402"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Sign In to Faculty Portal
              </Button>
            </form>

            <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
              Not a faculty member?{' '}
              <NavLink to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Go to Main Portal Login
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
