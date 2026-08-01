import React from 'react';
import { Users } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminVisitorManagementPage = () => {
  const { visitors, updateVisitorStatus } = useAdmin();
  const { addToast } = useToast();

  return (
    <AdminLayout>
      <PageHeader
        title="Visitor Management"
        description="Exclusive admin control for reviewing gate pass requests, verifying hosts, approving or rejecting visitor applications, and inspecting entry/exit logs."
        breadcrumbs={[{ label: 'Visitor Management' }]}
        actions={
          <Badge variant="warning" size="md" className="font-bold">
            {visitors.filter((v) => v.approvalStatus === 'Pending').length} Pending Approvals
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Campus Visitor Gate Pass Register ({visitors.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Gate Security Log</Badge>
            </div>
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
                    <th className="p-3">Gate Entry Status</th>
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
      </div>
    </AdminLayout>
  );
};
