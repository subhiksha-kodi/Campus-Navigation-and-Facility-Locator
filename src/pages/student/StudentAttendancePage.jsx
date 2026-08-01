import React from 'react';
import { Award, BookOpen, CheckCircle2, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';

export const StudentAttendancePage = () => {
  const { student, attendance } = useStudent();

  return (
    <AppLayout>
      <PageHeader
        title="Student Attendance & Academic Progress"
        description="Track your overall course attendance percentage, subject-wise attendance logs, and academic CGPA metrics."
        breadcrumbs={[{ label: 'Attendance & CGPA' }]}
      />

      <div className="space-y-6">
        {/* Overview Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-5 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Overall Attendance</span>
              <h3 className="text-3xl font-extrabold text-blue-700 mt-1">{attendance.overallPercentage}%</h3>
              <span className="text-xs text-slate-500 mt-1 block">
                {attendance.attendedClasses} / {attendance.totalClasses} classes
              </span>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-5 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cumulative CGPA</span>
              <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{student.cgpa}</h3>
              <span className="text-xs text-slate-500 mt-1 block">Out of 10.0</span>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-5 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Credits Earned</span>
              <h3 className="text-3xl font-extrabold text-purple-700 mt-1">{student.creditsEarned}</h3>
              <span className="text-xs text-slate-500 mt-1 block">Total degree credits</span>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-5 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Courses Completed</span>
              <h3 className="text-3xl font-extrabold text-amber-700 mt-1">{student.completedCourses}</h3>
              <span className="text-xs text-slate-500 mt-1 block">Passed subjects</span>
            </CardContent>
          </Card>
        </div>

        {/* Subject-Wise Attendance Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-Wise Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Subject Code & Name</th>
                  <th className="p-4">Faculty In-Charge</th>
                  <th className="p-4">Classes Attended</th>
                  <th className="p-4">Percentage</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {attendance.subjectWise.map((sub, idx) => {
                  const isSafe = sub.percentage >= 85;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-blue-600 block">{sub.code}</span>
                        <span className="font-semibold text-slate-900">{sub.name}</span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{sub.faculty}</td>
                      <td className="p-4 font-semibold text-slate-700">
                        {sub.attended} / {sub.total} hrs
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${isSafe ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${sub.percentage}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-900">{sub.percentage}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant={isSafe ? 'success' : 'warning'} size="sm">
                          {isSafe ? 'Sufficient' : 'Low Attendance'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
