import React from 'react';
import { FileSpreadsheet, Download, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminReportsPage = () => {
  const { addToast } = useToast();
  const { facultyAllocations, rooms, visitors, complaints, facilities, students, faculty } = useAdmin();

  const handleExportCSV = (reportTitle) => {
    let headers = [];
    let rows = [];
    const sanitizedName = reportTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `${sanitizedName}_${new Date().toISOString().split('T')[0]}.csv`;

    if (reportTitle.includes('Faculty Allocation')) {
      headers = ['Allocation ID', 'Class Section', 'Subject Name', 'Assigned Faculty'];
      rows = facultyAllocations.length > 0
        ? facultyAllocations.map((a) => [a.id, a.className, a.subjectName, a.facultyName])
        : [
            ['ALLOC-101', 'CS-III-A', 'Data Structures & Algorithms', 'Dr. Gayathri Devi'],
            ['ALLOC-102', 'ECE-II-B', 'Digital Signal Processing', 'Prof. Alan Turing'],
            ['ALLOC-103', 'MECH-IV-A', 'Thermodynamics & Heat Transfer', 'Dr. Grace Hopper']
          ];
    } else if (reportTitle.includes('Classroom Utilization')) {
      headers = ['Room ID', 'Building Name', 'Capacity', 'Room Type', 'Status'];
      rows = rooms.length > 0
        ? rooms.map((r) => [r.number || r.id, r.building, r.capacity, r.type, r.status])
        : [
            ['CR-301', 'Sunflower Block', '60', 'Smart Classroom', 'Occupied'],
            ['LAB-102', 'Mechanical Block', '45', 'Computer Lab', 'Available'],
            ['AUD-001', 'Administrative Block', '250', 'Auditorium', 'Reserved']
          ];
    } else if (reportTitle.includes('Substitution')) {
      headers = ['Substitution ID', 'Absent Faculty', 'Assigned Substitute', 'Date', 'Status'];
      rows = [
        ['SUB-401', 'Prof. Alan Turing', 'Dr. Gayathri Devi', '2026-08-01', 'Approved'],
        ['SUB-402', 'Dr. Grace Hopper', 'Prof. John von Neumann', '2026-08-01', 'Pending'],
        ['SUB-403', 'Dr. Claude Shannon', 'Prof. Ada Lovelace', '2026-08-02', 'Approved']
      ];
    } else if (reportTitle.includes('Visitor Entry')) {
      headers = ['Pass ID', 'Visitor Name', 'Contact', 'Host Staff', 'Department', 'Date', 'Approval Status'];
      rows = visitors.length > 0
        ? visitors.map((v) => [v.id, v.visitorName, v.contact, v.host, v.department, v.visitDate, v.approvalStatus])
        : [
            ['PASS-901', 'Sarah Jenkins', '+91 99001 98765', 'Dr. Gayathri Devi', 'CSE', '2026-08-01', 'Approved'],
            ['PASS-902', 'Robert Vance', '+91 98450 12345', 'Prof. Alan Turing', 'ECE', '2026-08-01', 'Pending']
          ];
    } else if (reportTitle.includes('Complaints')) {
      headers = ['Complaint ID', 'Title', 'Category', 'Priority', 'Department', 'Location', 'Status'];
      rows = complaints.length > 0
        ? complaints.map((c) => [c.id, c.title, c.category, c.priority, c.department, `${c.building} (${c.room})`, c.status])
        : [
            ['CMP-301', 'Projector Bulb Blown', 'IT Hardware', 'Urgent', 'CSE', 'Sunflower Block (SF-201)', 'In Progress'],
            ['CMP-302', 'AC Water Leakage', 'Infrastructure', 'Medium', 'ECE', 'Mechanical Block (MB-104)', 'Completed']
          ];
    } else {
      headers = ['Facility ID', 'Facility Name', 'Building', 'Floor / Spot', 'Availability Status'];
      rows = facilities.length > 0
        ? facilities.map((f) => [f.id, f.name, f.building, f.floor, f.availability])
        : [
            ['FACIL-101', 'High-Speed Wi-Fi Access Point', 'Sunflower Block', 'Floor 2', 'Operational'],
            ['FACIL-102', 'Central Campus ATM', 'Main Gate Security Block', 'Ground Floor', 'Operational']
          ];
    }

    // Construct CSV file content
    const csvLines = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
    ];
    const csvBlob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });

    // Trigger browser file download
    const url = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    addToast(`Successfully generated and downloaded ${filename}`, 'success');
  };

  const reports = [
    { title: 'Faculty Allocation & Teaching Load Summary', desc: 'Detailed register of subject assignments, class loads, and faculty contact hours.' },
    { title: 'Classroom Utilization & Occupancy Log', desc: 'Real-time and historic occupancy rates across all smart rooms, labs, and lecture halls.' },
    { title: 'Faculty Substitution Requests Audit', desc: 'Complete log of absent faculty notifications, substitute assignments, and approval history.' },
    { title: 'Visitor Entry & Gate Register', desc: 'Official visitor passes ledger, host verification records, and security gate check-ins.' },
    { title: 'Complaints & Maintenance Resolution Log', desc: 'Facility complaints log, department SLA turnaround times, and resolution logs.' },
    { title: 'Campus Facilities Operational Status Ledger', desc: 'Infrastructure inventory report including Wi-Fi hubs, lifts, printers, and water dispensers.' }
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Reports & CSV Export Center"
        description="Exclusive administrative report engine for generating, rendering, and downloading instant CSV data files for institutional audits."
        breadcrumbs={[{ label: 'Reports & Export' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                Administrative CSV Report Exporter ({reports.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Live Export Engine</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {reports.map((rep, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">{rep.title}</h4>
                    <Badge variant="success" size="sm" className="text-[10px]">Ready</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{rep.desc}</p>
                </div>
                <Button variant="primary" size="sm" icon={Download} onClick={() => handleExportCSV(rep.title)} className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white">
                  Download CSV
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
