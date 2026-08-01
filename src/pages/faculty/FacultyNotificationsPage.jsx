import React, { useState } from 'react';
import { Bell, CheckCircle2, Check, Trash2, Clock, CalendarDays, UserCheck } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { useSubstitution } from '../../context/SubstitutionContext';

export const FacultyNotificationsPage = () => {
  const { addToast } = useToast();
  const { facultyNotifications, markFacultyNotificationRead, clearFacultyNotifications } = useSubstitution();

  const markAsRead = (id) => {
    markFacultyNotificationRead(id);
    addToast('Marked notification as read', 'info');
  };

  const markAllAsRead = () => {
    facultyNotifications.forEach((n) => markFacultyNotificationRead(n.id));
    addToast('All notifications marked as read', 'success');
  };

  const clearAll = () => {
    clearFacultyNotifications();
    addToast('Notification feed cleared', 'info');
  };

  const unreadCount = facultyNotifications.filter((n) => !n.read_status).length;

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Notification Center"
        description="Alerts for substitute requests, meeting reminders, venue changes, and academic circulars."
        breadcrumbs={[{ label: 'Notifications' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Check} onClick={markAllAsRead}>
              Mark All as Read
            </Button>
            <Button variant="ghost" size="sm" icon={Trash2} onClick={clearAll}>
              Clear Feed
            </Button>
          </div>
        }
      />

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
          <span>Showing {facultyNotifications.length} alerts</span>
          {unreadCount > 0 && (
            <Badge variant="info" size="sm">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        {facultyNotifications.length === 0 ? (
          <Card className="bg-slate-50 p-8 text-center border-dashed border-slate-300 text-xs text-slate-500">
            No notifications in your inbox.
          </Card>
        ) : (
          facultyNotifications.map((n) => (
            <Card
              key={n.id}
              className={`transition-all ${
                !n.read_status ? 'bg-blue-50/50 border-l-4 border-l-blue-600 shadow-sm' : 'bg-white'
              }`}
            >
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 shadow-xs">
                    {n.type === 'substitute' ? (
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                    ) : n.type === 'meeting' ? (
                      <CalendarDays className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-600" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900">{n.title}</h4>
                      {!n.read_status && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">{n.created_at}</span>
                  </div>
                </div>

                {!n.read_status && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Check}
                    onClick={() => markAsRead(n.id)}
                  >
                    Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </FacultyLayout>
  );
};
