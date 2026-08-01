import React from 'react';
import { MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminComplaintsMonitoringPage = () => {
  const { complaints, updateComplaintStatus } = useAdmin();
  const { addToast } = useToast();

  return (
    <AdminLayout>
      <PageHeader
        title="Complaints & Issue Status Monitoring"
        description="Central administrative status monitoring dashboard for tracking, assigning concerned departments, and updating status (Pending → Working → Completed) of faculty-reported issues."
        breadcrumbs={[{ label: 'Complaints & Issues Monitoring' }]}
        actions={
          <Badge variant="navy" size="md">
            Central Status Center
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-600" />
                Infrastructure & Facility Issues Tracker ({complaints.length})
              </CardTitle>
              <Badge variant="info" size="sm">Central Monitoring Only</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {complaints.map((cmp) => (
                <div key={cmp.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="navy" size="sm">{cmp.id}</Badge>
                        <Badge variant="info" size="sm">{cmp.category}</Badge>
                        <Badge variant={cmp.priority === 'Urgent' ? 'error' : 'warning'} size="sm">{cmp.priority}</Badge>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900">{cmp.title}</h4>
                      <p className="text-xs text-slate-500">Reported by {cmp.reportedBy} on {cmp.reportedDate}</p>
                    </div>
                    <Badge variant={cmp.status === 'Completed' ? 'success' : cmp.status === 'Working' ? 'info' : 'warning'} size="sm" className="font-bold">
                      {cmp.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Location</span>
                      <span className="font-bold text-slate-900 block">{cmp.building} ({cmp.room})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Concerned Dept</span>
                      <span className="font-bold text-blue-700 block">{cmp.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assigned Staff</span>
                      <span className="font-bold text-slate-900 block">{cmp.assignedTo}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t flex justify-end gap-2">
                    {cmp.status !== 'Working' && cmp.status !== 'Completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          updateComplaintStatus(cmp.id, 'Working');
                          addToast(`Complaint ${cmp.id} status changed to Working`, 'info');
                        }}
                      >
                        Mark Working
                      </Button>
                    )}
                    {cmp.status !== 'Completed' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          updateComplaintStatus(cmp.id, 'Completed');
                          addToast(`Complaint ${cmp.id} resolved & completed!`, 'success');
                        }}
                      >
                        Mark Resolved & Completed
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
