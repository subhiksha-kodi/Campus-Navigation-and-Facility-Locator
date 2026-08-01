export const DESIGN_TOKENS = {
  brandName: 'WayFindYou',
  tagline: 'Find your way. Find your campus.',
  colors: {
    primary: '#0f172a',    // Deep Navy
    secondary: '#2563eb',  // Cool Blue accent
    emerald: '#059669',    // Positive navigation / Open state
    amber: '#d97706',      // Warning / Maintenance
    red: '#dc2626',        // Error / SOS
    background: '#f8fafc', // Light slate
    surface: '#ffffff',    // Crisp white
    border: '#e2e8f0',     // Slate stroke
    textPrimary: '#0f172a',
    textMuted: '#64748b',
  },
  roles: {
    student: { name: 'Student', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    faculty: { name: 'Faculty', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    visitor: { name: 'Visitor', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    security: { name: 'Security', color: 'bg-red-50 text-red-700 border-red-200' },
    admin: { name: 'Administrator', color: 'bg-slate-900 text-white border-slate-900' }
  }
};
