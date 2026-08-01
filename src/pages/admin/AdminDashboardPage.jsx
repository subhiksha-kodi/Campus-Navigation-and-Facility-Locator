import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Star,
  Image,
  Video
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { FEEDBACK_ASPECT_OPTIONS, getAllFeedbackSubmissions } from '../../services/feedbackService';

const renderMiniStars = (value) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((score) => (
      <Star
        key={score}
        className={`w-3.5 h-3.5 ${score <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
      />
    ))}
  </div>
);

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { metrics, auditLogs, complaints, visitors } = useAdmin();
  const [feedbackSubmissions, setFeedbackSubmissions] = useState(() => getAllFeedbackSubmissions());

  useEffect(() => {
    const syncFeedback = () => setFeedbackSubmissions(getAllFeedbackSubmissions());
    window.addEventListener('storage', syncFeedback);
    return () => window.removeEventListener('storage', syncFeedback);
  }, []);

  const feedbackSummary = useMemo(() => {
    const total = feedbackSubmissions.length;
    const averageOverall = total
      ? (feedbackSubmissions.reduce((sum, item) => sum + (item.overallRating || 0), 0) / total).toFixed(1)
      : '0.0';
    const averageNavigation = total
      ? (feedbackSubmissions.reduce((sum, item) => sum + (item.aspectRatings?.navigationEase || 0), 0) / total).toFixed(1)
      : '0.0';

    return { total, averageOverall, averageNavigation };
  }, [feedbackSubmissions]);

  const summaryCards = [
    { label: 'TOTAL STUDENTS', val: '4,250', sub: 'Enrolled across 6 Depts', icon: Users, color: 'border-l-blue-600 text-blue-600 bg-blue-50/50' },
    { label: 'TOTAL FACULTY', val: `${metrics.totalFaculty}`, sub: 'Active Teaching Staff', icon: UserCheck, color: 'border-l-emerald-600 text-emerald-600 bg-emerald-50/50' },
    { label: 'TOTAL DEPARTMENTS', val: `${metrics.totalDepartments}`, sub: 'CSE, ECE, EEE, MECH, CIVIL, AI&DS', icon: Building, color: 'border-l-purple-600 text-purple-600 bg-purple-50/50' },
    { label: 'TOTAL BUILDINGS', val: `${metrics.totalBuildings}`, sub: 'AS, IB, Sunflower, Mechanical, Research Park', icon: Building2, color: 'border-l-indigo-600 text-indigo-600 bg-indigo-50/50' },
    { label: 'TOTAL CLASSROOMS', val: `${metrics.totalClassrooms}`, sub: 'Labs, Halls & Smart Rooms', icon: Layers, color: 'border-l-sky-600 text-sky-600 bg-sky-50/50' },
    { label: 'TOTAL FACILITIES', val: `${metrics.totalFacilities}`, sub: 'Printers, Wi-Fi, Lifts & ATMs', icon: Shield, color: 'border-l-teal-600 text-teal-600 bg-teal-50/50' },
    { label: "TODAY'S CLASSES", val: '146', sub: 'Scheduled & In-Session', icon: Calendar, color: 'border-l-amber-500 text-amber-600 bg-amber-50/50' },
    { label: 'PENDING VISITORS', val: `${metrics.pendingVisitors}`, sub: 'Awaiting Gate Approval', icon: Users, color: 'border-l-orange-500 text-orange-600 bg-orange-50/50' },
    { label: 'PENDING SUBSTITUTIONS', val: '4', sub: 'Action Needed', icon: UserPlus, color: 'border-l-red-500 text-red-600 bg-red-50/50' },
    { label: 'ACTIVE COMPLAINTS', val: `${metrics.activeComplaints}`, sub: 'Facility Issues Under Review', icon: MessageSquare, color: 'border-l-rose-600 text-rose-600 bg-rose-50/50' },
    { label: 'FEEDBACK SUBMISSIONS', val: `${feedbackSummary.total}`, sub: 'Visitor post-visit reviews', icon: Star, color: 'border-l-amber-500 text-amber-600 bg-amber-50/50' },
    { label: 'CAMPUS OCCUPANCY', val: '72%', sub: 'Real-Time Crowd Index', icon: Activity, color: 'border-l-emerald-500 text-emerald-600 bg-emerald-50/50' }
  ];

  const quickActions = [
    { label: 'Add Faculty', path: '/admin/faculty', icon: PlusCircle },
    { label: 'Add Student', path: '/admin/students', icon: PlusCircle },
    { label: 'Create Timetable', path: '/admin/timetable', icon: Calendar },
    { label: 'Allocate Class', path: '/admin/class-allocation', icon: Clock },
    { label: 'Allocate Faculty', path: '/admin/faculty-allocation', icon: UserPlus },
    { label: 'Assign Substitute', path: '/admin/substitution', icon: UserCheck },
    { label: 'Add Building', path: '/admin/buildings', icon: Building2 },
    { label: 'Add Facility', path: '/admin/facilities', icon: Shield },
    { label: 'Create Notice', path: '/admin/notices', icon: Bell },
    { label: 'Create Event', path: '/admin/events', icon: Calendar }
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Central Campus Control Center"
        description="Master administrative dashboard for managing campus data, user roles, academic allocations, facilities, visitor requests, and system monitoring."
        breadcrumbs={[{ label: 'Control Center Dashboard' }]}
        actions={
          <Badge variant="navy" size="md" className="!bg-slate-900 !text-amber-400 font-bold border-slate-700">
            🎓 Office of the Dean Authorized
          </Badge>
        }
      />

      <div className="space-y-8">
        {/* Summary Statistics Cards Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Campus Operations Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, idx) => (
              <Card key={idx} hoverEffect className={`border-l-4 ${card.color.split(' ')[0]}`}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{card.label}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${card.color}`}>
                      <card.icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.val}</h3>
                    <p className="text-[11px] text-slate-500 truncate block mt-0.5">{card.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Dashboard Quick Actions Toolbar */}
        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="!text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                Administrative Quick Actions
              </CardTitle>
              <Badge variant="warning" size="sm">Fast Control</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {quickActions.map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(qa.path)}
                  className="p-3 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 rounded-xl border border-slate-700 text-left transition-all group flex flex-col justify-between h-20"
                >
                  <qa.icon className="w-4 h-4 text-amber-400 group-hover:text-slate-950 transition-colors" />
                  <span className="text-xs font-bold block leading-tight">{qa.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity & Monitoring Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Complaints Monitoring Preview */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader actions={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/complaints')}>View All →</Button>}>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-600" />
                  Central Complaints & Issue Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {complaints.map((cmp) => (
                  <div key={cmp.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{cmp.title}</span>
                        <Badge variant={cmp.status === 'Completed' ? 'success' : cmp.status === 'Working' ? 'info' : 'warning'} size="sm">
                          {cmp.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{cmp.building} ({cmp.room}) • Dept: {cmp.department}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold shrink-0">{cmp.id}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Audit Log Stream */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader actions={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/audit-logs')}>Audit Log →</Button>}>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Recent Administrative Audit Trail
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">{log.action}</span>
                      <p className="text-[11px] text-slate-600">{log.newValue}</p>
                      <span className="text-[10px] text-slate-400 block">{log.timestamp} • By {log.user}</span>
                    </div>
                    <Badge variant="neutral" size="sm" className="shrink-0">{log.module}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Visitor Feedback Preview */}
          <div className="lg:col-span-12">
            <Card>
              <CardHeader actions={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/analytics')}>Open Analytics →</Button>}>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  Visitor Feedback Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total reviews</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">{feedbackSummary.total}</h4>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Average overall</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">{feedbackSummary.averageOverall}</h4>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Navigation ease</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">{feedbackSummary.averageNavigation}</h4>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Latest media</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">{feedbackSubmissions[0]?.media?.photos?.length ? 'Photos' : feedbackSubmissions[0]?.media?.video ? 'Video' : 'None'}</h4>
                  </div>
                </div>

                {feedbackSubmissions.length > 0 ? (
                  <div className="space-y-3">
                    {feedbackSubmissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">{submission.visitSnapshot?.host || 'Visitor feedback'}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{submission.visitSnapshot?.date} • {submission.visitorName}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="info" size="sm">Visit {submission.visitId}</Badge>
                            <Badge variant="success" size="sm">{submission.overallRating}/5</Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 text-xs text-slate-600 flex-wrap">
                          <div className="flex items-center gap-2">
                            {renderMiniStars(submission.overallRating)}
                            <span className="font-semibold text-slate-700">Overall</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1"><Image className="w-3.5 h-3.5" /> {submission.media?.photos?.length || 0}</span>
                            <span className="inline-flex items-center gap-1"><Video className="w-3.5 h-3.5" /> {submission.media?.video ? 1 : 0}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {FEEDBACK_ASPECT_OPTIONS.map((aspect) => (
                            <div key={aspect.key} className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">{aspect.label}</span>
                              <div className="mt-1">{renderMiniStars(submission.aspectRatings?.[aspect.key] || 0)}</div>
                            </div>
                          ))}
                        </div>

                        {submission.comment && (
                          <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{submission.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-50 border border-slate-100 text-xs text-slate-450 rounded-xl">
                    No visitor feedback has been submitted yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
