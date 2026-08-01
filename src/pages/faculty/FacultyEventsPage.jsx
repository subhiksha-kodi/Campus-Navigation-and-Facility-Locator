import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Clock, Navigation, Map, Building2, Users } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FACULTY_EVENTS } from '../../services/facultyData';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const FacultyEventsPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { events } = useAdmin();

  const [activeCategory, setActiveCategory] = useState('All');

  const eventTypes = [
    'All',
    'Department Meeting',
    'Faculty Meeting',
    'Workshop',
    'Seminar',
    'Academic Event',
    'College Event'
  ];

  // Merge admin-published events with faculty events
  const adminFacultyEvents = events.map((e) => ({
    id: `adm_evt_${e.id}`,
    title: e.title,
    event_type: 'Academic Event',
    organizer: 'Campus Administration',
    description: `Official Campus Event scheduled for ${e.audience}`,
    date: e.date,
    start_time: e.time,
    venue: e.venue,
    building: 'Sunflower Block',
    floor: 1,
    room: 'SF101'
  }));

  const allEvents = [...adminFacultyEvents, ...FACULTY_EVENTS];

  const filteredEvents = allEvents.filter((e) => {
    if (activeCategory === 'All') return true;
    return e.event_type === activeCategory;
  });

  const handleNavigateToMap = (event) => {
    addToast(`Navigating to ${event.venue} on Campus Map`, 'info');
    navigate(`/faculty/map?dest=${encodeURIComponent(event.room || 'SF101')}&building=${encodeURIComponent(event.building || 'Sunflower Block')}`);
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Events & Meetings"
        description="Schedule of departmental meetings, academic workshops, faculty seminars, and college events."
        breadcrumbs={[{ label: 'Events & Meetings' }]}
      />

      <div className="space-y-6">
        {/* Category Chips Bar */}
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((cat) => (
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

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <Card key={evt.id} hoverEffect className="h-full flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <Badge variant="info" size="sm">{evt.event_type}</Badge>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1">{evt.title}</h3>
                    <p className="text-xs font-semibold text-blue-600">Organizer: {evt.organizer}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                {/* Venue Details Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Date & Time</span>
                    <span className="font-bold text-slate-900 block">{evt.date} ({evt.start_time})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Venue</span>
                    <span className="font-bold text-blue-700 block">{evt.venue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Building</span>
                    <span className="font-bold block">{evt.building}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floor & Room</span>
                    <span className="font-bold block">Floor {evt.floor}, {evt.room}</span>
                  </div>
                </div>

                {/* Consolidated Single Navigation Button */}
                <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={MapPin}
                    onClick={() => handleNavigateToMap(evt)}
                  >
                    View on Campus Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FacultyLayout>
  );
};
