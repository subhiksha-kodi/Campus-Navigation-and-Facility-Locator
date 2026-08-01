import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useStudent } from '../../context/StudentContext';

export const StudentEventsPage = () => {
  const { events, eventRegistrations, toggleEventRegistration } = useStudent();
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <AppLayout>
      <PageHeader
        title="Campus Events & Workshops"
        description="Browse upcoming workshops, hackathons, and technical seminars. Register with one click."
        breadcrumbs={[{ label: 'Events' }]}
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => {
            const isRegistered = eventRegistrations.includes(ev.id);
            return (
              <Card key={ev.id} className="overflow-hidden flex flex-col justify-between hover:shadow-card transition-all">
                <div>
                  <div className="h-44 w-full relative overflow-hidden">
                    <img src={ev.poster} alt={ev.title} className="w-full h-full object-cover" />
                    <Badge variant="info" size="sm" className="absolute top-3 left-3 shadow-md">
                      {ev.category}
                    </Badge>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">{ev.title}</h3>
                    <div className="space-y-1 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{ev.date} ({ev.time})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{ev.venue} • {ev.building}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{ev.description}</p>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEvent(ev)}
                  >
                    View Details
                  </Button>

                  <Button
                    variant={isRegistered ? 'success' : 'primary'}
                    size="sm"
                    icon={isRegistered ? CheckCircle2 : UserCheck}
                    onClick={() => toggleEventRegistration(ev.id)}
                  >
                    {isRegistered ? 'Registered' : 'Register Now'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          size="md"
        >
          <div className="space-y-4">
            <img src={selectedEvent.poster} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>Date & Time:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
              <p><strong>Venue:</strong> {selectedEvent.venue} ({selectedEvent.building})</p>
              <p><strong>Category:</strong> {selectedEvent.category}</p>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{selectedEvent.description}</p>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button
                variant={eventRegistrations.includes(selectedEvent.id) ? 'success' : 'primary'}
                size="sm"
                onClick={() => {
                  toggleEventRegistration(selectedEvent.id);
                  setSelectedEvent(null);
                }}
              >
                {eventRegistrations.includes(selectedEvent.id) ? 'Registered' : 'Confirm Registration'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};
