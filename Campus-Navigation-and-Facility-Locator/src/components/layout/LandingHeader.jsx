import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-700 transition-colors">
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">WayFindYou</span>
        </NavLink>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 transition-colors">
            How It Works
          </button>
          <button onClick={() => scrollToSection('facilities')} className="hover:text-blue-600 transition-colors">
            Facilities
          </button>
          <button onClick={() => scrollToSection('accessibility')} className="hover:text-blue-600 transition-colors">
            Accessibility
          </button>
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </NavLink>
          <NavLink to="/home">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Explore WayFindYou
            </Button>
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('facilities')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Facilities
          </button>
          <button
            onClick={() => scrollToSection('accessibility')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Accessibility
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <NavLink to="/login" className="w-full">
              <Button variant="outline" size="md" fullWidth>
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/home" className="w-full">
              <Button variant="primary" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Explore WayFindYou
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">WayFindYou</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Campus Navigation and Facility Management Portal for modern academic institutions, students, faculty, and visitors.
            </p>
            <p className="text-[11px] text-slate-400">
              Tagline: <em>"Find your way. Find your campus."</em>
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><NavLink to="/home" className="hover:text-white transition-colors">Campus Dashboard</NavLink></li>
              <li><NavLink to="/map" className="hover:text-white transition-colors">Interactive Campus Map</NavLink></li>
              <li><NavLink to="/classrooms" className="hover:text-white transition-colors">Classroom Finder</NavLink></li>
              <li><NavLink to="/facilities" className="hover:text-white transition-colors">Facility Locator</NavLink></li>
              <li><NavLink to="/voice-navigation" className="hover:text-white transition-colors">Voice Navigation</NavLink></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Campus Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li><NavLink to="/notices" className="hover:text-white transition-colors">Notices & Alerts</NavLink></li>
              <li><NavLink to="/complaints" className="hover:text-white transition-colors">Report Issue / Maintenance</NavLink></li>
              <li><NavLink to="/visitors" className="hover:text-white transition-colors">Visitor Pass Portal</NavLink></li>
              <li><NavLink to="/emergency" className="hover:text-white transition-colors text-red-400 font-medium">Emergency SOS Alert</NavLink></li>
              <li><NavLink to="/login" className="hover:text-white transition-colors">Staff & Faculty Portal</NavLink></li>
            </ul>
          </div>

          {/* Col 4: Legal & Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal & Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#accessibility" className="hover:text-white transition-colors">Accessibility Statement</a></li>
              <li><span className="text-slate-400">Support: support@wayfindyou.campus.edu</span></li>
              <li><span className="text-slate-400">Campus Security: +1 (800) 555-SAFE</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} WayFindYou Inc. All rights reserved.</p>
          <p>Built for production-grade smart campus management.</p>
        </div>
      </div>
    </footer>
  );
};
