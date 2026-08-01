import React from 'react';
import { Settings } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminSystemSettingsPage = () => {
  const { settings, setSettings } = useAdmin();
  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Campus system settings updated successfully!', 'success');
  };

  return (
    <AdminLayout>
      <PageHeader
        title="System Settings"
        description="Exclusive admin settings panel for configuring campus system parameters, academic year, operating hours, and system maintenance state."
        breadcrumbs={[{ label: 'System Settings' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-700" />
              Global System Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="max-w-xl space-y-4">
              <Input
                label="Campus System Title"
                value={settings.campusName}
                onChange={(e) => setSettings({ ...settings, campusName: e.target.value })}
              />
              <Input
                label="Academic Year"
                value={settings.academicYear}
                onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
              />
              <Input
                label="Current Semester"
                value={settings.currentSemester}
                onChange={(e) => setSettings({ ...settings, currentSemester: e.target.value })}
              />
              <Input
                label="Campus Working Hours"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
              />
              <Button type="submit" variant="primary" size="md" className="!bg-amber-500 !text-slate-950 hover:!bg-amber-400 font-extrabold">
                Save System Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
