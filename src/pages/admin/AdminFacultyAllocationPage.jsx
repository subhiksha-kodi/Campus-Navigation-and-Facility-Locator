import React, { useState } from 'react';
import { UserPlus, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminFacultyAllocationPage = () => {
  const { facultyAllocations, addFacultyAllocation, faculty, subjects, classes } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [selectedClass, setSelectedClass] = useState('CSE III-A');
  const [selectedSubject, setSelectedSubject] = useState('Database Management Systems (CS301)');
  const [selectedFaculty, setSelectedFaculty] = useState('Dr. Gayathri Devi');

  const handleCreateAllocation = (e) => {
    e.preventDefault();
    addFacultyAllocation({
      className: selectedClass,
      subjectName: selectedSubject,
      facultyName: selectedFaculty
    });
    addToast(`Assigned ${selectedFaculty} to teach ${selectedSubject} for ${selectedClass}!`, 'success');
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Faculty Allocation Control"
        description="Exclusive admin control engine for assigning faculty members to specific subjects and academic class sections."
        breadcrumbs={[{ label: 'Faculty Allocation' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            New Faculty Allocation
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Active Faculty to Subject Assignments ({facultyAllocations.length})
              </CardTitle>
              <Badge variant="success" size="sm">Confirmed Allocations</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {facultyAllocations.map((fa) => (
                <div key={fa.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">{fa.className}</Badge>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{fa.id}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">{fa.subjectName} ({fa.subjectCode})</h4>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold">
                    Assigned Teacher: {fa.facultyName}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW FACULTY ALLOCATION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Assign Faculty to Subject</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateAllocation} className="space-y-3">
              <Select label="Select Class Section" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} options={[{ value: 'CSE III-A', label: 'CSE III-A' }, { value: 'CSE III-B', label: 'CSE III-B' }, { value: 'CSE IV-A', label: 'CSE IV-A' }]} />
              <Select label="Select Course Subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} options={subjects.map((s) => ({ value: `${s.name} (${s.code})`, label: `${s.name} (${s.code})` }))} />
              <Select label="Select Faculty Member" value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} options={faculty.map((f) => ({ value: f.name, label: f.name }))} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Confirm Allocation</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
