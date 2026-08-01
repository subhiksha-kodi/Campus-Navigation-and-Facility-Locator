import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListOrdered, Plus, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { useStudent } from '../../context/StudentContext';

export const ComplaintHistoryPage = () => {
  const navigate = useNavigate();
  const { complaints } = useStudent();

  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const filtered = complaints
    .filter((c) => (statusFilter === 'All' ? true : c.status === statusFilter))
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Working': return 'info';
      case 'Assigned': return 'navy';
      case 'Pending': return 'warning';
      default: return 'info';
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Complaint History & Tracking"
        description="Track status progress of all submitted maintenance and facility complaints."
        breadcrumbs={[{ label: 'Complaint History' }]}
      />

      <div className="space-y-6 max-w-4xl">
        {/* Filters & Top CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Select
              label=""
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Assigned', label: 'Assigned' },
                { value: 'Working', label: 'Working' },
                { value: 'Completed', label: 'Completed' },
              ]}
              className="w-40"
            />

            <Select
              label=""
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
              ]}
              className="w-36"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/student/complaints')}
          >
            File New Complaint
          </Button>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-400">
                No complaints found for the selected filter.
              </CardContent>
            </Card>
          ) : (
            filtered.map((item) => (
              <Card key={item.id} className="hover:border-slate-300 transition-all">
                <CardHeader actions={<Badge variant={getBadgeVariant(item.status)} size="sm">{item.status}</Badge>}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-blue-600 text-sm">{item.id}</span>
                    <CardTitle className="text-sm">{item.type}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-3 text-xs text-slate-700">
                  <p className="font-medium text-slate-900">{item.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-400 uppercase block">Location:</span>
                      <span>{item.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase block">Reported On:</span>
                      <span>{item.date}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase block">Assigned Team:</span>
                      <span className="font-semibold text-slate-800">{item.assignedTo}</span>
                    </div>
                  </div>

                  {/* Status Progress Stepper */}
                  <div className="pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Resolution Progress</span>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
                      {['Pending', 'Assigned', 'Working', 'Completed'].map((step, idx) => {
                        const stepOrder = ['Pending', 'Assigned', 'Working', 'Completed'];
                        const currentIdx = stepOrder.indexOf(item.status);
                        const isDone = idx <= currentIdx;
                        return (
                          <div key={step} className="space-y-1">
                            <div className={`h-1.5 rounded-full ${isDone ? 'bg-blue-600' : 'bg-slate-200'}`} />
                            <span className={isDone ? 'text-blue-700' : 'text-slate-400'}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};
