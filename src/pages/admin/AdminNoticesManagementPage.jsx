import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminNoticesManagementPage = () => {
  const { notices, addNotice } = useAdmin();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Important');
  const [target, setTarget] = useState('Everyone');

  const handlePublishNotice = (e) => {
    e.preventDefault();
    addNotice({ title, priority, target });
    addToast(`Published official notice: "${title}"`, 'success');
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Notices Management"
        description="Exclusive admin management for publishing official announcements with priority levels (Normal, Important, Urgent) and target audience filtering."
        breadcrumbs={[{ label: 'Notices Management' }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setShowAddModal(true)} className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
            Publish New Notice
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                Published Campus Notices ({notices.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Notice Board</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {notices.map((n) => (
                <div key={n.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant={n.priority === 'Urgent' ? 'error' : n.priority === 'Important' ? 'warning' : 'info'} size="sm" className="font-extrabold">
                      {n.priority} Priority
                    </Badge>
                    <span className="text-xs text-slate-400 font-semibold">{n.date}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">Target Audience: <strong>{n.target}</strong></p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PUBLISH NOTICE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Publish Official Campus Notice</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handlePublishNotice} className="space-y-3">
              <Input label="Notice Title / Headline" placeholder="e.g. Campus Wi-Fi Upgraded in AS Block" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Select label="Priority Level" value={priority} onChange={(e) => setPriority(e.target.value)} options={[{ value: 'Normal', label: 'Normal Priority' }, { value: 'Important', label: 'Important Priority' }, { value: 'Urgent', label: 'Urgent Priority (Red Banner)' }]} />
              <Select label="Target Audience" value={target} onChange={(e) => setTarget(e.target.value)} options={[{ value: 'Everyone', label: 'Everyone' }, { value: 'Students', label: 'Students' }, { value: 'Faculty', label: 'Faculty' }, { value: 'Visitors', label: 'Visitors' }]} />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Publish Notice</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
