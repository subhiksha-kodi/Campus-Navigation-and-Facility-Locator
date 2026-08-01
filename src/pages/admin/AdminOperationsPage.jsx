import React, { useState } from 'react';
import { CalendarDays, FileText, Users, Bell, MessageSquare, Plus, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminOperationsPage = () => {
  const { visitors, updateVisitorStatus, complaints, updateComplaintStatus } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('visitors');

  // Broadcast Notification State
  const [notifRole, setNotifRole] = useState('Everyone');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  const handleBroadcast = (e) => {
    e.preventDefault();
    addToast(`Broadcast notification dispatched to target group: ${notifRole}!`, 'success');
    setNotifTitle('');
    setNotifMsg('');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Operations, Communication & Complaints Monitoring"
        description="Central administrative portal for managing visitor entry approvals, campus events, public notices, role-aware notifications, and central complaint/issue status tracking."
        breadcrumbs={[{ label: 'Operations & Communication' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant={activeTab === 'visitors' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('visitors')}>
              Visitor Management ({visitors.filter((v) => v.approvalStatus === 'Pending').length})
            </Button>
            <Button variant={activeTab === 'complaints' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('complaints')}>
              Complaints Status Monitoring
            </Button>
            <Button variant={activeTab === 'notifications' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('notifications')}>
              System Broadcast
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* TAB 1: VISITOR MANAGEMENT */}
        {activeTab === 'visitors' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Campus Visitor Approval & Log Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Pass ID</th>
                      <th className="p-3">Visitor Name & Contact</th>
                      <th className="p-3">Host & Department</th>
                      <th className="p-3">Purpose of Visit</th>
                      <th className="p-3">Visit Date</th>
                      <th className="p-3">Gate Status</th>
                      <th className="p-3">Approval</th>
                      <th className="p-3 rounded-r-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visitors.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">{v.id}</td>
                        <td className="p-3">
                          <span className="font-extrabold text-slate-900 block">{v.visitorName}</span>
                          <span className="text-[11px] text-slate-500 block">{v.contact}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{v.host}</span>
                          <span className="text-[11px] text-blue-700 font-semibold block">{v.department}</span>
                        </td>
                        <td className="p-3 text-slate-600">{v.purpose}</td>
                        <td className="p-3 text-slate-700">{v.visitDate}</td>
                        <td className="p-3">
                          <Badge variant="neutral" size="sm">{v.entryStatus}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={v.approvalStatus === 'Approved' ? 'success' : v.approvalStatus === 'Rejected' ? 'error' : 'warning'} size="sm">
                            {v.approvalStatus}
                          </Badge>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          {v.approvalStatus === 'Pending' && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  updateVisitorStatus(v.id, 'Approved');
                                  addToast(`Approved visitor pass for ${v.visitorName}`, 'success');
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  updateVisitorStatus(v.id, 'Rejected');
                                  addToast(`Rejected visitor pass for ${v.visitorName}`, 'info');
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 2: COMPLAINTS & ISSUES MONITORING */}
        {activeTab === 'complaints' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-rose-600" />
                Central Complaint & Infrastructure Issue Monitor
              </CardTitle>
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

                    {/* Admin Status Controls */}
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
        )}

        {/* TAB 3: SYSTEM NOTIFICATIONS */}
        {activeTab === 'notifications' && (
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
                  label="Target Audience Group"
                  value={notifRole}
                  onChange={(e) => setNotifRole(e.target.value)}
                  options={[
                    { value: 'Everyone', label: 'Everyone (Students, Faculty, Visitors, Security)' },
                    { value: 'Students', label: 'All Students' },
                    { value: 'Faculty', label: 'All Faculty Members' },
                    { value: 'Security', label: 'Campus Security & Gate Staff' }
                  ]}
                />

                <Input
                  label="Notification Header / Subject"
                  placeholder="e.g. Schedule Update: Computer Science Block Room Change"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  required
                />

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Broadcast Message Content</label>
                  <textarea
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-400 outline-hidden"
                    placeholder="Enter announcement details to be delivered directly to user notification drawers..."
                    value={notifMsg}
                    onChange={(e) => setNotifMsg(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Bell}>
                  Dispatch Broadcast Notification
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};
