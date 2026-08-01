import React from 'react';
import { Coffee, QrCode, Clock, Users, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentCafeteriaPage = () => {
  const { cafeteriaMenu, activeCafeteriaToken, generateCafeteriaToken } = useStudent();
  const { addToast } = useToast();

  const handleRequestToken = () => {
    const token = generateCafeteriaToken();
    addToast(`Generated Digital Token #${token.tokenNumber}`, 'success');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Smart Campus Cafeteria"
        description="View today's menu, live queue status, and request digital tokens to bypass cafeteria waiting lines."
        breadcrumbs={[{ label: 'Smart Cafeteria' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl">
        {/* Digital Token & Live Queue Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-orange-300 bg-orange-50/40 text-center p-6">
            <CardContent className="space-y-4 p-0">
              <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto shadow-md">
                <Coffee className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Cafeteria Digital Token</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Live Queue: <strong>12 Students waiting</strong>
                </p>
              </div>

              {activeCafeteriaToken ? (
                <div className="bg-white p-5 rounded-2xl border border-orange-200 shadow-sm space-y-3">
                  <Badge variant="success" size="md">Token Active</Badge>
                  <h2 className="text-3xl font-extrabold text-slate-900">Token #{activeCafeteriaToken.tokenNumber}</h2>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>Queue Position: <strong>#{activeCafeteriaToken.queuePosition} in line</strong></p>
                    <p>Est. Waiting Time: <strong className="text-orange-600">{activeCafeteriaToken.estimatedWaitMins} Minutes</strong></p>
                    <p className="text-[10px] text-slate-400">Generated at {activeCafeteriaToken.timestamp}</p>
                  </div>
                </div>
              ) : (
                <Button variant="primary" size="lg" fullWidth icon={QrCode} onClick={handleRequestToken} className="bg-orange-600 hover:bg-orange-700">
                  Request Digital Token
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase text-slate-400">Cafeteria Hours & Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-xs text-slate-600 space-y-2">
              <p>• Breakfast: 07:30 AM - 10:30 AM</p>
              <p>• Lunch: 12:00 PM - 03:00 PM</p>
              <p>• Evening Snacks: 04:30 PM - 07:30 PM</p>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">Digital tokens are valid for 30 minutes after call time.</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Menu */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Menu & Live Availability</h3>

          <Card>
            <CardContent className="p-0 divide-y divide-slate-100">
              {cafeteriaMenu.map((item) => {
                const isAvailable = item.status === 'Available';
                const isLimited = item.status === 'Limited';
                return (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <span className="text-xs font-extrabold text-emerald-600">{item.price}</span>
                    </div>

                    <Badge
                      variant={isAvailable ? 'success' : isLimited ? 'warning' : 'error'}
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
