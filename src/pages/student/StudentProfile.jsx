import React, { useState } from 'react';
import { User, Phone, Mail, Lock, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentProfile = () => {
  const { student, updateProfile } = useStudent();
  const { addToast } = useToast();

  const [phone, setPhone] = useState(student.phone);
  const [email, setEmail] = useState(student.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePhone = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    updateProfile({ phone });
    addToast('Phone number updated successfully!', 'success');
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    updateProfile({ email });
    addToast('Campus email updated successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast('New password and confirmation do not match', 'error');
      return;
    }
    addToast('Account password changed successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Student Profile"
        description="View and update your personal student details, contact numbers, and security credentials."
        breadcrumbs={[{ label: 'Student Profile' }]}
      />

      <div className="max-w-4xl space-y-6">
        {/* Profile Card Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-md border-4 border-white shrink-0">
                {student.name.charAt(0)}
              </div>

              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                  <Badge variant="info" size="sm">Register No: {student.id}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Department of {student.department} • Year {student.year} (Section {student.section})
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    {student.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {student.phone}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detailed Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">Academic & Department Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Student Name:</span>
                <span className="font-bold text-slate-900">{student.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Register Number / ID:</span>
                <span className="font-mono font-bold text-blue-600">{student.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Department:</span>
                <span className="font-bold text-slate-900">{student.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Year of Study:</span>
                <span className="font-bold text-slate-900">Year {student.year}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Section:</span>
                <span className="font-bold text-slate-900">Section {student.section}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Cumulative CGPA:</span>
                <span className="font-bold text-emerald-600">{student.cgpa} / 10.0</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details & Update Forms */}
          <div className="space-y-6">
            {/* Update Phone */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Update Phone Number</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <form onSubmit={handleUpdatePhone} className="space-y-3">
                  <Input
                    label="Mobile Phone Number"
                    icon={Phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="primary" size="sm" fullWidth icon={CheckCircle2}>
                    Save Phone Number
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Update Email */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Update Email Address</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <form onSubmit={handleUpdateEmail} className="space-y-3">
                  <Input
                    label="Campus Email"
                    type="email"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="primary" size="sm" fullWidth icon={CheckCircle2}>
                    Save Email Address
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Change Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Change Account Password
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" size="md" icon={ShieldCheck}>
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
