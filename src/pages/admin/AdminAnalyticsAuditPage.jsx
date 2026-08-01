import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, BarChart2, FileSpreadsheet, Clock, Settings, User, Download, CheckCircle2, Shield, Lock } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useRole } from '../../context/RoleContext';
import { useToast } from '../../context/ToastContext';

export const AdminAnalyticsAuditPage = () => {
  const location = useLocation();
  const { heatmap, auditLogs, settings, setSettings } = useAdmin();
  const { user } = useRole();
  const { addToast } = useToast();

  const isHeatmap = location.pathname.includes('/heatmap');
  const isAnalytics = location.pathname.includes('/analytics');
  const isReports = location.pathname.includes('/reports');
  const isAudit = location.pathname.includes('/audit-logs');
  const isSettings = location.pathname.includes('/settings');
  const isProfile = location.pathname.includes('/profile');

  const [activeTab, setActiveTab] = useState(
    isHeatmap ? 'heatmap' : isAnalytics ? 'analytics' : isReports ? 'reports' : isAudit ? 'audit' : isSettings ? 'settings' : isProfile ? 'profile' : 'heatmap'
  );

  const handleExportCSV = (reportName) => {
    addToast(`Exported ${reportName} to CSV format successfully!`, 'success');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Analytics, Heatmaps, Audit Logs & System Settings"
        description="Admin-only intelligence center: Campus crowd heatmaps, operational performance analytics, CSV exports, audit trails, and system settings."
        breadcrumbs={[{ label: 'Analytics & Audit' }]}
        actions={
          <div className="flex flex-wrap gap-1.5">
            <Button variant={activeTab === 'heatmap' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('heatmap')}>Heatmap</Button>
            <Button variant={activeTab === 'analytics' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('analytics')}>Analytics</Button>
            <Button variant={activeTab === 'reports' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('reports')}>Reports</Button>
            <Button variant={activeTab === 'audit' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('audit')}>Audit Logs</Button>
            <Button variant={activeTab === 'settings' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('settings')}>Settings</Button>
            <Button variant={activeTab === 'profile' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('profile')}>Profile</Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* TAB 1: CAMPUS HEATMAP */}
        {activeTab === 'heatmap' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Real-Time Campus Occupancy & Crowd Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heatmap.map((hm, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-extrabold text-slate-900">{hm.building}</h4>
                      <Badge variant={hm.occupancyPercent > 85 ? 'error' : hm.occupancyPercent > 70 ? 'warning' : 'success'} size="sm" className="font-bold">
                        {hm.crowdLevel} ({hm.occupancyPercent}%)
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all rounded-full ${
                          hm.occupancyPercent > 85 ? 'bg-red-600' : hm.occupancyPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${hm.occupancyPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Active Classrooms: {hm.activeClassrooms}</span>
                      <span>Peak Hours: {hm.peakTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 2: ANALYTICS */}
        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-600" />
                Operational & Academic Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Classroom Utilization</span>
                  <h3 className="text-2xl font-black text-slate-900">84.2%</h3>
                  <span className="text-xs text-emerald-600 font-semibold">↑ +3.5% vs last week</span>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Faculty Allocation Rate</span>
                  <h3 className="text-2xl font-black text-slate-900">100%</h3>
                  <span className="text-xs text-emerald-600 font-semibold">Fully Assigned</span>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Average Complaint Resolution</span>
                  <h3 className="text-2xl font-black text-slate-900">4.2 Hours</h3>
                  <span className="text-xs text-emerald-600 font-semibold">Fast Turnaround</span>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Visitor Pass Approval</span>
                  <h3 className="text-2xl font-black text-slate-900">96.8%</h3>
                  <span className="text-xs text-blue-600 font-semibold">Verified Hosts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: REPORTS & CSV EXPORT */}
        {activeTab === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                Administrative Report Generator & Export
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {[
                'Faculty Allocation & Schedule Report',
                'Classroom Utilization & Occupancy Log',
                'Faculty Substitution Requests Summary',
                'Visitor Entry & Exit Register',
                'Complaints & Maintenance Resolution Report',
                'Campus Facilities Status Ledger'
              ].map((rep, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rep}</h4>
                    <span className="text-xs text-slate-500">Includes complete department filtering and time stamps</span>
                  </div>
                  <Button variant="outline" size="sm" icon={Download} onClick={() => handleExportCSV(rep)}>
                    Export CSV
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Immutable Administrative Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Log ID</th>
                      <th className="p-3">Action Description</th>
                      <th className="p-3">Admin User</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Module</th>
                      <th className="p-3 rounded-r-lg">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">{log.id}</td>
                        <td className="p-3 font-extrabold text-slate-900">{log.action}</td>
                        <td className="p-3 font-semibold text-blue-700">{log.user}</td>
                        <td className="p-3 text-slate-600">{log.timestamp}</td>
                        <td className="p-3"><Badge variant="neutral" size="sm">{log.module}</Badge></td>
                        <td className="p-3 text-slate-600">{log.newValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 5: SYSTEM SETTINGS */}
        {activeTab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-700" />
                System Settings & Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 max-w-xl">
              <Input label="Campus System Title" value={settings.campusName} onChange={(e) => setSettings({ ...settings, campusName: e.target.value })} />
              <Input label="Academic Year" value={settings.academicYear} onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })} />
              <Input label="Current Semester" value={settings.currentSemester} onChange={(e) => setSettings({ ...settings, currentSemester: e.target.value })} />
              <Input label="Campus Working Hours" value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} />
              <Button variant="primary" size="md" onClick={() => addToast('System settings updated successfully!', 'success')}>
                Save Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {/* TAB 6: ADMIN PROFILE */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                System Administrator Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 max-w-md">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-amber-400" />
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{user.name}</h3>
                  <Badge variant="navy" size="sm">System Administrator (Highest Authority)</Badge>
                  <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};
