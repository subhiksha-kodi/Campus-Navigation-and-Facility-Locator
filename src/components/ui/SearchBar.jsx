import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from './Button';

export const SearchBar = ({
  placeholder = "Search classrooms, buildings, facilities...",
  onSearch,
  className = '',
  size = 'lg',
  suggestions = []
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleSelectSuggestion = (item) => {
    setQuery(item);
    setShowSuggestions(false);
    if (onSearch) onSearch(item);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(query.length > 0)}
          placeholder={placeholder}
          className={`w-full rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 pl-11 pr-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium ${
            size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setShowSuggestions(false); }}
            className="absolute right-20 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="absolute right-1.5 inset-y-1.5 flex items-center">
          <Button
            type="submit"
            variant="primary"
            size={size === 'lg' ? 'md' : 'sm'}
            icon={Search}
            className="rounded-lg"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Auto-complete Suggestions Popup */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-dropdown z-30 py-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Suggested Campus Destinations
          </div>
          {suggestions
            .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item}</span>
              </button>
            ))}
        </div>
      )}
    </form>
  );
};
