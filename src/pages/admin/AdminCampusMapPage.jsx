import React from 'react';
import { Map, Navigation, AlertOctagon } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminCampusMapPage = () => {
  const { routes, toggleRouteBlockedStatus } = useAdmin();
  const { addToast } = useToast();

  return (
    <AdminLayout>
      <PageHeader
        title="Campus Map & Route Management"
        description="Exclusive admin control for campus map coordinates, path availability, and Route Blocking controls (Mark Route BLOCKED with detour alerts)."
        breadcrumbs={[{ label: 'Campus Map & Routes' }]}
        actions={
          <Badge variant="navy" size="md">
            Master Spatial Coordinates
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-500" />
                Campus Walkway Paths & Route Blocking Control ({routes.length})
              </CardTitle>
              <Badge variant="warning" size="sm">Path Control</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {routes.map((rt) => {
                const isBlocked = rt.status === 'BLOCKED';

                return (
                  <div key={rt.id} className={`p-5 rounded-2xl border ${isBlocked ? 'bg-red-50/50 border-red-300' : 'bg-white border-slate-200'} space-y-3 shadow-xs`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">
                          {rt.startLocation} → {rt.destination}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">{rt.pathType} • Distance: {rt.distance} ({rt.estTime} walk)</span>
                      </div>
                      <Badge variant={isBlocked ? 'error' : 'success'} size="sm" className="font-bold">
                        {rt.status}
                      </Badge>
                    </div>

                    {isBlocked && (
                      <div className="p-3 bg-red-600 text-white rounded-xl text-xs font-semibold flex items-start gap-2">
                        <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold">ROUTE BLOCKED FOR CAMPUS USERS</span>
                          <span>{rt.blockReason}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t flex justify-end">
                      <Button
                        variant={isBlocked ? 'primary' : 'danger'}
                        size="sm"
                        onClick={() => {
                          toggleRouteBlockedStatus(rt.id, 'Pavement resurfacing work in progress. Alternative path available via East Quad Corridor.');
                          addToast(`Route status changed to ${isBlocked ? 'Active' : 'BLOCKED'}`, 'info');
                        }}
                      >
                        {isBlocked ? 'Unblock Route' : 'Mark Route BLOCKED'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
