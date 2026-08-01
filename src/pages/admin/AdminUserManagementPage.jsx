import React, { useState } from 'react';
import { Users, Search, Filter, Plus, CheckCircle2, XCircle, Edit, Eye, ShieldCheck, Mail, Phone, Building, UserCheck, UserX } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminUserManagementPage = () => {
  const { users, addUser, approveUser, rejectUser, toggleUserStatus } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'pending'
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Rejection Dialog State
  const [rejectingUserId, setRejectingUserId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Form State for User Creation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('Computer Science & Eng');

  const handleCreateUser = (e) => {
    e.preventDefault();
    addUser({ name, email, phone, role, department });
    addToast(`User ${name} created successfully with APPROVED status.`, 'success');
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesDept = deptFilter === 'All' || u.department === deptFilter;
    return matchesSearch && matchesRole && matchesDept;
  });

  const rosterUsers = filteredUsers.filter((u) => u.status === 'Active' || u.status === 'approved' || u.status === 'Deactivated');
  const pendingUsers = filteredUsers.filter((u) => u.status === 'pending');
  const pendingCount = users.filter((u) => u.status === 'pending').length;

  return (
    <AdminLayout>
      <PageHeader
        title="User Management"
        description="Admin controls for vetting pending accounts, configuring roles, and allocating campus access credentials."
        breadcrumbs={[{ label: 'User Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add New System User
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Filters & Search Toolbar */}
        <Card className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              icon={Search}
              placeholder="Search by User ID, Name or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Select
              label="Filter by Role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Roles (Student, Faculty, Admin, Security, Visitor)' },
                { value: 'student', label: 'Student' },
                { value: 'faculty', label: 'Faculty' },
                { value: 'admin', label: 'Admin' },
                { value: 'security', label: 'Campus Security' },
                { value: 'visitor', label: 'Visitor' },
              ]}
            />

            <Select
              label="Filter by Department"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Departments' },
                { value: 'Computer Science & Eng', label: 'Computer Science & Eng' },
                { value: 'Information Technology', label: 'Information Technology' },
                { value: 'Software Engineering', label: 'Software Engineering' },
                { value: 'Facility & IT Ops', label: 'Facility & IT Ops' },
                { value: 'Guest / Parent', label: 'Guest / Parent' }
              ]}
            />
          </div>
        </Card>

        {/* Tab Selection */}
        <div className="flex gap-2 border-b border-slate-200 pb-px">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 text-sm font-extrabold border-b-2 transition-all ${
              activeTab === 'roster'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            System Users Roster ({rosterUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 text-sm font-extrabold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pending Approvals
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              pendingCount > 0
                ? 'bg-amber-100 text-amber-800 border border-amber-250 animate-pulse'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {pendingCount}
            </span>
          </button>
        </div>

        {/* Roster Tab View */}
        {activeTab === 'roster' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Users Roster</CardTitle>
                <Badge variant="info" size="sm">Role Protected</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">User ID</th>
                      <th className="p-3">User Name & Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rosterUsers.map((u) => {
                      const isActive = u.status === 'Active' || u.status === 'approved';

                      return (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">{u.id}</td>
                          <td className="p-3">
                            <span className="font-extrabold text-slate-900 block">{u.name}</span>
                            <span className="text-[11px] text-slate-500 block">{u.email}</span>
                          </td>
                          <td className="p-3">
                            <Badge variant={u.role === 'admin' ? 'navy' : u.role === 'faculty' ? 'info' : 'neutral'} size="sm" className="capitalize">
                              {u.role}
                            </Badge>
                          </td>
                          <td className="p-3 font-medium text-slate-700">{u.department}</td>
                          <td className="p-3 text-slate-600">{u.phone}</td>
                          <td className="p-3">
                            <Badge variant={isActive ? 'success' : 'error'} size="sm">
                              {isActive ? 'Active' : 'Deactivated'}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant={isActive ? 'danger' : 'outline'}
                              size="sm"
                              onClick={() => {
                                toggleUserStatus(u.id);
                                addToast(`User ${u.name} status updated`, 'info');
                              }}
                            >
                              {isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    {rosterUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">No registered system users match current filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Approvals Tab View */}
        {activeTab === 'pending' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vetting Queue & Registration Approvals</CardTitle>
                <Badge variant="warning" size="sm">Requires Verification</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-amber-50 text-slate-900 font-bold uppercase text-[10px] border border-amber-100">
                    <tr>
                      <th className="p-3 rounded-l-lg">Requested Role</th>
                      <th className="p-3">Applicant Name & Email</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Registration Date</th>
                      <th className="p-3 rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3">
                          <Badge variant={u.role === 'faculty' ? 'info' : 'neutral'} size="sm" className="capitalize">
                            {u.role}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-extrabold text-slate-900 block">{u.name}</span>
                          <span className="text-[11px] text-slate-500 block">{u.email}</span>
                        </td>
                        <td className="p-3 font-medium text-slate-700">{u.department}</td>
                        <td className="p-3 text-slate-600">{u.phone || 'N/A'}</td>
                        <td className="p-3 text-slate-500 font-mono">{u.created_at || new Date().toISOString().split('T')[0]}</td>
                        <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                          <Button
                            variant="primary"
                            size="sm"
                            icon={UserCheck}
                            onClick={() => {
                              approveUser(u.id);
                              addToast(`Successfully approved access for ${u.name}.`, 'success');
                            }}
                            className="!bg-teal-650 hover:!bg-teal-700 text-white font-extrabold"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={UserX}
                            onClick={() => setRejectingUserId(u.id)}
                            className="!border-rose-300 hover:!bg-rose-50 text-rose-600 font-extrabold"
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {pendingUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">No pending registration requests.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CREATE USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add New System User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <Select
                label="Assigned Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'faculty', label: 'Faculty' },
                  { value: 'admin', label: 'Administrator' },
                  { value: 'security', label: 'Campus Security' },
                  { value: 'visitor', label: 'Visitor' }
                ]}
              />
              <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Create User</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REJECT REASON DIALOG MODAL */}
      {rejectingUserId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Specify Rejection Reason</h3>
              <button onClick={() => setRejectingUserId(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-slate-500 leading-normal">Provide an optional vetting notes reason for rejecting this campus registration access request.</p>
              <Input
                label="Rejection Reason (Optional)"
                placeholder="e.g. Invalid college ID credential prefix"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setRejectingUserId(null)}>Cancel</Button>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => {
                    rejectUser(rejectingUserId, rejectionReason);
                    addToast('Registration request has been rejected.', 'info');
                    setRejectingUserId(null);
                    setRejectionReason('');
                  }}
                  className="!bg-rose-600 hover:!bg-rose-700 text-white font-extrabold"
                >
                  Confirm Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
