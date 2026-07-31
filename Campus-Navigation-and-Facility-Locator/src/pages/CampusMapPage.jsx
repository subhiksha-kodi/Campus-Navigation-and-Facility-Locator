import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Map, MapPin, Search, Navigation, Accessibility, Layers, Filter } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { CampusMap, CAMPUS_LOCATIONS } from '../components/navigation/CampusMap';
import { SearchBar } from '../components/ui/SearchBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const CampusMapPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { addToast } = useToast();

  const [selectedLoc, setSelectedLoc] = useState(() => {
    if (initialQuery) {
      return CAMPUS_LOCATIONS.find((l) => l.name.toLowerCase().includes(initialQuery.toLowerCase())) || CAMPUS_LOCATIONS[0];
    }
    return CAMPUS_LOCATIONS[0];
  });

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredLocations = CAMPUS_LOCATIONS.filter((loc) => {
    const matchesCategory = filterCategory === 'all' || loc.category === filterCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <PageHeader
        title="Interactive Campus Map"
        description="Explore your campus and find the fastest, most accessible routes to any building, room, or facility."
        breadcrumbs={[{ label: 'Campus Map' }]}
        actions={
          <Badge variant="info" size="md">
            PostGIS Spatial Vector Layer
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Location Selector & Search */}
        <div className="lg:col-span-4 space-y-4">
          <SearchBar
            placeholder="Search building name or code..."
            onSearch={(q) => setSearchQuery(q)}
            suggestions={CAMPUS_LOCATIONS.map((l) => l.name)}
          />

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'academic', label: 'Academic' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'parking', label: 'Parking' },
              { id: 'emergency', label: 'Emergency' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  filterCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Location List Items */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLoc && selectedLoc.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{loc.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{loc.description}</p>
                    </div>
                    <Badge variant={loc.category === 'emergency' ? 'error' : 'info'} size="sm">
                      {loc.code}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-emerald-700 font-medium text-[11px]">{loc.status}</span>
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="sm"
                      icon={Navigation}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLoc(loc);
                        addToast(`Route calculated for ${loc.name}`, 'success');
                      }}
                    >
                      Route
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Map Canvas Container */}
        <div className="lg:col-span-8">
          <CampusMap
            height="h-[620px]"
            selectedDestination={selectedLoc}
            onSelectDestination={(loc) => setSelectedLoc(loc)}
          />
        </div>
      </div>
    </AppLayout>
  );
};
