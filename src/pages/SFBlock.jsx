import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import {
  Layers,
  Search,
  Navigation,
  ArrowLeft,
  Building2,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const SFBlock = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const floors = [
    {
      level: 1,
      name: 'Ground Floor (Physics & Chemistry)',
      rooms: [
        { code: 'SF101', name: 'Engineering Physics Lab', capacity: 60, status: 'Open' },
        { code: 'SF102', name: 'Applied Chemistry Lab', capacity: 50, status: 'Occupied' },
        { code: 'SF103', name: 'S&H Department Head Office', capacity: 20, status: 'Open' }
      ]
    },
    {
      level: 2,
      name: 'First Floor (Mathematics & Humanities)',
      rooms: [
        { code: 'SF201', name: 'Engineering Mathematics Lecture Hall', capacity: 70, status: 'Free' },
        { code: 'SF202', name: 'Professional Communication Lab', capacity: 45, status: 'Class Active' },
        { code: 'SF203', name: 'Language & Phonetics Studio', capacity: 35, status: 'Open' }
      ]
    },
    {
      level: 3,
      name: 'Second Floor (Environmental Science)',
      rooms: [
        { code: 'SF301', name: 'Environmental Studies Seminar Room', capacity: 80, status: 'Free' },
        { code: 'SF302', name: 'Basic Electrical Science Lab', capacity: 50, status: 'Occupied' },
        { code: 'SF303', name: 'First Year Foundation Hall', capacity: 90, status: 'Open' }
      ]
    }
  ];

  const currentFloorData = floors.find((f) => f.level === selectedFloor);

  return (
    <AppLayout>
      <PageHeader
        title="SF Block — Indoor Navigation"
        description="Interactive 3D indoor floor plans, classroom finder, and real-time room navigation for Science & Humanities (SF) Block."
        breadcrumbs={[
          { label: 'Campus Map', path: '/map' },
          { label: 'SF Block' }
        ]}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/map')}>
            Back to Outdoor Map
          </Button>

          <Badge variant="info" className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            3D Indoor Navigation Enabled
          </Badge>
        </div>

        {/* Floor selector bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {floors.map((floor) => (
            <Card
              key={floor.level}
              onClick={() => setSelectedFloor(floor.level)}
              className={`cursor-pointer transition-all ${
                selectedFloor === floor.level
                  ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/50'
                  : 'hover:border-slate-300'
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    selectedFloor === floor.level ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    L{floor.level}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{floor.name}</h4>
                    <span className="text-xs text-slate-500">{floor.rooms.length} Rooms & Labs</span>
                  </div>
                </div>
                {selectedFloor === floor.level && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Floor Plan Map Box */}
        <Card className="border-slate-200 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Floor Plan — {currentFloorData?.name}
                </h3>
                <p className="text-xs text-slate-500">Click any classroom to highlight indoor turn-by-turn route.</p>
              </div>

              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg">
                SF Block • Floor {selectedFloor}
              </span>
            </div>

            {/* Simulated 3D Floor Layout */}
            <div className="relative bg-slate-900 text-white rounded-2xl p-6 min-h-[280px] border border-slate-800 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-purple-400" /> West Entrance & Central Courtyard</span>
                <span className="text-emerald-400 font-semibold">● Wi-Fi Gigabit Hotspot Active</span>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                {currentFloorData?.rooms.map((room) => {
                  const isSelected = selectedRoom?.code === room.code;
                  return (
                    <div
                      key={room.code}
                      onClick={() => {
                        setSelectedRoom(room);
                        addToast(`Selected indoor destination: ${room.code} (${room.name})`, 'info');
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-lg scale-102'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-300">{room.code}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          room.status.includes('Class') || room.status === 'Occupied'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {room.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold mt-2">{room.name}</h4>
                      <p className="text-xs opacity-75 mt-1">Capacity: {room.capacity} seats</p>
                    </div>
                  );
                })}
              </div>

              {selectedRoom && (
                <div className="relative z-10 bg-purple-950/80 border border-purple-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-purple-400 animate-pulse" />
                    <div>
                      <span className="text-xs text-purple-300 font-medium">Indoor Guidance to {selectedRoom.code}</span>
                      <p className="text-xs font-semibold text-white">Enter via West Gate ➔ Walk straight down SF Block main corridor.</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addToast(`Navigating to ${selectedRoom.code}`, 'success')}>
                    Start Guidance
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SFBlock;
