import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AdminReportsPage = () => {
  const { addToast } = useToast();

  const handleExportCSV = (name) => {
    addToast(`Generated & exported ${name} to CSV file!`, 'success');
  };

  const reports = [
    'Faculty Allocation & Teaching Load Summary',
    'Classroom Utilization & Occupancy Log',
    'Faculty Substitution Requests Audit',
    'Visitor Entry & Gate Register',
    'Complaints & Maintenance Resolution Log',
    'Campus Facilities Operational Status Ledger'
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Reports & CSV Export Center"
        description="Exclusive admin report generator for exporting campus statistics, timetable ledgers, substitution summaries, and visitor logs."
        breadcrumbs={[{ label: 'Reports & Export' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                Administrative Report Exporter ({reports.length})
              </CardTitle>
              <Badge variant="navy" size="sm">CSV Export Engine</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {reports.map((rep, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-xs">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{rep}</h4>
                  <span className="text-xs text-slate-500 font-medium">Full campus parameters included with official timestamps</span>
                </div>
                <Button variant="outline" size="sm" icon={Download} onClick={() => handleExportCSV(rep)}>
                  Export CSV
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
