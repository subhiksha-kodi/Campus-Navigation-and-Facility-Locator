import React, { useState } from 'react';
import { Building2, Layers, Shield, Map, Plus, AlertOctagon, CheckCircle2, Lock, Navigation } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminInfrastructurePage = () => {
  const { buildings, rooms, facilities, routes, addBuilding, addRoom, addFacility, toggleRouteBlockedStatus } = useAdmin();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('buildings');
  const [showAddBldModal, setShowAddBldModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showAddFacilModal, setShowAddFacilModal] = useState(false);

  // Form states
  const [bldName, setBldName] = useState('');
  const [bldCode, setBldCode] = useState('');
  const [floors, setFloors] = useState(4);
  const [description, setDescription] = useState('');

  const [roomNum, setRoomNum] = useState('');
  const [roomBld, setRoomBld] = useState('Sunflower Block');
  const [roomFloor, setRoomFloor] = useState(3);
  const [roomType, setRoomType] = useState('Classroom');
  const [capacity, setCapacity] = useState(60);

  const [facilName, setFacilName] = useState('');
  const [facilCat, setFacilCat] = useState('Printer');
  const [facilBld, setFacilBld] = useState('Sunflower Block');
  const [facilFloor, setFacilFloor] = useState(1);

  const handleCreateBuilding = (e) => {
    e.preventDefault();
    addBuilding({ name: bldName, code: bldCode, floors: Number(floors), description, contact: 'Admin Office', openTime: '07:30 AM', closeTime: '09:00 PM', lat: 12.9716, lng: 77.5946 });
    addToast(`Building ${bldName} added to campus registry!`, 'success');
    setShowAddBldModal(false);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    addRoom({ number: roomNum, building: roomBld, floor: Number(roomFloor), type: roomType, capacity: Number(capacity), lat: 12.9716, lng: 77.5946 });
    addToast(`Room ${roomNum} added to ${roomBld}!`, 'success');
    setShowAddRoomModal(false);
  };

  const handleCreateFacility = (e) => {
    e.preventDefault();
    addFacility({ name: facilName, category: facilCat, building: facilBld, floor: Number(facilFloor), room: `${facilBld} F${facilFloor}`, hours: '08:00 AM - 08:00 PM', lat: 12.9716, lng: 77.5946 });
    addToast(`Facility ${facilName} created!`, 'success');
    setShowAddFacilModal(false);
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Campus Infrastructure & Map Route Control"
        description="Admin controls for managing buildings, floors, classrooms, campus amenities, map coordinates, and route availability."
        breadcrumbs={[{ label: 'Infrastructure & Map' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant={activeTab === 'buildings' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('buildings')}>
              Buildings
            </Button>
            <Button variant={activeTab === 'rooms' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('rooms')}>
              Floors & Rooms
            </Button>
            <Button variant={activeTab === 'facilities' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('facilities')}>
              Facilities
            </Button>
            <Button variant={activeTab === 'routes' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('routes')}>
              Route Control
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* TAB 1: BUILDINGS */}
        {activeTab === 'buildings' && (
          <Card>
            <CardHeader actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddBldModal(true)}>Add Building</Button>}>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Campus Buildings Registry ({buildings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {buildings.map((bld) => (
                  <div key={bld.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="navy" size="sm">{bld.code}</Badge>
                        <h4 className="text-lg font-extrabold text-slate-900 mt-1">{bld.name}</h4>
                      </div>
                      <Badge variant={bld.status === 'Active' ? 'success' : 'error'} size="sm">{bld.status}</Badge>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{bld.description}</p>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-xs text-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Floors</span>
                        <span className="font-bold text-slate-900 block">{bld.floors} Floors</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Hours</span>
                        <span className="font-bold text-slate-900 block">{bld.openTime} - {bld.closeTime}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Contact</span>
                        <span className="font-bold text-blue-700 block truncate">{bld.contact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 2: ROOMS */}
        {activeTab === 'rooms' && (
          <Card>
            <CardHeader actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddRoomModal(true)}>Add Room</Button>}>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                Floor & Room Registry ({rooms.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-lg">Room Number</th>
                      <th className="p-3">Building</th>
                      <th className="p-3">Floor</th>
                      <th className="p-3">Room Type</th>
                      <th className="p-3">Seating Capacity</th>
                      <th className="p-3 rounded-r-lg text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rooms.map((rm) => (
                      <tr key={rm.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">{rm.number}</td>
                        <td className="p-3 font-extrabold text-slate-900">{rm.building}</td>
                        <td className="p-3">Floor {rm.floor}</td>
                        <td className="p-3 font-semibold text-blue-700">{rm.type}</td>
                        <td className="p-3 text-slate-700">{rm.capacity} Seats</td>
                        <td className="p-3 text-right">
                          <Badge variant="success" size="sm">{rm.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: FACILITIES */}
        {activeTab === 'facilities' && (
          <Card>
            <CardHeader actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddFacilModal(true)}>Add Facility</Button>}>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                Campus Amenities & Facilities ({facilities.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilities.map((fac) => (
                  <div key={fac.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="info" size="sm">{fac.category}</Badge>
                      <Badge variant="success" size="sm">{fac.availability}</Badge>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{fac.name}</h4>
                    <p className="text-xs text-slate-500">{fac.building} • Floor {fac.floor} ({fac.room})</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 4: ROUTE CONTROL & PATH BLOCKING */}
        {activeTab === 'routes' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-500" />
                Campus Route & Detour Management ({routes.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {routes.map((rt) => {
                  const isBlocked = rt.status === 'BLOCKED';

                  return (
                    <div key={rt.id} className={`p-5 rounded-2xl border ${isBlocked ? 'bg-red-50/50 border-red-300' : 'bg-white border-slate-200'} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900">
                            {rt.startLocation} → {rt.destination}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium">{rt.pathType} • Distance: {rt.distance} ({rt.estTime} walk)</span>
                        </div>
                        <Badge variant={isBlocked ? 'error' : 'success'} size="sm" className="font-bold">
                          {rt.status}
                        </Badge>
                      </div>

                      {isBlocked && (
                        <div className="p-3 bg-red-600 text-white rounded-xl text-xs font-semibold flex items-start gap-2">
                          <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-bold">ROUTE BLOCKED FOR CAMPUS USERS</span>
                            <span>{rt.blockReason}</span>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t flex justify-end">
                        <Button
                          variant={isBlocked ? 'primary' : 'danger'}
                          size="sm"
                          onClick={() => {
                            toggleRouteBlockedStatus(rt.id, 'Pavement resurfacing work in progress. Alternative path available via East Quad Corridor.');
                            addToast(`Route status changed to ${isBlocked ? 'Active' : 'BLOCKED'}`, 'info');
                          }}
                        >
                          {isBlocked ? 'Unblock Route' : 'Mark Route BLOCKED'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CREATE BUILDING MODAL */}
      {showAddBldModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Campus Building</h3>
              <button onClick={() => setShowAddBldModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateBuilding} className="space-y-3">
              <Input label="Building Name" value={bldName} onChange={(e) => setBldName(e.target.value)} required />
              <Input label="Building Code (e.g. SF)" value={bldCode} onChange={(e) => setBldCode(e.target.value)} required />
              <Input label="Total Floors" type="number" value={floors} onChange={(e) => setFloors(e.target.value)} required />
              <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddBldModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Building</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ROOM MODAL */}
      {showAddRoomModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Room / Classroom</h3>
              <button onClick={() => setShowAddRoomModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateRoom} className="space-y-3">
              <Input label="Room Number (e.g. SF305)" value={roomNum} onChange={(e) => setRoomNum(e.target.value)} required />
              <Select label="Building" value={roomBld} onChange={(e) => setRoomBld(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Input label="Floor Level" type="number" value={roomFloor} onChange={(e) => setRoomFloor(e.target.value)} required />
              <Select label="Room Type" value={roomType} onChange={(e) => setRoomType(e.target.value)} options={[{ value: 'Classroom', label: 'Classroom' }, { value: 'Laboratory', label: 'Laboratory' }, { value: 'Seminar Hall', label: 'Seminar Hall' }, { value: 'Auditorium', label: 'Auditorium' }, { value: 'Office', label: 'Office' }]} />
              <Input label="Seating Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddRoomModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Room</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE FACILITY MODAL */}
      {showAddFacilModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Add Campus Facility</h3>
              <button onClick={() => setShowAddFacilModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateFacility} className="space-y-3">
              <Input label="Facility Name" value={facilName} onChange={(e) => setFacilName(e.target.value)} required />
              <Select label="Category" value={facilCat} onChange={(e) => setFacilCat(e.target.value)} options={[{ value: 'Printer', label: 'Printer' }, { value: 'Wi-Fi', label: 'Wi-Fi' }, { value: 'Drinking Water', label: 'Drinking Water' }, { value: 'ATM', label: 'ATM' }, { value: 'Lift', label: 'Lift' }, { value: 'Washroom', label: 'Washroom' }, { value: 'Cafeteria', label: 'Cafeteria' }]} />
              <Select label="Building" value={facilBld} onChange={(e) => setFacilBld(e.target.value)} options={buildings.map((b) => ({ value: b.name, label: b.name }))} />
              <Input label="Floor Level" type="number" value={facilFloor} onChange={(e) => setFacilFloor(e.target.value)} required />
              <div className="pt-3 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddFacilModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="md">Save Facility</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
