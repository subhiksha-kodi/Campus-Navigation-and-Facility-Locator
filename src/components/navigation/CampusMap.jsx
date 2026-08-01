import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  Layers,
  Accessibility,
  Compass,
  Info,
  Maximize2,
  Clock,
  Building,
  CheckCircle,
  Footprints
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

// Sample realistic campus landmarks data
export const CAMPUS_LOCATIONS = [
  {
    id: 'loc_cs',
    name: 'Computer Science Block',
    code: 'CS-BLOCK',
    category: 'academic',
    lat: 12.9716,
    lng: 77.5946,
    floors: 4,
    classrooms: ['CS301', 'CS302', 'CS303 (AI Lab)', 'CS401'],
    status: 'Open',
    hours: '08:00 AM - 08:00 PM',
    description: 'Main computing labs, lecture halls, and faculty offices.',
    accessible: true,
  },
  {
    id: 'loc_lib',
    name: 'Central Library',
    code: 'LIB-MAIN',
    category: 'amenities',
    lat: 12.9725,
    lng: 77.5955,
    floors: 3,
    classrooms: ['Quiet Study 101', 'Digital Archives', 'Reference Hall'],
    status: 'Open',
    hours: '07:00 AM - 10:00 PM',
    description: '3-floor digital library with study pods and book lending.',
    accessible: true,
  },
  {
    id: 'loc_cafe',
    name: 'Main Cafeteria',
    code: 'CAF-CENTRAL',
    category: 'amenities',
    lat: 12.9708,
    lng: 77.5938,
    floors: 2,
    classrooms: [],
    status: 'Open',
    hours: '07:30 AM - 09:00 PM',
    description: 'Food court, coffee lounge, and outdoor seating.',
    accessible: true,
  },
  {
    id: 'loc_med',
    name: 'Medical Centre',
    code: 'MED-CARE',
    category: 'emergency',
    lat: 12.9732,
    lng: 77.5940,
    floors: 1,
    classrooms: ['Triage Room', 'Pharmacy'],
    status: 'Open 24/7',
    hours: '24 Hours Emergency',
    description: 'Campus health clinic with doctors on call.',
    accessible: true,
  },
  {
    id: 'loc_park',
    name: 'Main Parking Lot B',
    code: 'PARK-B',
    category: 'parking',
    lat: 12.9701,
    lng: 77.5952,
    floors: 1,
    classrooms: [],
    status: 'Available (42 slots)',
    hours: 'Open 24/7',
    description: 'Student and visitor vehicle parking zone.',
    accessible: true,
  },
  {
    id: 'loc_admin',
    name: 'Academic Block A (Admin)',
    code: 'BLK-A',
    category: 'academic',
    lat: 12.9720,
    lng: 77.5962,
    floors: 5,
    classrooms: ['Auditorium', 'Dean Office', 'Registrar'],
    status: 'Open',
    hours: '09:00 AM - 05:00 PM',
    description: 'Administrative offices, admissions, and main auditorium.',
    accessible: true,
  }
];

// User current location baseline
export const USER_START_LOCATION = {
  name: 'Your Current Position (Main Gate)',
  lat: 12.9695,
  lng: 77.5930
};

export const CampusMap = ({
  selectedDestination,
  onSelectDestination,
  height = 'h-[500px]',
  showControls = true
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [activeFloor, setActiveFloor] = useState('GF');
  const [activeRouteInfo, setActiveRouteInfo] = useState(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center baseline coordinates around campus
    const centerLat = 12.9716;
    const centerLng = 77.5946;

    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 16,
      zoomControl: false,
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | WayFindYou Campus Maps',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add User Current Location Pin
    const userDivIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white shadow-md flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <span class="absolute -bottom-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    L.marker([USER_START_LOCATION.lat, USER_START_LOCATION.lng], { icon: userDivIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-1">
          <h4 class="font-bold text-xs text-emerald-700">Your Current Position</h4>
          <p class="text-[11px] text-slate-500">Main Campus Entrance Gate</p>
        </div>
      `);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers based on Category and Accessible filter
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing building markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const filtered = CAMPUS_LOCATIONS.filter((loc) => {
      if (activeCategory !== 'all' && loc.category !== activeCategory) return false;
      if (accessibleOnly && !loc.accessible) return false;
      return true;
    });

    filtered.forEach((loc) => {
      const isEmergency = loc.category === 'emergency';
      const isSelected = selectedDestination && selectedDestination.id === loc.id;

      const pinColor = isSelected
        ? 'bg-blue-600 text-white ring-4 ring-blue-200'
        : isEmergency
        ? 'bg-red-600 text-white'
        : 'bg-slate-900 text-white';

      const customIcon = L.divIcon({
        className: 'custom-building-marker',
        html: `
          <div class="w-8 h-8 rounded-full ${pinColor} border-2 border-white shadow-md flex items-center justify-center font-bold text-xs cursor-pointer transition-transform hover:scale-110">
            <span>${loc.code.substring(0, 3)}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <h4 style="font-weight: 700; font-size: 13px; color: #0f172a; margin: 0;">${loc.name}</h4>
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 9999px; background: #eff6ff; color: #1d4ed8; font-weight: 600;">${loc.code}</span>
          </div>
          <p style="font-size: 11px; color: #64748b; margin: 4px 0 8px 0;">${loc.description}</p>
          <div style="font-size: 11px; color: #059669; font-weight: 500; margin-bottom: 8px;">
            Status: ${loc.status}
          </div>
          <button id="btn-nav-${loc.id}" style="width: 100%; background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
            Navigate to Location
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-nav-${loc.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectDestination) onSelectDestination(loc);
            marker.closePopup();
          };
        }
      });

      markersRef.current[loc.id] = marker;
    });
  }, [activeCategory, accessibleOnly, selectedDestination, onSelectDestination]);

  // Draw Polyline Route if Destination is Selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (selectedDestination) {
      const waypoints = [
        [USER_START_LOCATION.lat, USER_START_LOCATION.lng],
        // Midpoint waypoint simulation for realistic path along campus walkways
        [(USER_START_LOCATION.lat + selectedDestination.lat) / 2 + 0.0003, (USER_START_LOCATION.lng + selectedDestination.lng) / 2 - 0.0002],
        [selectedDestination.lat, selectedDestination.lng]
      ];

      const polyline = L.polyline(waypoints, {
        color: accessibleOnly ? '#059669' : '#2563eb',
        weight: 5,
        opacity: 0.9,
        dashArray: accessibleOnly ? '8, 8' : undefined
      }).addTo(map);

      polylineRef.current = polyline;

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

      // Calculate approximate walking distance & time
      const latDiff = Math.abs(USER_START_LOCATION.lat - selectedDestination.lat);
      const lngDiff = Math.abs(USER_START_LOCATION.lng - selectedDestination.lng);
      const approxMeters = Math.round((latDiff + lngDiff) * 111000);
      const mins = Math.max(1, Math.round(approxMeters / 70));

      setActiveRouteInfo({
        distanceMeters: approxMeters,
        durationMins: mins,
        destinationName: selectedDestination.name,
        accessible: accessibleOnly
      });
    } else {
      setActiveRouteInfo(null);
    }
  }, [selectedDestination, accessibleOnly]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    mapInstanceRef.current?.setView([12.9716, 77.5946], 16);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-card bg-white">
      {/* Map Control Bar Top */}
      {showControls && (
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-700 mr-1">Layer:</span>
            {[
              { id: 'all', label: 'All Markers' },
              { id: 'academic', label: 'Academic Blocks' },
              { id: 'amenities', label: 'Amenities & Dining' },
              { id: 'parking', label: 'Parking' },
              { id: 'emergency', label: 'Medical & SOS' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accessibility Toggle */}
          <button
            onClick={() => setAccessibleOnly(!accessibleOnly)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              accessibleOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wheelchair / Stair-Free Route</span>
          </button>
        </div>
      )}

      {/* Leaflet Map Target Element */}
      <div ref={mapRef} className={`w-full ${height} z-10`} />

      {/* Floating Zoom & Control Buttons */}
      <div className="absolute top-16 right-3 z-20 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold text-base"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold text-base"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleRecenter}
          className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 mt-1"
          title="Recenter Campus Map"
        >
          <Compass className="w-4 h-4 text-blue-600" />
        </button>
      </div>

      {/* Floating Floor Switcher */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-white/95 p-1 rounded-lg border border-slate-200 shadow-md backdrop-blur-xs text-xs font-medium">
        <span className="px-2 text-slate-500 font-semibold text-[10px] uppercase">Floor Level:</span>
        {['GF', 'F1', 'F2', 'F3'].map((fl) => (
          <button
            key={fl}
            onClick={() => setActiveFloor(fl)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeFloor === fl
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {fl}
          </button>
        ))}
      </div>

      {/* Active Route Drawer Panel */}
      {activeRouteInfo && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm w-full bg-white p-4 rounded-xl border border-slate-200 shadow-lg animate-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant={activeRouteInfo.accessible ? 'success' : 'info'} size="sm">
                {activeRouteInfo.accessible ? 'Accessible Route' : 'Fastest Path'}
              </Badge>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{activeRouteInfo.destinationName}</h4>
            </div>
            <button
              onClick={() => onSelectDestination(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear Route
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Footprints className="w-4 h-4 text-blue-600" />
              <span><strong>{activeRouteInfo.distanceMeters}m</strong> Distance</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span><strong>~{activeRouteInfo.durationMins} mins</strong> Walk</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
