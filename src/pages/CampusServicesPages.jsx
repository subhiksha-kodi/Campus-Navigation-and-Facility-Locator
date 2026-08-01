import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bell,
  MessageSquare,
  Calendar,
  Users,
  ShieldAlert,
  Shield,
  User,
  Settings,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  QrCode,
  Phone,
  BarChart2,
  FileText,
  Accessibility,
  Compass,
  Search,
  Building2,
  Lock,
  Mail,
  Plus,
  Check,
  XCircle,
  Info,
  Map,
  LogOut,
  HeartPulse,
  Coffee,
  Car,
  CreditCard,
  CalendarDays
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { CampusMap, CAMPUS_LOCATIONS } from '../components/navigation/CampusMap';
import { useToast } from '../context/ToastContext';
import { useRole } from '../context/RoleContext';

// 1. Notices Page
export const NoticesPage = () => {
  const { addToast } = useToast();
  const notices = [
    { id: 1, title: 'Central Library Closed Today for Digital Audit', date: 'Jul 31, 2026', category: 'Facilities', body: 'The central library will remain closed until 5:00 PM for inventory scanning. Digital archives remain accessible.' },
    { id: 2, title: 'Shuttle Bus Route #2 Maintenance Schedule', date: 'Jul 30, 2026', category: 'Transit', body: 'Shuttle #2 is undergoing oil service. Frequency is adjusted to 20 minutes.' },
    { id: 3, title: 'Lab CS303 Workstations Upgraded with GPU Acceleration', date: 'Jul 29, 2026', category: 'Academic', body: 'Computer Science Lab 303 now has 30 new workstations for AI and Graphics coursework.' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Campus Notices & Announcements"
        description="Official updates from campus administration, departments, and facility managers."
        breadcrumbs={[{ label: 'Notices' }]}
      />

      <div className="space-y-4 max-w-4xl">
        {notices.map((n) => (
          <Card key={n.id}>
            <CardHeader actions={<Badge variant="info" size="sm">{n.category}</Badge>}>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <CardTitle>{n.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-5 text-xs text-slate-700">
              <p className="leading-relaxed">{n.body}</p>
              <span className="text-[11px] text-slate-400 block pt-2 border-t border-slate-100">Posted on {n.date}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

// 2. Complaints & Issue Reporting Page
export const ComplaintsPage = () => {
  const { addToast } = useToast();
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('Computer Science Block');
  const [description, setDescription] = useState('');
  const [myIssues, setMyIssues] = useState([
    { id: 'ISS-409', title: 'Projector Dim in CS303', location: 'CS Block Floor 3', status: 'In Progress', date: 'Yesterday' }
  ]);

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    const newIssue = {
      id: `ISS-${Math.floor(Math.random() * 900 + 100)}`,
      title: subject,
      location,
      status: 'Submitted',
      date: 'Just Now'
    };
    setMyIssues([newIssue, ...myIssues]);
    addToast('Complaint submitted to Facility Maintenance team.', 'success');
    setSubject('');
    setDescription('');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Report Facility Issue"
        description="Submit reports for broken equipment, elevator issues, plumbing problems, or Wi-Fi deadzones."
        breadcrumbs={[{ label: 'Complaints' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Submit Maintenance Request</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmitIssue} className="space-y-4">
                <Input
                  label="Issue Summary"
                  placeholder="e.g., Water leak in CS Block 2nd floor washroom"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <Select
                  label="Campus Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  options={[
                    { value: 'Computer Science Block', label: 'Computer Science Block' },
                    { value: 'Central Library', label: 'Central Library' },
                    { value: 'Main Cafeteria', label: 'Main Cafeteria' },
                    { value: 'Academic Block A', label: 'Academic Block A' },
                    { value: 'Health Clinic', label: 'Health Clinic' },
                  ]}
                />

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Provide details to assist campus technician..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 text-xs text-slate-500">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <span>Attach Photo Evidence (Optional)</span>
                </div>

                <Button type="submit" variant="primary" size="md" fullWidth icon={MessageSquare}>
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Issues Track */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Submitted Reports</h3>
          {myIssues.map((iss) => (
            <Card key={iss.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 font-bold">{iss.id}</span>
                  <Badge variant={iss.status === 'Submitted' ? 'info' : 'warning'} size="sm">
                    {iss.status}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{iss.title}</h4>
                <p className="text-[11px] text-slate-500">{iss.location} • Reported {iss.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

// 3. Timetable Page
export const TimetablePage = () => {
  const { user } = useRole();
  const schedule = [
    { time: '09:00 AM - 10:30 AM', subject: 'CS301 Data Structures', room: 'CS303', building: 'Computer Science Block' },
    { time: '11:00 AM - 12:30 PM', subject: 'CS304 Computer Networks', room: 'CS101', building: 'Computer Science Block' },
    { time: '02:00 PM - 04:00 PM', subject: 'AI Laboratory Session', room: 'CS303', building: 'Computer Science Block' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Weekly Schedule & Class Locations"
        description="View your personal timetable with direct links to navigate to classrooms."
        breadcrumbs={[{ label: 'Timetable' }]}
      />

      <div className="space-y-4 max-w-4xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Schedule (Friday)</h3>
        {schedule.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{item.subject}</h4>
                <p className="text-xs text-slate-500">Room {item.room} • {item.building}</p>
              </div>

              <NavLink to={`/map?q=${encodeURIComponent(item.building)}`}>
                <Button variant="outline" size="sm" icon={MapPin}>
                  Show Room Map
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

// 4. Visitor Portal Page
export const VisitorPortalPage = () => {
  const { addToast } = useToast();
  const { activeRole, switchRole, logout, user } = useRole();

  // Internal states
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [portalTab, setPortalTab] = useState('home'); // 'home' | 'request' | 'passes' | 'guide' | 'alerts'
  
  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerIdType, setRegisterIdType] = useState('driving_license');
  const [registerIdNumber, setRegisterIdNumber] = useState('');
  
  // Visit Request Form State
  const [requestHost, setRequestHost] = useState('dr-chen');
  const [requestPurpose, setRequestPurpose] = useState('Official Business');
  const [requestDate, setRequestDate] = useState('2026-07-31');
  const [requestTime, setRequestTime] = useState('10:00');

  // Selected pass for viewing QR details in a modal
  const [selectedPassForQR, setSelectedPassForQR] = useState(null);

  // Map state inside guide tab
  const [selectedGuideLoc, setSelectedGuideLoc] = useState(CAMPUS_LOCATIONS[0]);
  const [guideCategory, setGuideCategory] = useState('all');
  const [guideSearchQuery, setGuideSearchQuery] = useState('');

  // Host dropdown options
  const HOSTS = [
    { value: 'dr-chen', label: 'Dr. Robert Chen (Computer Science Dept)' },
    { value: 'prof-vance', label: 'Prof. Eleanor Vance (Electronics Dept)' },
    { value: 'dr-smith', label: 'Dr. John Smith (Chemistry Dept)' },
    { value: 'admin-office', label: 'Dean of Admissions / Admin Office' },
    { value: 'finance-desk', label: 'Finance & Student Accounts Desk' },
  ];

  // Visit history list (Pending, Approved, Rejected)
  const [visits, setVisits] = useState([
    {
      id: 'VPASS-88392',
      host: 'Dr. Robert Chen (Computer Science Dept)',
      purpose: 'Guest Lecture on AI Ethics',
      date: '2026-07-31',
      time: '10:00 AM',
      status: 'approved',
      qrCode: 'VPASS-88392',
    },
    {
      id: 'VPASS-10293',
      host: 'Dean of Admissions / Admin Office',
      purpose: 'Official Transcript Submission',
      date: '2026-08-02',
      time: '02:30 PM',
      status: 'pending',
      qrCode: 'VPASS-10293',
    },
    {
      id: 'VPASS-44921',
      host: 'Finance & Student Accounts Desk',
      purpose: 'Fee Structure Inquiry',
      date: '2026-07-28',
      time: '11:15 AM',
      status: 'rejected',
      reason: 'Incorrect office hours selected.',
      qrCode: 'VPASS-44921',
    }
  ]);

  // Announcements list
  const [announcements, setAnnouncements] = useState([
    { id: 1, type: 'warning', text: 'Visitor Parking Area 3 is closed for repaving. Please use Parking Area 4 near the North Gate.', date: 'Today' },
    { id: 2, type: 'info', text: 'Main Quad is closed for Graduation Ceremony Prep from 1:00 PM to 4:00 PM.', date: 'Today' },
    { id: 3, type: 'info', text: 'Emergency drill scheduled for tomorrow at 10:00 AM. Please follow safety guidelines.', date: '1 day ago' },
  ]);

  // Notifications list
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', text: 'Your campus visit request for Dr. Robert Chen was APPROVED.', time: '10 mins ago' },
    { id: 2, type: 'error', text: 'Your campus visit request for Finance & Student Accounts Desk was REJECTED.', time: '2 hours ago' },
  ]);

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPin) {
      addToast('Please enter both Email and Passcode Pin.', 'error');
      return;
    }
    // Set a default profile linked to the entered email in localStorage
    const savedProfile = localStorage.getItem('visitor_profile');
    if (!savedProfile) {
      localStorage.setItem('visitor_profile', JSON.stringify({
        name: 'Sarah Jenkins',
        email: loginEmail,
        phone: '+91 99001 98765',
        idType: 'driving_license',
        idNumber: 'PASS-88392',
      }));
    }
    switchRole('visitor');
    addToast('Signed in successfully as Campus Guest.', 'success');
  };

  // Handle Registration Submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPhone || !registerIdNumber) {
      addToast('Please fill out all required registration fields.', 'error');
      return;
    }
    localStorage.setItem('visitor_profile', JSON.stringify({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      idType: registerIdType,
      idNumber: registerIdNumber,
    }));
    switchRole('visitor');
    addToast('Guest profile registered successfully! Welcome.', 'success');
  };

  // Handle Request Submission
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const hostLabel = HOSTS.find(h => h.value === requestHost)?.label || requestHost;
    
    // Format Time to 12 hour AM/PM format
    let formattedTime = requestTime;
    try {
      const [hours, minutes] = requestTime.split(':');
      const hourNum = parseInt(hours, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const adjustedHour = hourNum % 12 || 12;
      formattedTime = `${adjustedHour}:${minutes} ${ampm}`;
    } catch (err) {}

    const newId = `VPASS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVisit = {
      id: newId,
      host: hostLabel,
      purpose: requestPurpose,
      date: requestDate,
      time: formattedTime,
      status: 'pending',
      qrCode: newId,
    };

    setVisits([newVisit, ...visits]);
    addToast('Campus visit request submitted! Awaiting host approval.', 'info');
    setPortalTab('passes');

    // Simulate Host Decision (Approved or Rejected) after 5 seconds
    setTimeout(() => {
      setVisits(currentVisits => {
        return currentVisits.map(v => {
          if (v.id === newId) {
            const isApproved = Math.random() > 0.3; // 70% approval simulation
            if (isApproved) {
              addToast(`Visit request for ${v.host} has been APPROVED by the host!`, 'success');
              setNotifications(prev => [
                { id: Date.now(), type: 'success', text: `Your campus visit request for ${v.host} was APPROVED.`, time: 'Just now' },
                ...prev
              ]);
              return { ...v, status: 'approved' };
            } else {
              addToast(`Visit request for ${v.host} has been REJECTED by the host.`, 'error');
              setNotifications(prev => [
                { id: Date.now(), type: 'error', text: `Your campus visit request for ${v.host} was REJECTED.`, time: 'Just now' },
                ...prev
              ]);
              return { ...v, status: 'rejected', reason: 'Host is unavailable during this time slot.' };
            }
          }
          return v;
        });
      });
    }, 5000);
  };

  // Filter locations in the guide tab
  const filteredGuideLocations = CAMPUS_LOCATIONS.filter((loc) => {
    const matchesCategory = guideCategory === 'all' || loc.category === guideCategory;
    const matchesSearch = loc.name.toLowerCase().includes(guideSearchQuery.toLowerCase()) || loc.code.toLowerCase().includes(guideSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const pendingCount = visits.filter(v => v.status === 'pending').length;
  const approvedCount = visits.filter(v => v.status === 'approved').length;
  const rejectedCount = visits.filter(v => v.status === 'rejected').length;

  const activeApprovedPass = visits.find(v => v.status === 'approved');

  // If not visitor, render Authentication Portal
  if (activeRole !== 'visitor') {
    return (
      <AppLayout>
        <PageHeader
          title="Campus Guest Access & Verification"
          description="Register guest entries, schedule appointments with hosts, and download digital gate passes."
          breadcrumbs={[{ label: 'Visitor Pass' }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 max-w-6xl">
          {/* Welcome Info Panel */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="info" size="md">
              Secure Visitor Portal
            </Badge>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Visiting our campus? <br />
              <span className="text-blue-600">Get your digital pass in minutes.</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Create a temporary guest profile to easily schedule visits with department staff and faculty. Upon approval, you will receive a secure QR code pass valid at all entry gates.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fast Security Check-in</h4>
                  <p className="text-[11px] text-slate-500">Scan QR codes directly from your phone at any gate reader.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0">
                  <Compass className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-semibold">Interactive Guide</h4>
                  <p className="text-[11px] text-slate-500">Find departments, elevators, parking space, and emergency hubs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
                  <Bell className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Instant Decision Alerts</h4>
                  <p className="text-[11px] text-slate-500">Get immediately notified of host approvals, delays, or emergency updates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login/Register Card */}
          <div className="lg:col-span-6">
            <Card className="shadow-md border border-slate-200">
              <CardHeader className="p-0 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
                <div className="flex">
                  <button
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 text-center py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                      authTab === 'login'
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-100/50'
                    }`}
                  >
                    Guest Sign In
                  </button>
                  <button
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 text-center py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                      authTab === 'register'
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-100/50'
                    }`}
                  >
                    Create Guest Account
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {authTab === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      label="Registered Guest Email"
                      placeholder="visitor@example.com"
                      type="email"
                      icon={Mail}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                    <Input
                      label="4-Digit Passcode PIN"
                      placeholder="••••"
                      type="password"
                      maxLength={4}
                      icon={Lock}
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      required
                    />
                    <div className="pt-2">
                      <Button type="submit" variant="primary" fullWidth size="md">
                        Verify Code & Sign In
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <Input
                      label="Full Name"
                      placeholder="Sarah Jenkins"
                      icon={User}
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address"
                      placeholder="sarah.j@gmail.com"
                      type="email"
                      icon={Mail}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                    <Input
                      label="Mobile Number"
                      placeholder="+91 99001 98765"
                      icon={Phone}
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      required
                    />
                    <Select
                      label="Government Identification Type"
                      value={registerIdType}
                      onChange={(e) => setRegisterIdType(e.target.value)}
                      options={[
                        { value: 'driving_license', label: 'Driving License' },
                        { value: 'passport', label: 'Passport' },
                        { value: 'national_id', label: 'National Identity Card' },
                        { value: 'voter_id', label: 'Voter ID card' }
                      ]}
                    />
                    <Input
                      label="ID Card Number / Reference"
                      placeholder="DL-8839-A1"
                      icon={FileText}
                      value={registerIdNumber}
                      onChange={(e) => setRegisterIdNumber(e.target.value)}
                      required
                    />
                    <div className="pt-2">
                      <Button type="submit" variant="primary" fullWidth size="md">
                        Register Account & Sign In
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Render Authenticated Visitor Portal Dashboard
  return (
    <AppLayout>
      <PageHeader
        title="Visitor Operations Portal"
        description={`Logged in as ${user.name} • ${user.idNumber}`}
        breadcrumbs={[{ label: 'Visitor Pass' }]}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={() => {
                logout();
                addToast('Signed out of visitor portal.', 'info');
              }}
            >
              Exit Guest Mode
            </Button>
          </div>
        }
      />

      {/* Top Banner and Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-8 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Badge variant="info" size="sm">
                Active Pass Count: {approvedCount}
              </Badge>
              <span className="text-xs text-slate-450 font-medium">• Guest ID verified</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Good morning, {user.name}</h2>
            <p className="text-xs text-slate-500">Welcome to campus operations. Use the tabs below to organize your visits and explore buildings.</p>
          </div>
          
          <div className="flex border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 pl-0 md:pl-6 shrink-0 gap-6 text-center">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Campus Weather</span>
              <span className="text-sm font-bold text-slate-900">24°C Sunny</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Active Shuttles</span>
              <span className="text-sm font-bold text-emerald-600">3 Vehicles</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="md:col-span-4 grid grid-cols-3 gap-3">
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">Pending</span>
            <span className="text-xl font-black text-amber-900 mt-1">{pendingCount}</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">Approved</span>
            <span className="text-xl font-black text-emerald-950 mt-1">{approvedCount}</span>
          </div>
          <div className="bg-red-50/50 border border-red-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-red-700 uppercase tracking-wider">Rejected</span>
            <span className="text-xl font-black text-red-950 mt-1">{rejectedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Bar navigation */}
      <div className="mb-6">
        <Tabs
          activeTab={portalTab}
          onChange={(tabId) => setPortalTab(tabId)}
          tabs={[
            { id: 'home', label: 'Guest Dashboard', icon: User },
            { id: 'request', label: 'Request Visit Pass', icon: Plus },
            { id: 'passes', label: 'My Passes & History', icon: QrCode, badge: visits.length },
            { id: 'guide', label: 'Campus Map & Finder', icon: Map },
            { id: 'alerts', label: 'Notifications & Safety', icon: Bell, badge: notifications.length },
          ]}
          variant="underline"
        />
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        
        {/* Tab 1: Home Dashboard */}
        {portalTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Active Gate Pass QR code */}
            <div className="lg:col-span-5">
              {activeApprovedPass ? (
                <Card className="bg-slate-900 text-white text-center p-6 border-slate-800 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
                  <CardContent className="space-y-4 p-0">
                    <Badge variant="navy" size="md" className="bg-emerald-600 text-white border-emerald-500">
                      Approved Gate Entry Pass
                    </Badge>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold">Visitor: {user.name}</h3>
                      <p className="text-xs text-slate-450 truncate">{activeApprovedPass.host}</p>
                    </div>
                    
                    <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center border-4 border-slate-700 cursor-pointer" onClick={() => setSelectedPassForQR(activeApprovedPass)}>
                      <QrCode className="w-36 h-36 text-slate-900" />
                    </div>
                    
                    <div className="text-xs space-y-1">
                      <p className="text-slate-400 font-semibold">Pass Code: <strong>{activeApprovedPass.id}</strong></p>
                      <p className="text-[11px] text-slate-400">Date: {activeApprovedPass.date} • {activeApprovedPass.time}</p>
                      <p className="text-[10px] text-emerald-400 font-medium italic pt-1">Click QR code to enlarge for scanners</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-50 border-slate-200 border-dashed p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <QrCode className="w-12 h-12 text-slate-350 mb-3" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">No Active Entry Pass</h4>
                  <p className="text-xs text-slate-450 mt-1 max-w-xs mx-auto">
                    You currently do not have an approved visit pass for today. Submit a visit request to get a QR code entry pass.
                  </p>
                  <Button variant="outline" size="sm" icon={Plus} className="mt-4" onClick={() => setPortalTab('request')}>
                    Request Pass
                  </Button>
                </Card>
              )}
            </div>

            {/* Quick Actions & Recent Announcements */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Quick actions row */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPortalTab('request')}
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-blue-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">Request Pass</span>
                </button>
                
                <button
                  onClick={() => setPortalTab('guide')}
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-emerald-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Map className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">Campus Guide</span>
                </button>

                <button
                  onClick={() => setPortalTab('alerts')}
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-red-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">Safety & SOS</span>
                </button>
              </div>

              {/* Safety / Parking alerts & Announcements */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <CardTitle>Important Campus Announcements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3.5 text-xs">
                  {announcements.map((ann) => (
                    <div key={ann.id} className={`p-3 rounded-lg border flex gap-2.5 ${
                      ann.type === 'warning'
                        ? 'bg-amber-50/40 border-amber-200 text-amber-900'
                        : 'bg-blue-50/40 border-blue-200 text-blue-900'
                    }`}>
                      {ann.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                      <div>
                        <p className="text-[11px] font-medium leading-relaxed">{ann.text}</p>
                        <span className="text-[9px] text-slate-450 block mt-1">{ann.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Request Campus Visit */}
        {portalTab === 'request' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Request Campus Visit Pass</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <Select
                    label="Select Host / Office"
                    value={requestHost}
                    onChange={(e) => setRequestHost(e.target.value)}
                    options={HOSTS}
                  />

                  <Input
                    label="Purpose of Visit"
                    placeholder="Guest interview, project discussion, student consultation"
                    value={requestPurpose}
                    onChange={(e) => setRequestPurpose(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Date of Visit"
                      type="date"
                      value={requestDate}
                      onChange={(e) => setRequestDate(e.target.value)}
                      required
                    />
                    <Input
                      label="Scheduled Time"
                      type="time"
                      value={requestTime}
                      onChange={(e) => setRequestTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <Button type="submit" variant="primary" fullWidth size="md" icon={QrCode}>
                      Submit Pass Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 3: Passes History */}
        {portalTab === 'passes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Pass Log</h3>
              <Badge variant="info" size="sm">
                Total Visits: {visits.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visits.map((pass) => (
                <Card key={pass.id} className="border border-slate-200">
                  <CardContent className="p-4 space-y-3.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-slate-450 uppercase block">Host</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-0.5">{pass.host}</h4>
                      </div>
                      
                      {/* Status Pills */}
                      {pass.status === 'approved' && (
                        <Badge variant="success" size="sm" icon={Check}>
                          Approved
                        </Badge>
                      )}
                      {pass.status === 'pending' && (
                        <Badge variant="warning" size="sm" icon={Clock}>
                          Pending Host
                        </Badge>
                      )}
                      {pass.status === 'rejected' && (
                        <Badge variant="error" size="sm" icon={XCircle}>
                          Rejected
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-medium block">Date & Time</span>
                        <span className="text-slate-800 font-bold mt-0.5 block">{pass.date} at {pass.time}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Purpose</span>
                        <span className="text-slate-800 truncate block mt-0.5" title={pass.purpose}>{pass.purpose}</span>
                      </div>
                    </div>

                    {pass.status === 'rejected' && pass.reason && (
                      <div className="bg-red-50 text-red-800 p-2.5 rounded-lg text-[10px] mt-2 border border-red-100">
                        <strong>Reason:</strong> {pass.reason}
                      </div>
                    )}

                    {pass.status === 'pending' && (
                      <div className="bg-slate-50 text-slate-500 p-2.5 rounded-lg text-[10px] mt-2 border border-slate-100 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-450 animate-pulse" />
                        <span>Awaiting verification. We will simulate host decision shortly.</span>
                      </div>
                    )}

                    {pass.status === 'approved' && (
                      <div className="pt-2 flex justify-end">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={QrCode}
                          onClick={() => setSelectedPassForQR(pass)}
                        >
                          View Gate QR Pass
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Campus Map & Guide */}
        {portalTab === 'guide' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Guide List / Filters */}
            <div className="lg:col-span-4 space-y-4">
              <Input
                label="Search Buildings or Departments"
                placeholder="Enter search query..."
                icon={Search}
                value={guideSearchQuery}
                onChange={(e) => setGuideSearchQuery(e.target.value)}
              />

              {/* Guide Category Pills */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'academic', label: 'Academics' },
                  { id: 'amenities', label: 'Amenities & Dining' },
                  { id: 'parking', label: 'Parking' },
                  { id: 'emergency', label: 'Emergency & SOS' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setGuideCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-colors ${
                      guideCategory === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Location List */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {filteredGuideLocations.map((loc) => {
                  const isSelected = selectedGuideLoc && selectedGuideLoc.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedGuideLoc(loc)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900">{loc.name}</h4>
                          <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5">{loc.description}</p>
                        </div>
                        <Badge variant={loc.category === 'emergency' ? 'error' : 'info'} size="sm">
                          {loc.code}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-400">Hours: <strong className="text-slate-700">{loc.hours}</strong></span>
                        <Button variant={isSelected ? 'primary' : 'outline'} size="xs" icon={Navigation}>
                          Locate
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guide Map */}
            <div className="lg:col-span-8">
              <Card className="p-1 border border-slate-200">
                <CampusMap
                  height="h-[480px]"
                  selectedDestination={selectedGuideLoc}
                  onSelectDestination={(loc) => setSelectedGuideLoc(loc)}
                />
              </Card>
            </div>
          </div>
        )}

        {/* Tab 5: Alerts & Notifications */}
        {portalTab === 'alerts' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Live Notifications logs */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Visit Request Alerts</h3>
                <button className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold" onClick={() => setNotifications([])}>Clear All</button>
              </div>

              <div className="space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 rounded-xl border flex gap-3 ${
                      notif.type === 'success' ? 'bg-emerald-50/30 border-emerald-200 text-emerald-900' : 'bg-red-50/30 border-red-200 text-red-900'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        notif.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {notif.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>
                      <div className="text-xs flex-1">
                        <p className="font-semibold leading-relaxed">{notif.text}</p>
                        <span className="text-[10px] text-slate-450 block mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-slate-50 border border-slate-100 text-xs text-slate-450 rounded-xl">
                    No new request updates.
                  </div>
                )}
              </div>
            </div>

            {/* General Announcements and Emergency contacts */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Emergency & Safety Contacts</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3.5 space-y-2.5 text-xs">
                    <Phone className="w-4 h-4 text-red-600" />
                    <div>
                      <h4 className="font-bold text-slate-900">Gate Security Dispatch</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">+91 80 5555 7233</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-3.5 space-y-2.5 text-xs">
                    <HeartPulse className="w-4 h-4 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-slate-900">Urgent Health Clinic</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">+91 80 5555 2273</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Safety warning */}
              <div className="p-4 bg-amber-50/50 border border-amber-200 text-amber-900 text-xs rounded-xl flex gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-950">Safety Instructions for Guests</h4>
                  <p className="text-[11px] leading-relaxed mt-1">Please ensure your digital pass QR code is readily available when entering or leaving academic blocks. All visitors must be accompanied by their host when accessing restricted laboratories.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* QR PASS DETAIL MODAL */}
      {selectedPassForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-2xl w-full max-w-sm border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-5 text-center space-y-5">
              <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3">
                <span className="font-bold uppercase tracking-wider text-slate-450">Visitor Gate Pass</span>
                <button className="text-slate-450 hover:text-white" onClick={() => setSelectedPassForQR(null)}>
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <Badge variant="navy" size="md" className="bg-emerald-600 text-white border-emerald-500 mx-auto">
                Gate Clearance Approved
              </Badge>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black">{user.name}</h3>
                <p className="text-xs text-slate-400">ID: {user.idNumber} • Verified Profile</p>
              </div>

              <div className="w-52 h-52 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center border-4 border-slate-700">
                <QrCode className="w-44 h-44 text-slate-900" />
              </div>

              <div className="text-xs space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-450 uppercase block font-semibold">Authorized Host</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedPassForQR.host}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase block">Validity Date</span>
                    <span className="text-white mt-0.5 block">{selectedPassForQR.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase block">Pass Code</span>
                    <span className="text-white font-mono mt-0.5 block">{selectedPassForQR.id}</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-3">
                Please display this QR code to the scanner at any campus gate. For help, contact Security at +91 80 5555 7233.
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

// 5. Emergency SOS Page
export const EmergencyPage = () => {
  const { addToast } = useToast();

  const triggerSOS = () => {
    addToast('EMERGENCY SOS ALERT TRANSMITTED to Campus Security Dispatch!', 'error', 'SOS TRIGGERED');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Emergency SOS & Campus Safety"
        description="One-touch emergency dispatch, security contacts, and assembly point guidance."
        breadcrumbs={[{ label: 'Emergency SOS' }]}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-red-300 bg-red-50/50 text-center p-8">
          <CardContent className="space-y-6 p-0">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-red-900">Campus Emergency Panic Button</h2>
              <p className="text-xs text-red-700 mt-1 max-w-md mx-auto">
                Pressing this button broadcasts your exact GPS location to campus security control room immediately.
              </p>
            </div>

            <Button variant="danger" size="lg" fullWidth icon={ShieldAlert} onClick={triggerSOS}>
              TRIGGER IMMEDIATE SOS ALERT
            </Button>
          </CardContent>
        </Card>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <Phone className="w-5 h-5 text-red-600" />
              <h4 className="text-sm font-bold text-slate-900">Campus Security Dispatch</h4>
              <p className="text-xs text-slate-500">+91 80 5555 7233</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Campus Health Clinic</h4>
              <p className="text-xs text-slate-500">+91 80 5555 2273</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

// 6. Admin Dashboard Page
export const AdminDashboardPage = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Admin Facility Operations Hub"
        description="System administration control center for campus infrastructure and broadcasting."
        breadcrumbs={[{ label: 'Admin Hub' }]}
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Campus Buildings', val: '14 Blocks' },
            { label: 'Active Facilities', val: '98% Operational' },
            { label: 'Pending Complaints', val: '3 Open Issues' },
            { label: 'Live Visitor Passes', val: '48 Active' },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 text-center">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">{stat.label}</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{stat.val}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

// 7. Profile & Settings Page
export const ProfileSettingsPage = () => {
  const { user } = useRole();
  const { addToast } = useToast();
  const [stairFreeDefault, setStairFreeDefault] = useState(true);

  const isVisitor = user.role === 'visitor';

  // Load visitor profile from localStorage if role is visitor
  const [visitorProfile, setVisitorProfile] = useState(() => {
    if (!isVisitor) return null;
    const saved = localStorage.getItem('visitor_profile');
    if (saved) return JSON.parse(saved);
    return {
      name: user.name,
      email: user.email,
      phone: '+1 (555) 019-2834',
      idType: "Driver's License",
      idNumber: "DL-88392-CA"
    };
  });

  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  React.useEffect(() => {
    if (isVisitor) {
      try {
        const savedVisits = localStorage.getItem('visitor_visits');
        if (savedVisits) {
          const list = JSON.parse(savedVisits);
          setActiveCount(list.filter(v => v.status === 'approved').length);
          setCompletedCount(list.filter(v => v.status === 'completed' || v.status === 'approved').length + 2);
        } else {
          setActiveCount(1);
          setCompletedCount(3);
        }
      } catch (e) {
        setActiveCount(1);
        setCompletedCount(3);
      }
    }
  }, [isVisitor]);

  const [emergencyName, setEmergencyName] = useState(() => {
    return localStorage.getItem('visitor_emergency_name') || 'Jane Jenkins';
  });
  const [emergencyPhone, setEmergencyPhone] = useState(() => {
    return localStorage.getItem('visitor_emergency_phone') || '+91 98450 12345';
  });

  const handleSaveEmergency = (e) => {
    e.preventDefault();
    localStorage.setItem('visitor_emergency_name', emergencyName);
    localStorage.setItem('visitor_emergency_phone', emergencyPhone);
    addToast('Emergency contact details saved successfully.', 'success');
  };

  const handleDownloadHistory = () => {
    const data = localStorage.getItem('visitor_visits') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${visitorProfile?.name || 'visitor'}_visit_history.json`;
    link.click();
    addToast('History download initialized.', 'success');
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your guest account and wipe all local visit clearances? This action is irreversible.')) {
      localStorage.removeItem('visitor_profile');
      localStorage.removeItem('visitor_visits');
      localStorage.removeItem('visitor_notifications');
      localStorage.removeItem('visitor_emergency_name');
      localStorage.removeItem('visitor_emergency_phone');
      addToast('Profile and logs purged. Redirecting...', 'info');
      setTimeout(() => {
        window.location.href = '/visitors';
      }, 1200);
    }
  };

  if (isVisitor) {
    return (
      <AppLayout>
        <PageHeader
          title="Guest Profile & Security Credentials"
          description="Manage security verification details, emergency contacts, and active campus clearances."
          breadcrumbs={[{ label: 'Profile & Credentials' }]}
        />

        <div className="space-y-6 max-w-4xl">
          
          {/* Visitor Statistics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase block font-bold">Active Passes</span>
                  <span className="text-base font-black text-slate-900 leading-none mt-0.5 block">{activeCount} Pass</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase block font-bold">Campus Visits</span>
                  <span className="text-base font-black text-slate-900 leading-none mt-0.5 block">{completedCount} Logged</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase block font-bold">Verification State</span>
                  <span className="text-xs font-black text-blue-700 flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-teal-650 shrink-0" /> Authorized Profile
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Account Details & Emergency Contacts */}
            <div className="lg:col-span-7 space-y-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover border" />
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{user.name}</h3>
                      <p className="text-slate-500 font-medium">{user.email}</p>
                      <div className="flex gap-1.5 pt-0.5">
                        <Badge variant="info" size="sm">{user.roleLabel}</Badge>
                        <Badge variant="success" size="sm">Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <form onSubmit={handleSaveEmergency} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Emergency Contact Name"
                        placeholder="e.g. Jane Jenkins"
                        required
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                      />
                      <Input
                        label="Emergency Contact Phone"
                        placeholder="e.g. +91 98450 12345"
                        required
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end pt-1">
                      <Button variant="primary" size="sm" type="submit">
                        Save Contact Info
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Accessibility */}
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Defaults</CardTitle>
                </CardHeader>
                <CardContent className="p-5 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-bold text-slate-900 block">Default to Stair-Free / Wheelchair Accessible Routes</span>
                      <span className="text-slate-505 block mt-0.5">Automatically select elevator and ramp paths on all map queries</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={stairFreeDefault}
                      onChange={(e) => {
                        setStairFreeDefault(e.target.checked);
                        addToast('Accessibility preferences saved', 'success');
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </label>
                </CardContent>
              </Card>

            </div>

            {/* Right Column: Verified Credentials ID Card & Data Controls */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Verified digital ID card (direct div to guarantee slate-950 dark background rendering) */}
              <div className="bg-slate-950 text-white border border-slate-900 rounded-2xl shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="p-6 space-y-6">
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WayFindYou Digital ID</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/25 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-450"></span> Verified Guest
                    </span>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <span className="text-[9px] text-slate-450 uppercase block font-semibold">Visitor Credentials</span>
                      <h4 className="text-base font-extrabold text-white leading-tight mt-0.5">{visitorProfile?.name}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-900 pt-3">
                      <div>
                        <span className="text-[9px] text-slate-455 uppercase block">ID Verification</span>
                        <span className="text-white font-bold mt-0.5 block">{visitorProfile?.idType}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-455 uppercase block">Credential No</span>
                        <span className="text-white font-mono mt-0.5 block">{visitorProfile?.idNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-4 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>Security Clearance Level 1</span>
                    </div>
                    <QrCode className="w-8 h-8 text-slate-500 opacity-60" />
                  </div>

                </div>
              </div>

              {/* Data & Privacy Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Security & Data Management</CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4 text-xs">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <div>
                        <h4 className="font-bold text-slate-900">Download Visitor Ledger</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Request a copy of all visit schedules and logs associated with your ID.</p>
                      </div>
                      <Button variant="outline" size="sm" icon={Download} onClick={handleDownloadHistory} className="shrink-0">
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                      <div>
                        <h4 className="font-bold text-rose-900">Purge Guest Account</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">Delete your visitor logs, details, and permissions from this device.</p>
                      </div>
                      <Button variant="danger" size="sm" icon={Trash2} onClick={handleDeleteProfile} className="shrink-0">
                        Purge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>

        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title="User Profile & Accessibility Settings"
        description="Manage account credentials, role permissions, and default navigation preferences."
        breadcrumbs={[{ label: 'Profile & Settings' }]}
      />

      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs">
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border" />
              <div>
                <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                <p className="text-slate-500">{user.email}</p>
                <div className="mt-1">
                  <Badge variant="info" size="sm">{user.roleLabel}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Defaults</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Default to Stair-Free / Wheelchair Accessible Routes</span>
                <span className="text-slate-500">Automatically select elevator and ramp paths on all map queries</span>
              </div>
              <input
                type="checkbox"
                checked={stairFreeDefault}
                onChange={(e) => {
                  setStairFreeDefault(e.target.checked);
                  addToast('Accessibility preferences saved', 'success');
                }}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
