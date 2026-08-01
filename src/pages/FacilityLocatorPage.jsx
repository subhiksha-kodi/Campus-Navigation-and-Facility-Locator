import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Printer,
  CreditCard,
  HeartPulse,
  Car,
  Wifi,
  Accessibility,
  Bus,
  Droplet,
  Search,
  Navigation,
  Clock,
  MapPin,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { FacilityCard } from '../components/navigation/FacilityCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const FACILITY_ITEMS = [
  {
    id: 1,
    name: 'High-Speed Student Printing Kiosk',
    category: 'Printer',
    locationName: 'Central Library 1st Floor',
    status: 'Open',
    walkTime: '2 min',
    hours: '08:00 AM - 08:00 PM',
    icon: Printer
  },
  {
    id: 2,
    name: 'Campus ATM (HDFC Bank)',
    category: 'ATM',
    locationName: 'Student Centre Plaza',
    status: 'Available',
    walkTime: '3 min',
    hours: '24 Hours',
    icon: CreditCard
  },
  {
    id: 3,
    name: 'Emergency Medical Clinic',
    category: 'Medical',
    locationName: 'Health & Wellness Wing',
    status: 'Open 24/7',
    walkTime: '4 min',
    hours: '24 Hours Emergency Care',
    icon: HeartPulse
  },
  {
    id: 4,
    name: 'Main Parking Lot B (Two & Four Wheelers)',
    category: 'Parking',
    locationName: 'North Entrance Gate',
    status: '42 Slots Open',
    walkTime: '5 min',
    hours: 'Open 24/7',
    icon: Car
  },
  {
    id: 5,
    name: 'Campus Wi-Fi Gigabit Hotspot',
    category: 'Wi-Fi',
    locationName: 'Academic Quad Lawn',
    status: 'Active (500 Mbps)',
    walkTime: '1 min',
    hours: 'Always Active',
    icon: Wifi
  },
  {
    id: 6,
    name: 'Elevator & Wheelchair Lift B',
    category: 'Lift',
    locationName: 'Computer Science Block East',
    status: 'Operational',
    walkTime: '2 min',
    hours: 'All Day',
    icon: Accessibility
  },
  {
    id: 7,
    name: 'Campus Shuttle Bus Stop #1',
    category: 'Bus Stop',
    locationName: 'Main Campus Gate',
    status: 'Next Shuttle in 5 min',
    walkTime: '1 min',
    hours: '07:00 AM - 09:00 PM',
    icon: Bus
  },
  {
    id: 8,
    name: 'RO Drinking Water Refill Station',
    category: 'Drinking Water',
    locationName: 'Academic Block A (Floor 2)',
    status: 'Chilled Water Available',
    walkTime: '3 min',
    hours: 'Always Available',
    icon: Droplet
  }
];

export const FacilityLocatorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const categories = [
    { name: 'All', icon: Building2 },
    { name: 'Printer', icon: Printer },
    { name: 'ATM', icon: CreditCard },
    { name: 'Medical', icon: HeartPulse },
    { name: 'Parking', icon: Car },
    { name: 'Wi-Fi', icon: Wifi },
    { name: 'Lift', icon: Accessibility },
    { name: 'Bus Stop', icon: Bus },
    { name: 'Drinking Water', icon: Droplet },
  ];

  const filteredFacilities = FACILITY_ITEMS.filter((fac) => {
    const matchesCategory = activeCategory === 'All' || fac.category === activeCategory;
    const matchesQuery =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <AppLayout>
      <PageHeader
        title="Facility Locator"
        description="Find essential campus amenities including printers, ATMs, medical facilities, parking zones, Wi-Fi hotspots, and bus stops."
        breadcrumbs={[{ label: 'Facility Locator' }]}
      />

      <div className="space-y-6">
        {/* Prominent Search Bar */}
        <div className="max-w-2xl">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            What are you looking for?
          </label>
          <SearchBar
            placeholder="Search printers, ATMs, cafeterias, water stations..."
            onSearch={(q) => setSearchQuery(q)}
            suggestions={['Student Printing Kiosk', 'HDFC ATM', 'Medical Clinic', 'Parking Lot B']}
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
              Available Amenities ({filteredFacilities.length})
            </h3>
            <span className="text-xs text-slate-500">Sorted by walking distance</span>
          </div>

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
        </div>
      </div>
    </AppLayout>
  );
};
