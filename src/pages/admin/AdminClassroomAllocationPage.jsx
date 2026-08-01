import React, { useState } from 'react';
import { Clock, Plus, AlertTriangle } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminClassroomAllocationPage = () => {
  const { classroomAllocations, addClassroomAllocation, faculty, subjects, buildings, rooms } = useAdmin();
  const { addToast } = useToast();

  const [showAllocModal, setShowAllocModal] = useState(false);
  const [allocClass, setAllocClass] = useState('CSE III-A');
  const [allocSubject, setAllocSubject] = useState('DBMS (CS301)');
  const [allocFaculty, setAllocFaculty] = useState('Dr. Gayathri Devi');
  const [allocDay, setAllocDay] = useState('Monday');
  const [allocSlot, setAllocSlot] = useState('09:00 AM');
  const [allocBuilding, setAllocBuilding] = useState('Sunflower Block');
  const [allocRoom, setAllocRoom] = useState('SF303');
  const [conflictMsg, setConflictMsg] = useState(null);

  const handlePerformAllocation = (e) => {
    e.preventDefault();
    const warning = addClassroomAllocation({
      className: allocClass,
      subject: allocSubject,
      faculty: allocFaculty,
      day: allocDay,
      startTime: allocSlot,
      building: allocBuilding,
      floor: 3,
      room: allocRoom
    });

    if (warning) {
      setConflictMsg(warning);
      addToast(warning, 'warning');
    } else {
      addToast(`Allocated ${allocClass} to Room ${allocRoom} on ${allocDay} at ${allocSlot}`, 'success');
      setShowAllocModal(false);
      setConflictMsg(null);
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Classroom Allocation Control"
        description="Exclusive admin engine for assigning physical rooms and time slots to academic classes with built-in Conflict Detection Warnings."
        breadcrumbs={[{ label: 'Classroom Allocation' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAllocModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Allocate Classroom & Slot
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 rounded-2xl">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Conflict Detection Safeguard:</strong> The system automatically evaluates room availability and faculty schedules to prevent double-booking collisions.
          </span>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Active Classroom & Slot Allocations ({classroomAllocations.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Conflict Checked</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-lg">Class / Section</th>
                    <th className="p-3">Subject & Code</th>
                    <th className="p-3">Assigned Faculty</th>
                    <th className="p-3">Day & Time Slot</th>
                    <th className="p-3">Building Block</th>
                    <th className="p-3 rounded-r-lg">Allocated Room</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classroomAllocations.map((ca) => (
                    <tr key={ca.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-extrabold text-slate-900">{ca.className}</td>
                      <td className="p-3 font-semibold text-blue-700">{ca.subject}</td>
                      <td className="p-3 font-medium text-slate-900">{ca.faculty}</td>
                      <td className="p-3 font-bold text-slate-700">{ca.day} ({ca.startTime})</td>
                      <td className="p-3 text-slate-600">{ca.building}</td>
                      <td className="p-3">
                        <Badge variant="navy" size="sm">{ca.room}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAllocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Allocate Classroom & Slot</h3>
              <button onClick={() => setShowAllocModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {conflictMsg && (
              <div className="p-3 bg-red-600 text-white rounded-xl text-xs font-bold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{conflictMsg}</span>
              </div>
            )}

            <form onSubmit={handlePerformAllocation} className="space-y-3">
              <Select label="Select Class / Section" value={allocClass} onChange={(e) => setAllocClass(e.target.value)} options={[{ value: 'CSE III-A', label: 'CSE III-A' }, { value: 'CSE III-B', label: 'CSE III-B' }, { value: 'CSE IV-A', label: 'CSE IV-A' }]} />
              <Select label="Select Subject" value={allocSubject} onChange={(e) => setAllocSubject(e.target.value)} options={subjects.map((s) => ({ value: `${s.name} (${s.code})`, label: `${s.name} (${s.code})` }))} />
              <Select label="Select Faculty" value={allocFaculty} onChange={(e) => setAllocFaculty(e.target.value)} options={faculty.map((f) => ({ value: f.name, label: f.name }))} />
              <Select label="Day of Week" value={allocDay} onChange={(e) => setAllocDay(e.target.value)} options={[{ value: 'Monday', label: 'Monday' }, { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' }, { value: 'Friday', label: 'Friday' }]} />
              <Select label="Start Time Slot" value={allocSlot} onChange={(e) => setAllocSlot(e.target.value)} options={[{ value: '09:00 AM', label: '09:00 AM' }, { value: '10:00 AM', label: '10:00 AM' }, { value: '11:00 AM', label: '11:00 AM' }, { value: '02:00 PM', label: '02:00 PM' }]} />
              <Select label="Building Block" value={allocBuilding} onChange={(e) => setAllocBuilding(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Select label="Classroom" value={allocRoom} onChange={(e) => setAllocRoom(e.target.value)} options={rooms.map((r) => ({ value: r.number, label: `Room ${r.number} (${r.type})` }))} />

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAllocModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Confirm Allocation</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
