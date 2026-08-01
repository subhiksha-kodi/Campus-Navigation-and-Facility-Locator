import React, { useState } from 'react';
import { BookOpen, Layers, UserPlus, Clock, Calendar, UserCheck, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useSubstitution } from '../../context/SubstitutionContext';
import { useToast } from '../../context/ToastContext';

export const AdminAcademicAllocationPage = () => {
  const { subjects, classes, facultyAllocations, classroomAllocations, addClassroomAllocation, faculty, buildings, rooms } = useAdmin();
  const { pendingRequests, assignSubstitute } = useSubstitution();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('classroom-allocation');
  const [showAllocModal, setShowAllocModal] = useState(false);

  // Form State for Classroom Allocation
  const [allocClass, setAllocClass] = useState('CSE III-A');
  const [allocSubject, setAllocSubject] = useState('DBMS (CS301)');
  const [allocFaculty, setAllocFaculty] = useState('Dr. Gayathri Devi');
  const [allocDay, setAllocDay] = useState('Monday');
  const [allocSlot, setAllocSlot] = useState('09:00 AM');
  const [allocBuilding, setAllocBuilding] = useState('Sunflower Block');
  const [allocRoom, setAllocRoom] = useState('SF303');

  // Conflict state
  const [conflictMsg, setConflictMsg] = useState(null);

  const handlePerformClassroomAllocation = (e) => {
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
        title="Academic Allocation & Timetable Control"
        description="Core Admin Control Engine: Faculty allocation to subjects/classes, classroom scheduling, conflict detection, master timetable creation, and substitution assignments."
        breadcrumbs={[{ label: 'Academic & Allocation' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant={activeTab === 'classroom-allocation' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('classroom-allocation')}>
              Classroom Allocation
            </Button>
            <Button variant={activeTab === 'faculty-allocation' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('faculty-allocation')}>
              Faculty Allocation
            </Button>
            <Button variant={activeTab === 'substitution' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('substitution')}>
              Substitution ({pendingRequests.length})
            </Button>
            <Button variant={activeTab === 'subjects' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('subjects')}>
              Subjects & Classes
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* TAB 1: CLASSROOM ALLOCATION WITH CONFLICT DETECTION */}
        {activeTab === 'classroom-allocation' && (
          <Card>
            <CardHeader actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAllocModal(true)}>New Classroom Allocation</Button>}>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Classroom & Slot Allocation Control Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Conflict Safeguard Engine Active:</strong> System automatically checks for same room + same time or same faculty + same time collisions before saving.
                </span>
              </div>

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
        )}

        {/* TAB 2: FACULTY ALLOCATION */}
        {activeTab === 'faculty-allocation' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Faculty to Subject & Class Allocations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {facultyAllocations.map((fa) => (
                  <div key={fa.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="info" size="sm">{fa.className}</Badge>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{fa.id}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{fa.subjectName} ({fa.subjectCode})</h4>
                    <p className="text-xs font-semibold text-emerald-700 pt-1 border-t">Assigned Teacher: {fa.facultyName}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: FACULTY SUBSTITUTION ALLOCATION */}
        {activeTab === 'substitution' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                Faculty Substitution Requests & Allocation Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Unavailability Request #{req.id}</span>
                        <h4 className="text-base font-extrabold text-slate-900">{req.originalFaculty}</h4>
                        <p className="text-xs text-slate-500">Reason: {req.reason}</p>
                      </div>
                      <Badge variant={req.status === 'Assigned' ? 'success' : 'warning'} size="sm">
                        {req.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border text-xs text-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Subject</span>
                        <span className="font-bold text-slate-900 block">{req.subject}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Class</span>
                        <span className="font-bold text-slate-900 block">{req.className}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Date & Time</span>
                        <span className="font-bold text-slate-900 block">{req.date} ({req.timeSlot})</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Venue</span>
                        <span className="font-bold text-blue-700 block">{req.venue}</span>
                      </div>
                    </div>

                    {req.assignedSubstitute && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between">
                        <span>Assigned Substitute: {req.assignedSubstitute}</span>
                        <Badge variant="success" size="sm">Notification Dispatched</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 4: SUBJECTS & CLASSES */}
        {activeTab === 'subjects' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Subjects & Academic Classes Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((sb) => (
                  <div key={sb.code} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="navy" size="sm">{sb.code}</Badge>
                      <span className="text-xs text-slate-500 font-semibold">{sb.credits} Credits</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{sb.name}</h4>
                    <p className="text-xs text-slate-500">Dept: {sb.department} • Semester {sb.semester} ({sb.type})</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ALLOCATE CLASSROOM MODAL */}
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

            <form onSubmit={handlePerformClassroomAllocation} className="space-y-3">
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
