import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Lock, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { useRole } from '../../context/RoleContext';

export const StudentLogin = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { login } = useRole();

  const [registerNo, setRegisterNo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerNo.trim() || !password.trim()) {
      addToast('Please enter your Register Number and Password', 'warning');
      return;
    }
    login('student');
    addToast('Student authentication successful! Welcome to portal.', 'success');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">WayFindYou</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Student Portal Login</h2>
          <p className="text-xs text-slate-500">Access your campus navigation, timetable, and student services</p>
        </div>

        <Card className="shadow-md border border-slate-200">
          <CardContent className="p-6 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Register Number"
                type="text"
                icon={KeyRound}
                placeholder="e.g. 23CB001"
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Remember Me</span>
                </label>

                <NavLink to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </NavLink>
              </div>

              <Button type="submit" variant="primary" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Student Sign In
              </Button>
            </form>

            <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
              Need assistance? Contact campus IT Desk at <span className="text-slate-700 font-medium">ithelpdesk@campus.edu</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
