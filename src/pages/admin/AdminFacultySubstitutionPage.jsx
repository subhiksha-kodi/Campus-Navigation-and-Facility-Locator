import React, { useState } from 'react';
import { UserCheck, CheckCircle2, AlertTriangle, UserPlus, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useSubstitution } from '../../context/SubstitutionContext';
import { useToast } from '../../context/ToastContext';

export const AdminFacultySubstitutionPage = () => {
  const { substitutions, getFreeFacultyForSlot, assignSubstitute, allFaculty } = useSubstitution();
  const { addToast } = useToast();

  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState('');

  const pendingSubstitutions = substitutions.filter((s) => s.status === 'Pending');

  const handleOpenAssignModal = (req) => {
    setSelectedReq(req);
    const freeFac = getFreeFacultyForSlot(req.period, req.original_faculty_id);
    if (freeFac.length > 0) {
      setSelectedSubId(freeFac[0].id);
    } else {
      setSelectedSubId(allFaculty[0]?.id || '');
    }
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!selectedReq || !selectedSubId) return;

    const subFacultyObj = allFaculty.find((f) => f.id === selectedSubId);
    if (!subFacultyObj) return;

    assignSubstitute(selectedReq.id, subFacultyObj);
    addToast(`Successfully assigned ${subFacultyObj.name} to substitute for ${selectedReq.original_faculty_name}! Notifications dispatched.`, 'success');
    setSelectedReq(null);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Faculty Substitution Allocation"
        description="Exclusive admin control engine for receiving faculty unavailability requests, checking free faculty time-slots, assigning substitute teachers, and dispatching automated notifications."
        breadcrumbs={[{ label: 'Faculty Substitution' }]}
        actions={
          <Badge variant="warning" size="md" className="font-bold">
            {pendingSubstitutions.length} Pending Unavailability Requests
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                Faculty Substitution Requests & Allocation Matrix ({substitutions.length})
              </CardTitle>
              <Badge variant="navy" size="sm">Admin Control Hub</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {substitutions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No substitution requests in the system.
              </div>
            ) : (
              <div className="space-y-4">
                {substitutions.map((req) => {
                  const isPending = req.status === 'Pending';
                  const availableFreeFaculty = getFreeFacultyForSlot(req.period, req.original_faculty_id);

                  return (
                    <div key={req.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                            Substitution Request #{req.id}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-900">{req.original_faculty_name}</h4>
                          <p className="text-xs text-slate-500 font-medium">Reason: {req.reason}</p>
                        </div>
                        <Badge variant={isPending ? 'warning' : 'success'} size="sm" className="font-bold">
                          {req.status === 'Approved' ? 'Substitute Assigned' : 'Pending Admin Allocation'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Subject</span>
                          <span className="font-bold text-slate-900 block">{req.subject}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Class Section</span>
                          <span className="font-bold text-slate-900 block">{req.class_name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Date & Period</span>
                          <span className="font-bold text-slate-900 block">{req.date} ({req.period})</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Venue / Room</span>
                          <span className="font-bold text-blue-700 block">{req.room} ({req.building})</span>
                        </div>
                      </div>

                      {isPending ? (
                        <div className="pt-2 border-t flex items-center justify-between">
                          <span className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {availableFreeFaculty.length} Free Teachers available for {req.period}
                          </span>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={UserPlus}
                            onClick={() => handleOpenAssignModal(req)}
                            className="!bg-purple-600 !text-white hover:!bg-purple-700 font-bold"
                          >
                            Assign Substitute Faculty
                          </Button>
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between">
                          <span>✅ Substitute Assigned: <strong>{req.substitute_faculty_name}</strong></span>
                          <Badge variant="success" size="sm">Notifications Sent</Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ASSIGN SUBSTITUTE MODAL */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Assign Substitute Teacher</h3>
                <p className="text-xs text-slate-500">For {selectedReq.original_faculty_name}'s class</p>
              </div>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border text-xs space-y-1">
              <p><strong>Subject:</strong> {selectedReq.subject} ({selectedReq.class_name})</p>
              <p><strong>Time Slot:</strong> {selectedReq.date} • {selectedReq.period}</p>
              <p><strong>Room:</strong> {selectedReq.room} ({selectedReq.building})</p>
            </div>

            <form onSubmit={handleConfirmAssignment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Select Available Substitute Faculty</label>
                <select
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  value={selectedSubId}
                  onChange={(e) => setSelectedSubId(e.target.value)}
                  required
                >
                  {getFreeFacultyForSlot(selectedReq.period, selectedReq.original_faculty_id).map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      🟢 {fac.name} ({fac.department} • Free at {selectedReq.period})
                    </option>
                  ))}
                  {allFaculty
                    .filter((f) => f.id !== selectedReq.original_faculty_id && !getFreeFacultyForSlot(selectedReq.period, selectedReq.original_faculty_id).some((ff) => ff.id === f.id))
                    .map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        ⚪ {fac.name} ({fac.department})
                      </option>
                    ))}
                </select>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedReq(null)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md" className="!bg-purple-600 !text-white font-bold">
                  Confirm Substitution & Dispatch Alerts
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
