import React, { useState } from 'react';
import { FileText, Bell, AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FACULTY_NOTICES } from '../../services/facultyData';
import { useAdmin } from '../../context/AdminContext';

export const FacultyNoticesPage = () => {
  const { notices } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Academic', 'Department', 'Meeting', 'Important'];

  // Merge static faculty notices with live notices published by Admin
  const adminFacultyNotices = notices.map((n) => ({
    id: `adm_${n.id}`,
    title: n.title,
    description: `Official Notice for ${n.target}: ${n.title}`,
    priority: n.priority,
    category: 'Department',
    posted_by: 'Campus Administration',
    date: n.date,
    time: 'Today'
  }));

  const allNotices = [...adminFacultyNotices, ...FACULTY_NOTICES];

  const filteredNotices = allNotices.filter((n) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Important') return n.priority === 'High' || n.priority === 'Important' || n.priority === 'Urgent';
    return n.category === activeCategory;
  });

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Notices & Circulars"
        description="Departmental announcements, administrative circulars, and official faculty notices."
        breadcrumbs={[{ label: 'Faculty Notices' }]}
      />

      <div className="space-y-6 max-w-4xl">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const isHighPriority = notice.priority === 'High' || notice.priority === 'Important' || notice.priority === 'Urgent';

            if (isHighPriority) {
              return (
                <div
                  key={notice.id}
                  className="bg-red-600 text-white rounded-xl border-2 border-red-700 shadow-xl overflow-hidden p-5 space-y-4 transition-all"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-red-500 pb-3">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-6 h-6 text-yellow-300 animate-bounce shrink-0" />
                      <h3 className="text-base font-black text-white tracking-tight">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-md text-xs font-black bg-red-950 text-white border border-red-400">
                        🚨 {notice.priority} Priority
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-800 text-red-100 border border-red-500">
                        {notice.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-white leading-relaxed tracking-wide">
                    {notice.description}
                  </p>

                  <div className="pt-3 border-t border-red-500 flex items-center justify-between text-xs font-bold text-red-100">
                    <span>Posted by: <strong className="text-white underline">{notice.posted_by}</strong></span>
                    <span className="font-mono text-white bg-red-800 px-2 py-0.5 rounded">{notice.date} {notice.time && `at ${notice.time}`}</span>
                  </div>
                </div>
              );
            }

            return (
              <Card key={notice.id}>
                <CardHeader
                  actions={
                    <div className="flex items-center gap-2">
                      <Badge variant="info" size="sm">
                        {notice.priority} Priority
                      </Badge>
                      <Badge variant="neutral" size="sm">{notice.category}</Badge>
                    </div>
                  }
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-base">{notice.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  <p className="text-xs text-slate-700 leading-relaxed">{notice.description}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Posted by: <strong>{notice.posted_by}</strong></span>
                    <span>{notice.date} {notice.time && `at ${notice.time}`}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </FacultyLayout>
  );
};
