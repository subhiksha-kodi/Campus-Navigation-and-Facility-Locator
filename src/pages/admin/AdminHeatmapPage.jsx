import React, { useState } from 'react';
import { Activity, Flame, Layers, Clock, Building2, Filter, AlertCircle } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminHeatmapPage = () => {
  const [selectedDay, setSelectedDay] = useState('Live Sensor');
  const [hoveredCell, setHoveredCell] = useState(null);
  const [colorScheme, setColorScheme] = useState('rocket'); // 'rocket' (Seaborn default) or 'viridis'

  // Columns: Campus Locations
  const buildings = [
    'Sunflower Block',
    'Mechanical Block',
    'AS Block',
    'IB Block',
    'Main Library',
    'Campus Cafeteria'
  ];

  // Rows: Time Slots
  const timeSlots = [
    '08:00 AM',
    '10:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM'
  ];

  // Seaborn Matrix Data: Occupancy % (2D Matrix: Rows x Columns)
  const heatmapMatrix = {
    'Live Sensor': [
      [24, 45, 62, 18, 30, 15], // 08:00 AM
      [88, 72, 94, 65, 42, 35], // 10:00 AM (Peak morning)
      [75, 68, 89, 78, 55, 96], // 12:00 PM (Lunch rush in cafeteria)
      [82, 79, 91, 84, 60, 48], // 02:00 PM (Afternoon classes)
      [45, 52, 60, 40, 78, 25], // 04:00 PM (Library study peak)
      [12, 18, 22, 15, 45, 10]  // 06:00 PM (Evening cooldown)
    ],
    'Monday': [
      [30, 50, 70, 20, 25, 20],
      [92, 80, 96, 70, 50, 40],
      [80, 75, 88, 82, 60, 98],
      [85, 82, 90, 86, 65, 50],
      [50, 55, 65, 45, 80, 30],
      [15, 20, 25, 18, 50, 12]
    ],
    'Wednesday': [
      [20, 40, 55, 15, 35, 10],
      [85, 68, 90, 60, 40, 30],
      [70, 65, 85, 75, 50, 92],
      [78, 72, 88, 80, 55, 42],
      [40, 48, 58, 38, 72, 22],
      [10, 15, 20, 12, 40, 8]
    ]
  };

  const currentData = heatmapMatrix[selectedDay] || heatmapMatrix['Live Sensor'];

  // Seaborn Color Mapping Functions
  const getCellColor = (val) => {
    if (colorScheme === 'rocket') {
      // Seaborn 'rocket' palette: Dark navy -> Teal -> Amber -> Vivid Red
      if (val < 30) return { bg: '#0f172a', text: '#94a3b8', border: 'rgba(226,232,240,0.62)', label: 'Low' };
      if (val < 55) return { bg: '#0d9488', text: '#ffffff', border: 'rgba(226,232,240,0.62)', label: 'Moderate' };
      if (val < 75) return { bg: '#d97706', text: '#ffffff', border: 'rgba(226,232,240,0.62)', label: 'Busy' };
      if (val < 90) return { bg: '#ea580c', text: '#ffffff', border: 'rgba(226,232,240,0.62)', label: 'High' };
      return { bg: '#dc2626', text: '#ffffff', border: 'rgba(226,232,240,0.62)', label: 'PEAK' };
    } else {
      // Seaborn 'viridis' palette: Deep Purple -> Blue -> Green -> Bright Yellow
      if (val < 30) return { bg: '#440154', text: '#e2e8f0', border: 'rgba(226,232,240,0.62)', label: 'Low' };
      if (val < 55) return { bg: '#31688e', text: '#ffffff', border: 'rgba(226,232,240,0.62)', label: 'Moderate' };
      if (val < 75) return { bg: '#35b779', text: '#0f172a', border: 'rgba(226,232,240,0.62)', label: 'Busy' };
      return { bg: '#fde725', text: '#0f172a', border: 'rgba(226,232,240,0.62)', label: 'PEAK' };
    }
  };

  // Calculate Matrix Summary Statistics
  let maxVal = 0;
  let maxLoc = '';
  let maxTime = '';
  let sum = 0;
  let count = 0;

  currentData.forEach((row, rIdx) => {
    row.forEach((val, cIdx) => {
      sum += val;
      count++;
      if (val > maxVal) {
        maxVal = val;
        maxTime = timeSlots[rIdx];
        maxLoc = buildings[cIdx];
      }
    });
  });

  const avgOccupancy = Math.round(sum / count);

  return (
    <AdminLayout>
      <PageHeader
        title="Campus Occupancy & Heatmap Matrix"
        description="Python Seaborn (sns.heatmap) style matrix visualization for analyzing building density, hourly student distribution, and peak capacity zones."
        breadcrumbs={[{ label: 'Campus Heatmap' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={colorScheme === 'rocket' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setColorScheme('rocket')}
              className={colorScheme === 'rocket' ? '!bg-rose-600 !text-white' : ''}
            >
              sns.heatmap("rocket")
            </Button>
            <Button
              variant={colorScheme === 'viridis' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setColorScheme('viridis')}
              className={colorScheme === 'viridis' ? '!bg-emerald-600 !text-white' : ''}
            >
              sns.heatmap("viridis")
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* TOP SUMMARY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-slate-900 text-white border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campus Avg Occupancy</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black mt-1 text-emerald-400">{avgOccupancy}%</h3>
            <p className="text-[11px] text-slate-400 mt-1">Normal Operating Load</p>
          </Card>

          <Card className="p-4 bg-slate-900 text-white border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highest Peak Zone</span>
              <Flame className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="text-xl font-black mt-1 text-red-400">{maxLoc}</h3>
            <p className="text-[11px] text-slate-400 mt-1">{maxVal}% Density at {maxTime}</p>
          </Card>

          <Card className="p-4 bg-slate-900 text-white border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peak Hour Window</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-xl font-black mt-1 text-amber-400">10:00 AM - 02:00 PM</h3>
            <p className="text-[11px] text-slate-400 mt-1">Maximum Lecture Concurrency</p>
          </Card>

          <Card className="p-4 bg-slate-900 text-white border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Monitoring Nodes</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-3xl font-black mt-1 text-blue-400">36 Sensors</h3>
            <p className="text-[11px] text-slate-400 mt-1">Real-time telemetry feed</p>
          </Card>
        </div>

        {/* SEABORN HEATMAP CONTAINER */}
        <Card className="p-6 bg-slate-950 border-slate-800 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-black text-white">Seaborn Heatmap Density Matrix (annot=True)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Density matrix mapping Time Slots (Y-axis) vs Campus Locations (X-axis)
              </p>
            </div>

            {/* DAY SELECTOR FILTER */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-bold">Filter Day:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {['Live Sensor', 'Monday', 'Wednesday'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      selectedDay === d ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* THE MATRIX GRID */}
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[700px]">
              {/* X-AXIS HEADERS (BUILDINGS) */}
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-300">
                <div className="py-2 text-left text-slate-500 font-mono text-[10px]">TIME \ LOCATION</div>
                {buildings.map((b) => (
                  <div key={b} className="py-2 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-center gap-1 px-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{b}</span>
                  </div>
                ))}
              </div>

              {/* ROWS (TIME SLOTS) */}
              {timeSlots.map((time, rIdx) => (
                <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                  {/* Y-AXIS HEADER (TIME SLOT) */}
                  <div className="flex items-center px-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono font-bold text-amber-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                    {time}
                  </div>

                  {/* CELL MATRIX VALUES */}
                  {buildings.map((bld, cIdx) => {
                    const val = currentData[rIdx][cIdx];
                    const style = getCellColor(val);

                    return (
                      <div
                        key={cIdx}
                        onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx, val, bld, time, label: style.label })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{ backgroundColor: style.bg, borderColor: style.border, outline: 'none', boxShadow: 'none' }}
                        className="h-16 rounded-xl border border-solid flex flex-col items-center justify-center p-2 cursor-pointer transition-all hover:scale-105 hover:z-20 group relative"
                      >
                        <span className="text-lg font-black tracking-tight" style={{ color: style.text }}>
                          {val}%
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-80" style={{ color: style.text }}>
                          {style.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* SEABORN CONTINUOUS COLOR BAR LEGEND (cbar=True) */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>sns.heatmap Color Scale (0% → 100% Capacity)</span>
              <span>Seaborn Density Index</span>
            </div>

            <div className="w-full h-4 rounded-full overflow-hidden shadow-inner flex" style={{ background: colorScheme === 'rocket' ? 'linear-gradient(to right, #0f172a, #0d9488, #d97706, #ea580c, #dc2626)' : 'linear-gradient(to right, #440154, #31688e, #35b779, #fde725)' }}>
            </div>

            <div className="flex justify-between text-[11px] font-mono text-slate-400 font-semibold pt-0.5">
              <span>0% (Empty)</span>
              <span>25% (Low)</span>
              <span>50% (Moderate)</span>
              <span>75% (High Crowd)</span>
              <span>100% (Peak Max)</span>
            </div>
          </div>

          {/* INSPECTOR HOVER PANEL */}
          {hoveredCell ? (
            <div className="mt-6 p-4 bg-slate-900 rounded-2xl border border-amber-500/40 text-xs flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base border border-amber-500/30">
                  {hoveredCell.val}%
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">{hoveredCell.bld} at {hoveredCell.time}</h4>
                  <p className="text-slate-400">Status: <strong className="text-amber-400">{hoveredCell.label} Density Zone</strong> • Active telemetry feed</p>
                </div>
              </div>
              <Badge variant="navy" size="sm" className="!bg-slate-800 !text-slate-300 font-mono">
                Telemetry ID: SN-{(hoveredCell.row + 1) * 10 + (hoveredCell.col + 1)}
              </Badge>
            </div>
          ) : (
            <div className="mt-6 p-3 bg-slate-900/50 rounded-xl border border-slate-800/80 text-xs text-slate-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-400" />
              Hover over any cell in the heatmap matrix to view real-time telemetry and building density inspection details.
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};
