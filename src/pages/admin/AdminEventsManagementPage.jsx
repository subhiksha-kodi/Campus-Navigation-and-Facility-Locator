import React, { useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminEventsManagementPage = () => {
  const { events, addEvent } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-08-15');
  const [time, setTime] = useState('09:30 AM');
  const [venue, setVenue] = useState('IB Block Auditorium');
  const [audience, setAudience] = useState('Everyone');

  const handleCreateEvent = (e) => {
    e.preventDefault();
    addEvent({ title, date, time, venue, audience });
    addToast(`Campus event "${title}" created & saved!`, 'success');
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Events Management"
        description="Exclusive admin control for creating campus events, assigning venues, and mapping target audiences (Students, Faculty, Visitors, Everyone)."
        breadcrumbs={[{ label: 'Events Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Create Campus Event
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-amber-500" />
                Scheduled Campus Events ({events.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Official Schedule</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.map((evt) => (
                <div key={evt.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">Audience: {evt.audience}</Badge>
                    <span className="text-xs font-bold text-blue-600">{evt.date}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{evt.title}</h4>
                  <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-700 space-y-1">
                    <p>Time: <strong>{evt.time}</strong></p>
                    <p>Venue: <strong className="text-blue-700">{evt.venue}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CREATE EVENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Create Campus Event</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <Input label="Event Title" placeholder="e.g. AI Ethics Seminar" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input label="Event Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <Input label="Start Time" placeholder="e.g. 10:00 AM" value={time} onChange={(e) => setTime(e.target.value)} required />
              <Input label="Venue Location" placeholder="e.g. Sunflower Block Seminar Hall 1" value={venue} onChange={(e) => setVenue(e.target.value)} required />
              <Select label="Target Audience" value={audience} onChange={(e) => setAudience(e.target.value)} options={[{ value: 'Everyone', label: 'Everyone' }, { value: 'Students', label: 'Students' }, { value: 'Faculty', label: 'Faculty' }, { value: 'Visitors', label: 'Visitors' }]} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save & Publish Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
