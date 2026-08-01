import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  UserCheck,
  Bell,
  Navigation,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Layers
} from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { INITIAL_FACULTY_PROFILE, FACULTY_TIMETABLE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';

export const FacultyDashboardPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const todayClasses = FACULTY_TIMETABLE.filter((c) => c.day === 'Friday' || c.day === 'Monday');
  const currentClass = todayClasses.find((c) => c.status === 'Ongoing') || todayClasses[0];
  const nextClass = todayClasses.find((c) => c.status === 'Upcoming') || todayClasses[1];

  const summaryCards = [
    { label: "Today's Classes", val: `${todayClasses.length} Classes`, sub: 'Friday Schedule', icon: Calendar, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Current Class', val: currentClass ? currentClass.subject_code : 'None', sub: currentClass ? currentClass.room : 'Free Period', icon: Clock, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Next Class', val: nextClass ? nextClass.subject_code : 'Free Period', sub: nextClass ? nextClass.start_time : 'No more classes', icon: ArrowRight, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Upcoming Event', val: 'Dept Meeting', sub: '03:00 PM • Seminar Hall 2', icon: CalendarDays, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Pending Substitution', val: '1 Request', sub: 'Aug 06 (CS301)', icon: UserCheck, color: 'bg-red-50 text-red-700 border-red-200' },
    { label: 'Unread Notifications', val: '2 Alerts', sub: 'Meeting & Substitute updates', icon: Bell, color: 'bg-sky-50 text-sky-700 border-sky-200' },
  ];

  const handleNavigateToClass = (cls) => {
    addToast(`Navigating to ${cls.room} (${cls.building}) on Campus Map`, 'info');
    navigate(`/faculty/map?dest=${encodeURIComponent(cls.room)}&building=${encodeURIComponent(cls.building)}`);
  };

  return (
    <FacultyLayout>
      <PageHeader
        title={`Welcome, ${INITIAL_FACULTY_PROFILE.name}`}
        description={`${INITIAL_FACULTY_PROFILE.designation} • ${INITIAL_FACULTY_PROFILE.department}`}
        breadcrumbs={[{ label: 'Faculty Dashboard' }]}
        actions={
          <Badge variant="navy" size="md">
            Office: {INITIAL_FACULTY_PROFILE.office_location}
          </Badge>
        }
      />

      <div className="space-y-8">
        {/* Summary Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {summaryCards.map((card, idx) => (
            <Card key={idx} hoverEffect className="p-4">
              <div className="flex flex-col justify-between h-full space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs shrink-0 ${card.color}`}>
                    <card.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">{card.val}</h3>
                  <span className="text-[11px] text-slate-500 truncate block mt-0.5">{card.sub}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Today's Schedule Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Today's Schedule</h2>
              <p className="text-xs text-slate-500">Classes and lectures assigned to you today</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/faculty/timetable')}>
              View Complete Weekly Timetable →
            </Button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <Card key={cls.id} hoverEffect className="border-l-4 border-l-blue-600">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">{cls.subject}</span>
                      <Badge variant="info" size="sm">{cls.subject_code}</Badge>
                      <Badge variant={cls.status === 'Ongoing' ? 'success' : 'neutral'} size="sm">
                        {cls.status}
                      </Badge>
                    </div>

                    <div className="text-xs font-semibold text-blue-700">
                      {cls.class_name}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>{cls.building}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Room <strong>{cls.room}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>Floor <strong>{cls.floor}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{cls.start_time} - {cls.end_time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={MapPin}
                      onClick={() => handleNavigateToClass(cls)}
                    >
                      View on Campus Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
};
