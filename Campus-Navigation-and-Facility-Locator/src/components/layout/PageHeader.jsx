import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions,
  className = ''
}) => {
  return (
    <div className={`mb-6 pb-5 border-b border-slate-200 ${className}`}>
      {/* Breadcrumb Trail */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <NavLink to="/home" className="hover:text-slate-800 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </NavLink>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {crumb.path ? (
                <NavLink to={crumb.path} className="hover:text-slate-800 transition-colors">
                  {crumb.label}
                </NavLink>
              ) : (
                <span className="text-slate-800 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
