import React, { useMemo, useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  Building,
  Building2,
  Layers,
  BookOpen,
  Calendar,
  UserPlus,
  Clock,
  Shield,
  Bell,
  MessageSquare,
  Activity,
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Filter,
  RotateCcw,
  FileText,
  Zap,
  Wifi,
  Flame,
  Server,
  Database,
  Search,
  Award,
  CalendarDays,
  Check,
  Info
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useAdmin } from '../../context/AdminContext';

export const AdminAnalyticsPage = () => {
  const { addToast } = useToast();
  const { metrics, faculty, students, departments, buildings, rooms, visitors, complaints, facilities } = useAdmin();

  // Filter Bar Controls State
  const [dateRange, setDateRange] = useState('7days');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [semester, setSemester] = useState('odd');
  const [statusFilter, setStatusFilter] = useState('all');

  // Applied filter state for reactive dynamic calculation
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: '7days',
    selectedDept: 'all',
    selectedBuilding: 'all',
    academicYear: '2025-2026',
    semester: 'odd',
    statusFilter: 'all'
  });

  // Dynamic Calculation Engine (Calculated BEFORE handlers)
  const {
    dynamicKPIs,
    dynamicFacultyAllocationsDept,
    dynamicBuildingUsageStacked,
    dynamicComplaintStatusDonut,
    dynamicVisitorPurposeData,
    dynamicBuildingHeatmap,
    dynamicActivityTimeline,
    dynamicQuickInsights
  } = useMemo(() => {
    const { dateRange: dr, selectedDept: sd, selectedBuilding: sb, statusFilter: sf } = appliedFilters;

    // Dept multiplier
    let deptMult = 1.0;
    if (sd === 'cse') deptMult = 0.35;
    else if (sd === 'aids') deptMult = 0.25;
    else if (sd === 'ece') deptMult = 0.22;
    else if (sd === 'eee') deptMult = 0.18;
    else if (sd === 'mech') deptMult = 0.20;
    else if (sd === 'civil') deptMult = 0.15;

    // Time multiplier
    let timeMult = 1.0;
    if (dr === 'today') timeMult = 0.22;
    else if (dr === '30days') timeMult = 3.6;
    else if (dr === 'semester') timeMult = 12.8;

    // Computed KPIs
    const totalStuds = Math.round(4250 * deptMult);
    const totalFac = Math.round(186 * (sd === 'all' ? 1.0 : deptMult * 2.5));
    const utilPct = Math.min(98.5, Math.round((84.2 + (sd !== 'all' ? 2.5 : 0) + (sb !== 'all' ? 4.1 : 0)) * 10) / 10);
    const allocPct = Math.min(100, Math.round((98.4 + (sd !== 'all' ? 1.2 : 0)) * 10) / 10);
    const todayClasses = Math.round(146 * deptMult * (dr === 'today' ? 0.35 : 1.0));
    const visReqs = Math.round(48 * timeMult * (sf === 'pending' ? 0.4 : 1.0));
    const openComp = Math.max(1, Math.round(14 * deptMult * (sf === 'completed' ? 0.1 : sf === 'pending' ? 1.5 : 1.0)));
    const actIssues = Math.max(1, Math.round(6 * deptMult * 1.8));
    const eventsCount = Math.max(1, Math.round(8 * deptMult * 1.5));

    const kpis = [
      { label: 'Total Students', value: totalStuds.toLocaleString(), trend: '+5.2%', isUp: true, comp: 'Filtered Scope', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-200', progress: Math.min(100, Math.round(deptMult * 100)), sparkline: [35, 42, 40, 55, 62, 70, Math.min(100, Math.round(deptMult * 100))] },
      { label: 'Total Faculty', value: totalFac.toString(), trend: '+2.1%', isUp: true, comp: 'Teaching Roster', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', progress: 93, sparkline: [40, 45, 50, 52, 60, 75, 93] },
      { label: 'Total Departments', value: sd === 'all' ? '6' : '1 Active', trend: '100%', isUp: true, comp: 'Operational', icon: Building, color: 'text-purple-600 bg-purple-50 border-purple-200', progress: 100, sparkline: [100, 100, 100, 100, 100, 100, 100] },
      { label: 'Classroom Utilization', value: `${utilPct}%`, trend: '+3.5%', isUp: true, comp: 'Room Occupancy', icon: Layers, color: 'text-indigo-600 bg-indigo-50 border-indigo-200', progress: Math.round(utilPct), sparkline: [60, 65, 72, 78, 80, 82, Math.round(utilPct)] },
      { label: 'Faculty Allocation Rate', value: `${allocPct}%`, trend: '+1.2%', isUp: true, comp: 'Schedule Assigned', icon: UserPlus, color: 'text-teal-600 bg-teal-50 border-teal-200', progress: Math.round(allocPct), sparkline: [80, 85, 90, 92, 95, 96, Math.round(allocPct)] },
      { label: "Today's Classes", value: todayClasses.toString(), trend: `${Math.round(todayClasses * 0.3)} Active`, isUp: true, comp: 'In Session', icon: Calendar, color: 'text-amber-600 bg-amber-50 border-amber-200', progress: 75, sparkline: [20, 45, 80, 120, todayClasses, 110, 90] },
      { label: 'Visitor Requests', value: visReqs.toString(), trend: '92% Appr.', isUp: true, comp: 'Gate Verified', icon: Users, color: 'text-sky-600 bg-sky-50 border-sky-200', progress: 92, sparkline: [15, 25, 30, 42, visReqs, 38, visReqs] },
      { label: 'Open Complaints', value: openComp.toString(), trend: '-18.5%', isUp: false, comp: 'Resolution SLA', icon: MessageSquare, color: 'text-rose-600 bg-rose-50 border-rose-200', progress: Math.min(100, openComp * 5), sparkline: [40, 35, 28, 22, 18, 16, openComp] },
      { label: 'Active Issues', value: actIssues.toString(), trend: 'Requires Attention', isUp: false, comp: 'IT & Infrastructure', icon: AlertTriangle, color: 'text-orange-600 bg-orange-50 border-orange-200', progress: Math.min(100, actIssues * 10), sparkline: [12, 10, 8, 9, 7, 6, actIssues] },
      { label: 'Events Today', value: eventsCount.toString(), trend: 'Scheduled', isUp: true, comp: 'Campus Halls', icon: CalendarDays, color: 'text-violet-600 bg-violet-50 border-violet-200', progress: Math.min(100, eventsCount * 12), sparkline: [2, 3, 5, 4, 6, 8, eventsCount] }
    ];

    // Faculty Allocation Dept
    const baseFacultyDept = [
      { idKey: 'cse', dept: 'Computer Science & Eng (CSE)', val: Math.round(42 * (sd === 'all' || sd === 'cse' ? 1 : 0.2)), max: 50, color: 'bg-indigo-600' },
      { idKey: 'aids', dept: 'Artificial Intelligence & Data Science (AI & DS)', val: Math.round(34 * (sd === 'all' || sd === 'aids' ? 1 : 0.2)), max: 50, color: 'bg-blue-600' },
      { idKey: 'ece', dept: 'Electronics & Communication Eng (ECE)', val: Math.round(38 * (sd === 'all' || sd === 'ece' ? 1 : 0.2)), max: 50, color: 'bg-purple-600' },
      { idKey: 'eee', dept: 'Electrical & Electronics Eng (EEE)', val: Math.round(28 * (sd === 'all' || sd === 'eee' ? 1 : 0.2)), max: 50, color: 'bg-sky-600' },
      { idKey: 'mech', dept: 'Mechanical Engineering (MECH)', val: Math.round(26 * (sd === 'all' || sd === 'mech' ? 1 : 0.2)), max: 50, color: 'bg-emerald-600' },
      { idKey: 'civil', dept: 'Civil Engineering (CIVIL)', val: Math.round(18 * (sd === 'all' || sd === 'civil' ? 1 : 0.2)), max: 50, color: 'bg-amber-500' }
    ];

    // Building Stacked Usage
    const allBuildingsList = [
      { idKey: 'as', name: 'AS Block', occupied: Math.round(42 * (sb === 'all' || sb === 'as' ? 1 : 0.4)), available: 8, total: 50, pct: Math.round((42 / 50) * 100) },
      { idKey: 'ib', name: 'IB Block', occupied: Math.round(35 * (sb === 'all' || sb === 'ib' ? 1 : 0.4)), available: 15, total: 50, pct: Math.round((35 / 50) * 100) },
      { idKey: 'sunflower', name: 'Sunflower Block', occupied: Math.round(40 * (sb === 'all' || sb === 'sunflower' ? 1 : 0.4)), available: 10, total: 50, pct: Math.round((40 / 50) * 100) },
      { idKey: 'mech', name: 'Mechanical Block', occupied: Math.round(28 * (sb === 'all' || sb === 'mech' ? 1 : 0.4)), available: 4, total: 32, pct: Math.round((28 / 32) * 100) },
      { idKey: 'research', name: 'Research Park', occupied: Math.round(45 * (sb === 'all' || sb === 'research' ? 1 : 0.4)), available: 5, total: 50, pct: Math.round((45 / 50) * 100) },
      { idKey: 'hostel', name: 'Campus Hostel Block', occupied: Math.round(120 * (sb === 'all' || sb === 'hostel' ? 1 : 0.4)), available: 30, total: 150, pct: Math.round((120 / 150) * 100) }
    ];

    // Building Heatmap
    const heatmapList = allBuildingsList.map(b => ({
      name: b.name,
      pct: Math.min(99, Math.round(b.pct * (sb === 'all' || sb === b.idKey ? 1.0 : 0.6))),
      status: b.pct > 80 ? 'High Occupancy' : b.pct > 60 ? 'Moderate Traffic' : 'Low Activity',
      color: b.pct > 80 ? 'bg-rose-500' : b.pct > 60 ? 'bg-amber-500' : 'bg-emerald-500',
      bar: b.pct > 80 ? '████████░░' : b.pct > 60 ? '██████░░░░' : '████░░░░░░'
    }));

    // Complaint Status Donut
    const complaintDonut = [
      { label: 'Pending Approval', count: Math.round(14 * deptMult * (sf === 'completed' ? 0.2 : 1.0)), pct: 15, color: 'text-amber-500 bg-amber-500' },
      { label: 'Assigned Staff', count: Math.round(22 * deptMult), pct: 24, color: 'text-blue-600 bg-blue-500' },
      { label: 'Working / In-Progress', count: Math.round(18 * deptMult), pct: 20, color: 'text-indigo-600 bg-indigo-500' },
      { label: 'Resolved & Completed', count: Math.round(38 * deptMult * (sf === 'pending' ? 0.2 : 1.0)), pct: 41, color: 'text-emerald-600 bg-emerald-500' }
    ];

    // Visitor Purpose Data
    const visitorPurpose = [
      { purpose: 'Admission Inquiry', pct: 35, count: Math.round(42 * timeMult), color: 'bg-blue-600' },
      { purpose: 'Official Faculty Meeting', pct: 28, count: Math.round(34 * timeMult), color: 'bg-indigo-600' },
      { purpose: 'Vendor & Maintenance', pct: 15, count: Math.round(18 * timeMult), color: 'bg-purple-600' },
      { purpose: 'Campus Event Guest', pct: 12, count: Math.round(14 * timeMult), color: 'bg-emerald-600' },
      { purpose: 'Courier & Delivery', pct: 7, count: Math.round(8 * timeMult), color: 'bg-amber-500' },
      { purpose: 'Other Visits', pct: 3, count: Math.round(4 * timeMult), color: 'bg-slate-500' }
    ];

    // Timeline
    const timeline = [
      { time: '09:15 AM', title: 'Faculty Allocation Updated', desc: `Dr. Hariharan assigned to Data Structures (CS301) [Dept Scope: ${sd.toUpperCase()}]`, category: 'Academic', icon: UserCheck, color: 'text-blue-600 bg-blue-50' },
      { time: '09:48 AM', title: 'Classroom Assigned', desc: `Slot allocated in Sunflower Block [Building Scope: ${sb.toUpperCase()}]`, category: 'Allocation', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
      { time: '10:05 AM', title: 'Visitor Pass Generated', desc: `Pass generated for Guest [Time Range: ${dr.toUpperCase()}]`, category: 'Visitor', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
      { time: '10:20 AM', title: 'Faculty Substitution Processed', desc: `Dr. Rishitha replaced Dr. Hariharan for Morning Session`, category: 'Substitution', icon: Users, color: 'text-purple-600 bg-purple-50' },
      { time: '11:10 AM', title: 'Maintenance Ticket Resolved', desc: 'Equipment bulb replaced in Mechanical Block', category: 'Maintenance', icon: Zap, color: 'text-teal-600 bg-teal-50' }
    ];

    // Quick Insights
    const insights = [
      { title: 'Most Occupied Building Scope', val: sb === 'all' ? 'Sunflower Block (94% Peak)' : `${sb.toUpperCase()} Block Scope Selected`, desc: 'Filtered occupancy index updated', icon: Building2, highlight: 'border-l-rose-500' },
      { title: 'Active Department Scope', val: sd === 'all' ? 'All 6 Departments Active' : `${sd.toUpperCase()} Department Filtered`, desc: `${totalStuds.toLocaleString()} Enrolled Students`, icon: BookOpen, highlight: 'border-l-indigo-600' },
      { title: 'Live Time Horizon', val: dr === 'today' ? 'Today (Live Snapshot)' : dr === '7days' ? 'Last 7 Days Horizon' : `${dr.toUpperCase()} Aggregate Scope`, desc: `${visReqs} Total Filtered Visitor Gate Passes`, icon: Activity, highlight: 'border-l-teal-600' },
      { title: 'Top Issue Category', val: 'Internet & Wi-Fi Connectivity', desc: `${openComp} Open Complaints Under Resolution`, icon: AlertTriangle, highlight: 'border-l-amber-500' }
    ];

    return {
      dynamicKPIs: kpis,
      dynamicFacultyAllocationsDept: baseFacultyDept,
      dynamicBuildingUsageStacked: allBuildingsList,
      dynamicComplaintStatusDonut: complaintDonut,
      dynamicVisitorPurposeData: visitorPurpose,
      dynamicBuildingHeatmap: heatmapList,
      dynamicActivityTimeline: timeline,
      dynamicQuickInsights: insights
    };
  }, [appliedFilters, visitors, complaints]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      dateRange,
      selectedDept,
      selectedBuilding,
      academicYear,
      semester,
      statusFilter
    });
    addToast(`Applied Analytics Scope: Range [${dateRange.toUpperCase()}], Dept [${selectedDept.toUpperCase()}], Building [${selectedBuilding.toUpperCase()}]`, 'success');
  };

  const handleResetFilters = () => {
    setDateRange('7days');
    setSelectedDept('all');
    setSelectedBuilding('all');
    setAcademicYear('2025-2026');
    setSemester('odd');
    setStatusFilter('all');
    setAppliedFilters({
      dateRange: '7days',
      selectedDept: 'all',
      selectedBuilding: 'all',
      academicYear: '2025-2026',
      semester: 'odd',
      statusFilter: 'all'
    });
    addToast('Analytics parameters reset to default baseline', 'info');
  };

  // Export handlers
  const handleExportPDF = () => {
    addToast('Generating Executive Analytics PDF Report...', 'info');
    setTimeout(() => window.print(), 800);
  };

  const handleExportExcel = () => {
    const csvData = [
      ['Metric', 'Current Value', 'Scope', 'Filter Department', 'Filter Building'],
      ['Total Students', dynamicKPIs[0].value, appliedFilters.dateRange, appliedFilters.selectedDept, appliedFilters.selectedBuilding],
      ['Total Faculty', dynamicKPIs[1].value, appliedFilters.dateRange, appliedFilters.selectedDept, appliedFilters.selectedBuilding],
      ['Classroom Utilization', dynamicKPIs[3].value, appliedFilters.dateRange, appliedFilters.selectedDept, appliedFilters.selectedBuilding],
      ['Faculty Allocation Rate', dynamicKPIs[4].value, appliedFilters.dateRange, appliedFilters.selectedDept, appliedFilters.selectedBuilding],
      ['Average Resolution Time', '4.2 Hours', 'Fast (-18.5%)', appliedFilters.selectedDept, appliedFilters.selectedBuilding]
    ].map(r => r.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `campus_analytics_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Filtered Analytics ledger downloaded successfully!', 'success');
  };

  // Section 2 Data: Academic Operations
  const facultyAllocationsDept = [
    { dept: 'Computer Science & Eng (CSE)', val: 42, max: 50, color: 'bg-indigo-600' },
    { dept: 'Artificial Intelligence & Data Science (AI & DS)', val: 34, max: 50, color: 'bg-blue-600' },
    { dept: 'Electronics & Communication Eng (ECE)', val: 38, max: 50, color: 'bg-purple-600' },
    { dept: 'Electrical & Electronics Eng (EEE)', val: 28, max: 50, color: 'bg-sky-600' },
    { dept: 'Mechanical Engineering (MECH)', val: 26, max: 50, color: 'bg-emerald-600' },
    { dept: 'Civil Engineering (CIVIL)', val: 18, max: 50, color: 'bg-amber-500' }
  ];

  const classDistribution = [
    { label: 'Year I', count: 1360, pct: 32, color: 'text-blue-600 bg-blue-500' },
    { label: 'Year II', count: 1190, pct: 28, color: 'text-indigo-600 bg-indigo-500' },
    { label: 'Year III', count: 1020, pct: 24, color: 'text-purple-600 bg-purple-500' },
    { label: 'Year IV', count: 680, pct: 16, color: 'text-amber-500 bg-amber-500' }
  ];

  const timetableUtilizationDays = [
    { day: 'Mon', count: 142, pct: 88 },
    { day: 'Tue', count: 158, pct: 96 },
    { day: 'Wed', count: 164, pct: 100 },
    { day: 'Thu', count: 150, pct: 91 },
    { day: 'Fri', count: 136, pct: 83 }
  ];

  // Section 3 Data: Infrastructure Analytics
  const buildingUsageStacked = [
    { name: 'AS Block', occupied: 42, available: 8, total: 50, pct: 84 },
    { name: 'IB Block', occupied: 35, available: 15, total: 50, pct: 70 },
    { name: 'Sunflower Block', occupied: 40, available: 10, total: 50, pct: 80 },
    { name: 'Mechanical Block', occupied: 28, available: 4, total: 32, pct: 88 },
    { name: 'Research Park', occupied: 45, available: 5, total: 50, pct: 90 },
    { name: 'Campus Hostel Block', occupied: 120, available: 30, total: 150, pct: 80 }
  ];

  const facilityUsagePie = [
    { name: 'Printer / Copier', pct: 18, color: 'bg-blue-600' },
    { name: 'Campus ATM', pct: 12, color: 'bg-indigo-600' },
    { name: 'Medical Centre', pct: 8, color: 'bg-rose-500' },
    { name: 'Student Parking', pct: 22, color: 'bg-amber-500' },
    { name: 'Library Quiet Zone', pct: 15, color: 'bg-purple-600' },
    { name: 'High-Speed Wi-Fi Zone', pct: 14, color: 'bg-teal-500' },
    { name: 'Washroom Facilities', pct: 6, color: 'bg-slate-500' },
    { name: 'Sports Complex', pct: 5, color: 'bg-emerald-600' }
  ];

  const issueCategories = [
    { cat: 'Internet & Wi-Fi', pct: 34, count: 31, color: 'bg-blue-600' },
    { cat: 'Electrical & Power', pct: 28, count: 25, color: 'bg-amber-500' },
    { cat: 'Infrastructure & Labs', pct: 22, count: 20, color: 'bg-indigo-600' },
    { cat: 'Classroom Equipment', pct: 18, count: 16, color: 'bg-purple-600' },
    { cat: 'Water Supply', pct: 16, count: 14, color: 'bg-teal-500' },
    { cat: 'Facility Services', pct: 14, count: 12, color: 'bg-sky-500' },
    { cat: 'Furniture & Seating', pct: 12, count: 10, color: 'bg-rose-500' },
    { cat: 'Cleaning & Hygiene', pct: 10, count: 8, color: 'bg-emerald-500' }
  ];

  // Section 6 Data: Faculty Substitution
  const deptSubstitutions = [
    { dept: 'Computer Science (CSE)', count: 14, color: 'bg-indigo-600' },
    { dept: 'Mechanical Eng (MECH)', count: 12, color: 'bg-emerald-600' },
    { dept: 'Electronics Eng (ECE)', count: 10, color: 'bg-purple-600' },
    { dept: 'AI & Data Science', count: 9, color: 'bg-blue-600' },
    { dept: 'Electrical Eng (EEE)', count: 8, color: 'bg-sky-600' },
    { dept: 'Civil Engineering', count: 6, color: 'bg-amber-500' }
  ];

  const frequentReplacedFaculty = [
    { name: 'Dr. K. Arunkumar', dept: 'CSE', count: 6, reason: 'Conference Delegate', sub: 'Dr. S. Karthiga', status: 'Approved' },
    { name: 'Dr. R. Chitra Devi', dept: 'AI & DS', count: 5, reason: 'Medical Leave', sub: 'Prof. P. Ramesh', status: 'Approved' },
    { name: 'Dr. N. Sundaram', dept: 'ECE', count: 4, reason: 'Research Workshop', sub: 'Dean', status: 'Approved' },
    { name: 'Prof. P. Ramesh', dept: 'EEE', count: 3, reason: 'On-Duty Inspection', sub: 'Dr. K. Arunkumar', status: 'Pending' }
  ];

  return (
    <AdminLayout>
      {/* Header & Export Actions */}
      <PageHeader
        title="Campus Operations Command Center & Analytics"
        description="Enterprise multi-dimensional analytics portal for monitoring academic operations, faculty allocations, infrastructure occupancy, visitors, maintenance SLAs, and live system metrics."
        breadcrumbs={[{ label: 'Control Center Analytics' }]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" icon={Printer} onClick={handleExportPDF} className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
              Print Report
            </Button>
            <Button variant="outline" size="sm" icon={FileSpreadsheet} onClick={handleExportExcel} className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
              Export Excel
            </Button>
            <Button variant="primary" size="sm" icon={Download} onClick={handleExportPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Export PDF
            </Button>
          </div>
        }
      />

      <div className="space-y-14 md:space-y-16 pb-16">
        {/* SECTION 11 — INTERACTIVE FILTERS BAR */}
        <Card className="bg-white border border-slate-200 shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">Analytics Control Filters</span>
                  <span className="text-[10px] text-slate-500 font-semibold block">Live Filter Scope • Real-Time Dynamic Update</span>
                </div>
                <Badge variant="warning" size="sm" className="ml-1">Live Scope</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 flex-1 min-w-0 w-full max-w-6xl">
                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Time Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="today">Today (Live)</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="semester">This Semester</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Department</label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="all">All Departments</option>
                    <option value="cse">Computer Science (CSE)</option>
                    <option value="aids">AI & Data Science</option>
                    <option value="ece">Electronics (ECE)</option>
                    <option value="eee">Electrical (EEE)</option>
                    <option value="mech">Mechanical (MECH)</option>
                    <option value="civil">Civil Engineering</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Building</label>
                  <select
                    value={selectedBuilding}
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="all">All Campus Buildings</option>
                    <option value="as">AS Block</option>
                    <option value="ib">IB Block</option>
                    <option value="sunflower">Sunflower Block</option>
                    <option value="mech">Mechanical Block</option>
                    <option value="research">Research Park</option>
                    <option value="hostel">Campus Hostel</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="2025-2026">2025 - 2026</option>
                    <option value="2024-2025">2024 - 2025</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="odd">Odd Sem (III / V / VII)</option>
                    <option value="even">Even Sem (IV / VI / VIII)</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase block mb-1 tracking-wider">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full min-w-0 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="pending">Pending Only</option>
                    <option value="completed">Completed Only</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 xl:pt-0">
                <Button variant="primary" size="sm" onClick={handleApplyFilters} className="!bg-blue-600 hover:!bg-blue-700 !text-white font-extrabold shadow-sm">
                  Apply Filters
                </Button>
                <button
                  onClick={handleResetFilters}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 1 — EXECUTIVE KPI OVERVIEW (10 Cards) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              Executive KPI Overview (10 Core Campus Metrics)
            </h3>
            <span className="text-xs text-slate-500 font-semibold">Real-Time Sync • Live Data Feed</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {dynamicKPIs.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2 hover:border-indigo-300 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase truncate max-w-[100px]">{kpi.label}</span>
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${kpi.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h4>
                      <span className={`text-[11px] font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {kpi.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {kpi.trend}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold block">{kpi.comp}</span>
                  </div>

                  {/* Progress Bar & Mini Sparkline */}
                  <div className="space-y-1 pt-1">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${kpi.isUp ? 'bg-indigo-600' : 'bg-rose-500'}`}
                        style={{ width: `${kpi.progress}%` }}
                      />
                    </div>

                    {/* SVG Sparkline Graph */}
                    <div className="h-4 w-full pt-0.5">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20">
                        <polyline
                          fill="none"
                          stroke={kpi.isUp ? '#4f46e5' : '#e11d48'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={kpi.sparkline.map((val, i) => `${(i / (kpi.sparkline.length - 1)) * 100},${20 - (val / 100) * 18}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2 — ACADEMIC OPERATIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Section 2 — Academic Operations Analytics
            </h3>
            <Badge variant="info" size="sm">Academic Matrix</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Faculty Allocation by Department (Horizontal Bar) */}
            <div className="lg:col-span-5">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>1. Faculty Allocation by Department</span>
                    <Badge variant="neutral" size="sm">186 Total Staff</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3.5">
                  {dynamicFacultyAllocationsDept.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 truncate">{item.dept}</span>
                        <span className="font-black text-slate-900">{item.val} Staff</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden flex">
                        <div
                          className={`h-full rounded-lg transition-all duration-500 ${item.color}`}
                          style={{ width: `${(item.val / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chart 2: Class Distribution (Donut Chart) */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    2. Class Distribution (Donut Chart)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 flex flex-col items-center justify-center space-y-4">
                  {/* SVG Donut Ring Representation */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-blue-600" strokeWidth="4.5" strokeDasharray="32, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-indigo-600" strokeWidth="4.5" strokeDasharray="28, 100" strokeDashoffset="-32" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-purple-600" strokeWidth="4.5" strokeDasharray="24, 100" strokeDashoffset="-60" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-amber-500" strokeWidth="4.5" strokeDasharray="16, 100" strokeDashoffset="-84" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-black text-slate-900">4,250</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Students</span>
                    </div>
                  </div>

                  <div className="w-full space-y-2 pt-1">
                    {classDistribution.map((cd, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${cd.color.split(' ')[1]}`} />
                          <span className="font-semibold text-slate-700">{cd.label}</span>
                        </div>
                        <span className="font-bold text-slate-900">{cd.count} ({cd.pct}%)</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart 3: Timetable Utilization (Line Chart Mon-Fri) */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>3. Timetable Utilization (Line Chart)</span>
                    <Badge variant="info" size="sm">Mon - Fri</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="h-44 w-full pt-4 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="100" x2="300" y2="100" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Line graph curved path */}
                      <path
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        d="M 15 50 C 60 20, 100 10, 150 5, 200 30, 285 60"
                      />

                      {/* Points */}
                      <circle cx="15" cy="50" r="5" className="fill-indigo-600 stroke-white stroke-2" />
                      <circle cx="80" cy="22" r="5" className="fill-indigo-600 stroke-white stroke-2" />
                      <circle cx="150" cy="8" r="6" className="fill-amber-500 stroke-white stroke-2" />
                      <circle cx="220" cy="32" r="5" className="fill-indigo-600 stroke-white stroke-2" />
                      <circle cx="285" cy="62" r="5" className="fill-indigo-600 stroke-white stroke-2" />
                    </svg>

                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-2 px-1">
                      <span>Mon (142)</span>
                      <span>Tue (158)</span>
                      <span className="text-amber-600">Wed (164 Peak)</span>
                      <span>Thu (150)</span>
                      <span>Fri (136)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-600 flex items-center justify-between">
                    <span>Average Daily Lectures: <strong>150 Classes</strong></span>
                    <span className="text-emerald-600 font-bold">100% On-Time</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 3 — INFRASTRUCTURE ANALYTICS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              Section 3 — Campus Infrastructure Analytics
            </h3>
            <Badge variant="navy" size="sm">Facility Ledger</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Building Usage (Stacked Bar Chart) */}
            <div className="lg:col-span-7">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>Building Usage (Stacked Bar: Occupied vs Available)</span>
                    <div className="flex items-center gap-3 text-[11px] font-medium">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Occupied</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3.5">
                  {dynamicBuildingUsageStacked.map((bld, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{bld.name}</span>
                        <span className="text-slate-500 font-semibold">{bld.occupied} Occupied / {bld.available} Free ({bld.pct}%)</span>
                      </div>
                      <div className="w-full bg-emerald-500 h-3.5 rounded-lg overflow-hidden flex">
                        <div
                          className="bg-indigo-600 h-full transition-all duration-500"
                          style={{ width: `${(bld.occupied / bld.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chart 2: Facility Usage (Pie / Category Breakdown) */}
            <div className="lg:col-span-5">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Facility Usage Breakdown (Percentage Rate)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {facilityUsagePie.map((fac, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-700 truncate">{fac.name}</span>
                          <span className="text-xs font-black text-slate-900">{fac.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${fac.color}`} style={{ width: `${fac.pct * 3.5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 4 — COMPLAINT & ISSUE ANALYTICS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-600" />
              Section 4 — Complaint & Infrastructure Issue Analytics
            </h3>
            <Badge variant="error" size="sm">Resolution SLA</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Complaint Status (Donut Chart) */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Complaint Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  {dynamicComplaintStatusDonut.map((cs, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{cs.label}</span>
                        <span className="font-black text-slate-900">{cs.count} ({cs.pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${cs.color.split(' ')[1]}`} style={{ width: `${cs.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Issue Categories (Horizontal Bar Chart) */}
            <div className="lg:col-span-8">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Issue Categories Breakdown (Incident Reports)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {issueCategories.map((cat, idx) => (
                      <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{cat.cat}</span>
                          <span className="font-black text-slate-700">{cat.count} Tickets ({cat.pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct * 2.5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 5 — VISITOR ANALYTICS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              Section 5 — Visitor Insights & Security Gate Analytics
            </h3>
            <Badge variant="info" size="sm">Gate Security</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily & Weekly Visitor Traffic */}
            <div className="lg:col-span-8">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>Daily & Weekly Visitor Check-ins</span>
                    <Badge variant="neutral" size="sm">Avg 112 / Day</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="h-40 w-full pt-4 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                      <defs>
                        <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#visitorGradient)" d="M 10 90 L 10 60 L 55 45 L 100 20 L 150 35 L 200 15 L 245 70 L 290 85 L 290 90 Z" />
                      <polyline fill="none" stroke="#0284c7" strokeWidth="3" points="10,60 55,45 100,20 150,35 200,15 245,70 290,85" />
                      <circle cx="200" cy="15" r="5" className="fill-sky-600 stroke-white stroke-2" />
                    </svg>

                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-2">
                      <span>Mon (85)</span>
                      <span>Tue (110)</span>
                      <span>Wed (142)</span>
                      <span>Thu (128)</span>
                      <span className="text-sky-600 font-extrabold">Fri (160 Peak)</span>
                      <span>Sat (45)</span>
                      <span>Sun (20)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visitor Purpose Breakdown */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Visitor Purpose Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-2.5">
                  {dynamicVisitorPurposeData.map((vp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{vp.purpose}</span>
                        <span className="font-extrabold text-slate-900">{vp.count} ({vp.pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${vp.color}`} style={{ width: `${vp.pct * 2.5}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 6 — FACULTY SUBSTITUTION ANALYTICS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Section 6 — Faculty Substitution Analytics & Frequency Log
            </h3>
            <Badge variant="success" size="sm">Staff Continuity</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Department-wise Substitutions Count
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-2.5">
                  {deptSubstitutions.map((ds, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{ds.dept}</span>
                        <span className="font-extrabold text-slate-900">{ds.count} Classes</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${ds.color}`} style={{ width: `${(ds.count / 15) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xs uppercase tracking-wider">
                    Most Frequently Replaced Faculty (Substitutions Ledger)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-800 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="p-2.5 rounded-l-lg">Faculty Name</th>
                          <th className="p-2.5">Dept</th>
                          <th className="p-2.5">Replaced</th>
                          <th className="p-2.5">Primary Reason</th>
                          <th className="p-2.5">Assigned Sub</th>
                          <th className="p-2.5 rounded-r-lg text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {frequentReplacedFaculty.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-slate-900">{item.name}</td>
                            <td className="p-2.5 text-blue-700 font-semibold">{item.dept}</td>
                            <td className="p-2.5 font-bold text-slate-900">{item.count} Times</td>
                            <td className="p-2.5 text-slate-600">{item.reason}</td>
                            <td className="p-2.5 text-slate-900 font-semibold">{item.sub}</td>
                            <td className="p-2.5 text-right">
                              <Badge variant={item.status === 'Approved' ? 'success' : 'warning'} size="sm">
                                {item.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 7 — CAMPUS HEATMAP SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600" />
              Section 7 — Campus Building Occupancy & Heatmap Summary
            </h3>
            <Badge variant="warning" size="sm">Occupancy Index</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dynamicBuildingHeatmap.map((bhm, idx) => (
              <Card key={idx} className="hover:border-orange-300 transition-all">
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">{bhm.name}</span>
                    <Badge variant="neutral" size="sm" className="text-[10px]">{bhm.status}</Badge>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold tracking-widest">{bhm.bar}</span>
                    <span className="text-2xl font-black text-slate-900">{bhm.pct}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full ${bhm.color}`} style={{ width: `${bhm.pct}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION 8 — SYSTEM PERFORMANCE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-600" />
              Section 8 — System Health & Server Performance
            </h3>
            <Badge variant="navy" size="sm">System Radar</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">API Response Time</span>
              <h4 className="text-xl font-black text-amber-400">24ms</h4>
              <span className="text-[10px] text-emerald-400 font-semibold block">⚡ Optimal</span>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Database Health</span>
              <h4 className="text-xl font-black text-emerald-400">99.9%</h4>
              <span className="text-[10px] text-emerald-400 font-semibold block">✓ Healthy Sync</span>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Server Status</span>
              <h4 className="text-xl font-black text-blue-400">Operational</h4>
              <span className="text-[10px] text-blue-400 font-semibold block">100% Uptime</span>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Notifications Today</span>
              <h4 className="text-xl font-black text-indigo-400">1,420</h4>
              <span className="text-[10px] text-indigo-400 font-semibold block">Dispatched</span>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Users Logged In</span>
              <h4 className="text-xl font-black text-purple-400">342</h4>
              <span className="text-[10px] text-purple-400 font-semibold block">Active Sessions</span>
            </div>

            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1 border border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Avg Response Time</span>
              <h4 className="text-xl font-black text-teal-400">18ms</h4>
              <span className="text-[10px] text-teal-400 font-semibold block">Peak Efficiency</span>
            </div>
          </div>
        </div>

        {/* SECTION 9 & 10 — TIMELINE & QUICK INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SECTION 9 — RECENT ACTIVITY TIMELINE */}
          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Section 9 — Recent Administrative Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {dynamicActivityTimeline.map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div key={idx} className="relative flex items-start justify-between gap-3 text-xs">
                        <div className={`absolute -left-6 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${act.color.split(' ')[1]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${act.color.split(' ')[0]}`} />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900">{act.title}</span>
                            <Badge variant="neutral" size="sm" className="text-[9px]">{act.category}</Badge>
                          </div>
                          <p className="text-slate-600 text-[11px]">{act.desc}</p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">{act.time}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SECTION 10 — QUICK INSIGHTS SUMMARY */}
          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Section 10 — Quick Executive Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {dynamicQuickInsights.map((qi, idx) => {
                  const Icon = qi.icon;
                  return (
                    <div key={idx} className={`p-3 bg-slate-50 rounded-xl border border-slate-200 border-l-4 ${qi.highlight} space-y-1`}>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{qi.title}</span>
                      <h5 className="text-xs font-black text-slate-900">{qi.val}</h5>
                      <p className="text-[10px] text-slate-500">{qi.desc}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
