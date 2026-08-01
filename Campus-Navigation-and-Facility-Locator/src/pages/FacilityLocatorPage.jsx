import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CreditCard,
  HeartPulse,
  Car,
  Accessibility,
  Building2,
  GraduationCap,
  Home,
  Trees,
  Trophy,
  Utensils,
  Zap,
  Wrench,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { FacilityCard } from '../components/navigation/FacilityCard';
import { useToast } from '../context/ToastContext';
import { CAMPUS_LOCATIONS } from '../data/campusLocations';

export const FACILITY_ITEMS = CAMPUS_LOCATIONS;

export const FacilityLocatorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const categories = [
    { name: 'All', icon: Building2 },
    { name: 'Academic', icon: GraduationCap },
    { name: 'ATM', icon: CreditCard },
    { name: 'Dining', icon: Utensils },
    { name: 'Hostel', icon: Home },
    { name: 'Medical', icon: HeartPulse },
    { name: 'Parking', icon: Car },
    { name: 'Recreation', icon: Trees },
    { name: 'Sports', icon: Trophy },
    { name: 'Utility', icon: Wrench },
  ];

  const filteredFacilities = CAMPUS_LOCATIONS.filter((fac) => {
    const matchesCategory = activeCategory === 'All' || fac.category === activeCategory || fac.type === activeCategory;
    const matchesQuery =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fac.locationName && fac.locationName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (fac.description && fac.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (fac.code && fac.code.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <AppLayout>
      <PageHeader
        title="Facility Locator"
        description="Explore 22 official BIT campus facilities, academic blocks, residential halls, sports arenas, ATMs, and emergency units."
        breadcrumbs={[{ label: 'Facility Locator' }]}
      />

      <div className="space-y-6">
        {/* Prominent Search Bar */}
        <div className="max-w-2xl">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            What campus location are you searching for?
          </label>
          <SearchBar
            placeholder="Search IB Block, Cafeteria, SBI ATM, Medical Centre..."
            onSearch={(q) => setSearchQuery(q)}
            suggestions={['IB Block', 'BIT Cafeteria', 'State Bank of India ATM', 'Medical Centre', 'Research Park']}
          />
        </div>

        {/* Category Chips Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Facility Results Cards Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              BIT Campus Facilities ({filteredFacilities.length})
            </h3>
            <span className="text-xs text-slate-500">Sorted by walking distance</span>
          </div>

          {filteredFacilities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No matching campus locations found</h4>
              <p className="text-xs text-slate-500 mt-1">Try clearing your filter or searching for another facility or block.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredFacilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  onNavigate={(f) => {
                    addToast(`Opening map directions for ${f.name}`, 'info');
                    navigate(`/map?q=${encodeURIComponent(f.name)}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
