import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Clock,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock3,
  MapPin,
  Users,
  BookOpen,
  Layers,
  FileText,
  CalendarDays,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { FacultyLayout } from '../../components/layout/FacultyLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { INITIAL_FACULTY_PROFILE } from '../../services/facultyData';
import {
  BOOKING_PURPOSES,
  VENUE_TYPES,
  BOOKING_BUILDINGS,
  BOOKING_FLOORS,
  BOOKING_SUBJECTS,
  BOOKING_CLASSES
} from '../../services/bookingData';

export const FacultyVenueBookingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { venueBookings, addVenueBooking, cancelVenueBooking, rooms, buildings } = useAdmin();

  // Active View / Tab State
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'book' | 'availability' | 'calendar'

  // Booking Form State
  const [purpose, setPurpose] = useState('Extra Class');
  const [venueType, setVenueType] = useState('Classroom');
  const [building, setBuilding] = useState('Sunflower Block');
  const [floor, setFloor] = useState('Floor 3');
  const [room, setRoom] = useState('SF303');
  const [bookingDate, setBookingDate] = useState('2026-08-05');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [subject, setSubject] = useState(BOOKING_SUBJECTS[0]);
  const [className, setClassName] = useState(BOOKING_CLASSES[0]);
  const [participants, setParticipants] = useState('50');
  const [description, setDescription] = useState('');
  const [conflictError, setConflictError] = useState('');

  // Search & Filter State for My Bookings
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [buildingFilter, setBuildingFilter] = useState('all');
  const [horizonFilter, setHorizonFilter] = useState('all');

  // Selected Booking Details Modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Availability Checker Filter State
  const [availDate, setAvailDate] = useState('2026-08-05');
  const [availStartTime, setAvailStartTime] = useState('10:00 AM');
  const [availEndTime, setAvailEndTime] = useState('11:00 AM');
  const [availBuilding, setAvailBuilding] = useState('Sunflower Block');
  const [availVenueType, setAvailVenueType] = useState('all');

  // Available Rooms List based on Selected Building & Floor for Form
  const availableRoomOptions = useMemo(() => {
    const roomPrefix = building === 'Sunflower Block' ? 'SF' : building === 'AS Block' ? 'AS' : building === 'IB Block' ? 'IB' : building === 'Mechanical Block' ? 'MB' : 'RP';
    const floorNum = floor.replace('Floor ', '');
    return [
      `${roomPrefix}${floorNum}01`,
      `${roomPrefix}${floorNum}02`,
      `${roomPrefix}${floorNum}03`,
      `${roomPrefix}${floorNum}04 (${venueType})`
    ];
  }, [building, floor, venueType]);

  // Executive KPI Overview Metrics
  const metrics = useMemo(() => {
    const todayStr = '2026-08-01';
    const facultyBookings = venueBookings.filter(b => b.facultyName === INITIAL_FACULTY_PROFILE.name || b.facultyId === 'FAC-9402');
    
    return {
      total: facultyBookings.length,
      upcoming: facultyBookings.filter(b => b.status === 'Approved' && b.bookingDate >= todayStr).length,
      today: facultyBookings.filter(b => b.bookingDate === todayStr).length,
      pending: facultyBookings.filter(b => b.status === 'Pending').length,
      approved: facultyBookings.filter(b => b.status === 'Approved').length,
      rejected: facultyBookings.filter(b => b.status === 'Rejected').length,
      cancelled: facultyBookings.filter(b => b.status === 'Cancelled').length
    };
  }, [venueBookings]);

  // Filtered Faculty Bookings
  const filteredBookings = useMemo(() => {
    return venueBookings.filter(b => {
      // Search
      const matchesSearch =
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subject.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();

      // Building
      const matchesBuilding = buildingFilter === 'all' || b.building === buildingFilter;

      return matchesSearch && matchesStatus && matchesBuilding;
    });
  }, [venueBookings, searchQuery, statusFilter, buildingFilter]);

  // Handle Submit Booking Form
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setConflictError('');

    const newBookingData = {
      facultyId: 'FAC-9402',
      facultyName: INITIAL_FACULTY_PROFILE.name,
      department: INITIAL_FACULTY_PROFILE.department,
      subject,
      className,
      venueType,
      building,
      floor,
      room,
      purpose,
      description: description || `Requested ${purpose} session for ${className}`,
      participants: parseInt(participants, 10) || 40,
      bookingDate,
      startTime,
      endTime
    };

    const res = addVenueBooking(newBookingData);

    if (!res.success) {
      setConflictError(res.message);
      addToast(res.message, 'error');
      return;
    }

    addToast(`Venue booking request [${res.booking.id}] submitted successfully! Sent to Admin for approval.`, 'success');
    setDescription('');
    setActiveTab('bookings');
  };

  // Pre-fill form from Calendar slot click
  const handleSlotClick = (dayDate, slotTime, slotBuilding, slotRoom) => {
    setBookingDate(dayDate);
    setStartTime(slotTime.split(' - ')[0]);
    setEndTime(slotTime.split(' - ')[1] || '11:00 AM');
    if (slotBuilding) setBuilding(slotBuilding);
    if (slotRoom) setRoom(slotRoom);
    setActiveTab('book');
    addToast(`Pre-filled booking request for ${slotBuilding || 'Sunflower Block'} on ${dayDate} at ${slotTime.split(' - ')[0]}`, 'info');
  };

  // View Venue on Map Action
  const handleViewOnMap = (bkg) => {
    navigate('/faculty/map', {
      state: {
        buildingName: bkg.building,
        roomNumber: bkg.room,
        floor: bkg.floor,
        highlight: true
      }
    });
    addToast(`Navigating to Campus Map for ${bkg.building} (${bkg.room})`, 'info');
  };

  // Status Badge Component
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge variant="success" size="sm">Approved</Badge>;
      case 'Pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'Rejected':
        return <Badge variant="error" size="sm">Rejected</Badge>;
      case 'Cancelled':
        return <Badge variant="neutral" size="sm">Cancelled</Badge>;
      case 'Completed':
        return <Badge variant="info" size="sm">Completed</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  // Rooms Grid for Availability Checker
  const availabilityRoomsGrid = [
    { room: 'SF301', building: 'Sunflower Block', floor: 'Floor 3', type: 'Classroom', cap: 60, status: 'Available', color: 'bg-emerald-500', badgeVariant: 'success' },
    { room: 'SF302', building: 'Sunflower Block', floor: 'Floor 3', type: 'Classroom', cap: 60, status: 'Occupied', color: 'bg-red-500', badgeVariant: 'error' },
    { room: 'SF303', building: 'Sunflower Block', floor: 'Floor 3', type: 'Seminar Hall', cap: 120, status: 'Reserved', color: 'bg-amber-500', badgeVariant: 'warning' },
    { room: 'AS201', building: 'AS Block', floor: 'Floor 2', type: 'Meeting Room', cap: 25, status: 'Available', color: 'bg-emerald-500', badgeVariant: 'success' },
    { room: 'AS303', building: 'AS Block', floor: 'Floor 3', type: 'Laboratory', cap: 45, status: 'Available', color: 'bg-emerald-500', badgeVariant: 'success' },
    { room: 'IB-AUD-101', building: 'IB Block', floor: 'Floor 1', type: 'Auditorium', cap: 350, status: 'Maintenance', color: 'bg-slate-400', badgeVariant: 'neutral' },
    { room: 'MB204', building: 'Mechanical Block', floor: 'Floor 2', type: 'Classroom', cap: 55, status: 'Occupied', color: 'bg-red-500', badgeVariant: 'error' },
    { room: 'RP-CONF-202', building: 'Research Park', floor: 'Floor 2', type: 'Conference Hall', cap: 30, status: 'Available', color: 'bg-emerald-500', badgeVariant: 'success' }
  ];

  return (
    <FacultyLayout>
      <PageHeader
        title="Venue & Slot Booking Center"
        description="Faculty portal to check classroom/hall availability, submit room reservation requests, view interactive weekly calendars, and track approval status."
        breadcrumbs={[{ label: 'Venue & Slot Booking' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'book' ? 'primary' : 'outline'}
              size="sm"
              icon={PlusCircle}
              onClick={() => { setActiveTab('book'); setConflictError(''); }}
              className="font-bold"
            >
              Book a Venue
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* EXECUTIVE KPI DASHBOARD CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <Card hoverEffect className="border-l-4 border-l-blue-600">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upcoming Bookings</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.upcoming}</h3>
              <p className="text-[10px] text-slate-500">Approved & Scheduled</p>
            </CardContent>
          </Card>

          <Card hoverEffect className="border-l-4 border-l-emerald-600">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today's Bookings</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.today}</h3>
              <p className="text-[10px] text-slate-500">Active Slots Today</p>
            </CardContent>
          </Card>

          <Card hoverEffect className="border-l-4 border-l-amber-500">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Requests</span>
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Clock3 className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.pending}</h3>
              <p className="text-[10px] text-slate-500">Awaiting Admin Review</p>
            </CardContent>
          </Card>

          <Card hoverEffect className="border-l-4 border-l-teal-600">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Approved Requests</span>
                <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.approved}</h3>
              <p className="text-[10px] text-slate-500">Confirmed Venues</p>
            </CardContent>
          </Card>

          <Card hoverEffect className="border-l-4 border-l-rose-600">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rejected Requests</span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <XCircle className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.rejected}</h3>
              <p className="text-[10px] text-slate-500">Declined by Admin</p>
            </CardContent>
          </Card>

          <Card hoverEffect className="border-l-4 border-l-slate-600">
            <CardContent className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cancelled Requests</span>
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600">
                  <Ban className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{metrics.cancelled}</h3>
              <p className="text-[10px] text-slate-500">Withdrawn Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* QUICK ACTIONS TOOLBAR TABS */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
          <Button
            variant={activeTab === 'bookings' ? 'primary' : 'ghost'}
            size="sm"
            icon={Layers}
            onClick={() => setActiveTab('bookings')}
            className="font-bold shrink-0"
          >
            My Bookings Roster ({venueBookings.length})
          </Button>
          <Button
            variant={activeTab === 'book' ? 'primary' : 'ghost'}
            size="sm"
            icon={PlusCircle}
            onClick={() => { setActiveTab('book'); setConflictError(''); }}
            className="font-bold shrink-0"
          >
            Book a Venue Form
          </Button>
          <Button
            variant={activeTab === 'availability' ? 'primary' : 'ghost'}
            size="sm"
            icon={Building2}
            onClick={() => setActiveTab('availability')}
            className="font-bold shrink-0"
          >
            Check Room Availability
          </Button>
          <Button
            variant={activeTab === 'calendar' ? 'primary' : 'ghost'}
            size="sm"
            icon={CalendarDays}
            onClick={() => setActiveTab('calendar')}
            className="font-bold shrink-0"
          >
            Weekly Booking Calendar
          </Button>
        </div>

        {/* TAB 1: MY BOOKINGS ROSTER TABLE */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <Card className="p-4 bg-white border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Input
                  icon={Search}
                  placeholder="Search by Venue, Room, Purpose, Subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'approved', label: 'Approved Only' },
                    { value: 'pending', label: 'Pending Only' },
                    { value: 'rejected', label: 'Rejected Only' },
                    { value: 'cancelled', label: 'Cancelled Only' }
                  ]}
                />

                <Select
                  value={buildingFilter}
                  onChange={(e) => setBuildingFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Campus Buildings' },
                    ...BOOKING_BUILDINGS.map(b => ({ value: b, label: b }))
                  ]}
                />

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setBuildingFilter('all'); }}
                  className="w-full font-semibold text-slate-700"
                >
                  Reset Roster Filters
                </Button>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Faculty Booking Requests ({filteredBookings.length})
                  </CardTitle>
                  <Badge variant="info" size="sm">Admin Workflow Synced</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3 rounded-l-lg">Booking ID</th>
                        <th className="p-3">Venue & Room</th>
                        <th className="p-3">Building</th>
                        <th className="p-3">Purpose</th>
                        <th className="p-3">Date & Time</th>
                        <th className="p-3">Class & Subject</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-r-lg text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredBookings.map((bkg) => (
                        <tr key={bkg.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono font-extrabold text-slate-900">{bkg.id}</td>
                          <td className="p-3 font-extrabold text-blue-700">
                            {bkg.room}
                            <span className="block text-[10px] text-slate-400 font-normal">{bkg.venueType}</span>
                          </td>
                          <td className="p-3 font-semibold text-slate-800">{bkg.building}</td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{bkg.purpose}</span>
                            <span className="text-[10px] text-slate-500 font-medium truncate block max-w-[150px]">{bkg.description}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-700">
                            <div className="flex items-center gap-1 font-bold text-slate-900">
                              <Calendar className="w-3 h-3 text-indigo-600" />
                              {bkg.bookingDate}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {bkg.startTime} - {bkg.endTime}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-800 block">{bkg.className}</span>
                            <span className="text-[10px] text-slate-500">{bkg.subject}</span>
                          </td>
                          <td className="p-3">
                            {renderStatusBadge(bkg.status)}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedBooking(bkg)}
                                className="!text-blue-600 hover:!bg-blue-50 font-bold text-[11px]"
                              >
                                Details
                              </Button>

                              {bkg.status === 'Approved' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  icon={MapPin}
                                  onClick={() => handleViewOnMap(bkg)}
                                  className="!text-emerald-700 !border-emerald-300 hover:!bg-emerald-50 font-bold text-[11px]"
                                >
                                  Map
                                </Button>
                              )}

                              {bkg.status === 'Pending' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => { cancelVenueBooking(bkg.id); addToast(`Booking ${bkg.id} cancelled`, 'info'); }}
                                  className="!text-rose-600 hover:!bg-rose-50 font-bold text-[11px]"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredBookings.length === 0 && (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            No venue booking requests match your search or filter parameters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: BOOK A VENUE FORM */}
        {activeTab === 'book' && (
          <Card className="max-w-4xl mx-auto shadow-md">
            <CardHeader className="border-b bg-slate-50/50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-blue-600" />
                    Submit New Venue & Slot Booking Request
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Fill out academic requirements. Requests are routed to Admin for final approval.</p>
                </div>
                <Badge variant="warning" size="sm" className="font-bold">Status: Pending Approval</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {conflictError && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{conflictError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitBooking} className="space-y-6">
                {/* Section A: Faculty & Academic Information */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    1. Faculty & Academic Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Faculty Name</span>
                      <span className="font-extrabold text-slate-900">{INITIAL_FACULTY_PROFILE.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Faculty ID</span>
                      <span className="font-mono font-bold text-blue-700">FAC-9402</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Department</span>
                      <span className="font-semibold text-slate-800">{INITIAL_FACULTY_PROFILE.department}</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Course & Class Details */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    2. Subject & Class Allocation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                      label="Subject / Module"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      options={BOOKING_SUBJECTS.map(s => ({ value: s, label: s }))}
                      required
                    />

                    <Select
                      label="Class / Section"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      options={BOOKING_CLASSES.map(c => ({ value: c, label: c }))}
                      required
                    />

                    <Input
                      label="Expected Participants"
                      type="number"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                      placeholder="e.g. 50"
                      min="5"
                      max="500"
                      required
                    />
                  </div>
                </div>

                {/* Section C: Venue Preference */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    3. Venue Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select
                      label="Booking Purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      options={BOOKING_PURPOSES.map(p => ({ value: p, label: p }))}
                      required
                    />

                    <Select
                      label="Venue Type"
                      value={venueType}
                      onChange={(e) => setVenueType(e.target.value)}
                      options={VENUE_TYPES.map(v => ({ value: v, label: v }))}
                      required
                    />

                    <Select
                      label="Preferred Building"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      options={BOOKING_BUILDINGS.map(b => ({ value: b, label: b }))}
                      required
                    />

                    <Select
                      label="Preferred Floor"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      options={BOOKING_FLOORS.map(f => ({ value: f, label: f }))}
                      required
                    />
                  </div>
                </div>

                {/* Section D: Schedule & Available Room Selection */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    4. Date, Slot & Room Selection
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                      label="Booking Date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />

                    <Select
                      label="Start Time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      options={['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(t => ({ value: t, label: t }))}
                      required
                    />

                    <Select
                      label="End Time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      options={['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(t => ({ value: t, label: t }))}
                      required
                    />

                    <Select
                      label="Preferred Available Room"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      options={availableRoomOptions.map(r => ({ value: r, label: r }))}
                      required
                    />
                  </div>
                </div>

                {/* Section E: Purpose Description */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Purpose Description & Administrative Note
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details regarding the session, equipment needed (e.g. Projector, Mic, AI workstation setup)..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t flex items-center justify-between">
                  <Button variant="ghost" size="md" onClick={() => setActiveTab('bookings')}>
                    Cancel & Return to Roster
                  </Button>

                  <Button type="submit" variant="primary" size="md" icon={CheckCircle2} className="!bg-blue-600 hover:!bg-blue-700 font-extrabold shadow-sm">
                    Submit Booking Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: CHECK ROOM AVAILABILITY GRID */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <Card className="p-4 bg-white border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Input
                  label="Date"
                  type="date"
                  value={availDate}
                  onChange={(e) => setAvailDate(e.target.value)}
                />

                <Select
                  label="Start Time"
                  value={availStartTime}
                  onChange={(e) => setAvailStartTime(e.target.value)}
                  options={['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'].map(t => ({ value: t, label: t }))}
                />

                <Select
                  label="End Time"
                  value={availEndTime}
                  onChange={(e) => setAvailEndTime(e.target.value)}
                  options={['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '05:00 PM'].map(t => ({ value: t, label: t }))}
                />

                <Select
                  label="Building"
                  value={availBuilding}
                  onChange={(e) => setAvailBuilding(e.target.value)}
                  options={BOOKING_BUILDINGS.map(b => ({ value: b, label: b }))}
                />

                <Select
                  label="Venue Type"
                  value={availVenueType}
                  onChange={(e) => setAvailVenueType(e.target.value)}
                  options={[{ value: 'all', label: 'All Venue Types' }, ...VENUE_TYPES.map(v => ({ value: v, label: v }))]}
                />
              </div>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Live Room Occupancy Checker ({availBuilding})
                  </CardTitle>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Occupied</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Reserved</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Maintenance</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {availabilityRoomsGrid.map((rm, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-400 transition-all cursor-pointer group"
                      onClick={() => {
                        if (rm.status === 'Available') {
                          setBuilding(rm.building);
                          setRoom(rm.room);
                          setActiveTab('book');
                          addToast(`Selected ${rm.room} (${rm.building}) for booking`, 'info');
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{rm.room}</span>
                        <Badge variant={rm.badgeVariant} size="sm">{rm.status}</Badge>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600">
                        <p className="font-semibold text-slate-800">{rm.type} • {rm.floor}</p>
                        <p className="text-[11px] text-slate-500">{rm.building} (Capacity: {rm.cap})</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-500">Slot: {availStartTime}</span>
                        {rm.status === 'Available' ? (
                          <span className="text-blue-600 font-extrabold flex items-center gap-0.5">
                            Book Now <ChevronRight className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold">{rm.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: WEEKLY BOOKING CALENDAR */}
        {activeTab === 'calendar' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider">
                  <CalendarDays className="w-5 h-5 text-indigo-600" />
                  Weekly Slot Booking Matrix (Mon – Fri)
                </CardTitle>
                <span className="text-xs text-slate-500 font-semibold">Click any available slot to pre-fill your booking form</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <div className="min-w-[700px]">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 text-xs font-bold uppercase">
                      <th className="p-3 border border-slate-200 w-28 text-left">Time Slot</th>
                      <th className="p-3 border border-slate-200">Mon (Aug 03)</th>
                      <th className="p-3 border border-slate-200">Tue (Aug 04)</th>
                      <th className="p-3 border border-slate-200">Wed (Aug 05)</th>
                      <th className="p-3 border border-slate-200">Thu (Aug 06)</th>
                      <th className="p-3 border border-slate-200">Fri (Aug 07)</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {[
                      { slot: '09:00 - 10:00 AM', status: ['Available', 'Occupied', 'Available', 'Occupied', 'Available'] },
                      { slot: '10:00 - 11:00 AM', status: ['Occupied', 'Available', 'Available', 'Available', 'Occupied'] },
                      { slot: '11:00 - 12:00 PM', status: ['Available', 'Available', 'Occupied', 'Available', 'Available'] },
                      { slot: '01:00 - 02:00 PM', status: ['Available', 'Occupied', 'Available', 'Occupied', 'Available'] },
                      { slot: '02:00 - 03:00 PM', status: ['Occupied', 'Available', 'Available', 'Available', 'Occupied'] },
                      { slot: '03:00 - 04:00 PM', status: ['Available', 'Available', 'Available', 'Occupied', 'Available'] }
                    ].map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="p-3 border border-slate-200 font-mono font-bold bg-slate-50 text-left text-slate-900">{row.slot}</td>
                        {row.status.map((st, cIdx) => {
                          const days = ['2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07'];
                          const isAvail = st === 'Available';
                          return (
                            <td
                              key={cIdx}
                              onClick={() => {
                                if (isAvail) handleSlotClick(days[cIdx], row.slot, 'Sunflower Block', 'SF303');
                              }}
                              className={`p-3 border border-slate-200 font-semibold transition-all ${
                                isAvail
                                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer'
                                  : 'bg-red-50 text-red-800 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center gap-1">
                                <span className="font-bold">{st}</span>
                                {isAvail && <span className="text-[10px] text-emerald-600 underline">Click to Book</span>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* MODAL: BOOKING METADATA DETAILS */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">Booking Metadata Details</h3>
                  {renderStatusBadge(selectedBooking.status)}
                </div>
                <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Booking ID</span>
                    <span className="font-mono font-extrabold text-slate-900">{selectedBooking.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Faculty Name</span>
                    <span className="font-bold text-slate-900">{selectedBooking.facultyName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Department</span>
                    <span className="font-semibold text-slate-700">{selectedBooking.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Class & Subject</span>
                    <span className="font-semibold text-blue-700">{selectedBooking.className} • {selectedBooking.subject}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                  <span className="text-[10px] text-blue-600 font-bold uppercase block">Venue & Room Details</span>
                  <p className="font-extrabold text-slate-900 text-sm">{selectedBooking.room} ({selectedBooking.venueType})</p>
                  <p className="text-slate-600">{selectedBooking.building} • {selectedBooking.floor}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Booking Date</span>
                    <span className="font-bold text-slate-900">{selectedBooking.bookingDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Slot</span>
                    <span className="font-bold text-slate-900">{selectedBooking.startTime} - {selectedBooking.endTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Purpose</span>
                    <span className="font-bold text-slate-900">{selectedBooking.purpose}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Expected Participants</span>
                    <span className="font-bold text-slate-900">{selectedBooking.participants} Attendees</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Purpose Description</span>
                  <p className="p-2.5 rounded-lg bg-slate-50 border text-slate-700">{selectedBooking.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t flex items-center justify-between">
                {selectedBooking.status === 'Approved' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MapPin}
                    onClick={() => { handleViewOnMap(selectedBooking); setSelectedBooking(null); }}
                    className="!text-emerald-700 !border-emerald-300 font-bold"
                  >
                    View on Campus Map
                  </Button>
                ) : <div />}

                <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FacultyLayout>
  );
};
