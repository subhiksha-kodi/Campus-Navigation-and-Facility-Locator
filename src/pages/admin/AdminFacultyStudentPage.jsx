import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserCheck, Users, Building, Plus, Search, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminFacultyStudentPage = () => {
  const location = useLocation();
  const { addToast } = useToast();
  const { faculty, students, departments, addDepartment } = useAdmin();

  // Determine active view mode based on path or tab state
  const isFaculty = location.pathname.includes('/faculty');
  const isStudent = location.pathname.includes('/students');
  const isDept = location.pathname.includes('/departments');

  const [activeTab, setActiveTab] = useState(isFaculty ? 'faculty' : isStudent ? 'student' : isDept ? 'dept' : 'faculty');
  const [search, setSearch] = useState('');
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);

  // New Department Form State
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');
  const [hod, setHod] = useState('Dr. Manjula');
  const [building, setBuilding] = useState('Sunflower Block');

  const handleCreateDept = (e) => {
    e.preventDefault();
    addDepartment({ name: deptName, code: deptCode, hod, building });
    addToast(`Department ${deptName} created successfully!`, 'success');
    setShowAddDeptModal(false);
    setDeptName('');
    setDeptCode('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Faculty, Student & Department Management"
        description="Central administrative controls for managing academic departments, faculty rosters, student records, and HOD assignments."
        breadcrumbs={[{ label: 'Academic & Staff' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'faculty' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('faculty')}
            >
              Faculty Roster
            </Button>
            <Button
              variant={activeTab === 'student' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('student')}
            >
              Student Records
            </Button>
            <Button
              variant={activeTab === 'dept' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('dept')}
            >
              Departments
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Search Toolbar */}
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search records by ID, Name or Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* TAB 1: FACULTY MANAGEMENT */}
        {activeTab === 'faculty' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  Faculty Management Roster ({faculty.length})
                </CardTitle>
                <Badge variant="success" size="sm">Active Teaching Staff</Badge>
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
                      <th className="p-3">Specialization</th>
                      <th className="p-3 rounded-r-lg text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {faculty
                      .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase()))
                      .map((fac) => (
                        <tr key={fac.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={fac.avatar} alt={fac.name} className="w-8 h-8 rounded-full object-cover border" />
                            <span className="font-extrabold text-slate-900">{fac.name}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-900">{fac.id}</td>
                          <td className="p-3 text-slate-700">{fac.designation}</td>
                          <td className="p-3 font-semibold text-blue-700">{fac.department}</td>
                          <td className="p-3 text-slate-600">{fac.specialization}</td>
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
        )}

        {/* TAB 2: STUDENT MANAGEMENT */}
        {activeTab === 'student' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Student Management Records ({students.length})
                </CardTitle>
                <Badge variant="info" size="sm">Enrolled Roster</Badge>
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
                      <th className="p-3">Email</th>
                      <th className="p-3 rounded-r-lg text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students
                      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
                      .map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">{std.id}</td>
                          <td className="p-3 font-extrabold text-slate-900">{std.name}</td>
                          <td className="p-3 font-semibold text-blue-700">{std.department}</td>
                          <td className="p-3 text-slate-700">Year {std.year} (Sec {std.section})</td>
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
        )}

        {/* TAB 3: DEPARTMENT MANAGEMENT */}
        {activeTab === 'dept' && (
          <Card>
            <CardHeader actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddDeptModal(true)}>Add Department</Button>}>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" />
                Department Management ({departments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="navy" size="sm">{dept.code}</Badge>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{dept.id}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{dept.name}</h4>
                    <div className="text-xs text-slate-600 space-y-1 pt-1 border-t">
                      <p>HOD: <strong>{dept.hod}</strong></p>
                      <p>Primary Building: <strong>{dept.building}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CREATE DEPARTMENT MODAL */}
      {showAddDeptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add New Department</h3>
              <button onClick={() => setShowAddDeptModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateDept} className="space-y-3">
              <Input label="Department Name" value={deptName} onChange={(e) => setDeptName(e.target.value)} required />
              <Input label="Department Code (e.g. CSE)" value={deptCode} onChange={(e) => setDeptCode(e.target.value)} required />
              <Input label="HOD Name" value={hod} onChange={(e) => setHod(e.target.value)} required />
              <Input label="Primary Building" value={building} onChange={(e) => setBuilding(e.target.value)} required />

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddDeptModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Create Department</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
