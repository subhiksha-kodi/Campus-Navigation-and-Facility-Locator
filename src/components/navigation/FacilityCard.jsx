import React from 'react';
import { Clock, MapPin, Navigation, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const FacilityCard = ({ facility, onNavigate }) => {
  const isOpen = facility.status.toLowerCase().includes('open') || facility.status.toLowerCase().includes('available');

  return (
    <Card hoverEffect className="h-full">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
              <facility.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">{facility.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{facility.locationName}</p>
            </div>
          </div>
          <Badge variant={isOpen ? 'success' : 'warning'} size="sm">
            {facility.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{facility.walkTime} away</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <span>{facility.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500">{facility.hours}</span>
          <Button variant="outline" size="sm" icon={Navigation} onClick={() => onNavigate(facility)}>
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const RouteCard = ({ origin, destination, distanceMeters, durationMins, steps = [] }) => {
  return (
    <Card className="border-blue-200 bg-white">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">Navigation Active</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{destination.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-slate-900">{durationMins} min</span>
            <span className="text-xs text-slate-500 block">({distanceMeters}m walk)</span>
          </div>
        </div>

        {/* Turn by turn steps list */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Turn-By-Turn Guidance
          </span>
          <div className="space-y-2.5">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{step.instruction}</p>
                  <span className="text-[10px] text-slate-400">{step.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
