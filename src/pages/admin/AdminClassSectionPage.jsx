import React, { useState } from 'react';
import { Layers, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminClassSectionPage = () => {
  const { classes, addClassSection } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('III');
  const [section, setSection] = useState('C');
  const [semester, setSemester] = useState('V');
  const [strength, setStrength] = useState(60);

  const handleCreateClass = (e) => {
    e.preventDefault();
    addClassSection({
      department,
      year,
      section,
      semester,
      strength: Number(strength)
    });
    addToast(`Class section ${department} Year ${year}-${section} created!`, 'success');
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Class & Section Management"
        description="Exclusive admin registry for student class sections, academic years, semester cohorts, and total class strengths."
        breadcrumbs={[{ label: 'Class / Section' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Create Class Section
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Academic Classes & Cohorts ({classes.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Academic Year 2026-2027</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {classes.map((cls) => (
                <div key={cls.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">{cls.department}</Badge>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{cls.id}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">{cls.department} Year {cls.year}-{cls.section}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Semester {cls.semester} • Session {cls.academicYear}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-700 flex items-center justify-between font-semibold">
                    <span>Class Strength:</span>
                    <strong className="text-blue-700">{cls.strength} Students</strong>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CREATE CLASS SECTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Create Class Section</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateClass} className="space-y-3">
              <Select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} options={[{ value: 'CSE', label: 'Computer Science & Eng' }, { value: 'IT', label: 'Information Technology' }, { value: 'ECE', label: 'Electronics & Comm Eng' }]} />
              <Select label="Year Level" value={year} onChange={(e) => setYear(e.target.value)} options={[{ value: 'I', label: 'Year I' }, { value: 'II', label: 'Year II' }, { value: 'III', label: 'Year III' }, { value: 'IV', label: 'Year IV' }]} />
              <Select label="Section" value={section} onChange={(e) => setSection(e.target.value)} options={[{ value: 'A', label: 'Section A' }, { value: 'B', label: 'Section B' }, { value: 'C', label: 'Section C' }]} />
              <Select label="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} options={[{ value: 'III', label: 'Semester III' }, { value: 'V', label: 'Semester V' }, { value: 'VII', label: 'Semester VII' }]} />
              <Input label="Total Class Strength" type="number" value={strength} onChange={(e) => setStrength(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Create Class Section</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
