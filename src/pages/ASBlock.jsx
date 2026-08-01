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

export const ASBlock = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedFloor, setSelectedFloor] = useState(3);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const floors = [
    {
      level: 1,
      name: 'Ground Floor (Labs Wing)',
      rooms: [
        { code: 'AS101', name: 'Physics & Optics Laboratory', capacity: 60, status: 'Open' },
        { code: 'AS102', name: 'Chemistry Research Lab', capacity: 45, status: 'Occupied' },
        { code: 'Lab 3', name: 'Python Programming Lab 3', capacity: 50, status: 'Active Class' }
      ]
    },
    {
      level: 2,
      name: 'First Floor (Lecture Wing)',
      rooms: [
        { code: 'AS201', name: 'Electronics Engineering Hall', capacity: 60, status: 'Free' },
        { code: 'AS202', name: 'Microprocessor & VLSI Lab', capacity: 45, status: 'Occupied' },
        { code: 'AS203', name: 'Faculty Conference Room', capacity: 30, status: 'Open' }
      ]
    },
    {
      level: 3,
      name: 'Second Floor (CSBS Dept)',
      rooms: [
        { code: 'CS302', name: 'DBMS & Data Structures (Room CS302)', capacity: 65, status: 'Lecture Active (9:00 AM)' },
        { code: 'CS303', name: 'AI & Neural Networks Lab (CS303)', capacity: 50, status: 'Lab Session' },
        { code: 'CS304', name: 'Operating Systems Hall (Room CS304)', capacity: 65, status: 'Upcoming (10:00 AM)' }
      ]
    }
  ];

  const currentFloorData = floors.find((f) => f.level === selectedFloor);

  return (
    <AppLayout>
      <PageHeader
        title="AS Block — Indoor Navigation"
        description="Interactive 3D indoor floor plans and classroom navigation for Applied Sciences & Engineering Block (CSBS Department)."
        breadcrumbs={[
          { label: 'Campus Map', path: '/map' },
          { label: 'AS Block' }
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
                    <span className="text-xs text-slate-500">{floor.rooms.length} Lecture Halls</span>
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
                AS Block • Floor {selectedFloor}
              </span>
            </div>

            {/* Simulated 3D Floor Layout */}
            <div className="relative bg-slate-900 text-white rounded-2xl p-6 min-h-[280px] border border-slate-800 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-blue-400" /> East Staircase & Elevator</span>
                <span className="text-emerald-400 font-semibold">● Wheelchair Lift Operational</span>
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
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">{room.code}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          room.status.includes('Active') || room.status === 'Occupied'
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
                <div className="relative z-10 bg-blue-950/80 border border-blue-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-blue-400 animate-pulse" />
                    <div>
                      <span className="text-xs text-blue-300 font-medium">Indoor Guidance to {selectedRoom.code}</span>
                      <p className="text-xs font-semibold text-white">Take Lift B to Floor 3 ➔ Walk left past CSBS Department Office.</p>
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
