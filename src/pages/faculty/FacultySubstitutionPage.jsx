import React, { useState } from 'react';
import { UserCheck, Clock, Calendar, AlertCircle, CheckCircle2, Send, Users, FileText } from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { INITIAL_FACULTY_PROFILE } from '../../services/facultyData';
import { useToast } from '../../context/ToastContext';
import { useSubstitution } from '../../context/SubstitutionContext';

export const FacultySubstitutionPage = () => {
  const { addToast } = useToast();
  const { substitutions, addSubstitutionRequest } = useSubstitution();

  const [date, setDate] = useState('2026-08-07');
  const [period, setPeriod] = useState('09:00 AM - 10:00 AM');
  const [subject, setSubject] = useState('Database Management Systems (CS301)');
  const [className, setClassName] = useState('CSE - III Year (Sec A)');
  const [reason, setReason] = useState('Official Duty');

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    addSubstitutionRequest({
      original_faculty_id: INITIAL_FACULTY_PROFILE.faculty_id,
      original_faculty_name: INITIAL_FACULTY_PROFILE.name,
      subject,
      className,
      date,
      period,
      room: 'SF303',
      building: 'Sunflower Block',
      reason
    });

    addToast('Substitution request submitted! Admin has been notified to assign free faculty.', 'success');
  };

  return (
    <FacultyLayout>
      <PageHeader
        title="Faculty Substitution Management"
        description="Report class unavailability and track substitute teacher assignments."
        breadcrumbs={[{ label: 'Substitution Workflow' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unavailability & Substitute Request Form */}
        <div className="lg:col-span-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <CardTitle>Report Class Unavailability</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <Input
                  label="Date of Absence"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />

                <Select
                  label="Period / Time Slot"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  options={[
                    { value: '09:00 AM - 10:00 AM', label: '09:00 AM - 10:00 AM (Slot 1)' },
                    { value: '10:00 AM - 11:00 AM', label: '10:00 AM - 11:00 AM (Slot 2)' },
                    { value: '02:00 PM - 04:00 PM', label: '02:00 PM - 04:00 PM (Lab Slot)' },
                  ]}
                />

                <Select
                  label="Subject & Course"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  options={[
                    { value: 'Database Management Systems (CS301)', label: 'Database Management Systems (CS301)' },
                    { value: 'Operating Systems (CS304)', label: 'Operating Systems (CS304)' },
                    { value: 'System Architecture Seminar (CS401)', label: 'System Architecture Seminar (CS401)' },
                  ]}
                />

                <Input
                  label="Class / Section"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />

                <Select
                  label="Reason for Unavailability"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  options={[
                    { value: 'Official Duty', label: 'Official Duty (Conference / Board Meeting)' },
                    { value: 'Absent', label: 'Absent (Sick Leave)' },
                    { value: 'Meeting', label: 'Meeting (Administrative Duty)' },
                    { value: 'Academic Work', label: 'Academic Work (Curriculum Review)' },
                    { value: 'Other', label: 'Other Special Exemption' },
                  ]}
                />

                {/* Requirement #8: Submit "Request Substitute" button */}
                <Button type="submit" variant="primary" size="lg" fullWidth icon={Send}>
                  Request Substitute
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Substitution Request Status Tracker */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Substitution Requests & History ({substitutions.length})
          </h3>

          {substitutions.map((sub) => {
            const isApproved = sub.status === 'Approved';
            const isPending = sub.status === 'Pending';

            return (
              <Card key={sub.id} className="border-l-4 border-l-blue-600">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={isApproved ? 'success' : isPending ? 'warning' : 'neutral'} size="sm">
                        Status: {sub.status}
                      </Badge>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">{sub.subject}</h4>
                      <p className="text-xs text-blue-600 font-semibold">{sub.class_name}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">{sub.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Original Faculty</span>
                      <span className="font-bold text-slate-900 block">{sub.original_faculty_name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Substitute Faculty</span>
                      <span className="font-bold text-emerald-700 block">{sub.substitute_faculty_name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Date & Slot</span>
                      <span className="font-bold block">{sub.date} ({sub.period})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Reason</span>
                      <span className="font-bold text-slate-900 block">{sub.reason}</span>
                    </div>
                  </div>

                  {/* Requirement #8: Notification dispatch status */}
                  <div className="p-2.5 bg-blue-50/60 rounded-lg text-[11px] text-slate-600 space-y-1">
                    <span className="font-semibold text-blue-800 block">Automatic Broadcast Notifications:</span>
                    <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-700 font-medium">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Substitute Faculty</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Students</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> HOD / Admin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </FacultyLayout>
  );
};
