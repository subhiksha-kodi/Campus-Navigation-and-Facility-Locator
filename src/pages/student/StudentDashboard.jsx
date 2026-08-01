import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Map,
  Building2,
  Mic,
  Calendar,
  Clock,
  Bell,
  MessageSquare,
  ShieldAlert,
  Coffee,
  Bookmark,
  Star,
  ArrowRight,
  UserCheck,
  Award,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { SearchBar } from '../../components/ui/SearchBar';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    student,
    attendance,
    timetable,
    notices,
    events,
    bookmarks,
    activeCafeteriaToken,
    triggerSOSAlert
  } = useStudent();

  const [selectedDestination, setSelectedDestination] = useState(null);

  // Next class from timetable
  const upcomingClass = timetable[0] || {
    subject: 'Database Management Systems',
    code: 'CS302',
    room: 'CS302',
    faculty: 'Prof. Anitha',
    time: '9:00 AM'
  };

  const quickNavCards = [
    { label: 'Campus Map', path: '/map', icon: Map, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Classroom Finder', path: '/classrooms', icon: Search, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Facility Locator', path: '/facilities', icon: Building2, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Voice Navigation', path: '/voice-navigation', icon: Mic, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Timetable', path: '/student/timetable', icon: Calendar, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { label: 'Attendance & CGPA', path: '/student/attendance', icon: Award, color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { label: 'Smart Cafeteria', path: '/student/cafeteria', icon: Coffee, color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { label: 'Report Complaint', path: '/student/complaints', icon: MessageSquare, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { label: 'Complaint History', path: '/student/complaints-history', icon: ListOrdered, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { label: 'Facility Feedback', path: '/student/feedback', icon: Star, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { label: 'Notices', path: '/student/notices', icon: Bell, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { label: 'Events', path: '/student/events', icon: Calendar, color: 'bg-pink-50 text-pink-700 border-pink-200' },
  ];

  const handleGlobalSearch = (query) => {
    if (!query) return;
    addToast(`Searching campus directory for "${query}"...`, 'info');
    if (query.toLowerCase().includes('cs') || query.toLowerCase().includes('room') || query.toLowerCase().includes('lab')) {
      navigate(`/classrooms?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/facilities?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSOSClick = () => {
    triggerSOSAlert('Student Dashboard Shortcut');
    addToast('EMERGENCY SOS ALERT ACTIVATED! Security dispatched.', 'error', 'SOS DISPATCH');
    navigate('/student/emergency');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Card & Prominent Search */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="info" size="sm">
                Student ID: {student.id}
              </Badge>
              <span className="text-xs text-slate-500 font-semibold">• Department: {student.department}</span>
              <span className="text-xs text-slate-500 font-semibold">• Year: {student.year} (Sec {student.section})</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Your central hub for campus navigation, classes, cafeteria tokens, and academic updates.
            </p>

            {/* Modular Search Bar */}
            <div className="pt-2 max-w-xl">
              <SearchBar
                placeholder="Search classrooms, facilities, buildings, notices..."
                onSearch={handleGlobalSearch}
                suggestions={[
                  'Room CS302',
                  'Central Library',
                  'Main Cafeteria',
                  'Medical Centre',
                  'Academic Block B',
                  'Lab 3'
                ]}
              />
            </div>
          </div>

          {/* Emergency SOS Shortcut Button */}
          <div className="shrink-0 flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Need Immediate Help?</span>
            <button
              onClick={handleSOSClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group animate-pulse"
            >
              <ShieldAlert className="w-5 h-5 text-white" />
              <span>EMERGENCY SOS</span>
            </button>
          </div>
        </div>

        {/* Upcoming Class Widget & Quick Attendance summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upcoming Class Highlight */}
          <div className="lg:col-span-8">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-md">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/20 text-white backdrop-blur-xs">
                      Upcoming Class
                    </span>
                    <span className="text-xs text-blue-100 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Starts at {upcomingClass.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{upcomingClass.subject} ({upcomingClass.code})</h3>
                  <p className="text-xs text-blue-100">
                    Faculty: <strong>{upcomingClass.faculty}</strong> • Location: <strong>Room {upcomingClass.room}</strong> ({upcomingClass.building})
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate(`/classrooms?q=${encodeURIComponent(upcomingClass.room)}`)}
                  className="bg-white text-blue-700 hover:bg-blue-50 shrink-0"
                >
                  Locate Classroom →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Academic Overview */}
          <div className="lg:col-span-4">
            <Card className="h-full border-emerald-200 bg-emerald-50/40">
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance & CGPA</span>
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-slate-900">{attendance.overallPercentage}%</span>
                    <span className="text-xs font-semibold text-emerald-700">CGPA: {student.cgpa}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {attendance.attendedClasses} / {attendance.totalClasses} total classes attended
                  </p>
                </div>
                <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/student/attendance')}>
                  View Full Attendance Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Navigation Cards Grid */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Navigation Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {quickNavCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(card.path)}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all flex flex-col items-center text-center group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border mb-2 ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.label}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Timetable & Today's Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Timetable */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Today's Timetable</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/timetable')}>
                Full Timetable →
              </Button>
            </div>

            <Card>
              <CardContent className="divide-y divide-slate-100 p-0">
                {timetable.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.time}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.subject}</h4>
                      <p className="text-xs text-slate-500">
                        Faculty: {item.faculty} • Room: <strong>{item.room}</strong> ({item.building})
                      </p>
                    </div>

                    {item.code !== 'BREAK' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/classrooms?q=${encodeURIComponent(item.room)}`)}
                      >
                        Locate
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Today's Events & Active Cafeteria Token */}
          <div className="lg:col-span-5 space-y-6">
            {/* Today's Events */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Featured Events</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/student/events')}>
                  All Events →
                </Button>
              </div>

              {events.slice(0, 1).map((ev) => (
                <Card key={ev.id} className="overflow-hidden">
                  <div className="h-32 w-full overflow-hidden relative">
                    <img src={ev.poster} alt={ev.title} className="w-full h-full object-cover" />
                    <Badge variant="info" size="sm" className="absolute top-3 left-3 shadow-sm">
                      {ev.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                    <p className="text-xs text-slate-500">{ev.time} • {ev.venue}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{ev.description}</p>
                    <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/student/events')}>
                      View Event Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Cafeteria Token Status */}
            {activeCafeteriaToken && (
              <Card className="border-orange-200 bg-orange-50/50">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-orange-700">Active Digital Token</span>
                    <h4 className="text-xl font-extrabold text-slate-900">Token #{activeCafeteriaToken.tokenNumber}</h4>
                    <p className="text-xs text-slate-600">Est. Wait: ~{activeCafeteriaToken.estimatedWaitMins} mins</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => navigate('/student/cafeteria')}>
                    Cafeteria Queue
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Latest Notices & Bookmarked Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Latest Notices */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Latest Notices</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/notices')}>
                View All Notices →
              </Button>
            </div>

            <Card>
              <CardContent className="divide-y divide-slate-100 p-0">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={n.urgent ? 'error' : 'info'} size="sm">
                          {n.category}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{n.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{n.title}</h4>
                      <p className="text-xs text-slate-600">{n.summary}</p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => navigate('/student/notices')}>
                      Read
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bookmarked & Favorite Locations */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600" />
                Bookmarked Places
              </h2>
            </div>

            <Card>
              <CardContent className="p-4 space-y-3">
                {bookmarks.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No bookmarked places yet.</p>
                ) : (
                  bookmarks.map((bm, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-blue-50/50 hover:border-blue-200 transition-colors cursor-pointer"
                      onClick={() => navigate(`/facilities?q=${encodeURIComponent(bm.name)}`)}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{bm.name}</h4>
                        <p className="text-[11px] text-slate-500">{bm.building} • {bm.type}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Navigate →
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
