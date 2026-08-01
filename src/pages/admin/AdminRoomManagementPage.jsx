import React, { useState } from 'react';
import { Layers, Plus, Search } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminRoomManagementPage = () => {
  const { rooms, buildings, addRoom } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const [number, setNumber] = useState('');
  const [building, setBuilding] = useState('Sunflower Block');
  const [floor, setFloor] = useState(3);
  const [type, setType] = useState('Classroom');
  const [capacity, setCapacity] = useState(60);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    addRoom({ number, building, floor: Number(floor), type, capacity: Number(capacity), lat: 12.9716, lng: 77.5946 });
    addToast(`Room ${number} added to ${building}!`, 'success');
    setShowAddModal(false);
    setNumber('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Room & Classroom Management"
        description="Exclusive admin management for room numbers, floor levels, room types (labs, seminar halls, auditoriums), and seating capacity."
        breadcrumbs={[{ label: 'Room Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add Room / Lab
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                Floors & Classrooms Inventory ({rooms.length})
              </CardTitle>
              <Badge variant="info" size="sm">Space Allocation</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-lg">Room Number</th>
                    <th className="p-3">Building Block</th>
                    <th className="p-3">Floor Level</th>
                    <th className="p-3">Room Category</th>
                    <th className="p-3">Seating Capacity</th>
                    <th className="p-3 rounded-r-lg text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rooms.map((rm) => (
                    <tr key={rm.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{rm.number}</td>
                      <td className="p-3 font-extrabold text-slate-900">{rm.building}</td>
                      <td className="p-3 font-medium text-slate-700">Floor {rm.floor}</td>
                      <td className="p-3 font-semibold text-blue-700">{rm.type}</td>
                      <td className="p-3 text-slate-700">{rm.capacity} Seats</td>
                      <td className="p-3 text-right">
                        <Badge variant="success" size="sm">{rm.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Room / Classroom</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateRoom} className="space-y-3">
              <Input label="Room Number" placeholder="e.g. SF305" value={number} onChange={(e) => setNumber(e.target.value)} required />
              <Select label="Building Block" value={building} onChange={(e) => setBuilding(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Input label="Floor Level" type="number" value={floor} onChange={(e) => setFloor(e.target.value)} required />
              <Select label="Room Category" value={type} onChange={(e) => setType(e.target.value)} options={[{ value: 'Classroom', label: 'Classroom' }, { value: 'Laboratory', label: 'Laboratory' }, { value: 'Seminar Hall', label: 'Seminar Hall' }, { value: 'Auditorium', label: 'Auditorium' }, { value: 'Office', label: 'Office' }]} />
              <Input label="Seating Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Room</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
