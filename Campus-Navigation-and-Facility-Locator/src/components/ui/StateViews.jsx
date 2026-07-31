import React from 'react';
import { SearchX, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const Skeleton = ({ className = '' }) => {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />;
};

export const EmptyState = ({
  icon: Icon = SearchX,
  title = "No results found",
  description = "We couldn't find anything matching your search criteria. Try adjusting your search query or filters.",
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this section. Please try refreshing.",
  onRetry,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-50/50 rounded-xl border border-red-200 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-red-900 mb-1">{title}</h4>
      <p className="text-xs text-red-700 max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export const LoadingState = ({ message = "Loading campus data...", className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-slate-200 ${className}`}>
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xs font-medium text-slate-600">{message}</p>
    </div>
  );
};
