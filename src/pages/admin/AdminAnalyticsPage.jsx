import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminAnalyticsPage = () => {
  return (
    <AdminLayout>
      <PageHeader
        title="Campus Operations & Academic Analytics"
        description="Exclusive admin analytics dashboard for classroom utilization rates, faculty allocation statistics, and facility resolution metrics."
        breadcrumbs={[{ label: 'Analytics' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-600" />
                Operational Key Performance Indicators (KPIs)
              </CardTitle>
              <Badge variant="info" size="sm">System Intelligence</Badge>
            </div>
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
      </div>
    </AdminLayout>
  );
};
