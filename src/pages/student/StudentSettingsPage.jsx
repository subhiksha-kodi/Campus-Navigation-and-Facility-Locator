import React, { useState } from 'react';
import { Settings, Accessibility, Bell, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const StudentSettingsPage = () => {
  const { addToast } = useToast();

  const [stairFree, setStairFree] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Preferences saved successfully!', 'success');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Student Settings & Preferences"
        description="Configure map accessibility preferences, alert notifications, and portal settings."
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <div className="max-w-3xl space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Navigation Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-blue-600" />
                Navigation & Accessibility Defaults
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Default to Stair-Free / Wheelchair Routes</span>
                  <span className="text-slate-500">Automatically prioritize elevators and ramps on campus map routing</span>
                </div>
                <input
                  type="checkbox"
                  checked={stairFree}
                  onChange={(e) => setStairFree(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>
            </CardContent>
          </Card>

          {/* Notifications Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Email Notices & Exam Updates</span>
                  <span className="text-slate-500">Receive official academic announcements in student email</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 block">Emergency SMS Alerts</span>
                  <span className="text-slate-500">Receive instant mobile text messages for campus SOS broadcasts</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotifs}
                  onChange={(e) => setSmsNotifs(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>
            </CardContent>
          </Card>

          <Button type="submit" variant="primary" size="md" icon={CheckCircle2}>
            Save All Preferences
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};
