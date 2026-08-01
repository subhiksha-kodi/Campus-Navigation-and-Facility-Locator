import React, { useState } from 'react';
import { UserCheck, Search, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminFacultyManagementPage = () => {
  const { faculty, addUser } = useAdmin();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [department, setDepartment] = useState('Computer Science & Eng');
  const [office, setOffice] = useState('Sunflower Block SF-201');

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    addUser({
      name,
      email,
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      role: 'faculty',
      department
    });
    addToast(`Faculty member ${name} added successfully!`, 'success');
    setShowAddModal(false);
    setName('');
    setEmail('');
  };

  const filteredFaculty = faculty.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase()) || f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Faculty Management"
        description="Exclusive admin registry for faculty records, academic designations, department assignments, office locations, and teaching profiles."
        breadcrumbs={[{ label: 'Faculty Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add Faculty Member
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search faculty by Name, Faculty ID or Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                Faculty Roster ({filteredFaculty.length})
              </CardTitle>
              <Badge variant="success" size="sm">Active Teaching Roster</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-lg">Faculty Member</th>
                    <th className="p-3">Faculty ID</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Office Location</th>
                    <th className="p-3 rounded-r-lg text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFaculty.map((fac) => (
                    <tr key={fac.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={fac.avatar} alt={fac.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <span className="font-extrabold text-slate-900 block">{fac.name}</span>
                          <span className="text-[11px] text-slate-500 block">{fac.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">{fac.id}</td>
                      <td className="p-3 font-medium text-slate-700">{fac.designation}</td>
                      <td className="p-3 font-semibold text-blue-700">{fac.department}</td>
                      <td className="p-3 text-slate-600 font-semibold">{fac.office_location || 'Sunflower Block, Room SF-201'}</td>
                      <td className="p-3 text-right">
                        <Badge variant="success" size="sm">Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD FACULTY MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add New Faculty Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateFaculty} className="space-y-3">
              <Input label="Faculty Name" placeholder="e.g. Dr. Revathi" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email Address" type="email" placeholder="e.g. revathi@campus.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Select label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} options={[{ value: 'Professor', label: 'Professor' }, { value: 'Associate Professor', label: 'Associate Professor' }, { value: 'Assistant Professor', label: 'Assistant Professor' }]} />
              <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
              <Input label="Office Location" value={office} onChange={(e) => setOffice(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Faculty Member</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
