import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navigation, MapPin, Building2, Layers, Clock, Compass, Footprints, CheckCircle2, ArrowRight } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { CampusMap, CAMPUS_LOCATIONS } from '../../components/navigation/CampusMap';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { INITIAL_FACULTY_PROFILE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';

export const FACULTY_DESTINATIONS = [
  { id: 'dest_cs303', name: 'SF303 (AI & Computing Lab)', building: 'Sunflower Block', floor: 3, room: 'SF303', lat: 12.9716, lng: 77.5946, type: 'Classroom' },
  { id: 'dest_os204', name: 'MB204 (Operating Systems Lab)', building: 'Mechanical Block', floor: 2, room: 'MB204', lat: 12.9720, lng: 77.5962, type: 'Classroom' },
  { id: 'dest_sh202', name: 'AS-202 (Faculty Meeting Venue)', building: 'AS Block', floor: 2, room: 'AS-202', lat: 12.9725, lng: 77.5955, type: 'Meeting Venue' },
  { id: 'dest_aud1', name: 'IB Block Auditorium (Workshop Venue)', building: 'IB Block', floor: 1, room: 'Auditorium-1', lat: 12.9716, lng: 77.5946, type: 'Event Venue' },
  { id: 'dest_hod', name: 'CSE Department HOD Office', building: 'Mechanical Block', floor: 2, room: 'HOD-201', lat: 12.9720, lng: 77.5962, type: 'Department Office' },
  { id: 'dest_myoffice', name: 'Faculty Office (Dr. Gayathri Devi)', building: 'Mechanical Block', floor: 2, room: 'MB-204', lat: 12.9718, lng: 77.5950, type: 'Faculty Office' },
  { id: 'dest_lib', name: 'IB Block Library Archives', building: 'IB Block', floor: 3, room: 'Archive Hall', lat: 12.9725, lng: 77.5955, type: 'Facility' },
];

export const FacultyCampusMapPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const queryDest = searchParams.get('dest') || '';
  const queryBuilding = searchParams.get('building') || '';

  const [selectedDestination, setSelectedDestination] = useState(() => {
    if (queryDest) {
      return FACULTY_DESTINATIONS.find((d) => d.room.toLowerCase().includes(queryDest.toLowerCase()) || d.name.toLowerCase().includes(queryDest.toLowerCase())) || FACULTY_DESTINATIONS[0];
    }
    return FACULTY_DESTINATIONS[0];
  });

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (queryDest) {
      const match = FACULTY_DESTINATIONS.find((d) => d.room.toLowerCase().includes(queryDest.toLowerCase()) || d.name.toLowerCase().includes(queryDest.toLowerCase()));
      if (match) setSelectedDestination(match);
    }
  }, [queryDest]);

  const handleStartNavigation = () => {
    setIsNavigating(true);
    addToast(`Navigation active to ${selectedDestination.name}`, 'success');
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Campus Map & Navigation"
        description="Point-to-point directions from your Faculty Office to classrooms, meeting venues, and campus facilities."
        breadcrumbs={[{ label: 'Directions & Navigation' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Route Planner */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <CardTitle>Route Planner</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {/* Origin Start */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STARTING POINT</span>
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{INITIAL_FACULTY_PROFILE.office_location}</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Faculty Office Baseline</span>
              </div>

              {/* Destination Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  DESTINATION (Class / Venue / Office)
                </label>
                <select
                  value={selectedDestination.id}
                  onChange={(e) => {
                    const found = FACULTY_DESTINATIONS.find((d) => d.id === e.target.value);
                    if (found) setSelectedDestination(found);
                  }}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  {FACULTY_DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.building})
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculated Route Details Box */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="info" size="sm">{selectedDestination.type}</Badge>
                  <span className="text-xs font-bold text-blue-700">Fastest Walk Path</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedDestination.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedDestination.building} • Floor {selectedDestination.floor} • Room {selectedDestination.room}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-200/60 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Footprints className="w-4 h-4 text-blue-600" />
                    <span>~250 Meters</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>~4 Mins Walk</span>
                  </div>
                </div>
              </div>

              {/* Requirement #5 & #6: Start Navigation Button */}
              <Button
                variant={isNavigating ? 'success' : 'primary'}
                size="lg"
                fullWidth
                icon={Navigation}
                onClick={handleStartNavigation}
              >
                {isNavigating ? 'NAVIGATION ACTIVE' : 'START NAVIGATION'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Map Canvas Container */}
        <div className="lg:col-span-8">
          <CampusMap
            height="h-[620px]"
            selectedDestination={{
              id: selectedDestination.id,
              name: selectedDestination.name,
              code: selectedDestination.room,
              lat: selectedDestination.lat,
              lng: selectedDestination.lng,
              category: 'academic',
              status: 'Scheduled Venue',
              description: `${selectedDestination.building} Floor ${selectedDestination.floor}`
            }}
            onSelectDestination={() => {}}
          />
        </div>
      </div>
    </FacultyLayout>
  );
};
