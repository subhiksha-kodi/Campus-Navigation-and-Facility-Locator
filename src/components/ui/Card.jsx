import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden transition-all duration-150 ${
        hoverEffect ? 'hover:border-slate-300 hover:shadow-md cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', actions }) => {
  return (
    <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4 ${className}`}>
      <div>{children}</div>
      {actions && <div>{actions}</div>}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }) => {
  return <h3 className={`text-base font-semibold text-slate-900 tracking-tight ${className}`}>{children}</h3>;
};

export const CardDescription = ({ children, className = '' }) => {
  return <p className={`text-xs text-slate-500 mt-0.5 ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 ${className}`}>
      {children}
    </div>
  );
};
