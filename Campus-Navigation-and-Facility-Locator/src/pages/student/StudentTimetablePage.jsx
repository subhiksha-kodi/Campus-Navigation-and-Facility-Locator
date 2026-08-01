import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useStudent } from '../../context/StudentContext';

export const StudentTimetablePage = () => {
  const navigate = useNavigate();
  const { timetable } = useStudent();
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <AppLayout>
      <PageHeader
        title="Student Weekly Timetable"
        description="View your full weekly class schedule, faculty assignments, and direct classroom location links."
        breadcrumbs={[{ label: 'Timetable' }]}
      />

      <div className="space-y-6 max-w-4xl">
        {/* Day Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Class Schedule for {selectedDay}
            </CardTitle>
          </CardHeader>

          <CardContent className="divide-y divide-slate-100 p-0">
            {timetable.map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{item.subject} ({item.code})</h4>
                  <p className="text-xs text-slate-500">
                    Faculty: <strong>{item.faculty}</strong> • Room: <strong>{item.room}</strong> ({item.building})
                  </p>
                </div>

                {item.code !== 'BREAK' && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MapPin}
                    onClick={() => navigate(`/classrooms?q=${encodeURIComponent(item.room)}`)}
                  >
                    Locate Room
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
