import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, User, KeyRound, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';
import { useRole, getRoleLabel } from '../context/RoleContext';
import { registerUser } from '../services/authService';

const DEMO_CREDENTIALS = {
  admin:    { email: 'dean@campus.edu',             password: 'password123', label: 'Dean (Admin)' },
  faculty:  { email: 'hariharan@campus.edu',         password: 'password123', label: 'Dr. Hariharan (Faculty)' },
  student:  { email: 'hariharan.std@campus.edu',     password: 'password123', label: 'Hariharan S. (Student)' },
  visitor:  { email: 'sanjana.parent@gmail.com',     password: 'password123', label: 'Sanjana P. (Visitor)' },
  security: { email: 'security.drake@campus.edu',   password: 'password123', label: 'Security Staff' }
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { login, logout } = useRole();

  const queryParams = new URLSearchParams(location.search);
  const switchRoleParam = queryParams.get('switchRole');
  const returnUrlParam = queryParams.get('returnUrl');

  const [email, setEmail] = useState('hariharan.std@campus.edu');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('student');

  // Auto-fill credentials when role dropdown changes
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (DEMO_CREDENTIALS[role]) {
      setEmail(DEMO_CREDENTIALS[role].email);
      setPassword(DEMO_CREDENTIALS[role].password);
    }
  };

  useEffect(() => {
    if (switchRoleParam && DEMO_CREDENTIALS[switchRoleParam]) {
      setSelectedRole(switchRoleParam);
      setEmail(DEMO_CREDENTIALS[switchRoleParam].email);
      setPassword(DEMO_CREDENTIALS[switchRoleParam].password);
    }
  }, [switchRoleParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);

      // Enforce strict role matching against database record
      if (loggedInUser.role !== selectedRole) {
        logout();
        throw new Error(`The selected login role (${getRoleLabel(selectedRole)}) does not match your registered account role (${getRoleLabel(loggedInUser.role)}).`);
      }

      addToast(`Signed in successfully as ${getRoleLabel(loggedInUser.role).toUpperCase()}`, 'success');

      const isAllowedUrl =
        (loggedInUser.role === 'admin' && returnUrlParam?.startsWith('/admin')) ||
        (loggedInUser.role === 'faculty' && returnUrlParam?.startsWith('/faculty')) ||
        (loggedInUser.role !== 'admin' && loggedInUser.role !== 'faculty' && !returnUrlParam?.startsWith('/admin') && !returnUrlParam?.startsWith('/faculty'));

      if (returnUrlParam && isAllowedUrl) {
        navigate(returnUrlParam);
      } else if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (loggedInUser.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else if (loggedInUser.role === 'visitor') {
        navigate('/visitors');
      } else {
        navigate('/home');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const ROLE_OPTIONS = [
    { value: 'student', label: 'Student Portal' },
    { value: 'faculty', label: 'Faculty Portal' },
    { value: 'visitor', label: 'Visitor Portal' },
    { value: 'admin',   label: 'Admin Portal' },
  ];

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

              {/* Role Dropdown — matches original design */}
              <Select
                label="Login Role (Portal Access)"
                value={selectedRole}
                onChange={handleRoleChange}
                options={ROLE_OPTIONS}
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

            {/* OR Divider */}
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-400 font-medium">OR</span>
              </div>
            </div>

            {/* Google Workspace Button */}
            <button
              type="button"
              onClick={() => addToast('Google Workspace SSO is available for campus accounts only.', 'info')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Continue with Google Workspace
            </button>

            <div className="text-center pt-1 border-t border-slate-100 text-xs text-slate-500">
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Excludes admin
  const [phone, setPhone] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        name,
        email,
        password,
        role,
        department: role === 'visitor' ? 'Guest / Parent' : 'Computer Science & Eng',
        phone,
      });
      addToast('Registration request submitted successfully! Your account is awaiting admin approval.', 'success');
      navigate('/login');
    } catch (err) {
      addToast(err.message, 'error');
    }
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
          <p className="text-xs text-slate-500">Register with your official student/faculty/visitor details</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleRegister} className="space-y-3.5">
              <Input
                label="Full Name"
                placeholder="Alex Vance"
                icon={User}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Campus Email"
                type="email"
                placeholder="alex.vance@campus.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                placeholder="+91 99001 98765"
                icon={Phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Select
                label="Requested Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'faculty', label: 'Faculty & Staff' },
                  { value: 'visitor', label: 'Campus Visitor' },
                ]}
              />

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
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['4', '8', '2', '9']);

  const handleVerify = (e) => {
    e.preventDefault();

    // Secure checking: only allow approved user login simulation
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.status === 'approved') {
      addToast('OTP verified successfully! Welcome to WayFindYou.', 'success');
      // Simulate OAuth login
      localStorage.setItem('wayfindyou_user', JSON.stringify(user));
      localStorage.setItem('wayfindyou_token', btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 3600000 })));
      navigate('/home');
    } else {
      // Security leak prevention: return success to prevent email enumeration leaks
      addToast('OTP passcode verification processed successfully.', 'success');
      navigate('/login');
    }
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
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="student@campus.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

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
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    // Security check: leak prevention
    if (user && user.status === 'approved') {
      addToast('Password reset link sent to your campus email', 'info');
    } else {
      addToast('Password reset link sent to your campus email', 'info');
    }
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
              <Input
                label="Campus Email"
                type="email"
                placeholder="student@campus.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
