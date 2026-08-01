import React from 'react';
import { Building2, Navigation, Clock, Accessibility, CheckCircle2, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const BuildingCard = ({ building, onNavigate, onSelect }) => {
  return (
    <Card hoverEffect className="h-full flex flex-col justify-between">
      <div>
        <CardHeader
          actions={
            <Badge variant="info" size="sm">
              {building.code}
            </Badge>
          }
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
            <CardTitle>{building.name}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">{building.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>{building.floors} Floors</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{building.hours}</span>
            </div>
          </div>

          {building.classrooms && building.classrooms.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Rooms & Facilities
              </span>
              <div className="flex flex-wrap gap-1">
                {building.classrooms.map((room, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="bg-slate-50 border-t border-slate-100">
        <div className="flex items-center gap-1 text-emerald-700 font-medium text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{building.status}</span>
        </div>
        <Button variant="primary" size="sm" icon={MapPin} onClick={() => onNavigate(building)}>
          View on Campus Map
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ClassroomCard = ({ room, onNavigate }) => {
  return (
    <Card hoverEffect className="h-full flex flex-col justify-between">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900">{room.roomNumber}</h4>
              <Badge variant={room.available ? 'success' : 'warning'} size="sm">
                {room.available ? 'Vacant Now' : 'Class in Session'}
              </Badge>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{room.buildingName}</p>
          </div>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
            Floor {room.floor}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Capacity</span>
            <span className="font-semibold text-slate-800">{room.capacity} Seats</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Walk Time</span>
            <span className="font-semibold text-blue-600">~{room.walkTimeMins} mins</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Accessibility className="w-3.5 h-3.5 text-emerald-600" />
            {room.hasElevator ? 'Elevator Access' : 'Stair Access'}
          </span>
          <Button variant="outline" size="sm" icon={MapPin} onClick={() => onNavigate(room)}>
            View on Campus Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
