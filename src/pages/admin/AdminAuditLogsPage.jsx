import React, { useState } from 'react';
import { Clock, Search } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';

export const AdminAuditLogsPage = () => {
  const { auditLogs } = useAdmin();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(
    (l) => l.action.toLowerCase().includes(search.toLowerCase()) || l.module.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <PageHeader
        title="Administrative Audit Logs"
        description="Exclusive admin audit trail: Searchable, tamper-proof record of all write operations, user role modifications, allocations, and route changes."
        breadcrumbs={[{ label: 'Audit Logs' }]}
      />

      <div className="space-y-6">
        <Card className="p-4">
          <Input
            icon={Search}
            placeholder="Search audit logs by Action, Module or User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Audit Trail Log Stream ({filteredLogs.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Immutable Record</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-lg">Log ID</th>
                    <th className="p-3">Action Performed</th>
                    <th className="p-3">Admin User</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Target Module</th>
                    <th className="p-3 rounded-r-lg">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{log.id}</td>
                      <td className="p-3 font-extrabold text-slate-900">{log.action}</td>
                      <td className="p-3 font-semibold text-blue-700">{log.user}</td>
                      <td className="p-3 text-slate-600">{log.timestamp}</td>
                      <td className="p-3"><Badge variant="neutral" size="sm">{log.module}</Badge></td>
                      <td className="p-3 text-slate-600 font-medium">{log.newValue}</td>
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
