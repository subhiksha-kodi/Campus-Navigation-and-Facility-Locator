import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Navigation, Map, Layers, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FACULTY_TIMETABLE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';

export const FacultyCurrentClassPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  // Find ongoing class or simulate current class detection
  const fridayClasses = FACULTY_TIMETABLE.filter((c) => c.day === 'Friday');
  const currentClass = fridayClasses.find((c) => c.status === 'Ongoing') || fridayClasses[0];
  const nextClass = fridayClasses.find((c) => c.status === 'Upcoming') || fridayClasses[1];

  const handleNavigateToMap = (cls) => {
    addToast(`Navigating to ${cls.room} (${cls.building}) on Campus Map`, 'info');
    navigate(`/faculty/map?dest=${encodeURIComponent(cls.room)}&building=${encodeURIComponent(cls.building)}`);
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Current Class & Live Navigation"
        description="Real-time class detection, countdown timer, and venue directions."
        breadcrumbs={[{ label: 'Current Class' }]}
      />

      <div className="max-w-3xl space-y-6">
        {currentClass ? (
          <Card className="border-2 border-blue-600 bg-white shadow-md">
            <CardHeader
              actions={
                <Badge variant="success" size="md">
                  Class In Session
                </Badge>
              }
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                <CardTitle className="text-sm uppercase tracking-wider text-blue-600">Current Active Class</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">{currentClass.subject}</h2>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">{currentClass.class_name}</p>
              </div>

              {/* Class Specs Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Building</span>
                  <span className="font-bold text-slate-900 block">{currentClass.building}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Room</span>
                  <span className="font-bold text-blue-700 block">Room {currentClass.room}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floor</span>
                  <span className="font-bold text-slate-900 block">Floor {currentClass.floor}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Schedule</span>
                  <span className="font-bold text-slate-900 block">{currentClass.start_time} - {currentClass.end_time}</span>
                </div>
              </div>

              {/* Countdown Bar */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Ends in: <strong className="text-blue-700">24 minutes</strong></span>
                </div>
                <span className="text-xs text-blue-600 font-medium">On Schedule</span>
              </div>

              {/* Single Navigation Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={MapPin}
                  onClick={() => handleNavigateToMap(currentClass)}
                >
                  View on Campus Map
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-50 p-8 text-center border-dashed border-slate-300">
            <h3 className="text-lg font-bold text-slate-900">No class scheduled right now.</h3>
            <p className="text-xs text-slate-500 mt-1">Enjoy your free period or prepare for your upcoming session.</p>
          </Card>
        )}

        {/* Next Class Preview Section */}
        {nextClass && (
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-600" />
                <CardTitle>Up Next</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">{nextClass.subject}</h4>
                <p className="text-xs text-slate-500">{nextClass.class_name} • Room {nextClass.room} ({nextClass.building})</p>
                <span className="text-xs text-purple-700 font-semibold block mt-1">Starts at {nextClass.start_time}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={MapPin}
                onClick={() => handleNavigateToMap(nextClass)}
              >
                View on Campus Map
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </FacultyLayout>
  );
};
