import React, { useState, useRef, useEffect } from 'react';

export const Dropdown = ({ trigger, children, align = 'right', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-dropdown z-50 py-1.5 animate-in fade-in slide-in-from-top-1 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Avatar = ({ src, name = 'User', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover border border-slate-200 ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center border border-slate-700 select-none ${sizes[size]} ${className}`}>
      {initials}
    </div>
  );
};
