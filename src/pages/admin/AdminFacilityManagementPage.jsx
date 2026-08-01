import React, { useState } from 'react';
import { Shield, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminFacilityManagementPage = () => {
  const { facilities, buildings, addFacility } = useAdmin();
  const { addToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Printer');
  const [building, setBuilding] = useState('Sunflower Block');
  const [floor, setFloor] = useState(1);

  const handleCreateFacility = (e) => {
    e.preventDefault();
    addFacility({ name, category, building, floor: Number(floor), room: `${building} F${floor}`, hours: '08:00 AM - 08:00 PM', lat: 12.9716, lng: 77.5946 });
    addToast(`Facility ${name} added!`, 'success');
    setShowAddModal(false);
    setName('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Facility Management"
        description="Exclusive admin management for campus amenities, printers, Wi-Fi hubs, ATMs, drinking water stations, lifts, and cafeteria operational hours."
        breadcrumbs={[{ label: 'Facility Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add Campus Facility
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                Campus Amenities & Facilities Registry ({facilities.length})
              </CardTitle>
              <Badge variant="success" size="sm">Operational Inventory</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">{fac.category}</Badge>
                    <Badge variant="success" size="sm">{fac.availability}</Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{fac.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{fac.building} • Floor {fac.floor} ({fac.room})</p>
                  <p className="text-[11px] text-slate-400">Operating Hours: {fac.hours}</p>
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
              <h3 className="text-base font-extrabold text-slate-900">Add Campus Facility</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateFacility} className="space-y-3">
              <Input label="Facility Name" placeholder="e.g. Mechanical Lab Wi-Fi Hub" value={name} onChange={(e) => setName(e.target.value)} required />
              <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: 'Printer', label: 'Printer' }, { value: 'Wi-Fi', label: 'Wi-Fi' }, { value: 'Drinking Water', label: 'Drinking Water' }, { value: 'ATM', label: 'ATM' }, { value: 'Lift', label: 'Lift' }, { value: 'Washroom', label: 'Washroom' }, { value: 'Cafeteria', label: 'Cafeteria' }]} />
              <Select label="Building Block" value={building} onChange={(e) => setBuilding(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Input label="Floor Level" type="number" value={floor} onChange={(e) => setFloor(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Facility</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
