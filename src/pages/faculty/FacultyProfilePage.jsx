import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, MapPin, KeyRound, LogOut, Edit, Lock, CheckCircle2 } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { INITIAL_FACULTY_PROFILE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';
import { useRole } from '../../context/RoleContext';

export const FacultyProfilePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { switchRole } = useRole();

  const [profile, setProfile] = useState(INITIAL_FACULTY_PROFILE);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editEmail, setEditEmail] = useState(profile.email);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...profile, phone: editPhone, email: editEmail });
    setEditModalOpen(false);
    addToast('Faculty profile information updated', 'success');
  };

  const handleLogout = () => {
    switchRole('student');
    addToast('Logged out of Faculty Portal', 'info');
    navigate('/login');
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Profile & Office Info"
        description="Personal, academic designation, and campus office location parameters."
        breadcrumbs={[{ label: 'Faculty Profile' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Edit} onClick={() => setEditModalOpen(true)}>
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" icon={Lock} onClick={() => setPasswordModalOpen(true)}>
              Change Password
            </Button>
            <Button variant="danger" size="sm" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        }
      />

      <div className="max-w-3xl space-y-6">
        {/* Profile Card Header */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{profile.name}</h2>
                <Badge variant="navy" size="sm">{profile.faculty_id}</Badge>
              </div>
              <p className="text-sm font-semibold text-blue-600">{profile.designation}</p>
              <p className="text-xs text-slate-500">{profile.department}</p>
              <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-mono mt-1">
                Office: {profile.office_location}
              </span>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Full Name</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Faculty ID</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.faculty_id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Official Email</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Contact Number</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Department</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.department}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Designation</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.designation}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Areas of Specialization</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.specialization}</span>
            </div>
          </CardContent>
        </Card>

        {/* Campus Information */}
        <Card>
          <CardHeader>
            <CardTitle>Campus Office Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Department Building</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">{profile.building}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floor</span>
              <span className="font-bold text-slate-900 block text-sm mt-0.5">Floor {profile.floor}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Office Room</span>
              <span className="font-bold text-blue-700 block text-sm mt-0.5">Room {profile.room}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Faculty Profile">
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input label="Email Address" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
          <Input label="Phone Number" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} required />
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="md" fullWidth onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="md" fullWidth>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="Change Account Password">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPasswordModalOpen(false);
            addToast('Password updated successfully', 'success');
          }}
          className="space-y-4"
        >
          <Input label="Current Password" type="password" required />
          <Input label="New Password" type="password" required />
          <Input label="Confirm New Password" type="password" required />
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="md" fullWidth onClick={() => setPasswordModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="md" fullWidth>Update Password</Button>
          </div>
        </form>
      </Modal>
    </FacultyLayout>
  );
};
