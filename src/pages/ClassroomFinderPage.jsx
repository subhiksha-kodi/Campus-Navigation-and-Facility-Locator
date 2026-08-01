import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Building2, Layers, Clock, Accessibility, Navigation, CheckCircle2, Monitor, Wifi, Wind } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const MOCK_CLASSROOMS = [
  {
    id: 'room_cs303',
    roomNumber: 'CS303',
    name: 'Advanced Computing & AI Lab',
    buildingName: 'Computer Science Block',
    buildingCode: 'CS-BLOCK',
    floor: 3,
    capacity: 45,
    available: true,
    statusText: 'Vacant until 02:00 PM',
    walkTimeMins: 3,
    distanceMeters: 210,
    hasElevator: true,
    equipment: ['Projector HD', 'Dual Monitors', 'High-Speed Wi-Fi', 'Air Conditioning', 'Power Outlets at Desk']
  },
  {
    id: 'room_cs101',
    roomNumber: 'CS101',
    name: 'Intro to Programming Lecture Hall',
    buildingName: 'Computer Science Block',
    buildingCode: 'CS-BLOCK',
    floor: 1,
    capacity: 120,
    available: false,
    statusText: 'Lecture in Progress (Prof. Robert)',
    walkTimeMins: 2,
    distanceMeters: 140,
    hasElevator: true,
    equipment: ['Dual Projectors', 'Audio Microphones', 'Wi-Fi', 'Air Conditioning']
  },
  {
    id: 'room_blka202',
    roomNumber: 'BLK-A202',
    name: 'Seminar Hall A',
    buildingName: 'Academic Block A (Admin)',
    buildingCode: 'BLK-A',
    floor: 2,
    capacity: 80,
    available: true,
    statusText: 'Available for Study',
    walkTimeMins: 5,
    distanceMeters: 350,
    hasElevator: true,
    equipment: ['Smart Board', 'Audio System', 'Wi-Fi']
  },
  {
    id: 'room_ece401',
    roomNumber: 'ECE401',
    name: 'VLSI Design Laboratory',
    buildingName: 'Electronics & Comm Block',
    buildingCode: 'ECE-BLOCK',
    floor: 4,
    capacity: 35,
    available: true,
    statusText: 'Open Lab Hours',
    walkTimeMins: 6,
    distanceMeters: 420,
    hasElevator: true,
    equipment: ['FPGA Workstations', 'Oscilloscopes', 'Wi-Fi']
  }
];

export const ClassroomFinderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedRoom, setSelectedRoom] = useState(MOCK_CLASSROOMS[0]);

  const filtered = MOCK_CLASSROOMS.filter((room) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      room.roomNumber.toLowerCase().includes(q) ||
      room.name.toLowerCase().includes(q) ||
      room.buildingName.toLowerCase().includes(q)
    );
  });

  const handleNavigateToRoom = (room) => {
    addToast(`Calculating directions to ${room.roomNumber} (${room.buildingName})`, 'success');
    navigate(`/map?q=${encodeURIComponent(room.buildingName)}`);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Classroom Finder"
        description="Search for any classroom, lecture hall, or lab by room number to view exact building block, floor plan, and walking directions."
        breadcrumbs={[{ label: 'Classroom Finder' }]}
      />

      <div className="space-y-6">
        {/* Prominent Search Bar */}
        <div className="max-w-2xl">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Enter classroom or room number
          </label>
          <SearchBar
            placeholder="e.g. CS303, Lab 102, Hall A..."
            onSearch={(q) => setQuery(q)}
            suggestions={['CS303', 'CS101', 'BLK-A202', 'ECE401']}
          />
        </div>

        {/* Grid Layout: Results List + Room Detailed Spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List of Matched Rooms */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Found Rooms ({filtered.length})
            </h3>

            {filtered.map((room) => {
              const isSelected = selectedRoom && selectedRoom.id === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{room.roomNumber}</span>
                        <Badge variant={room.available ? 'success' : 'warning'} size="sm">
                          {room.available ? 'Vacant' : 'Busy'}
                        </Badge>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-700 mt-0.5">{room.name}</h4>
                      <p className="text-[11px] text-slate-500">{room.buildingName}</p>
                    </div>

                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold shrink-0">
                      Floor {room.floor}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
                    <span className="text-blue-600 font-semibold">~{room.walkTimeMins} mins walk</span>
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="sm"
                      icon={MapPin}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToRoom(room);
                      }}
                    >
                      View on Campus Map
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Classroom Specification Card */}
          {selectedRoom && (
            <div className="lg:col-span-7">
              <Card className="h-full">
                <CardHeader
                  actions={
                    <Badge variant={selectedRoom.available ? 'success' : 'warning'} size="md">
                      {selectedRoom.statusText}
                    </Badge>
                  }
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Room {selectedRoom.roomNumber}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedRoom.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Located in <strong>{selectedRoom.buildingName}</strong> ({selectedRoom.buildingCode})
                    </p>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Floor</span>
                      <span className="text-base font-extrabold text-slate-900">Floor {selectedRoom.floor}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Capacity</span>
                      <span className="text-base font-extrabold text-slate-900">{selectedRoom.capacity} Seats</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Walk Time</span>
                      <span className="text-base font-extrabold text-blue-600">~{selectedRoom.walkTimeMins} Mins</span>
                    </div>
                  </div>

                  {/* Accessibility & Features */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Room Equipment & Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.equipment.map((eq, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Route & Accessibility Info
                    </h4>
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-2 font-semibold text-emerald-800">
                        <Accessibility className="w-4 h-4 text-emerald-600" />
                        <span>Stair-Free Route Available</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Take North Block Elevator 2 directly to Floor {selectedRoom.floor}. Fully wheelchair accessible.
                      </p>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Distance: ~{selectedRoom.distanceMeters} meters from main entrance</span>
                    <Button
                      variant="primary"
                      size="lg"
                      icon={Navigation}
                      onClick={() => handleNavigateToRoom(selectedRoom)}
                    >
                      Start Walking Navigation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
