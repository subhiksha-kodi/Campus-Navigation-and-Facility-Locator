import React, { useEffect, useMemo, useState } from 'react';
import { BarChart2, TrendingUp, Star, MessageSquare, Image, Video } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
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

export const AdminAnalyticsPage = () => {
  const [feedbackSubmissions, setFeedbackSubmissions] = useState(() => getAllFeedbackSubmissions());

  useEffect(() => {
    const handleStorage = () => setFeedbackSubmissions(getAllFeedbackSubmissions());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const feedbackSummary = useMemo(() => {
    const total = feedbackSubmissions.length;
    const averageOverall = total
      ? (feedbackSubmissions.reduce((sum, item) => sum + (item.overallRating || 0), 0) / total).toFixed(1)
      : '0.0';
    const averageByAspect = Object.fromEntries(
      FEEDBACK_ASPECT_OPTIONS.map((aspect) => [
        aspect.key,
        total
          ? (feedbackSubmissions.reduce((sum, item) => sum + (item.aspectRatings?.[aspect.key] || 0), 0) / total).toFixed(1)
          : '0.0',
      ])
    );

    return { total, averageOverall, averageByAspect };
  }, [feedbackSubmissions]);

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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Visitor Feedback Intelligence
              </CardTitle>
              <Badge variant="info" size="sm">From local browser storage</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Feedback submissions</span>
                <h3 className="text-2xl font-black text-slate-900">{feedbackSummary.total}</h3>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Average overall rating</span>
                <h3 className="text-2xl font-black text-slate-900">{feedbackSummary.averageOverall}</h3>
                <span className="text-xs text-amber-600 font-semibold">Out of 5</span>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Navigation ease</span>
                <h3 className="text-2xl font-black text-slate-900">{feedbackSummary.averageByAspect.navigationEase}</h3>
              </div>
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Host experience</span>
                <h3 className="text-2xl font-black text-slate-900">{feedbackSummary.averageByAspect.hostExperience}</h3>
              </div>
            </div>

            <div className="space-y-3">
              {feedbackSubmissions.length > 0 ? (
                feedbackSubmissions.slice(0, 4).map((submission) => (
                  <div key={submission.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{submission.visitSnapshot?.host || 'Visitor feedback'}</h4>
                        <p className="text-xs text-slate-500">{submission.visitSnapshot?.date} • {submission.visitorName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="sm">Visit {submission.visitId}</Badge>
                        <Badge variant="success" size="sm">{submission.overallRating}/5</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        {renderMiniStars(submission.overallRating)}
                        <span className="font-semibold text-slate-700">Overall</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><Image className="w-3.5 h-3.5" /> {submission.media?.photos?.length || 0}</span>
                        <span className="inline-flex items-center gap-1"><Video className="w-3.5 h-3.5" /> {submission.media?.video ? 1 : 0}</span>
                      </div>
                    </div>

                    {submission.comment && (
                      <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {submission.comment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-slate-50 border border-slate-100 text-xs text-slate-450 rounded-xl">
                  No visitor feedback has been submitted yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
