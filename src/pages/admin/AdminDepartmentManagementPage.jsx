import React, { useState } from 'react';
import { Building, Plus, Search, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminDepartmentManagementPage = () => {
  const { departments, addDepartment } = useAdmin();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [hod, setHod] = useState('Dr. Manjula');
  const [building, setBuilding] = useState('Sunflower Block');

  const handleCreateDept = (e) => {
    e.preventDefault();
    addDepartment({ name, code, hod, building });
    addToast(`Department ${name} (${code}) created successfully!`, 'success');
    setShowAddModal(false);
    setName('');
    setCode('');
  };

  const filteredDepts = departments.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Department Management"
        description="Exclusive control panel for creating academic departments, assigning Heads of Department (HOD), and mapping primary building blocks."
        breadcrumbs={[{ label: 'Department Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add New Department
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search departments by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" />
                Academic Departments ({filteredDepts.length})
              </CardTitle>
              <Badge variant="navy" size="sm">System Registry</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDepts.map((dept) => (
                <div key={dept.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="navy" size="sm" className="font-extrabold">{dept.code}</Badge>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{dept.id}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">{dept.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Primary Location: <strong className="text-blue-700">{dept.building}</strong></p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-semibold flex items-center justify-between">
                    <span>Head of Department:</span>
                    <strong className="text-purple-700">{dept.hod}</strong>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Create Academic Department</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateDept} className="space-y-3">
              <Input label="Department Name" placeholder="e.g. Chemical Engineering" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Department Code" placeholder="e.g. CHEM" value={code} onChange={(e) => setCode(e.target.value)} required />
              <Input label="Assigned HOD Name" value={hod} onChange={(e) => setHod(e.target.value)} required />
              <Input label="Primary Building Block" value={building} onChange={(e) => setBuilding(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Create Department</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
