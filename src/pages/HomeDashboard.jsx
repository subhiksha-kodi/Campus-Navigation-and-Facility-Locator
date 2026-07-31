import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Map,
  Building2,
  Mic,
  MicOff,
  ArrowRight,
  Coffee,
  HeartPulse,
  Car,
  BookOpen,
  Bell,
  Clock,
  ShieldAlert,
  MapPin,
  Calendar,
  Plus,
  QrCode,
  LogOut,
  Check,
  XCircle,
  Info,
  CalendarDays,
  User,
  Settings,
  Mail,
  Lock,
  Phone,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CampusMap, CAMPUS_LOCATIONS } from '../components/navigation/CampusMap';
import { FacilityCard } from '../components/navigation/FacilityCard';
import { VoiceNavigationModal, mapVoiceQuery } from '../components/navigation/VoiceNavigationModal';
import { Input, Select } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { useRole } from '../context/RoleContext';
import { useToast } from '../context/ToastContext';

export const HomeDashboard = () => {
  const navigate = useNavigate();
  const { activeRole, switchRole, user } = useRole();
  const { addToast } = useToast();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const portalTab = searchParams.get('tab') || 'home';

  const setPortalTab = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const [selectedMapDestination, setSelectedMapDestination] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const [visitorProfile, setVisitorProfile] = useState(() => {
    const saved = localStorage.getItem('visitor_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Sarah Jenkins',
      email: 'sarah.j@gmail.com',
      phone: '+91 99001 98765',
      idType: 'driving_license',
      idNumber: 'PASS-88392',
    };
  });

  useEffect(() => {
    const saved = localStorage.getItem('visitor_profile');
    if (saved) {
      setVisitorProfile(JSON.parse(saved));
    }
  }, [activeRole]);

  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('visitor_visits');
    if (saved) return JSON.parse(saved);
    const defaults = [
      {
        id: 'VPASS-88392',
        host: 'Dr. Robert Chen (Computer Science Dept)',
        purpose: 'Guest Lecture on AI Ethics',
        date: '2026-07-31',
        time: '10:00 AM',
        status: 'approved',
        qrCode: 'VPASS-88392',
        timeline: [
          { status: 'Requested', timestamp: new Date(Date.now() - 3600000).toISOString(), note: 'Pass request submitted by visitor' },
          { status: 'Pending Approval', timestamp: new Date(Date.now() - 3000000).toISOString(), note: 'Awaiting host verification' },
          { status: 'Approved', timestamp: new Date(Date.now() - 600000).toISOString(), note: 'Host approved gate entry' }
        ]
      },
      {
        id: 'VPASS-10293',
        host: 'Dean of Admissions / Admin Office',
        purpose: 'Official Transcript Submission',
        date: '2026-08-02',
        time: '02:30 PM',
        status: 'pending',
        qrCode: 'VPASS-10293',
        timeline: [
          { status: 'Requested', timestamp: new Date(Date.now() - 7200000).toISOString(), note: 'Pass request submitted by visitor' },
          { status: 'Pending Approval', timestamp: new Date(Date.now() - 7100000).toISOString(), note: 'Awaiting host verification' }
        ]
      },
      {
        id: 'VPASS-44921',
        host: 'Finance & Student Accounts Desk',
        purpose: 'Fee Structure Inquiry',
        date: '2026-07-28',
        time: '11:15 AM',
        status: 'rejected',
        reason: 'Incorrect office hours selected.',
        qrCode: 'VPASS-44921',
        timeline: [
          { status: 'Requested', timestamp: new Date(Date.now() - 86400000).toISOString(), note: 'Pass request submitted by visitor' },
          { status: 'Pending Approval', timestamp: new Date(Date.now() - 86300000).toISOString(), note: 'Awaiting host verification' },
          { status: 'Rejected', timestamp: new Date(Date.now() - 86000000).toISOString(), note: 'Host rejected request. Reason: Incorrect office hours selected.' }
        ]
      }
    ];
    localStorage.setItem('visitor_visits', JSON.stringify(defaults));
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('visitor_visits', JSON.stringify(visits));
  }, [visits]);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('visitor_notifications');
    if (saved) return JSON.parse(saved);
    const defaults = [
      { id: '1', type: 'success', text: 'Your campus visit request for Dr. Robert Chen was APPROVED.', time: '10 mins ago', read: false, relatedRequestId: 'VPASS-88392' },
      { id: '2', type: 'error', text: 'Your campus visit request for Finance & Student Accounts Desk was REJECTED.', time: '2 hours ago', read: true, relatedRequestId: 'VPASS-44921' },
    ];
    localStorage.setItem('visitor_notifications', JSON.stringify(defaults));
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('visitor_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const announcements = [
    { id: 1, type: 'warning', text: 'Visitor Parking Area 3 is closed for repaving. Please use Parking Area 4 near the North Gate.', date: 'Today' },
    { id: 2, type: 'info', text: 'Main Quad is closed for Graduation Ceremony Prep from 1:00 PM to 4:00 PM.', date: 'Today' },
    { id: 3, type: 'info', text: 'Emergency drill scheduled for tomorrow at 10:00 AM. Please follow safety guidelines.', date: '1 day ago' },
  ];

  const [requestHost, setRequestHost] = useState('dr-chen');
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestDate, setRequestDate] = useState('2026-07-31');
  const [requestTime, setRequestTime] = useState('10:00');

  const [selectedPassForQR, setSelectedPassForQR] = useState(null);

  const [selectedGuideLoc, setSelectedGuideLoc] = useState(CAMPUS_LOCATIONS[0]);
  
  // Voice navigation tab state hooks
  const [voiceTabListening, setVoiceTabListening] = useState(false);
  const [voiceTabTranscript, setVoiceTabTranscript] = useState('');
  const [voiceTabMapped, setVoiceTabMapped] = useState(null);
  const [voiceTabLang, setVoiceTabLang] = useState('en-US');
  const [voiceTabStatus, setVoiceTabStatus] = useState('Tap the microphone and say a destination.');

  useEffect(() => {
    if (voiceTabLang === 'ta-IN') {
      setVoiceTabStatus('மைக்ரோஃபோனைத் தட்டி பேசவும் (உதாரணமாக: உணவகம், நூலகம், பார்க்கிங்).');
    } else {
      setVoiceTabStatus('Tap the microphone and say a destination (e.g. Cafeteria, Library, Parking).');
    }
  }, [voiceTabLang]);

  const toggleVoiceTabListening = () => {
    if (voiceTabListening) {
      setVoiceTabListening(false);
      setVoiceTabStatus(voiceTabLang === 'ta-IN' ? 'கேட்பது நிறுத்தப்பட்டது.' : 'Listening stopped. Tap microphone to try again.');
      return;
    }

    setVoiceTabTranscript('');
    setVoiceTabMapped(null);
    setVoiceTabListening(true);
    setVoiceTabStatus(voiceTabLang === 'ta-IN' ? 'கேட்கிறது... பேசவும்...' : 'Listening... Speak your destination clearly');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = voiceTabLang;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setVoiceTabTranscript(text);
        
        const mapped = mapVoiceQuery(text);
        setVoiceTabMapped(mapped);
        
        setVoiceTabListening(false);
        setVoiceTabStatus(voiceTabLang === 'ta-IN' ? `நீங்கள் சொன்னது: "${mapped.displayName}"` : `You said: "${mapped.displayName}"`);
      };

      recognition.onerror = () => {
        setVoiceTabListening(false);
        setVoiceTabStatus(voiceTabLang === 'ta-IN' ? 'குரலை அடையாளம் காண முடியவில்லை. மீண்டும் முயற்சிக்கவும்.' : 'Could not recognize voice input. Please try again.');
      };

      recognition.onend = () => {
        setVoiceTabListening(false);
      };

      recognition.start();
    } else {
      // Mock Simulation for test environments
      setTimeout(() => {
        let textResult = 'Main Cafeteria';
        if (voiceTabLang === 'ta-IN') {
          textResult = 'உணவகம் எங்கே இருக்கிறது?';
        }
        
        setVoiceTabTranscript(textResult);
        const mapped = mapVoiceQuery(textResult);
        setVoiceTabMapped(mapped);
        
        setVoiceTabListening(false);
        setVoiceTabStatus(voiceTabLang === 'ta-IN' ? `நீங்கள் சொன்னது: "${mapped.displayName}"` : `You said: "${mapped.displayName}"`);
      }, 2000);
    }
  };
  const [guideCategory, setGuideCategory] = useState('all');
  const [guideSearchQuery, setGuideSearchQuery] = useState('');

  const HOSTS = [
    { value: 'dr-chen', label: 'Dr. Robert Chen (Computer Science Dept)' },
    { value: 'prof-vance', label: 'Prof. Eleanor Vance (Electronics Dept)' },
    { value: 'dr-smith', label: 'Dr. John Smith (Chemistry Dept)' },
    { value: 'admin-office', label: 'Dean of Admissions / Admin Office' },
    { value: 'finance-desk', label: 'Finance & Student Accounts Desk' },
  ];

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${requestDate}T${requestTime}`);
    if (selectedDateTime < new Date() && requestDate !== '2026-07-31') {
      addToast('Cannot request a visit pass in the past.', 'error');
      return;
    }

    const hostLabel = HOSTS.find(h => h.value === requestHost)?.label || requestHost;
    
    let formattedTime = requestTime;
    try {
      const [hours, minutes] = requestTime.split(':');
      const hourNum = parseInt(hours, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const adjustedHour = hourNum % 12 || 12;
      formattedTime = `${adjustedHour}:${minutes} ${ampm}`;
    } catch (err) {}

    const newId = `VPASS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newVisit = {
      id: newId,
      host: hostLabel,
      purpose: requestPurpose,
      date: requestDate,
      time: formattedTime,
      status: 'pending',
      qrCode: newId,
      timeline: [
        { status: 'Requested', timestamp: new Date().toISOString(), note: 'Pass request submitted by visitor' },
        { status: 'Pending Approval', timestamp: new Date().toISOString(), note: 'Awaiting host verification' }
      ]
    };

    setVisits([newVisit, ...visits]);
    addToast('Campus visit request submitted! Awaiting host approval.', 'info');
    setRequestPurpose('');
    setPortalTab('passes');
  };

  const handleCancelRequest = (passId) => {
    setVisits(currentVisits => {
      return currentVisits.map(v => {
        if (v.id === passId) {
          return {
            ...v,
            status: 'rejected',
            reason: 'Cancelled by visitor.',
            timeline: [
              ...v.timeline,
              { status: 'Cancelled', timestamp: new Date().toISOString(), note: 'Pass request cancelled by the guest.' }
            ]
          };
        }
        return v;
      });
    });
    addToast('Visit request cancelled.', 'warning');
  };

  const handleSimulateDecision = (passId, approve) => {
    setVisits(currentVisits => {
      return currentVisits.map(v => {
        if (v.id === passId) {
          const status = approve ? 'approved' : 'rejected';
          const reason = approve ? null : 'Host is unavailable during this time slot.';
          const note = approve ? 'Host approved gate entry' : 'Host rejected request. Reason: Host is unavailable during this time slot.';
          
          const newNotif = {
            id: Date.now().toString(),
            type: approve ? 'success' : 'error',
            text: `Your campus visit request for ${v.host} was ${status.toUpperCase()}.`,
            time: 'Just now',
            read: false,
            relatedRequestId: v.id
          };
          setNotifications(prev => [newNotif, ...prev]);
          addToast(`Simulated decision: Visit request has been ${status.toUpperCase()}.`, approve ? 'success' : 'error');

          return {
            ...v,
            status,
            reason,
            timeline: [
              ...v.timeline,
              { status: approve ? 'Approved' : 'Rejected', timestamp: new Date().toISOString(), note }
            ]
          };
        }
        return v;
      });
    });
  };

  const handleToggleNotificationRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: !n.read } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All alerts marked as read.', 'success');
  };

  const handleNotificationClick = (notif) => {
    handleToggleNotificationRead(notif.id);
    if (notif.relatedRequestId) {
      setPortalTab('passes');
      const pass = visits.find(v => v.id === notif.relatedRequestId);
      if (pass && pass.status === 'approved') {
        setSelectedPassForQR(pass);
      }
    }
  };

  const filteredGuideLocations = CAMPUS_LOCATIONS.filter((loc) => {
    const matchesCategory =
      guideCategory === 'all' ||
      (guideCategory === 'academic' && loc.category === 'academic') ||
      (guideCategory === 'amenities' && loc.category === 'amenities') ||
      (guideCategory === 'parking' && loc.category === 'parking') ||
      (guideCategory === 'emergency' && loc.category === 'emergency');

    const matchesSearch =
      loc.name.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
      loc.code.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
      (loc.description && loc.description.toLowerCase().includes(guideSearchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const pendingCount = visits.filter(v => v.status === 'pending').length;
  const approvedCount = visits.filter(v => v.status === 'approved').length;
  const rejectedCount = visits.filter(v => v.status === 'rejected' && v.reason !== 'Cancelled by visitor.').length;

  const activeApprovedPass = visits.find(v => v.status === 'approved');

  const quickActions = [
    { label: 'Find Classroom', icon: Search, path: '/classrooms', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Campus Map', icon: Map, path: '/map', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Facilities', icon: Building2, path: '/facilities', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Voice Navigation', icon: Mic, action: () => setVoiceModalOpen(true), color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  const nearbyFacilities = [
    {
      id: 1,
      name: 'Central Library',
      locationName: 'Academic Quad (3rd Floor)',
      status: 'Open',
      walkTime: '2 min',
      category: 'Quiet Study & Books',
      hours: '07:00 AM - 10:00 PM',
      icon: BookOpen,
    },
    {
      id: 2,
      name: 'Main Cafeteria',
      locationName: 'Student Centre Block',
      status: 'Open',
      walkTime: '3 min',
      category: 'Food & Beverage',
      hours: '07:30 AM - 09:00 PM',
      icon: Coffee,
    },
    {
      id: 3,
      name: 'Medical Centre',
      locationName: 'Health & Wellness Wing',
      status: 'Open 24/7',
      walkTime: '4 min',
      category: 'Urgent Care & Clinic',
      hours: '24 Hours',
      icon: HeartPulse,
    },
    {
      id: 4,
      name: 'Main Parking Lot B',
      locationName: 'North Gate Entrance',
      status: 'Available',
      walkTime: '5 min',
      category: 'Vehicle Parking',
      hours: 'Open 24/7',
      icon: Car,
    },
  ];

  const campusUpdates = [
    {
      id: 1,
      title: 'Lab CS303 Projector Maintenance Complete',
      time: '2 hours ago',
      category: 'Facilities',
      urgent: false,
    },
    {
      id: 2,
      title: 'Bus Shuttle Route #2 Minor Delay (15 min)',
      time: '3 hours ago',
      category: 'Transit',
      urgent: true,
    },
    {
      id: 3,
      title: 'Annual Campus Science Symposium Schedule',
      time: '1 day ago',
      category: 'Events',
      urgent: false,
    },
  ];

  const handleGlobalSearch = (query) => {
    if (!query) return;
    addToast(`Searching for "${query}" across campus...`, 'info');
    if (query.toLowerCase().includes('cs') || query.toLowerCase().includes('room')) {
      navigate(`/classrooms?q=${encodeURIComponent(query)}`);
    } else {
      navigate(`/facilities?q=${encodeURIComponent(query)}`);
    }
  };

  if (activeRole === 'visitor') {
    return (
      <AppLayout>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-8 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="info" size="sm" className="bg-teal-50 text-teal-700 border-teal-200">
                  Active Pass Count: {approvedCount}
                </Badge>
                <span className="text-xs text-slate-455 font-medium">• Guest ID: {visitorProfile.idNumber}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">Good morning, {visitorProfile.name}</h1>
              <p className="text-xs text-slate-550">Welcome to campus operations. Use the tabs below to organize your visits and explore buildings.</p>
            </div>
            
            <div className="flex border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 pl-0 md:pl-6 shrink-0 gap-6 text-center">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Campus Weather</span>
                <span className="text-sm font-bold text-slate-900">24°C Sunny</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">Active Shuttles</span>
                <span className="text-sm font-bold text-teal-600">3 Vehicles</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-3 gap-3">
            <div className="bg-amber-50/50 border border-amber-250 rounded-xl p-3 text-center flex flex-col justify-center shadow-subtle">
              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">Pending</span>
              <span className="text-xl font-black text-amber-900 mt-1">{pendingCount}</span>
            </div>
            <div className="bg-teal-50/50 border border-teal-250 rounded-xl p-3 text-center flex flex-col justify-center shadow-subtle">
              <span className="text-[9px] font-bold text-teal-700 uppercase tracking-wider">Approved</span>
              <span className="text-xl font-black text-teal-950 mt-1">{approvedCount}</span>
            </div>
            <div className="bg-rose-50/50 border border-rose-255 rounded-xl p-3 text-center flex flex-col justify-center shadow-subtle">
              <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider">Rejected</span>
              <span className="text-xl font-black text-rose-955 mt-1">{rejectedCount}</span>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-white p-1 border border-slate-200 rounded-xl shadow-subtle">
          <Tabs
            activeTab={portalTab}
            onChange={(tabId) => setPortalTab(tabId)}
            tabs={[
              { id: 'home', label: 'Guest Dashboard', icon: User },
              { id: 'request', label: 'Request Visit Pass', icon: Plus },
              { id: 'passes', label: 'My Passes & History', icon: QrCode, badge: visits.length },
              { id: 'guide', label: 'Campus Map & Guide', icon: Map },
              { id: 'alerts', label: 'Notifications & Safety', icon: Bell, badge: notifications.filter(n => !n.read).length },
              { id: 'voice', label: 'Voice Assistant', icon: Mic },
            ]}
            variant="underline"
          />
        </div>

        <div className="space-y-6">
          
          {portalTab === 'home' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                {activeApprovedPass ? (
                  <Card className="bg-slate-900 text-white text-center p-6 border-slate-800 relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-600/10 rounded-full blur-xl"></div>
                    <CardContent className="space-y-4 p-0">
                      <Badge variant="navy" size="md" className="bg-teal-650 text-white border-teal-500">
                        Approved Gate Entry Pass
                      </Badge>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold">Visitor: {visitorProfile.name}</h3>
                        <p className="text-xs text-slate-455 truncate">{activeApprovedPass.host}</p>
                      </div>
                      
                      <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center border-4 border-slate-700 cursor-pointer shadow-md" onClick={() => setSelectedPassForQR(activeApprovedPass)} aria-label="Open larger QR Gate Pass">
                        <QrCode className="w-36 h-36 text-slate-900" />
                      </div>
                      
                      <div className="text-xs space-y-1">
                        <p className="text-slate-400 font-semibold">Pass Code: <strong>{activeApprovedPass.id}</strong></p>
                        <p className="text-[11px] text-slate-400">Date: {activeApprovedPass.date} • {activeApprovedPass.time}</p>
                        <p className="text-[10px] text-teal-400 font-medium italic pt-1">Click QR code to enlarge for scanners</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-slate-50 border-slate-200 border-dashed p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <QrCode className="w-12 h-12 text-slate-355 mb-3" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">No Active Entry Pass</h4>
                    <p className="text-xs text-slate-450 mt-1 max-w-xs mx-auto">
                      You currently do not have an approved visit pass for today. Submit a visit request to get a QR code entry pass.
                    </p>
                    <Button variant="outline" size="sm" icon={Plus} className="mt-4" onClick={() => setPortalTab('request')}>
                      Request Pass
                    </Button>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setPortalTab('request')}
                    className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-blue-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                    aria-label="Navigate to request visit form"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">Request Pass</span>
                  </button>
                  
                  <button
                    onClick={() => setPortalTab('guide')}
                    className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-teal-350 hover:shadow-card transition-all text-center flex flex-col items-center group"
                    aria-label="Navigate to campus map guide"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Map className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">Campus Guide</span>
                  </button>

                  <button
                    onClick={() => setPortalTab('alerts')}
                    className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-blue-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                    aria-label="Navigate to notifications"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Bell className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">Notifications</span>
                  </button>

                  <button
                    onClick={() => setVoiceModalOpen(true)}
                    className="bg-white border border-slate-200 p-4 rounded-xl shadow-subtle hover:border-amber-300 hover:shadow-card transition-all text-center flex flex-col items-center group"
                    aria-label="Open voice navigation guide"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Mic className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">Voice Guide</span>
                  </button>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <CardTitle>Important Announcements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3.5 text-xs">
                    {announcements.map((ann) => (
                      <div key={ann.id} className={`p-3 rounded-lg border flex gap-2.5 ${
                        ann.type === 'warning'
                          ? 'bg-amber-50/40 border-amber-200 text-amber-900'
                          : 'bg-blue-50/40 border-blue-200 text-blue-900'
                      }`}>
                        {ann.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                        <div>
                          <p className="text-[11px] font-medium leading-relaxed">{ann.text}</p>
                          <span className="text-[9px] text-slate-450 block mt-1">{ann.date}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={LogOut}
                    onClick={() => {
                      localStorage.removeItem('visitor_profile');
                      localStorage.removeItem('visitor_visits');
                      localStorage.removeItem('visitor_notifications');
                      switchRole('student');
                      addToast('Logged out successfully. Visitor session cleared.', 'info');
                    }}
                  >
                    Clear Guest Session & Exit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {portalTab === 'request' && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-md border border-slate-200">
                <CardHeader className="border-b border-slate-100 pb-3">
                  <CardTitle>Request Campus Visit Pass</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5 text-[11px] font-bold text-slate-400">
                    <div className="flex items-center gap-2 text-teal-600">
                      <span className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center border border-teal-200 font-bold">1</span>
                      <span>Visitor Profile</span>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2"></div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200 font-bold">2</span>
                      <span>Host & Purpose</span>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2"></div>
                    <div className="flex items-center gap-2 text-slate-450">
                      <span className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 font-bold">3</span>
                      <span>Schedule Time</span>
                    </div>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1 text-xs">
                      <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-1.5 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                        Step 1: Verified Visitor Profile
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div><strong className="text-slate-900 font-bold">Name:</strong> {visitorProfile.name}</div>
                        <div><strong className="text-slate-900 font-bold">Email:</strong> {visitorProfile.email}</div>
                        <div><strong className="text-slate-900 font-bold">ID Document:</strong> {visitorProfile.idType.toUpperCase()} ({visitorProfile.idNumber})</div>
                        <div><strong className="text-slate-900 font-bold">Phone:</strong> {visitorProfile.phone}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-blue-600 uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        Step 2: Define Visit Target
                      </h4>
                      
                      <div className="flex items-end gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0 mb-1.5">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <Select
                            label="Select Host Department / Faculty"
                            value={requestHost}
                            onChange={(e) => setRequestHost(e.target.value)}
                            options={HOSTS}
                          />
                        </div>
                      </div>

                      <div className="flex items-end gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0 mb-1">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <Input
                            label="Purpose of Visit"
                            placeholder="e.g., Parent-Teacher Meeting, Admissions Enquiry, Campus Tour"
                            value={requestPurpose}
                            onChange={(e) => setRequestPurpose(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-600 uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                        Step 3: Choose Schedule & Submit
                      </h4>
                      
                      <div className="flex gap-4">
                        <div className="flex-1 flex items-end gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0 mb-1">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <Input
                              label="Date of Visit"
                              type="date"
                              value={requestDate}
                              onChange={(e) => setRequestDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex-1 flex items-end gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0 mb-1">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <Input
                              label="Scheduled Time"
                              type="time"
                              value={requestTime}
                              onChange={(e) => setRequestTime(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <Button type="submit" variant="primary" fullWidth size="md" icon={QrCode} aria-label="Submit visitor pass request form">
                        Generate & Register Visit Pass
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {portalTab === 'passes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Pass Log</h3>
                <Badge variant="info" size="sm" className="bg-teal-50 text-teal-700 border-teal-200">
                  Total Visits: {visits.length}
                </Badge>
              </div>

              <div className="space-y-5">
                {visits.map((pass) => (
                  <Card key={pass.id} className={`border hover:border-slate-350 transition-all shadow-subtle overflow-hidden ${
                    pass.status === 'approved' 
                      ? 'border-teal-200 bg-teal-50/10' 
                      : pass.status === 'rejected' 
                        ? 'border-rose-200 bg-rose-50/10' 
                        : 'border-amber-200 bg-amber-50/10'
                  }`}>
                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-semibold uppercase font-mono">{pass.id}</span>
                      
                      {pass.status === 'pending' && (
                        <div className="flex gap-2">
                          <span className="text-slate-400 font-bold pt-0.5 uppercase tracking-wider text-[9px]">Simulation Control Panel:</span>
                          <button
                            onClick={() => handleSimulateDecision(pass.id, true)}
                            className="bg-teal-600 hover:bg-teal-750 text-white font-bold px-2 py-0.5 rounded-md"
                          >
                            Approve Pass
                          </button>
                          <button
                            onClick={() => handleSimulateDecision(pass.id, false)}
                            className="bg-rose-600 hover:bg-rose-750 text-white font-bold px-2 py-0.5 rounded-md"
                          >
                            Reject Pass
                          </button>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                            pass.status === 'approved'
                              ? 'bg-teal-100 text-teal-700 border-teal-200'
                              : pass.status === 'rejected'
                                ? 'bg-rose-100 text-rose-750 border-rose-200'
                                : 'bg-amber-100 text-amber-700 border-amber-200'
                          }`}>
                            {pass.status === 'approved' ? (
                              <Check className="w-5 h-5 stroke-[2.5]" />
                            ) : pass.status === 'rejected' ? (
                              <XCircle className="w-5 h-5 stroke-[2.5]" />
                            ) : (
                              <Clock className="w-5 h-5 stroke-[2.5]" />
                            )}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-slate-450 uppercase block">Host Information</span>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{pass.host}</h4>
                          </div>
                        </div>
                        
                        {pass.status === 'approved' && (
                          <Badge variant="success" size="sm" className="bg-teal-100 text-teal-850 border-teal-300">
                            Approved clearance
                          </Badge>
                        )}
                        {pass.status === 'pending' && (
                          <Badge variant="warning" size="sm" className="bg-amber-100 text-amber-850 border-amber-300">
                            Awaiting verification
                          </Badge>
                        )}
                        {pass.status === 'rejected' && (
                          <Badge variant="error" size="sm" className="bg-rose-100 text-rose-900 border-rose-300">
                            {pass.reason === 'Cancelled by visitor.' ? 'Cancelled' : 'Rejected'}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-3.5 text-[11px] text-slate-700 leading-relaxed">
                        <div>
                          <strong className="text-slate-950 font-bold block uppercase tracking-wider text-[9px] text-slate-450 mb-0.5">Date & Time</strong>
                          <span>{pass.date} at {pass.time}</span>
                        </div>
                        <div>
                          <strong className="text-slate-950 font-bold block uppercase tracking-wider text-[9px] text-slate-450 mb-0.5">Visit Purpose</strong>
                          <span className="truncate block" title={pass.purpose}>{pass.purpose}</span>
                        </div>
                        <div className="flex items-center md:justify-end gap-2">
                          {pass.status === 'pending' && (
                            <Button
                              variant="danger"
                              size="xs"
                              icon={XCircle}
                              onClick={() => handleCancelRequest(pass.id)}
                              aria-label={`Cancel request ${pass.id}`}
                            >
                              Cancel Pass Request
                            </Button>
                          )}
                          {pass.status === 'approved' && (
                            <Button
                              variant="primary"
                              size="sm"
                              icon={QrCode}
                              className="bg-teal-650 hover:bg-teal-750 text-white border-teal-600 shadow-xs"
                              onClick={() => setSelectedPassForQR(pass)}
                              aria-label={`Open QR Gate Pass for request ${pass.id}`}
                            >
                              View Gate QR Pass
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-2">
                        <span className="text-[9px] font-bold text-slate-450 uppercase block tracking-wider mb-3">Campus Entry Journey Checklist</span>
                        <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-bold text-slate-500">
                          <div className="space-y-1">
                            <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center mx-auto text-blue-700">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                            <span className="font-bold text-slate-800">1. Pass Requested</span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto border-2 ${
                              pass.status === 'approved'
                                ? 'bg-teal-100 text-teal-700 border-teal-300 ring-4 ring-teal-50'
                                : pass.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-700 border-rose-300 ring-4 ring-rose-50'
                                  : 'bg-amber-100 text-amber-700 border-amber-300 ring-4 ring-amber-50 animate-pulse'
                            }`}>
                              {pass.status === 'approved' ? (
                                <Check className="w-4 h-4 stroke-[3]" />
                              ) : pass.status === 'rejected' ? (
                                <XCircle className="w-4 h-4" />
                              ) : (
                                <Clock className="w-4 h-4" />
                              )}
                            </div>
                            <span className={`font-bold ${
                              pass.status === 'approved' ? 'text-teal-700' : pass.status === 'rejected' ? 'text-rose-700' : 'text-amber-700'
                            }`}>
                              2. {pass.status === 'approved' ? 'Host Approved' : pass.status === 'rejected' ? 'Host Rejected' : 'Pending Host'}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto border-2 ${
                              pass.status === 'approved' ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-slate-200 text-slate-350 border-slate-200'
                            }`}>
                              <QrCode className="w-4 h-4" />
                            </div>
                            <span className="text-slate-400">3. Gate Checked-In</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {portalTab === 'guide' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-4">
                <Input
                  label="Search Building, Department or Facility"
                  placeholder="e.g. CS Block, library, ATM..."
                  icon={Search}
                  value={guideSearchQuery}
                  onChange={(e) => setGuideSearchQuery(e.target.value)}
                />

                <div className="flex flex-wrap gap-1" role="tablist" aria-label="Campus navigation categories">
                  {[
                    { id: 'all', label: 'All Locations' },
                    { id: 'academic', label: 'Academic & Depts' },
                    { id: 'amenities', label: 'Amenities & Dining' },
                    { id: 'parking', label: 'Parking Lots' },
                    { id: 'emergency', label: 'Safety & Clinic' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={guideCategory === cat.id}
                      onClick={() => setGuideCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        guideCategory === cat.id
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {filteredGuideLocations.map((loc) => {
                    const isSelected = selectedGuideLoc && selectedGuideLoc.id === loc.id;
                    
                    let categoryIconClass = 'bg-blue-50 text-blue-600 border-blue-150';
                    let IconComp = Building2;
                    if (loc.category === 'amenities') {
                      categoryIconClass = 'bg-teal-50 text-teal-600 border-teal-150';
                      IconComp = Coffee;
                      if (loc.name.toLowerCase().includes('library')) IconComp = BookOpen;
                    } else if (loc.category === 'parking') {
                      categoryIconClass = 'bg-indigo-50 text-indigo-600 border-indigo-150';
                      IconComp = Car;
                    } else if (loc.category === 'emergency') {
                      categoryIconClass = 'bg-rose-50 text-rose-600 border-rose-150';
                      IconComp = ShieldAlert;
                      if (loc.name.toLowerCase().includes('clinic') || loc.name.toLowerCase().includes('medical')) IconComp = HeartPulse;
                    }

                    return (
                      <div
                        key={loc.id}
                        onClick={() => setSelectedGuideLoc(loc)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-xs flex gap-3 items-center ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 ${categoryIconClass}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-bold text-slate-900 truncate">{loc.name}</h4>
                            <Badge variant={loc.category === 'emergency' ? 'error' : 'info'} size="sm" className="shrink-0 scale-90">
                              {loc.code}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-slate-450 leading-relaxed truncate mt-0.5">{loc.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedGuideLoc && (
                  <Card className="bg-slate-50 border-slate-200 shadow-xs">
                    <CardContent className="p-3.5 space-y-2 text-[11px] text-slate-700">
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[9px] mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        Route Metrics (From Main Gate)
                      </h4>
                      <p className="leading-relaxed">Path verified to **{selectedGuideLoc.name}**. Center marker aligned on interactive Leaflet view.</p>
                      
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2 font-bold">
                        <div>
                          <span className="text-[9px] text-slate-450 block font-normal uppercase">Walking distance</span>
                          <span className="text-slate-900">~ 420 meters</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-450 block font-normal uppercase">Transit Time</span>
                          <span className="text-slate-900">~ 5 mins walk</span>
                        </div>
                      </div>

                      <div className="bg-teal-50 text-teal-800 border border-teal-150 rounded-lg p-2.5 flex items-center gap-2 mt-2 font-semibold text-[10px]">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 stroke-[2.5]" />
                        <span>Stair-free & wheelchair friendly path available.</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-8">
                <Card className="p-1 border border-slate-200 shadow-subtle">
                  <CampusMap
                    height="h-[480px]"
                    selectedDestination={selectedGuideLoc}
                    onSelectDestination={(loc) => setSelectedGuideLoc(loc)}
                  />
                </Card>
              </div>
            </div>
          )}

          {portalTab === 'alerts' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Visit Request Alerts</h3>
                  {notifications.length > 0 && (
                    <button className="text-[10px] text-blue-600 hover:text-blue-750 font-bold" onClick={handleMarkAllRead}>Mark All as Read</button>
                  )}
                </div>

                <div className="space-y-3">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-3.5 rounded-xl border flex gap-3.5 cursor-pointer transition-all hover:shadow-subtle ${
                          notif.read 
                            ? 'bg-slate-50/40 border-slate-200 text-slate-505' 
                            : 'bg-white border-blue-200 text-slate-900 font-bold ring-1 ring-blue-150 shadow-xs'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                          notif.type === 'success' 
                            ? 'bg-teal-100 text-teal-700 border-teal-200' 
                            : 'bg-rose-100 text-rose-700 border-rose-200'
                        }`}>
                          {notif.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <XCircle className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </div>
                        <div className="text-xs flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-1">
                            <p className="leading-relaxed">{notif.text}</p>
                            {!notif.read && (
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 ml-2" title="Unread"></span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] text-slate-400 font-medium">{notif.time}</span>
                            {notif.relatedRequestId && (
                              <span className="text-[9px] text-blue-600 hover:underline font-semibold flex items-center gap-0.5">
                                View digital pass QR <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 bg-slate-50 border border-slate-100 text-xs text-slate-455 rounded-xl">
                      No new request updates.
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-6 space-y-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Safety Contacts</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Card className="hover:border-slate-350 transition-colors">
                    <CardContent className="p-3.5 flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-bold text-slate-900">Security Dispatch</h4>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">+91 80 5555 7233</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-slate-350 transition-colors">
                    <CardContent className="p-3.5 flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <HeartPulse className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-bold text-slate-900">Medical Clinic</h4>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">+91 80 5555 2273</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-amber-50/40 border border-amber-200 text-amber-900 text-xs rounded-2xl space-y-3 shadow-subtle">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h4 className="font-bold text-amber-950 font-black">Safety Instructions for Guests</h4>
                  </div>
                  
                  <div className="space-y-2.5 text-[11px] leading-relaxed text-amber-900 pl-1.5">
                    <div className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-amber-700">1</span>
                      <span>Digital QR pass must be readily available at gate check points.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-amber-700">2</span>
                      <span>Guests must be accompanied by their authorized host inside laboratories.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-amber-700">3</span>
                      <span>Please observe all warning signs in construction zones.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {portalTab === 'voice' && (
            <div className="max-w-xl mx-auto space-y-6 py-4">
              <Card className="p-8 text-center shadow-md border border-slate-200">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  
                  {/* Language Selector Selector */}
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                    <button
                      onClick={() => setVoiceTabLang('en-US')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        voiceTabLang === 'en-US' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-650 hover:text-slate-900'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setVoiceTabLang('ta-IN')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        voiceTabLang === 'ta-IN' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-655 hover:text-slate-900'
                      }`}
                    >
                      தமிழ் (Tamil)
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {voiceTabLang === 'ta-IN' ? 'நீங்கள் எங்கே செல்ல வேண்டும்?' : 'Where would you like to go?'}
                    </h3>
                    <p className="text-xs text-slate-550 mt-1.5 max-w-xs">{voiceTabStatus}</p>
                  </div>

                  {/* Microphone Button */}
                  <div className="relative">
                    {voiceTabListening && (
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                    )}
                    <button
                      onClick={toggleVoiceTabListening}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
                        voiceTabListening
                          ? 'bg-red-650 text-white ring-8 ring-red-100 scale-105'
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                      }`}
                      aria-label={voiceTabListening ? 'Stop Listening' : 'Start Listening'}
                    >
                      {voiceTabListening ? (
                        <MicOff className="w-8 h-8 animate-pulse" />
                      ) : (
                        <Mic className="w-8 h-8" />
                      )}
                    </button>
                  </div>

                  {/* Display recognized query feedback mapping */}
                  {voiceTabMapped ? (
                    <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 text-left animate-in fade-in">
                      <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                        {voiceTabLang === 'ta-IN' ? 'கண்டறியப்பட்ட இடம்' : 'Recognized Destination'}
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center justify-between">
                        <span>{voiceTabMapped.displayName}</span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      </p>
                    </div>
                  ) : (
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-550">
                      {voiceTabLang === 'ta-IN' ? (
                        <span>உதாரணமாகச் சொல்லுங்கள்: <strong>"உணவகம் எங்கே இருக்கிறது?"</strong> அல்லது <strong>"நூலகம்"</strong></span>
                      ) : (
                        <span>Try saying: <strong>"Take me to the Cafeteria"</strong> or <strong>"Find Library"</strong></span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 w-full pt-2">
                    <Button variant="outline" size="md" fullWidth onClick={() => setPortalTab('home')}>
                      {voiceTabLang === 'ta-IN' ? 'ரத்துசெய்' : 'Cancel'}
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      disabled={!voiceTabTranscript}
                      icon={Navigation}
                      onClick={() => {
                        if (voiceTabMapped) {
                          addToast(`Voice destination set to: "${voiceTabMapped.mappedName}"`, 'success');
                          const query = voiceTabMapped.mappedName;
                          const matched = CAMPUS_LOCATIONS.find((l) => l.name.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(l.name.toLowerCase()));
                          if (matched) {
                            setSelectedGuideLoc(matched);
                          }
                          setPortalTab('guide');
                        }
                      }}
                    >
                      {voiceTabLang === 'ta-IN' ? 'வழியைக்காட்டு' : 'Start Navigation'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>

        {selectedPassForQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-slate-900 text-white rounded-2xl w-full max-w-sm border border-slate-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-5 text-center space-y-5">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3">
                  <span className="font-bold uppercase tracking-wider text-slate-450">Visitor Gate Pass</span>
                  <button className="text-slate-450 hover:text-white" onClick={() => setSelectedPassForQR(null)}>
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <Badge variant="navy" size="md" className="bg-teal-600 text-white border-teal-500 mx-auto">
                  Gate Clearance Approved
                </Badge>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-black">{visitorProfile.name}</h3>
                  <p className="text-xs text-slate-400">ID: {visitorProfile.idNumber} • Verified Profile</p>
                </div>

                <div className="w-52 h-52 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center border-4 border-slate-700">
                  <QrCode className="w-44 h-44 text-slate-900" />
                </div>

                <div className="text-xs space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase block font-semibold">Authorized Host</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">{selectedPassForQR.host}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2 text-[11px]">
                    <div>
                      <span className="text-[10px] text-slate-455 uppercase block">Validity Date</span>
                      <span className="text-white mt-0.5 block">{selectedPassForQR.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-455 uppercase block">Pass Code</span>
                      <span className="text-white font-mono mt-0.5 block">{selectedPassForQR.id}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-3">
                  Please display this QR code to the scanner at any campus gate. For help, contact Security at +91 80 5555 7233.
                </div>
              </div>
            </div>
          </div>
        )}
        <VoiceNavigationModal
          isOpen={voiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
          onStartNavigation={(query) => {
            addToast(`Voice destination set to: "${query}"`, 'success');
            const matched = CAMPUS_LOCATIONS.find((l) => l.name.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(l.name.toLowerCase()));
            if (matched) {
              setSelectedGuideLoc(matched);
              setPortalTab('guide');
            } else {
              navigate(`/map?q=${encodeURIComponent(query)}`);
            }
          }}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">
                Role: {user.roleLabel}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">• {user.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Where would you like to go today?
            </p>

            <div className="pt-3 max-w-xl">
              <SearchBar
                placeholder="Search for a classroom, building or facility..."
                onSearch={handleGlobalSearch}
                suggestions={[
                  'Computer Science Block (CS303)',
                  'Central Library',
                  'Main Cafeteria',
                  'Medical Centre',
                  'Main Parking B',
                  'Auditorium Block A'
                ]}
              />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end justify-between border-l border-slate-100 pl-6 shrink-0 space-y-3">
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 block uppercase">Campus Weather</span>
              <span className="text-base font-bold text-slate-900">24°C Sunny</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-455 block uppercase">Active Shuttles</span>
              <span className="text-xs font-semibold text-emerald-600">3 Vehicles Running</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {quickActions.map((qa, idx) => (
              <button
                key={idx}
                onClick={qa.action ? qa.action : () => navigate(qa.path)}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all flex items-center gap-3 text-left group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border shrink-0 ${qa.color}`}>
                  <qa.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {qa.label}
                  </h4>
                  <span className="text-[10px] text-slate-450 block">Instant access</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Explore Campus</h2>
              <p className="text-xs text-slate-500">Interactive live Leaflet navigation and building markers</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/map')}
            >
              Full Screen Map
            </Button>
          </div>

          <CampusMap
            height="h-[460px]"
            selectedDestination={selectedMapDestination}
            onSelectDestination={(loc) => setSelectedMapDestination(loc)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Nearby Facilities</h2>
              <p className="text-xs text-slate-500">Live operational status and walking distance</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/facilities')}
            >
              View All Facilities →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyFacilities.map((fac) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                onNavigate={(f) => {
                  const mapLoc = CAMPUS_LOCATIONS.find((l) => l.name.includes(f.name) || f.name.includes(l.name));
                  if (mapLoc) {
                    setSelectedMapDestination(mapLoc);
                    addToast(`Route calculated to ${f.name}`, 'success');
                  } else {
                    navigate('/map');
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardHeader
                actions={
                  <Button variant="ghost" size="sm" onClick={() => navigate('/notices')}>
                    All Notices
                  </Button>
                }
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <CardTitle>Campus Updates & Notices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 p-0">
                {campusUpdates.map((notice) => (
                  <div key={notice.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={notice.urgent ? 'error' : 'info'} size="sm">
                          {notice.category}
                        </Badge>
                        <span className="text-[11px] text-slate-455">{notice.time}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{notice.title}</h4>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/notices')}>
                      Read
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-red-200 bg-red-50/40 h-full flex flex-col justify-between">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-red-700">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-bold">Campus SOS Assistance</h3>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Need urgent security, medical dispatch, or safety escort on campus? Tap below to trigger immediate emergency broadcast.
                </p>
                <div className="pt-2">
                  <Button
                    variant="danger"
                    size="md"
                    fullWidth
                    icon={ShieldAlert}
                    onClick={() => navigate('/emergency')}
                  >
                    Open Emergency SOS Hub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <VoiceNavigationModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onStartNavigation={(query) => {
          addToast(`Voice destination set to: "${query}"`, 'success');
          const matched = CAMPUS_LOCATIONS.find((l) => l.name.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(l.name.toLowerCase()));
          if (matched) {
            if (activeRole === 'visitor') {
              setSelectedGuideLoc(matched);
              setPortalTab('guide');
            } else {
              setSelectedMapDestination(matched);
            }
          } else {
            navigate(`/map?q=${encodeURIComponent(query)}`);
          }
        }}
      />
    </AppLayout>
  );
};
