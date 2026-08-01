import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { useRole } from '../../context/RoleContext';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { switchRole } = useRole();

  const [email, setEmail] = useState('admin.vance@campus.edu');
  const [adminId, setAdminId] = useState('ADM-001');
  const [password, setPassword] = useState('••••••••');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    switchRole('admin');
    addToast('Authenticated as System Administrator (Central Campus Control Center)', 'success');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-amber-400 selection:text-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Compass className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">WayFindYou</span>
          </div>
          <h2 className="text-xl font-black text-white">Central Campus Control Center</h2>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Authorized Admin Portal Authentication</p>
        </div>

        <Card className="bg-slate-900 border-slate-800 shadow-2xl text-white">
          <CardContent className="p-6 space-y-5">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Highest Security Level: Role Verification Required</span>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-slate-900">
              <Input
                label="Admin Email"
                type="email"
                icon={Mail}
                placeholder="admin.vance@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Administrator ID"
                type="text"
                icon={KeyRound}
                placeholder="ADM-001"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
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

              <Button type="submit" variant="primary" size="lg" fullWidth icon={ArrowRight} iconPosition="right" className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
                Sign In to Admin Control Center
              </Button>
            </form>

            <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
              Not an administrator?{' '}
              <NavLink to="/login" className="text-amber-400 font-bold hover:underline">
                Return to Campus Portal Sign In
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
