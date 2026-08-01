import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Upload, CheckCircle2, ListOrdered } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const ComplaintTypes = [
  { value: 'Broken Chair', label: 'Broken Chair' },
  { value: 'Broken Desk', label: 'Broken Desk' },
  { value: 'Water Leakage', label: 'Water Leakage' },
  { value: 'Electrical Issue', label: 'Electrical Issue' },
  { value: 'Internet Issue', label: 'Internet Issue' },
  { value: 'Cleaning Required', label: 'Cleaning Required' },
  { value: 'AC Not Working', label: 'AC Not Working' },
  { value: 'Projector Not Working', label: 'Projector Not Working' },
];

export const ComplaintPage = () => {
  const navigate = useNavigate();
  const { submitComplaint } = useStudent();
  const { addToast } = useToast();

  const [type, setType] = useState('Broken Chair');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      addToast('Please fill in location and description', 'warning');
      return;
    }

    const created = submitComplaint({
      type,
      location,
      description,
      photoName: fileName || null
    });

    addToast(`Complaint submitted successfully! Assigned ID: ${created.id}`, 'success');
    navigate('/student/complaints-history');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Report Campus Issue / Maintenance Complaint"
        description="Submit reports for facility issues on campus. Track progress from Pending to Completed."
        breadcrumbs={[{ label: 'Report Complaint' }]}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader actions={
            <Button variant="outline" size="sm" icon={ListOrdered} onClick={() => navigate('/student/complaints-history')}>
              View Complaint History
            </Button>
          }>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              New Maintenance Complaint Form
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="Complaint Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={ComplaintTypes}
              />

              <Input
                label="Location (Building / Floor / Room Number)"
                placeholder="e.g. Academic Block B, Floor 3, Room CS302"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Detailed Issue Description
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Describe the issue in detail for campus technicians..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Upload Image Section */}
              <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 text-xs text-slate-500 space-y-2">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <div>
                  <span className="font-semibold text-slate-700 block">Upload Photo Evidence (Optional)</span>
                  <span className="text-[11px] text-slate-400">PNG, JPG up to 5MB</span>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                      addToast(`Selected file: ${e.target.files[0].name}`, 'info');
                    }
                  }}
                  className="text-xs text-slate-500 mx-auto cursor-pointer block"
                />
                {fileName && <p className="text-xs text-emerald-600 font-semibold">Attached: {fileName}</p>}
              </div>

              <Button type="submit" variant="primary" size="md" fullWidth icon={CheckCircle2}>
                Submit Complaint & Assign ID
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
