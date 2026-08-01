import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminTimetableManagementPage = () => {
  const { classroomAllocations, addClassroomAllocation, subjects, faculty, buildings, rooms } = useAdmin();
  const { addToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [day, setDay] = useState('Monday');
  const [slot, setSlot] = useState('09:00 AM');
  const [subject, setSubject] = useState('DBMS (CS301)');
  const [className, setClassName] = useState('CSE III-A');
  const [facName, setFacName] = useState('Dr. Gayathri Devi');
  const [bldName, setBldName] = useState('Sunflower Block');
  const [roomNum, setRoomNum] = useState('SF303');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAddTimetableEntry = (e) => {
    e.preventDefault();
    addClassroomAllocation({
      className,
      subject,
      faculty: facName,
      day,
      startTime: slot,
      building: bldName,
      floor: 3,
      room: roomNum
    });
    addToast(`Added timetable entry for ${className} on ${day} at ${slot}!`, 'success');
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Timetable Management"
        description="Master Timetable Control Center: Central creation and management of weekly class schedules across all departments."
        breadcrumbs={[{ label: 'Timetable Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Add Timetable Entry
          </Button>
        }
      />

      <div className="space-y-6">
        {days.map((dayName) => {
          const dayEntries = classroomAllocations.filter((ca) => ca.day === dayName);

          return (
            <Card key={dayName}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <CardTitle>{dayName} Schedule Matrix</CardTitle>
                  </div>
                  <Badge variant="info" size="sm">{dayEntries.length} Scheduled Sessions</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {dayEntries.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No class sessions scheduled for {dayName}.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayEntries.map((entry) => (
                      <div key={entry.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600">{entry.startTime}</span>
                          <Badge variant="navy" size="sm">{entry.room}</Badge>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900">{entry.subject}</h4>
                        <p className="text-xs text-slate-600 font-medium">Class: <strong>{entry.className}</strong> • Teacher: <strong>{entry.faculty}</strong></p>
                        <p className="text-[11px] text-slate-400 font-semibold">{entry.building}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ADD TIMETABLE ENTRY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Master Timetable Entry</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleAddTimetableEntry} className="space-y-3">
              <Select label="Day of Week" value={day} onChange={(e) => setDay(e.target.value)} options={[{ value: 'Monday', label: 'Monday' }, { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' }, { value: 'Friday', label: 'Friday' }]} />
              <Select label="Time Slot" value={slot} onChange={(e) => setSlot(e.target.value)} options={[{ value: '09:00 AM', label: '09:00 AM' }, { value: '10:00 AM', label: '10:00 AM' }, { value: '11:00 AM', label: '11:00 AM' }, { value: '02:00 PM', label: '02:00 PM' }]} />
              <Select label="Class Section" value={className} onChange={(e) => setClassName(e.target.value)} options={[{ value: 'CSE III-A', label: 'CSE III-A' }, { value: 'CSE III-B', label: 'CSE III-B' }, { value: 'CSE IV-A', label: 'CSE IV-A' }]} />
              <Select label="Course Subject" value={subject} onChange={(e) => setSubject(e.target.value)} options={subjects.map((s) => ({ value: `${s.name} (${s.code})`, label: `${s.name} (${s.code})` }))} />
              <Select label="Assigned Faculty" value={facName} onChange={(e) => setFacName(e.target.value)} options={faculty.map((f) => ({ value: f.name, label: f.name }))} />
              <Select label="Building Block" value={bldName} onChange={(e) => setBldName(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Select label="Allocated Room" value={roomNum} onChange={(e) => setRoomNum(e.target.value)} options={rooms.map((r) => ({ value: r.number, label: `Room ${r.number}` }))} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Timetable Entry</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
