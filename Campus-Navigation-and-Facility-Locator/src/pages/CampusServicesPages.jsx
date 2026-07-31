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
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  QrCode,
  Phone,
  BarChart2,
  FileText,
  Accessibility
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
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
  const [passGenerated, setPassGenerated] = useState(false);

  return (
    <AppLayout>
      <PageHeader
        title="Visitor Registration & Digital Pass"
        description="Register campus guest entries and generate digital QR passes for security gate check-in."
        breadcrumbs={[{ label: 'Visitor Pass' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Guest Entry Registration</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPassGenerated(true);
                  addToast('Visitor Digital Pass generated successfully!', 'success');
                }}
                className="space-y-4"
              >
                <Input label="Visitor Full Name" placeholder="Sarah Jenkins" required />
                <Input label="Mobile Phone Number" placeholder="+1 (555) 019-2831" required />
                <Input label="Purpose of Visit" placeholder="Guest Lecture / Parent Visit" required />
                <Input label="Visiting Department / Host Name" placeholder="Dr. Robert Chen (CS Dept)" required />
                <Button type="submit" variant="primary" size="md" fullWidth icon={QrCode}>
                  Generate Gate Pass QR
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Digital Pass Preview */}
        <div className="lg:col-span-5">
          {passGenerated ? (
            <Card className="bg-slate-900 text-white text-center p-6 border-slate-800">
              <CardContent className="space-y-4 p-0">
                <Badge variant="navy" size="md" className="bg-emerald-600 text-white border-emerald-500">
                  Approved Gate Entry Pass
                </Badge>
                <h3 className="text-lg font-bold">Visitor: Sarah Jenkins</h3>
                <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center border-4 border-slate-700">
                  <QrCode className="w-36 h-36 text-slate-900" />
                </div>
                <p className="text-xs text-slate-400">Pass Code: <strong>VPASS-88392</strong> • Valid Today Only</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-50 border-slate-200 p-8 text-center text-xs text-slate-500">
              Fill form on left to generate QR entry pass for campus gates.
            </Card>
          )}
        </div>
      </div>
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
              <p className="text-xs text-slate-500">+1 (800) 555-SAFE (7233)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Campus Health Clinic</h4>
              <p className="text-xs text-slate-500">+1 (800) 555-CARE (2273)</p>
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
