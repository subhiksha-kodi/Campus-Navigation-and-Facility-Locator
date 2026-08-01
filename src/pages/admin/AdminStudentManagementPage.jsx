import React, { useState } from 'react';
import { Users, Search, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminStudentManagementPage = () => {
  const { students, addUser } = useAdmin();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('III');
  const [section, setSection] = useState('A');

  const handleCreateStudent = (e) => {
    e.preventDefault();
    addUser({
      name,
      email,
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      role: 'student',
      department
    });
    addToast(`Student ${name} enrolled successfully in ${department} Year ${year}-${section}!`, 'success');
    setShowAddModal(false);
    setName('');
    setEmail('');
  };

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Student Management"
        description="Exclusive admin registry for student enrollment records, section assignments, academic year tracking, and student status."
        breadcrumbs={[{ label: 'Student Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add New Student
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search students by Name, Register ID or Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Student Directory ({filteredStudents.length})
              </CardTitle>
              <Badge variant="info" size="sm">Active Enrolled Students</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-lg">Student ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Year & Section</th>
                    <th className="p-3">Contact Email</th>
                    <th className="p-3 rounded-r-lg text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{std.id}</td>
                      <td className="p-3 font-extrabold text-slate-900">{std.name}</td>
                      <td className="p-3 font-semibold text-blue-700">{std.department}</td>
                      <td className="p-3 font-medium text-slate-700">Year {std.year} (Section {std.section})</td>
                      <td className="p-3 text-slate-600">{std.email}</td>
                      <td className="p-3 text-right">
                        <Badge variant="success" size="sm">{std.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD STUDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Enroll New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateStudent} className="space-y-3">
              <Input label="Student Full Name" placeholder="e.g. Hariharan S." value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email Address" type="email" placeholder="e.g. hariharan.std@campus.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} options={[{ value: 'CSE', label: 'Computer Science & Eng' }, { value: 'IT', label: 'Information Technology' }, { value: 'ECE', label: 'Electronics & Comm Eng' }, { value: 'MECH', label: 'Mechanical Eng' }]} />
              <Select label="Year" value={year} onChange={(e) => setYear(e.target.value)} options={[{ value: 'I', label: 'Year I' }, { value: 'II', label: 'Year II' }, { value: 'III', label: 'Year III' }, { value: 'IV', label: 'Year IV' }]} />
              <Select label="Section" value={section} onChange={(e) => setSection(e.target.value)} options={[{ value: 'A', label: 'Section A' }, { value: 'B', label: 'Section B' }, { value: 'C', label: 'Section C' }]} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Enroll Student</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
