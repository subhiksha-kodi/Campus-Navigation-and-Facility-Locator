import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Navigation, Building2, Layers, CheckCircle2, Map } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FACULTY_TIMETABLE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';

export const FacultyTimetablePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('weekly'); // 'daily' | 'weekly'
  const [selectedDay, setSelectedDay] = useState('Friday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleNavigateToMap = (entry) => {
    addToast(`Navigating to ${entry.room} (${entry.building}) on Campus Map`, 'info');
    navigate(`/faculty/map?dest=${encodeURIComponent(entry.room)}&building=${encodeURIComponent(entry.building)}`);
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Timetable"
        description="Comprehensive weekly and daily teaching schedule with direct classroom navigation."
        breadcrumbs={[{ label: 'My Timetable' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'daily' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('daily')}
            >
              Daily View
            </Button>
            <Button
              variant={viewMode === 'weekly' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('weekly')}
            >
              Weekly View
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Day Selector Tabs for Daily View */}
        {viewMode === 'daily' && (
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDay === d
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Timetable Entries List */}
        {days
          .filter((d) => viewMode === 'weekly' || d === selectedDay)
          .map((dayName) => {
            const dayEntries = FACULTY_TIMETABLE.filter((t) => t.day === dayName);

            return (
              <div key={dayName} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">{dayName}</h3>
                  <span className="text-xs text-slate-400 font-medium">({dayEntries.length} Classes)</span>
                </div>

                {dayEntries.length === 0 ? (
                  <Card className="bg-slate-50 border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
                    No classes scheduled for {dayName}.
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayEntries.map((entry) => (
                      <Card key={entry.id} hoverEffect className="h-full flex flex-col justify-between">
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs font-bold text-blue-600 block">{entry.start_time} - {entry.end_time}</span>
                              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{entry.subject}</h4>
                              <p className="text-xs font-medium text-slate-600">{entry.class_name}</p>
                            </div>
                            <Badge variant={entry.status === 'Ongoing' ? 'success' : 'info'} size="sm">
                              {entry.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                            <div>
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Building</span>
                              <span className="font-bold truncate block">{entry.building}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Room</span>
                              <span className="font-bold text-blue-700 block">{entry.room}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floor</span>
                              <span className="font-bold block">Floor {entry.floor}</span>
                            </div>
                          </div>

                          {/* Consolidated Single Navigation Button */}
                          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                            <Button
                              variant="primary"
                              size="sm"
                              icon={MapPin}
                              onClick={() => handleNavigateToMap(entry)}
                            >
                              View on Campus Map
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </FacultyLayout>
  );
};
