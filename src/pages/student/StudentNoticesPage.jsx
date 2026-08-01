import React, { useState } from 'react';
import { Bell, Download, Search, FileText } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchBar } from '../../components/ui/SearchBar';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentNoticesPage = () => {
  const { notices } = useStudent();
  const { addToast } = useToast();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotices = notices.filter((n) => {
    const matchesQuery = !query || n.title.toLowerCase().includes(query.toLowerCase()) || n.summary.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const handleDownloadPDF = (notice) => {
    addToast(`Downloading ${notice.pdfName || 'Notice_Document.pdf'}...`, 'success');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Student Notices & Official Announcements"
        description="Official updates on exam schedules, holiday notices, placement drives, workshops, and internal marks."
        breadcrumbs={[{ label: 'Notices' }]}
      />

      <div className="space-y-6 max-w-4xl">
        {/* Search & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <SearchBar
              placeholder="Search notices..."
              onSearch={(q) => setQuery(q)}
              size="sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Academic', 'Facilities', 'Events', 'Career'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-400">
                No notices found matching your search.
              </CardContent>
            </Card>
          ) : (
            filteredNotices.map((n) => (
              <Card key={n.id}>
                <CardHeader
                  actions={
                    <div className="flex items-center gap-2">
                      <Badge variant={n.urgent ? 'error' : 'info'} size="sm">{n.category}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Download}
                        onClick={() => handleDownloadPDF(n)}
                      >
                        Download PDF
                      </Button>
                    </div>
                  }
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <CardTitle className="text-base">{n.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 p-5 text-xs text-slate-700">
                  <p className="leading-relaxed text-sm text-slate-900">{n.summary}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                    <span>Published by Campus Academic Registrar</span>
                    <span>Date: {n.date}</span>
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
