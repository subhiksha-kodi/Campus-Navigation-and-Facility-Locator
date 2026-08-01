import React, { useState } from 'react';
import { FacultySidebar } from './FacultySidebar';
import { Topbar } from './Topbar';
import { FacultyRouteGuard } from '../faculty/FacultyRouteGuard';

export const FacultyLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FacultyRouteGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Faculty Collapsible Navigation Sidebar */}
        <FacultySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Workspace Container */}
        <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all duration-200">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </FacultyRouteGuard>
  );
};
