import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Map,
  Building2,
  Mic,
  ArrowRight,
  Coffee,
  HeartPulse,
  Car,
  BookOpen,
  Bell,
  Clock,
  ShieldAlert,
  MapPin,
  Calendar
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CampusMap, CAMPUS_LOCATIONS } from '../components/navigation/CampusMap';
import { FacilityCard } from '../components/navigation/FacilityCard';
import { VoiceNavigationModal } from '../components/navigation/VoiceNavigationModal';
import { useRole } from '../context/RoleContext';
import { useToast } from '../context/ToastContext';

export const HomeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useRole();
  const { addToast } = useToast();

  const [selectedMapDestination, setSelectedMapDestination] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  // Quick Action Buttons
  const quickActions = [
    { label: 'Find Classroom', icon: Search, path: '/classrooms', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Campus Map', icon: Map, path: '/map', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Facilities', icon: Building2, path: '/facilities', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Voice Navigation', icon: Mic, action: () => setVoiceModalOpen(true), color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  // Compact Nearby Facilities data
  const nearbyFacilities = [
    {
      id: 1,
      name: 'Central Library',
      locationName: 'Academic Quad (3rd Floor)',
      status: 'Open',
      walkTime: '2 min',
      category: 'Quiet Study & Books',
      hours: '07:00 AM - 10:00 PM',
      icon: BookOpen,
    },
    {
      id: 2,
      name: 'Main Cafeteria',
      locationName: 'Student Centre Block',
      status: 'Open',
      walkTime: '3 min',
      category: 'Food & Beverage',
      hours: '07:30 AM - 09:00 PM',
      icon: Coffee,
    },
    {
      id: 3,
      name: 'Medical Centre',
      locationName: 'Health & Wellness Wing',
      status: 'Open 24/7',
      walkTime: '4 min',
      category: 'Urgent Care & Clinic',
      hours: '24 Hours',
      icon: HeartPulse,
    },
    {
      id: 4,
      name: 'Main Parking Lot B',
      locationName: 'North Gate Entrance',
      status: 'Available',
      walkTime: '5 min',
      category: 'Vehicle Parking',
      hours: 'Open 24/7',
      icon: Car,
    },
  ];

  // Campus Notices / Updates
  const campusUpdates = [
    {
      id: 1,
      title: 'Lab CS303 Projector Maintenance Complete',
      time: '2 hours ago',
      category: 'Facilities',
      urgent: false,
    },
    {
      id: 2,
      title: 'Bus Shuttle Route #2 Minor Delay (15 min)',
      time: '3 hours ago',
      category: 'Transit',
      urgent: true,
    },
    {
      id: 3,
      title: 'Annual Campus Science Symposium Schedule',
      time: '1 day ago',
      category: 'Events',
      urgent: false,
    },
  ];

  const handleGlobalSearch = (query) => {
    if (!query) return;
    addToast(`Searching for "${query}" across campus...`, 'info');
    if (query.toLowerCase().includes('cs') || query.toLowerCase().includes('room')) {
      navigate(`/classrooms?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/facilities?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">
                Role: {user.roleLabel}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">• {user.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Where would you like to go today?
            </p>

            {/* Main Prominent Search Box */}
            <div className="pt-3 max-w-xl">
              <SearchBar
                placeholder="Search for a classroom, building or facility..."
                onSearch={handleGlobalSearch}
                suggestions={[
                  'Computer Science Block (CS303)',
                  'Central Library',
                  'Main Cafeteria',
                  'Medical Centre',
                  'Main Parking B',
                  'Auditorium Block A'
                ]}
              />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end justify-between border-l border-slate-100 pl-6 shrink-0 space-y-3">
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Campus Weather</span>
              <span className="text-base font-bold text-slate-900">24°C Sunny</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Active Shuttles</span>
              <span className="text-xs font-semibold text-emerald-600">3 Vehicles Running</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {quickActions.map((qa, idx) => (
              <button
                key={idx}
                onClick={qa.action ? qa.action : () => navigate(qa.path)}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all flex items-center gap-3 text-left group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border shrink-0 ${qa.color}`}>
                  <qa.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {qa.label}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">Instant access</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explore Campus Section (Leaflet Map Component) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Explore Campus</h2>
              <p className="text-xs text-slate-500">Interactive live Leaflet navigation and building markers</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/map')}
            >
              Full Screen Map
            </Button>
          </div>

          <CampusMap
            height="h-[460px]"
            selectedDestination={selectedMapDestination}
            onSelectDestination={(loc) => setSelectedMapDestination(loc)}
          />
        </div>

        {/* Nearby Facilities Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Nearby Facilities</h2>
              <p className="text-xs text-slate-500">Live operational status and walking distance</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/facilities')}
            >
              View All Facilities →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyFacilities.map((fac) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                onNavigate={(f) => {
                  const mapLoc = CAMPUS_LOCATIONS.find((l) => l.name.includes(f.name) || f.name.includes(l.name));
                  if (mapLoc) {
                    setSelectedMapDestination(mapLoc);
                    addToast(`Route calculated to ${f.name}`, 'success');
                  } else {
                    navigate('/map');
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Campus Updates & Emergency Alert Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Campus Updates */}
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardHeader
                actions={
                  <Button variant="ghost" size="sm" onClick={() => navigate('/notices')}>
                    All Notices
                  </Button>
                }
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <CardTitle>Campus Updates & Notices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 p-0">
                {campusUpdates.map((notice) => (
                  <div key={notice.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={notice.urgent ? 'error' : 'info'} size="sm">
                          {notice.category}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{notice.time}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{notice.title}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/notices')}>
                      Read
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* SOS Quick Emergency Card */}
          <div className="lg:col-span-4">
            <Card className="border-red-200 bg-red-50/40 h-full flex flex-col justify-between">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-red-700">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-bold">Campus SOS Assistance</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need urgent security, medical dispatch, or safety escort on campus? Tap below to trigger immediate emergency broadcast.
                </p>
                <div className="pt-2">
                  <Button
                    variant="danger"
                    size="md"
                    fullWidth
                    icon={ShieldAlert}
                    onClick={() => navigate('/emergency')}
                  >
                    Open Emergency SOS Hub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Voice Navigation Assistant Modal */}
      <VoiceNavigationModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onStartNavigation={(query) => {
          addToast(`Voice destination set to: "${query}"`, 'success');
          const matched = CAMPUS_LOCATIONS.find((l) => l.name.toLowerCase().includes(query.toLowerCase()));
          if (matched) {
            setSelectedMapDestination(matched);
          } else {
            navigate(`/map?q=${encodeURIComponent(query)}`);
          }
        }}
      />
    </AppLayout>
  );
};
