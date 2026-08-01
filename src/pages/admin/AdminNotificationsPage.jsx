import React, { useState } from 'react';
import { Bell, Send, Clock, Radio } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminNotificationsPage = () => {
  const { broadcasts, addBroadcastNotification } = useAdmin();
  const { addToast } = useToast();
  const [role, setRole] = useState('Everyone');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleBroadcast = (e) => {
    e.preventDefault();
    addBroadcastNotification({ role, title, message });
    addToast(`Broadcast announcement sent & saved for: ${role}!`, 'success');
    setTitle('');
    setMessage('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="System Notifications & Broadcasts"
        description="Exclusive admin control for dispatching role-aware system alerts and broadcast announcements to Students, Faculty, Security, or Everyone."
        breadcrumbs={[{ label: 'System Notifications' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Role-Aware Broadcast Notification Dispatcher
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleBroadcast} className="max-w-xl space-y-4">
              <Select
                label="Target Audience Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'Everyone', label: 'Everyone (Students, Faculty, Visitors, Security)' },
                  { value: 'Students', label: 'All Students' },
                  { value: 'Faculty', label: 'All Faculty Members' },
                  { value: 'Security', label: 'Campus Security & Gate Staff' }
                ]}
              />

              <Input
                label="Announcement Header / Subject"
                placeholder="e.g. Schedule Update: Computer Science Block Room Change"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Broadcast Message Content</label>
                <textarea
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                  placeholder="Enter announcement details to be delivered directly to user notification drawers..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="md" icon={Send} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
                Dispatch Broadcast Alert
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* BROADCAST DISPATCH HISTORY LOG */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-indigo-600" />
                Dispatched Broadcast History ({broadcasts.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Broadcast Log</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {broadcasts.map((b) => (
                <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">Audience: {b.role}</Badge>
                    <span className="text-xs text-slate-400 font-semibold">{b.timestamp}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-600 font-medium">{b.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
