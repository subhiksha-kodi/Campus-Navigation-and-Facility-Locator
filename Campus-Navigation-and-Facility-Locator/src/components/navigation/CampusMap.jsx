import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  Layers,
  Accessibility,
  Compass,
  Info,
  Clock,
  Building,
  Footprints,
  ShieldCheck,
  ExternalLink,
  Search,
  X,
  Share2,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

import buildingsData from '../../data/buildings.json';
import { ibPolygon, asPolygon, sfPolygon, BUILDING_POLYGONS } from '../../data/ibPolygon';
import asGeojson from '../../data/as.json';
import sfGeojson from '../../data/sf.json';
import ibGeojson from '../../data/ib.json';
import auditoriumGeojson from '../../data/auditorium.json';
import cafeteriaGeojson from '../../data/cafeteria.json';
import mechGeojson from '../../data/mech.json';
import researchParkGeojson from '../../data/research_park.json';
import learningCentreGeojson from '../../data/learning_centre.json';
import boysHostelGeojson from '../../data/boys_hostel.json';
import vehicleParkingGeojson from '../../data/vehicle_parking.json';
import agriLandGeojson from '../../data/agri_land.json';
import medicalCentreGeojson from '../../data/medical_centre.json';
import powerHouseGeojson from '../../data/power_house.json';
import sbiAtmGeojson from '../../data/sbi_atm.json';
import tennisCourtGeojson from '../../data/tennis_court.json';
import parkingCGateGeojson from '../../data/parking_c_gate.json';
import civilStoreGeojson from '../../data/civil_store.json';
import ASBlockViewer from '../ASBlockViewer';
import girlsHostelGeojson from '../../data/girls_hostel.json';
import {
  BIT_CAMPUS_CENTER,
  CAMPUS_LOCATIONS,
  USER_START_LOCATION
} from '../../data/campusLocations';
import { computeRoadRoute } from '../../data/campusRoadNetwork';

export { BIT_CAMPUS_CENTER, CAMPUS_LOCATIONS, USER_START_LOCATION };

// Helper function to return custom building emoji icons
const getBuildingIconEmoji = (loc) => {
  const name = (loc.name || '').toLowerCase();
  const type = (loc.type || '').toLowerCase();
  const cat = (loc.category || '').toLowerCase();

  if (name.includes('ib block') || name.includes('as block') || name.includes('sf block')) return '🏫';
  if (name.includes('auditorium')) return '🎭';
  if (name.includes('hostel')) return '🏠';
  if (type.includes('medical') || cat.includes('medical')) return '🏥';
  if (type.includes('food') || cat.includes('dining') || name.includes('cafeteria')) return '🍴';
  if (type.includes('parking') || cat.includes('parking')) return '🚗';
  if (type.includes('atm') || cat.includes('atm')) return '🏧';
  if (type.includes('sports') || cat.includes('sports')) return name.includes('tennis') ? '🎾' : '⚽';
  if (name.includes('learning') || name.includes('library')) return '📚';
  if (name.includes('research')) return '🔬';
  if (name.includes('power')) return '⚡';
  if (name.includes('civil store')) return '🛠️';
  if (name.includes('garden') || name.includes('land')) return '🌿';
  if (type.includes('academic') || cat.includes('academic')) return '🏢';
  return '📍';
};

// Map Tile Providers
const TILE_LAYERS = {
  standard: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors | BIT Campus Navigation',
    name: 'Standard'
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO | BIT Night Navigation',
    name: 'Dark Mode'
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    name: 'Satellite'
  }
};

export const CampusMap = ({
  selectedDestination,
  onSelectDestination,
  height = 'h-[540px]',
  showControls = true
}) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const polygonsRef = useRef([]);
  const polylineRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [showModel, setShowModel] = useState(false);
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [activeFloor, setActiveFloor] = useState('GF');
  const [currentTileLayer, setCurrentTileLayer] = useState('standard');
  const [activeRouteInfo, setActiveRouteInfo] = useState(null);
  const [inspectedBuilding, setInspectedBuilding] = useState(null);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Initialize Leaflet Map centered on BIT Coordinates
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [11.500359, 77.275013],
      zoom: 17,
      zoomControl: false,
    });

    const tileLayer = L.tileLayer(TILE_LAYERS.standard.url, {
      maxZoom: 19,
      attribution: TILE_LAYERS.standard.attribution,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // User Current Location Pin with pulse animation
    const userDivIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
            🧭
          </div>
          <span class="absolute -bottom-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([USER_START_LOCATION.lat, USER_START_LOCATION.lng], { icon: userDivIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-1">
          <h4 class="font-bold text-xs text-emerald-700 flex items-center gap-1">📍 Start Position</h4>
          <p class="text-[11px] text-slate-600">${USER_START_LOCATION.name}</p>
        </div>
      `);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile Layer Switching
  const handleTileChange = (layerKey) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newTile = L.tileLayer(TILE_LAYERS[layerKey].url, {
      maxZoom: 19,
      attribution: TILE_LAYERS[layerKey].attribution,
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTile;
    setCurrentTileLayer(layerKey);
    addToast(`Switched map theme to ${TILE_LAYERS[layerKey].name}`, 'info');
  };

  // Update Markers & Professional Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers and polygons
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    polygonsRef.current.forEach((poly) => poly.remove());
    polygonsRef.current = [];

    // Phase 2: Render Polygons with interactive hover effects
    BUILDING_POLYGONS.forEach((bPoly) => {
      const polygon = L.polygon(bPoly.positions, {
        color: bPoly.color,
        fillColor: bPoly.fillColor,
        fillOpacity: 0.35,
        weight: 2.5,
      }).addTo(map);

      polygon.bindTooltip(`<b>${bPoly.name}</b>`, { permanent: false, direction: 'center' });

      polygon.on('mouseover', () => {
        polygon.setStyle({ fillOpacity: 0.65, weight: 4 });
      });

      polygon.on('mouseout', () => {
        polygon.setStyle({ fillOpacity: 0.35, weight: 2.5 });
      });

      polygon.on('click', () => {
        const fullLoc = buildingsData.find((b) => b.id === bPoly.id) || CAMPUS_LOCATIONS.find((l) => l.id === bPoly.id);
        if (fullLoc) {
          setInspectedBuilding(fullLoc);
          map.flyTo([fullLoc.lat, fullLoc.lng], 18, { animate: true, duration: 1.2 });
        }
      });

      polygonsRef.current.push(polygon);
    });

    // Render all GeoJSON polygon layers from uploaded block files
    try {
      // Helper: compute centroid of a polygon for flyTo
      const getPolygonCenter = (geojson) => {
        try {
          const coords = geojson.features[0]?.geometry?.coordinates[0] || [];
          if (coords.length === 0) return null;
          const lats = coords.map(c => c[1]);
          const lngs = coords.map(c => c[0]);
          return [
            (Math.min(...lats) + Math.max(...lats)) / 2,
            (Math.min(...lngs) + Math.max(...lngs)) / 2
          ];
        } catch { return null; }
      };

      // Helper: create & add a GeoJSON polygon layer to the map
      const createPolygonGeoJSONLayer = (geoData, blockCode, defaultName, defaultRoute, strokeColor, fillColor, emoji = '🏫') => {
        const center = getPolygonCenter(geoData);
        return L.geoJSON(geoData, {
          style: () => ({
            color: strokeColor,
            fillColor: fillColor,
            fillOpacity: 0.3,
            weight: 2.5,
            opacity: 1,
          }),
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.name || defaultName;
            layer.bindTooltip(
              `<div style="text-align:center;font-weight:bold;padding:2px 6px">${emoji} ${name}<br/><span style="font-size:10px;opacity:0.75">Click for details</span></div>`,
              { permanent: false, direction: 'center' }
            );
            layer.on('mouseover', () => layer.setStyle({ fillOpacity: 0.6, weight: 4 }));
            layer.on('mouseout',  () => layer.setStyle({ fillOpacity: 0.3, weight: 2.5 }));
            layer.on('click', () => {
              const loc =
                buildingsData.find((b) =>
                  b.code === blockCode ||
                  b.name.toLowerCase().includes(name.toLowerCase().replace(' block',''))
                ) || {
                  name: name,
                  code: blockCode,
                  type: 'Campus Facility',
                  description: `GeoJSON boundary for ${name}`,
                  hours: '08:00 AM - 06:30 PM',
                  status: 'Open',
                  accessible: true,
                  hasIndoorNavigation: false,
                  routePath: defaultRoute,
                  lat: center ? center[0] : 11.4965,
                  lng: center ? center[1] : 77.2775,
                };
              setInspectedBuilding(loc);
              if (center) map.flyTo(center, 19, { animate: true, duration: 1.2 });
            });
          }
        }).addTo(map);
      };

      // All campus GeoJSON polygon layers — [data, code, label, route, stroke, fill, emoji]
      const GEOJSON_LAYERS = [
        [asGeojson,           'AS-BLOCK',        'AS Block',             '/as-block',  '#0ea5e9', '#38bdf8', '🏫'],
        [sfGeojson,           'SF-BLOCK',        'SF Block',             '/sf-block',  '#a855f7', '#c084fc', '🏫'],
        [ibGeojson,           'IB-BLOCK',        'IB Block',             '/ib-block',  '#2563eb', '#60a5fa', '🏫'],
        [auditoriumGeojson,   'AUDITORIUM',      'Auditorium',           '/map',       '#f59e0b', '#fcd34d', '🎭'],
        [cafeteriaGeojson,    'CAFETERIA',       'Cafeteria',            '/map',       '#f97316', '#fdba74', '🍽️'],
        [mechGeojson,         'MECH-BLOCK',      'Mech Block',           '/map',       '#10b981', '#6ee7b7', '⚙️'],
        [researchParkGeojson, 'RESEARCH-PARK',   'Research Park',        '/map',       '#06b6d4', '#67e8f9', '🔬'],
        [learningCentreGeojson,'LEARNING-CENTRE','Learning Centre',      '/map',       '#8b5cf6', '#c4b5fd', '📚'],
        [boysHostelGeojson,   'BOYS-HOSTEL',     'Boys Hostel',          '/map',       '#ec4899', '#f9a8d4', '🏠'],
        [vehicleParkingGeojson,'VEHICLE-PARKING','Vehicle Parking',      '/map',       '#64748b', '#94a3b8', '🚗'],
        [agriLandGeojson,     'AGRI-LAND',       'Agri Land',            '/map',       '#22c55e', '#86efac', '🌿'],
        [medicalCentreGeojson,'MEDICAL-CENTRE',  'Medical Centre',       '/map',       '#ef4444', '#fca5a5', '🏥'],
        [powerHouseGeojson,   'POWER-HOUSE',     'Power House',          '/map',       '#eab308', '#fde047', '⚡'],
        [sbiAtmGeojson,       'SBI-ATM',         'SBI ATM',              '/map',       '#3b82f6', '#93c5fd', '🏧'],
        [tennisCourtGeojson,  'TENNIS-COURT',    'Tennis Court',         '/map',       '#84cc16', '#bef264', '🎾'],
        [parkingCGateGeojson, 'PARKING-C-GATE',  'Parking near C Gate',  '/map',       '#64748b', '#94a3b8', '🚗'],
        [civilStoreGeojson,   'CIVIL-STORE',     'Civil Store',          '/map',       '#78716c', '#d6d3d1', '🛠️'],
        [girlsHostelGeojson,  'GIRLS-HOSTEL',    'Girls Hostel',         '/map',       '#db2777', '#f472b6', '🏠'],
      ];

      GEOJSON_LAYERS.forEach(([data, code, label, route, stroke, fill, emoji]) => {
        try {
          const layer = createPolygonGeoJSONLayer(data, code, label, route, stroke, fill, emoji);
          polygonsRef.current.push(layer);
        } catch (layerErr) {
          console.warn(`GeoJSON layer failed for ${label}:`, layerErr);
        }
      });
    } catch (e) {
      console.warn('GeoJSON layer loading error:', e);
    }

    // Render Custom Emoji Markers from buildings.json
    const buildingsToDisplay = buildingsData.length > 0 ? buildingsData : CAMPUS_LOCATIONS;

    const filtered = buildingsToDisplay.filter((loc) => {
      if (activeCategory !== 'all' && loc.category !== activeCategory && loc.type !== activeCategory) return false;
      if (accessibleOnly && !loc.accessible) return false;
      return true;
    });

    filtered.forEach((loc) => {
      const emoji = getBuildingIconEmoji(loc);
      const isSelected = selectedDestination && (selectedDestination.id === loc.id || selectedDestination.name === loc.name);

      const customIcon = L.divIcon({
        className: 'custom-building-pin-wrapper',
        html: `
          <div class="flex flex-col items-center group cursor-pointer">
            <div class="w-9 h-9 rounded-2xl ${isSelected ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-xl' : 'bg-white text-slate-800 border-2 border-slate-200 shadow-md hover:scale-110 hover:border-blue-500'} flex items-center justify-center text-base font-bold transition-all">
              <span>${emoji}</span>
            </div>
            <div class="mt-1 px-1.5 py-0.5 bg-slate-900/85 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow-xs backdrop-blur-xs opacity-90 group-hover:opacity-100">
              ${loc.code || loc.name}
            </div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 25],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      // Marker click opens building inspection drawer and flies camera
      marker.on('click', () => {
        setInspectedBuilding(loc);
        map.flyTo([loc.lat, loc.lng], 18, { animate: true, duration: 1.2 });
      });

      markersRef.current[loc.id] = marker;
    });
  }, [activeCategory, accessibleOnly, selectedDestination, navigate]);

  // Draw Polyline Route if Destination is Selected (Following Campus Road Network)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (selectedDestination) {
      const targetLat = selectedDestination.lat;
      const targetLng = selectedDestination.lng;

      // Compute road-following route waypoints using campus road network graph
      const waypoints = computeRoadRoute(
        USER_START_LOCATION,
        { lat: targetLat, lng: targetLng }
      );

      const polyline = L.polyline(waypoints, {
        color: accessibleOnly ? '#059669' : '#2563eb',
        weight: 6,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: accessibleOnly ? '10, 10' : undefined
      }).addTo(map);

      polylineRef.current = polyline;

      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

      // Calculate total route distance following road segments
      let approxMeters = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        const dLat = Math.abs(waypoints[i][0] - waypoints[i + 1][0]);
        const dLng = Math.abs(waypoints[i][1] - waypoints[i + 1][1]);
        approxMeters += Math.round((dLat + dLng) * 111000);
      }

      const mins = Math.max(1, Math.round(approxMeters / 65));

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
    mapInstanceRef.current?.setView([11.500359, 77.275013], 17);
    setInspectedBuilding(null);
  };

  const mapSearchResults = buildingsData.filter((b) =>
    b.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
    (b.code && b.code.toLowerCase().includes(mapSearchQuery.toLowerCase()))
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
      {/* Map Control Header Top Bar */}
      {showControls && (
        <div className="p-3 bg-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Chips Bar with Custom Icons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-300 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Filter BIT:
            </span>
            {[
              { id: 'all', label: 'All 22 Locations', icon: '🌐' },
              { id: 'Academic', label: 'Academic Blocks', icon: '🏫' },
              { id: 'Hostel', label: 'Hostels', icon: '🏠' },
              { id: 'Dining', label: 'Cafeteria', icon: '🍴' },
              { id: 'ATM', label: 'ATMs', icon: '🏧' },
              { id: 'Medical', label: 'Medical Centre', icon: '🏥' },
              { id: 'Parking', label: 'Parking', icon: '🚗' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Map Layer Switcher & Stair-Free Route */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => handleTileChange('standard')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  currentTileLayer === 'standard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => handleTileChange('satellite')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  currentTileLayer === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => handleTileChange('dark')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  currentTileLayer === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Night
              </button>
            </div>

            <button
              onClick={() => setAccessibleOnly(!accessibleOnly)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                accessibleOnly
                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Accessibility className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stair-Free</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Live Search Overlay */}
      <div className="absolute top-16 left-4 z-20 max-w-xs w-full">
        <div className="relative">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-lg px-3 py-2 text-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search building (e.g. IB Block)..."
              value={mapSearchQuery}
              onChange={(e) => {
                setMapSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            {mapSearchQuery && (
              <button
                onClick={() => {
                  setMapSearchQuery('');
                  setShowSearchDropdown(false);
                }}
                className="text-slate-400 hover:text-slate-600 ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {showSearchDropdown && mapSearchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-h-56 overflow-y-auto z-30">
              {mapSearchResults.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 text-center">No building found</div>
              ) : (
                mapSearchResults.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setInspectedBuilding(loc);
                      setShowSearchDropdown(false);
                      setMapSearchQuery('');
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo([loc.lat, loc.lng], 18, { animate: true, duration: 1.2 });
                      }
                    }}
                    className="p-2.5 hover:bg-blue-50 border-b border-slate-100 last:border-0 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{getBuildingIconEmoji(loc)}</span>
                      <div>
                        <div className="font-bold text-slate-900">{loc.name}</div>
                        <div className="text-[10px] text-slate-500">{loc.type} • {loc.code}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Leaflet Map Target Container */}
      <div ref={mapRef} className={`w-full ${height} z-10`} />

      {/* Floating Control Buttons */}
      {showModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-11/12 h-3/4 relative">
            <button
              onClick={() => setShowModel(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>
            <ASBlockViewer />
          </div>
        </div>
      )}
      <div className="absolute top-16 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-lg"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-lg"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleRecenter}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 mt-1"
          title="Recenter Map"
        >
          <Compass className="w-4.5 h-4.5 text-blue-600" />
        </button>
      </div>

      {/* Floating Interactive Floor Switcher */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/90 text-white p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md text-xs font-medium">
        <span className="px-2 text-slate-400 font-bold text-[10px] uppercase tracking-wider">Floor:</span>
        {['GF', 'F1', 'F2', 'F3'].map((fl) => (
          <button
            key={fl}
            onClick={() => {
              setActiveFloor(fl);
              addToast(`Viewing Floor ${fl} Layout`, 'info');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeFloor === fl
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {fl}
          </button>
        ))}
      </div>

      {/* Interactive Building Inspection Drawer Sheet */}
      {inspectedBuilding && (
        <div className="absolute bottom-4 right-4 z-30 max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 animate-in slide-in-from-bottom-3 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shadow-xs">
                {getBuildingIconEmoji(inspectedBuilding)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md">
                    {inspectedBuilding.code || inspectedBuilding.type}
                  </span>
                  {(inspectedBuilding.isGeoJSON || inspectedBuilding.code === 'AS-BLOCK' || inspectedBuilding.code === 'SF-BLOCK') && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-300 rounded-md flex items-center gap-1 shadow-xs">
                      <span>📐</span> GeoJSON Active
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{inspectedBuilding.name}</h3>
              </div>
            </div>
            <button
              onClick={() => setInspectedBuilding(null)}
              className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {inspectedBuilding.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-semibold">Opening Hours</span>
              <span className="font-bold text-slate-800">{inspectedBuilding.hours}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-semibold">Current Status</span>
              <span className="font-bold text-emerald-600">{inspectedBuilding.status}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            {inspectedBuilding.hasIndoorNavigation && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-md"
                onClick={() => setShowModel(true)}
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> 3D Indoor Nav
              </Button>
            )}

            <Button
              variant={inspectedBuilding.hasIndoorNavigation ? 'outline' : 'primary'}
              size="sm"
              className="flex-1"
              onClick={() => {
                if (onSelectDestination) onSelectDestination(inspectedBuilding);
                addToast(`Route calculated for ${inspectedBuilding.name}`, 'success');
              }}
            >
              <Navigation className="w-4 h-4 mr-1.5" /> Directions
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + `/map?q=${encodeURIComponent(inspectedBuilding.name)}`);
                addToast(`Copied location link for ${inspectedBuilding.name}`, 'info');
              }}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Active Route Info Panel */}
      {activeRouteInfo && !inspectedBuilding && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm w-full bg-white p-4 rounded-xl border border-slate-200 shadow-xl animate-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant={activeRouteInfo.accessible ? 'success' : 'info'} size="sm">
                {activeRouteInfo.accessible ? 'Accessible Route' : 'Fastest Campus Path'}
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
