import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, Shield, CheckCircle2, User, KeyRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { useRole } from '../context/RoleContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { switchRole } = useRole();

  const [email, setEmail] = useState('alex.vance@campus.edu');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    addToast(`Signed in successfully as ${selectedRole.toUpperCase()}`, 'success');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <NavLink to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-700 transition-colors">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">WayFindYou</span>
          </NavLink>
          <h2 className="text-xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-xs text-slate-500">Sign in to access your campus dashboard and navigation</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email or College ID"
                type="email"
                icon={Mail}
                placeholder="student@campus.edu or CS-2024"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <Select
                label="Login Role (Portal Access)"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                options={[
                  { value: 'student', label: 'Student Portal' },
                  { value: 'faculty', label: 'Faculty & Staff' },
                  { value: 'visitor', label: 'Campus Visitor' },
                  { value: 'security', label: 'Campus Security' },
                  { value: 'admin', label: 'Administrator' },
                ]}
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <NavLink to="/otp" className="text-blue-600 hover:text-blue-700 font-medium">
                  Login via One-Time Passcode (OTP)
                </NavLink>
                <NavLink to="/forgot-password" className="text-slate-500 hover:text-slate-800">
                  Forgot Password?
                </NavLink>
              </div>

              <Button type="submit" variant="primary" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Sign In to WayFindYou
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-400 font-medium">OR</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                switchRole('student');
                addToast('Signed in with Google OAuth', 'success');
                navigate('/home');
              }}
            >
              Continue with Google Workspace
            </Button>

            <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
              Don't have a campus account?{' '}
              <NavLink to="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Register Student Account
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleRegister = (e) => {
    e.preventDefault();
    addToast('Account created successfully! Please verify OTP.', 'success');
    navigate('/otp');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <NavLink to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold text-slate-900">WayFindYou</span>
          </NavLink>
          <h2 className="text-xl font-bold text-slate-900">Create Campus Account</h2>
          <p className="text-xs text-slate-500">Register with your official student/faculty ID</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleRegister} className="space-y-3.5">
              <Input label="Full Name" placeholder="Alex Vance" icon={User} required />
              <Input label="Campus Email" type="email" placeholder="alex.vance@campus.edu" icon={Mail} required />
              <Input label="Student / Staff ID Number" placeholder="CS-2024-089" icon={KeyRound} required />
              <Input label="Password" type="password" placeholder="••••••••" icon={Lock} required />

              <Button type="submit" variant="primary" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Register Account
              </Button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              Already registered?{' '}
              <NavLink to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign In
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const OTPPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [otp, setOtp] = useState(['4', '8', '2', '9']);

  const handleVerify = (e) => {
    e.preventDefault();
    addToast('OTP verified successfully! Welcome to WayFindYou.', 'success');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Enter One-Time Verification Passcode</h2>
          <p className="text-xs text-slate-500">We sent a 4-digit code to your campus email</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-5">
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center text-lg font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                ))}
              </div>

              <Button type="submit" variant="primary" size="md" fullWidth>
                Verify & Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    addToast('Password reset link sent to your campus email', 'info');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Reset Password</h2>
          <p className="text-xs text-slate-500">Enter your campus email to receive a password reset link</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleReset} className="space-y-4">
              <Input label="Campus Email" type="email" placeholder="student@campus.edu" icon={Mail} required />
              <Button type="submit" variant="primary" size="md" fullWidth>
                Send Reset Link
              </Button>
            </form>

            <div className="text-center pt-2 text-xs">
              <NavLink to="/login" className="text-blue-600 hover:text-blue-700">
                Back to Sign In
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
