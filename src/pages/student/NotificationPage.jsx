import React, { useState } from 'react';
import { Bell, CheckCircle2, Filter } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useStudent } from '../../context/StudentContext';

export const NotificationPage = () => {
  const { notifications, markAllAsRead } = useStudent();
  const [filter, setFilter] = useState('All');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'Unread') return !n.read;
    return true;
  });

  return (
    <AppLayout>
      <PageHeader
        title="Student Notifications & Alert Feed"
        description="Stay updated with complaint progress, new notices, timetable changes, cafeteria tokens, and emergency broadcasts."
        breadcrumbs={[{ label: 'Notifications' }]}
      />

      <div className="max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              All Notifications ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('Unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filter === 'Unread' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </button>
          </div>

          <Button variant="ghost" size="sm" icon={CheckCircle2} onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        <Card>
          <CardContent className="divide-y divide-slate-100 p-0">
            {filteredNotifs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No notifications to display.
              </div>
            ) : (
              filteredNotifs.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                    !n.read ? 'bg-blue-50/40' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                      <Badge variant={n.type === 'emergency' ? 'error' : 'info'} size="sm">
                        {n.type || 'Alert'}
                      </Badge>
                      <span className="text-[11px] text-slate-400">{n.time}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{n.title}</h4>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
