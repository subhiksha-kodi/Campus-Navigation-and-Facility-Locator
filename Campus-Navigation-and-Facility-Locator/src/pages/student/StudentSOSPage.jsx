import React, { useState } from 'react';
import { ShieldAlert, Phone, MapPin, HeartPulse, AlertTriangle, Users } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentSOSPage = () => {
  const { student, emergencyContacts, triggerSOSAlert, emergencyAlerts } = useStudent();
  const { addToast } = useToast();
  const [lastSOS, setLastSOS] = useState(null);

  const handleSOS = () => {
    const record = triggerSOSAlert('Academic Block B - Floor 3');
    setLastSOS(record);
    addToast('EMERGENCY SOS TRANSMITTED! Campus Control Room alerted.', 'error', 'SOS DISPATCH');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Emergency SOS & Safety Directory"
        description="One-touch emergency dispatch with student ID & location logging, plus direct contact numbers for campus emergency teams."
        breadcrumbs={[{ label: 'Emergency SOS' }]}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Panic SOS Trigger Banner */}
        <Card className="border-red-400 bg-red-50/50 text-center p-8">
          <CardContent className="space-y-6 p-0">
            <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <ShieldAlert className="w-12 h-12" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-red-900">Campus Emergency Panic Button</h2>
              <p className="text-xs text-red-700 mt-1 max-w-md mx-auto">
                Pressing this button logs Student ID (<strong>{student.id}</strong>), records current timestamp, and alerts campus security control room immediately.
              </p>
            </div>

            <Button
              variant="danger"
              size="lg"
              fullWidth
              icon={ShieldAlert}
              onClick={handleSOS}
              className="py-4 text-base font-extrabold shadow-md"
            >
              TRIGGER IMMEDIATE SOS EMERGENCY ALERT
            </Button>

            {lastSOS && (
              <div className="bg-white p-4 rounded-xl border border-red-200 text-left text-xs space-y-1 text-slate-800">
                <span className="font-bold text-red-700 block">🚨 Active Dispatch Status:</span>
                <p>SOS ID: <strong>{lastSOS.id}</strong> • Student: {lastSOS.studentName} ({lastSOS.studentId})</p>
                <p>Location: {lastSOS.location} • Time: {lastSOS.time}</p>
                <Badge variant="error" size="sm" className="mt-1">Dispatching Security Guard Patrol</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts Directory */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Emergency Helplines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, idx) => (
              <Card key={idx}>
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{contact.title}</h4>
                    <p className="text-xs font-mono font-bold text-red-600">{contact.number}</p>
                    <span className="text-[11px] text-slate-500 block">{contact.subtitle}</span>
                  </div>

                  <a
                    href={`tel:${contact.number}`}
                    className="p-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200 shrink-0"
                    title="Call Helpline"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearest Safety Facilities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold">Nearest Emergency Facilities</CardTitle>
          </CardHeader>
          <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Medical Centre / Clinic</span>
              <p className="text-slate-500">Ground Floor, Health Wing Block C (~120m)</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Main Security Office</span>
              <p className="text-slate-500">Gate #1 Main Entrance (~200m)</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Emergency Fire Exit</span>
              <p className="text-slate-500">Academic Block B Stairwell East (~15m)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
