import React, { useState } from 'react';
import { BookOpen, Plus, Search } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminSubjectManagementPage = () => {
  const { subjects, addSubject } = useAdmin();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [semester, setSemester] = useState('V');
  const [credits, setCredits] = useState(4);
  const [type, setType] = useState('Core Theory');

  const handleCreateSubject = (e) => {
    e.preventDefault();
    addSubject({ code, name, department, semester, credits: Number(credits), type });
    addToast(`Subject ${name} (${code}) added to ${department} curriculum!`, 'success');
    setShowAddModal(false);
    setCode('');
    setName('');
  };

  const filteredSubjects = subjects.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Subject Management"
        description="Exclusive admin registry for course subjects, subject codes, credit points, semester mappings, and core/lab classifications."
        breadcrumbs={[{ label: 'Subject Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add New Subject
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search subjects by Name or Subject Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Course Subjects Registry ({filteredSubjects.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Academic Curriculum</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((sb) => (
                <div key={sb.code} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="navy" size="sm">{sb.code}</Badge>
                    <span className="text-xs text-slate-500 font-bold">{sb.credits} Credits</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{sb.name}</h4>
                  <p className="text-xs text-slate-600 font-medium">Department: {sb.department} • Semester {sb.semester}</p>
                  <div className="pt-2 border-t flex justify-between items-center text-xs">
                    <Badge variant="info" size="sm">{sb.type}</Badge>
                    <span className="text-[10px] text-emerald-600 font-bold">Active Curriculum</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD SUBJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Academic Subject</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateSubject} className="space-y-3">
              <Input label="Subject Code" placeholder="e.g. CS305" value={code} onChange={(e) => setCode(e.target.value)} required />
              <Input label="Subject Name" placeholder="e.g. Artificial Intelligence" value={name} onChange={(e) => setName(e.target.value)} required />
              <Select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} options={[{ value: 'CSE', label: 'Computer Science & Eng' }, { value: 'IT', label: 'Information Technology' }, { value: 'ECE', label: 'Electronics & Comm Eng' }]} />
              <Select label="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} options={[{ value: 'III', label: 'Semester III' }, { value: 'IV', label: 'Semester IV' }, { value: 'V', label: 'Semester V' }, { value: 'VI', label: 'Semester VI' }, { value: 'VII', label: 'Semester VII' }]} />
              <Input label="Credits" type="number" value={credits} onChange={(e) => setCredits(e.target.value)} required />
              <Select label="Course Type" value={type} onChange={(e) => setType(e.target.value)} options={[{ value: 'Core Theory', label: 'Core Theory' }, { value: 'Practical Lab', label: 'Practical Lab' }, { value: 'Seminar', label: 'Seminar' }]} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Subject</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
