import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  Map,
  Building2,
  Bell,
  ArrowRight,
  Accessibility,
  CheckCircle2,
  Mic,
  ShieldCheck,
  Smartphone,
  Layers,
  MapPin,
  Clock,
  Printer,
  Wifi,
  Car,
  HeartPulse,
  CreditCard,
  Coffee,
  Bus
} from 'lucide-react';
import { LandingHeader, LandingFooter } from '../components/layout/LandingHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CampusMap, CAMPUS_LOCATIONS } from '../components/navigation/CampusMap';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedDemoLoc, setSelectedDemoLoc] = useState(CAMPUS_LOCATIONS[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="info" size="md">
                Smart Campus Platform v1.0
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Find Your Way. <br />
                <span className="text-blue-600">Find Your Campus.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Navigate classrooms, discover facilities, stay informed, and move through campus with confidence — all from one simple platform.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate('/home')}
                >
                  Explore WayFindYou
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See How It Works
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-Time Routes</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Stair-Free Navigation</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live Facility Status</span>
                </div>
              </div>
            </div>

            {/* Right Realistic Campus Map Preview */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl border border-slate-800 relative">
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-white">Live Campus Interactive Map</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Computer Science & Main Quad</span>
                </div>

                <CampusMap
                  height="h-[420px]"
                  selectedDestination={selectedDemoLoc}
                  onSelectDestination={(loc) => setSelectedDemoLoc(loc)}
                  showControls={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Quick Value Section */}
      <section id="features" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Designed for Campus Efficiency
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything students, faculty, visitors, and campus staff need to move smoothly across facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                title: 'Find Any Classroom',
                desc: 'Locate CS303, lecture halls, and laboratories instantly with exact building and floor breakdown.'
              },
              {
                icon: Building2,
                title: 'Locate Campus Facilities',
                desc: 'Check live open hours for libraries, cafeterias, printers, ATMs, and medical centers.'
              },
              {
                icon: Map,
                title: 'Navigate Smarter',
                desc: 'Turn-by-turn walking instructions with stair-free options for accessible campus routing.'
              },
              {
                icon: Bell,
                title: 'Stay Connected',
                desc: 'Receive immediate campus notifications, timetable updates, and security emergency alerts.'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-card hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 font-bold">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{benefit.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Everything You Need Around Campus */}
      <section id="facilities" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Everything You Need Around Campus
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Instant locator and status tracking for key amenities across all blocks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Classrooms & Labs', icon: Building2, count: '120+ Rooms' },
              { name: 'Central Library', icon: Layers, count: '3 Floors' },
              { name: 'Main Cafeteria', icon: Coffee, count: 'Open Now' },
              { name: 'Medical Centre', icon: HeartPulse, count: '24/7 Care' },
              { name: 'Campus Parking', icon: Car, count: '4 Zones' },
              { name: 'Wi-Fi Hotspots', icon: Wifi, count: 'High-Speed' },
              { name: 'Printers & Kiosks', icon: Printer, count: '14 Locations' },
              { name: 'ATMs & Banking', icon: CreditCard, count: '3 ATMs' },
              { name: 'Bus Stops', icon: Bus, count: 'Express Line' },
              { name: 'Lifts & Ramps', icon: Accessibility, count: '100% Covered' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100/60 text-blue-700 mx-auto flex items-center justify-center mb-2.5">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                <span className="text-[11px] text-slate-500 block mt-0.5">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How WayFindYou Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How WayFindYou Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Four simple steps to navigate anywhere on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Search', desc: 'Enter classroom code (e.g., CS303) or amenity name.' },
              { step: '02', title: 'Choose', desc: 'Select building, floor, or stair-free accessible route.' },
              { step: '03', title: 'Navigate', desc: 'Follow live turn-by-turn guidance and map polylines.' },
              { step: '04', title: 'Arrive', desc: 'Reach your destination quickly and on schedule.' },
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-card relative">
                <span className="text-3xl font-extrabold text-blue-600/30 block mb-2 font-mono">
                  {s.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Accessibility Section */}
      <section id="accessibility" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl text-white p-8 lg:p-12 shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="navy" size="md" className="bg-blue-600 text-white border-blue-500">
                  Built for Universal Inclusion
                </Badge>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Accessibility & Wheelchair Navigation First
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  WayFindYou guarantees that all students, guests, and staff — regardless of physical mobility — can travel with confidence.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Wheelchair-friendly routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Stairs-free route planner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Voice Navigation support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Screen-reader & high contrast</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Accessibility className="w-16 h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-16 lg:py-20 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your campus is easier to navigate with WayFindYou.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Start using the campus navigation portal today or test features as a student, faculty member, or visitor.
          </p>
          <div>
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/home')}>
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
