import React from 'react';

export const Badge = ({
  children,
  variant = 'info', // 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'role'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors select-none';

  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    navy: 'bg-slate-900 text-white border-slate-900',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.info} ${sizes[size]} ${className}`}>
      {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{children}</span>
    </span>
  );
};
