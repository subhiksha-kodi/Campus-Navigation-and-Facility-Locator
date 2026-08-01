import React from 'react';
import { User, Shield } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useRole } from '../../context/RoleContext';

export const AdminProfilePage = () => {
  const { user } = useRole();

  return (
    <AdminLayout>
      <PageHeader
        title="Admin Profile"
        description="System Administrator profile and security role credentials."
        breadcrumbs={[{ label: 'Admin Profile' }]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-amber-500" />
              Administrator Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-5">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl border-2 border-amber-400 object-cover shadow-md" />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">{user.name}</h3>
                <Badge variant="navy" size="sm" className="!bg-slate-900 !text-amber-400 font-extrabold">
                  System Administrator (Highest Authority)
                </Badge>
                <p className="text-xs text-slate-600 font-semibold pt-1">Email: {user.email}</p>
                <p className="text-xs text-slate-500">Department: {user.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
