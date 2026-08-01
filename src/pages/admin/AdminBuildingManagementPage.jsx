import React, { useState } from 'react';
import { Building2, Plus, Search } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminBuildingManagementPage = () => {
  const { buildings, addBuilding } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [floors, setFloors] = useState(4);
  const [description, setDescription] = useState('');

  const handleCreateBuilding = (e) => {
    e.preventDefault();
    addBuilding({ name, code, floors: Number(floors), description, contact: 'Admin Office (Ext 100)', openTime: '07:30 AM', closeTime: '09:00 PM', lat: 12.9716, lng: 77.5946 });
    addToast(`Building ${name} added to campus registry!`, 'success');
    setShowAddModal(false);
    setName('');
    setCode('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Building Management"
        description="Exclusive administrative control panel for creating campus blocks, defining floor counts, and managing operational hours."
        breadcrumbs={[{ label: 'Building Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add Campus Building Block
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Campus Buildings Registry ({buildings.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Master Location Index</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buildings.map((bld) => (
                <div key={bld.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="navy" size="sm" className="font-extrabold">{bld.code}</Badge>
                      <h4 className="text-lg font-extrabold text-slate-900 mt-1">{bld.name}</h4>
                    </div>
                    <Badge variant={bld.status === 'Active' ? 'success' : 'error'} size="sm">{bld.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{bld.description}</p>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floors</span>
                      <span className="font-bold text-slate-900 block">{bld.floors} Floors</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Timings</span>
                      <span className="font-bold text-slate-900 block">{bld.openTime} - {bld.closeTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Contact</span>
                      <span className="font-bold text-blue-700 block truncate">{bld.contact}</span>
                    </div>
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
              <h3 className="text-base font-extrabold text-slate-900">Add Campus Building</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateBuilding} className="space-y-3">
              <Input label="Building Name" placeholder="e.g. Technology Block" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Building Code" placeholder="e.g. TB" value={code} onChange={(e) => setCode(e.target.value)} required />
              <Input label="Total Floors" type="number" value={floors} onChange={(e) => setFloors(e.target.value)} required />
              <Input label="Description" placeholder="Brief block details..." value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Building</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
