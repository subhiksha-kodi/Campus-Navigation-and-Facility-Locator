import React, {
  Suspense, useState, useCallback, memo, useTransition, useEffect, useRef
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import './ASBlockViewer.css';

/* ═══════════════════════════════════════════════════════════════════════
   ROOM DATA & POSITIONS (Ground Floor AS Block Layout)
   ═══════════════════════════════════════════════════════════════════════ */
const H = 1.5;

const ROOMS = [
  /* ── Entrance & Top Kiosks ── */
  { id: 'entrance',        name: 'AS Entrance',           label: 'Entrance',       emoji: '🏛️', color: '#eab308', gradient: 'linear-gradient(135deg,#eab308,#ca8a04)', capacity: 50,  floor: 'Ground Floor', facilities: ['Main Entry', 'Security Desk', 'Info Board'],                     pos: [-0.1, 0, -9.0],  sz: [1.2, H, 0.8],  door: 'pz', wins: [], corridorPt: [-0.1, 0.2, -7.5] },
  { id: 'xerox_l1',       name: 'Xerox Shop 1',          label: 'Xerox 1',        emoji: '🖨️', color: '#78716c', gradient: 'linear-gradient(135deg,#78716c,#44403c)', capacity: 2,   floor: 'Ground Floor', facilities: ['Xerox', 'Printing', 'Scanning'],                                    pos: [-2.54, 0, -8.0], sz: [1.0, H, 0.9],  door: 'pz', wins: ['nz'], corridorPt: [-2.54, 0.2, -6.8] },
  { id: 'vending_l',      name: 'Vending Machine 1',      label: 'Vending 1',      emoji: '🥤', color: '#78716c', gradient: 'linear-gradient(135deg,#78716c,#44403c)', capacity: 1,   floor: 'Ground Floor', facilities: ['Snacks', 'Beverages'],                                            pos: [-1.46, 0, -8.0], sz: [1.0, H, 0.9],  door: 'pz', wins: [], corridorPt: [-1.46, 0.2, -6.8] },
  { id: 'vending_r',      name: 'Vending Machine 2',      label: 'Vending 2',      emoji: '🥤', color: '#78716c', gradient: 'linear-gradient(135deg,#78716c,#44403c)', capacity: 1,   floor: 'Ground Floor', facilities: ['Snacks', 'Beverages'],                                            pos: [ 0.30, 0, -8.0], sz: [1.0, H, 0.9],  door: 'pz', wins: [], corridorPt: [ 0.30, 0.2, -6.8] },
  { id: 'xerox_r1',       name: 'Xerox Shop 2',          label: 'Xerox 2',        emoji: '🖨️', color: '#78716c', gradient: 'linear-gradient(135deg,#78716c,#44403c)', capacity: 2,   floor: 'Ground Floor', facilities: ['Xerox', 'Printing'],                                              pos: [ 1.46, 0, -8.0], sz: [1.0, H, 0.9],  door: 'pz', wins: ['nz'], corridorPt: [ 1.46, 0.2, -6.8] },

  /* ── Top-right labs ── */
  { id: 'cyber_lab',      name: 'Cyber Security Lab',     label: 'Cyber Lab',      emoji: '🔐', color: '#dc2626', gradient: 'linear-gradient(135deg,#dc2626,#b91c1c)', capacity: 30,  floor: 'Ground Floor', facilities: ['Computers', 'Firewall Setup', 'AC', 'Projector'],                   pos: [ 3.35, 0, -8.5], sz: [2.3, H, 1.5],  door: 'pz', wins: ['nz', 'px'], corridorPt: [ 3.35, 0.2, -6.8] },
  { id: 'fullstack',      name: 'Full Stack Lab',          label: 'Full Stack',     emoji: '💻', color: '#7c3aed', gradient: 'linear-gradient(135deg,#7c3aed,#5b21b6)', capacity: 40,  floor: 'Ground Floor', facilities: ['Computers', 'Dual Monitor', 'Projector', 'AC', 'High-Speed Internet'],pos: [ 4.9,  0, -6.1], sz: [1.0, H, 3.4],  door: 'nx', wins: ['px'], corridorPt: [ 3.5, 0.2, -6.1] },

  /* ── Middle area ── */
  { id: 'lift_top',       name: 'Lift (North)',           label: 'Lift N',         emoji: '🛗', color: '#475569', gradient: 'linear-gradient(135deg,#475569,#334155)', capacity: 8,   floor: 'Ground Floor', facilities: ['Elevator', 'Accessible'],                                         pos: [ 1.24, 0, -6.2], sz: [1.1, H, 1.6],  door: 'pz', wins: [], corridorPt: [ 1.24, 0.2, -4.8] },
  { id: 'staircase_top',  name: 'Staircase (North)',      label: 'Stairs N',       emoji: '🪜', color: '#334155', gradient: 'linear-gradient(135deg,#475569,#334155)', capacity: 20,  floor: 'Ground Floor', facilities: ['Fire Exit', 'Staircase'],                                         pos: [ 3.04, 0, -5.46],sz: [2.5, H, 3.7],  door: 'nx', wins: [], corridorPt: [ 1.24, 0.2, -5.46] },
  { id: 'xerox_mid',      name: 'Xerox Shop (Central)',   label: 'Xerox Mid',      emoji: '🖨️', color: '#78716c', gradient: 'linear-gradient(135deg,#78716c,#44403c)', capacity: 2,   floor: 'Ground Floor', facilities: ['Xerox', 'Printing'],                                              pos: [ 0.3,  0, -4.0], sz: [1.0, H, 1.0],  door: 'pz', wins: [], corridorPt: [ 0.3, 0.2, -2.5] },
  { id: 'xr_lab',         name: 'XR Lab',                  label: 'XR Lab',         emoji: '🥽', color: '#0284c7', gradient: 'linear-gradient(135deg,#0284c7,#0369a1)', capacity: 25,  floor: 'Ground Floor', facilities: ['VR Headsets', 'AR Devices', 'Motion Capture', 'AC'],               pos: [ 2.55, 0, -4.0], sz: [3.5, H, 1.0],  door: 'nz', wins: ['pz', 'px'], corridorPt: [ 2.55, 0.2, -2.5] },

  /* ── LEFT WING ── */
  { id: 'canteen',        name: 'Canteen',                 label: 'Canteen',        emoji: '🍽️', color: '#d97706', gradient: 'linear-gradient(135deg,#d97706,#b45309)', capacity: 100, floor: 'Ground Floor', facilities: ['Food Counter', 'Seating Area', 'Drinking Water', 'WiFi'],           pos: [-4.02, 0, -5.4], sz: [2.24, H, 1.4], door: 'px', wins: ['nx', 'nz'], corridorPt: [-2.3, 0.2, -5.4] },
  { id: 'ai_lab',         name: 'AI Lab',                  label: 'AI Lab',         emoji: '🤖', color: '#db2777', gradient: 'linear-gradient(135deg,#db2777,#9d174d)', capacity: 30,  floor: 'Ground Floor', facilities: ['GPU Workstations', 'Whiteboard', 'AC', 'Internet'],                     pos: [-4.02, 0, -3.96],sz: [2.24, H, 1.5], door: 'px', wins: ['nx'], corridorPt: [-2.3, 0.2, -3.96] },
  { id: 'ladies_r1',      name: 'Ladies Restroom 1',       label: 'Ladies WC 1',    emoji: '🚺', color: '#be185d', gradient: 'linear-gradient(135deg,#be185d,#9d174d)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation', 'Sanitary Bins'],                    pos: [-4.02, 0, -2.76],sz: [2.24, H, 0.9], door: 'px', wins: [], corridorPt: [-2.3, 0.2, -2.76] },
  { id: 'helpdesk',       name: 'Helpdesk / Grandview',    label: 'Helpdesk',       emoji: '🏢', color: '#6366f1', gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)', capacity: 20,  floor: 'Ground Floor', facilities: ['Help Desk', 'Reception', 'Waiting Area', 'AC'],                    pos: [-4.02, 0, -1.06],sz: [2.24, H, 2.5], door: 'px', wins: ['nx'], corridorPt: [-2.3, 0.2, -1.06] },
  { id: 'ladies_r2',      name: 'Ladies Restroom 2',       label: 'Ladies WC 2',    emoji: '🚺', color: '#be185d', gradient: 'linear-gradient(135deg,#be185d,#9d174d)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation'],                                     pos: [-4.02, 0,  0.64],sz: [2.24, H, 0.9], door: 'px', wins: [], corridorPt: [-2.3, 0.2, 0.64] },
  { id: 'ece_seminar',    name: 'ECE Seminar Hall',        label: 'ECE Seminar',    emoji: '🎤', color: '#0891b2', gradient: 'linear-gradient(135deg,#0891b2,#0e7490)', capacity: 120, floor: 'Ground Floor', facilities: ['Projector', 'Microphone', 'Stage', 'AC', 'Seating'],                    pos: [-4.02, 0,  1.84],sz: [2.24, H, 1.5], door: 'px', wins: ['nx'], corridorPt: [-2.3, 0.2, 1.84] },
  { id: 'ece_dept',       name: 'ECE Department',          label: 'ECE Dept',       emoji: '⚡', color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', capacity: 30,  floor: 'Ground Floor', facilities: ['Faculty Cabins', 'Computers', 'AC', 'Meeting Room'],               pos: [-4.02, 0,  3.24],sz: [2.24, H, 1.3], door: 'px', wins: ['nx'], corridorPt: [-2.3, 0.2, 3.24] },
  { id: 'ladies_r3',      name: 'Ladies Restroom 3',       label: 'Ladies WC 3',    emoji: '🚺', color: '#be185d', gradient: 'linear-gradient(135deg,#be185d,#9d174d)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation'],                                     pos: [-4.02, 0,  4.34],sz: [2.24, H, 0.9], door: 'px', wins: [], corridorPt: [-2.3, 0.2, 4.34] },
  { id: 'textile_seminar', name: 'Textile Seminar Hall',   label: 'Textile Seminar',emoji: '🧵', color: '#8b5cf6', gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', capacity: 100, floor: 'Ground Floor', facilities: ['Projector', 'Microphone', 'AC', 'Display Cases'],                  pos: [-4.02, 0,  5.7], sz: [2.24, H, 1.8], door: 'px', wins: ['nx'], corridorPt: [-2.3, 0.2, 5.7] },
  { id: 'fashion_tech',   name: 'Fashion Technology',      label: 'Fashion Tech',   emoji: '👗', color: '#f43f5e', gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)', capacity: 50,  floor: 'Ground Floor', facilities: ['Sewing Machines', 'Design Studio', 'AC', 'Mannequins'],            pos: [-4.02, 0,  8.04],sz: [2.24, H, 2.9], door: 'px', wins: ['nx', 'pz'], corridorPt: [-2.3, 0.2, 8.04] },

  /* ── RIGHT LAB COLUMN ── */
  { id: 'gents_r1',       name: 'Gents Restroom 1',        label: 'Gents WC 1',     emoji: '🚹', color: '#059669', gradient: 'linear-gradient(135deg,#059669,#047857)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation', 'Urinals'],                         pos: [ 1.84, 0, -2.5], sz: [2.1, H, 1.2],  door: 'nx', wins: [], corridorPt: [ 0.5, 0.2, -2.5] },
  { id: 'physics_lab',    name: 'Physics Lab-1',            label: 'Physics Lab',    emoji: '⚗️', color: '#2563eb', gradient: 'linear-gradient(135deg,#2563eb,#1d4ed8)', capacity: 35,  floor: 'Ground Floor', facilities: ['Lab Equipment', 'Projector', 'AC', 'Workbenches'],                     pos: [ 1.84, 0, -1.26],sz: [2.1, H, 1.3],  door: 'nx', wins: ['px'], corridorPt: [ 0.5, 0.2, -1.26] },
  { id: 'chemistry_lab',  name: 'Chemistry Lab-1',          label: 'Chemistry Lab',  emoji: '🧪', color: '#16a34a', gradient: 'linear-gradient(135deg,#16a34a,#15803d)', capacity: 35,  floor: 'Ground Floor', facilities: ['Fume Hood', 'Chemical Cabinet', 'Workbenches', 'AC'],                 pos: [ 1.84, 0,  0.04],sz: [2.1, H, 1.3],  door: 'nx', wins: ['px'], corridorPt: [ 0.5, 0.2, 0.04] },
  { id: 'gents_r2',       name: 'Gents Restroom 2',        label: 'Gents WC 2',     emoji: '🚹', color: '#059669', gradient: 'linear-gradient(135deg,#059669,#047857)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation'],                                    pos: [ 1.84, 0,  1.14],sz: [2.1, H, 0.86], door: 'nx', wins: [], corridorPt: [ 0.5, 0.2, 1.14] },
  { id: 'analog_lab',     name: 'Analog Lab',               label: 'Analog Lab',     emoji: '📡', color: '#f97316', gradient: 'linear-gradient(135deg,#f97316,#ea580c)', capacity: 30,  floor: 'Ground Floor', facilities: ['Oscilloscopes', 'Signal Generators', 'Breadboards', 'AC'],            pos: [ 1.84, 0,  2.26],sz: [2.1, H, 1.34], door: 'nx', wins: ['px'], corridorPt: [ 0.5, 0.2, 2.26] },
  { id: 'servo_lab',      name: 'Servo Lab',                label: 'Servo Lab',      emoji: '⚙️', color: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#0284c7)', capacity: 25,  floor: 'Ground Floor', facilities: ['Servo Motors', 'Controllers', 'Workbenches', 'AC'],                   pos: [ 1.84, 0,  3.58],sz: [2.1, H, 1.3],  door: 'nx', wins: ['px'], corridorPt: [ 0.5, 0.2, 3.58] },
  { id: 'gents_r3',       name: 'Gents Restroom 3',        label: 'Gents WC 3',     emoji: '🚹', color: '#059669', gradient: 'linear-gradient(135deg,#059669,#047857)', capacity: 10,  floor: 'Ground Floor', facilities: ['Wash Basins', 'Ventilation'],                                    pos: [ 1.84, 0,  4.7], sz: [2.1, H, 0.92], door: 'nx', wins: [], corridorPt: [ 0.5, 0.2, 4.7] },
  { id: 'textile_lab',    name: 'Textile Lab',              label: 'Textile Lab',    emoji: '🧶', color: '#a855f7', gradient: 'linear-gradient(135deg,#a855f7,#9333ea)', capacity: 30,  floor: 'Ground Floor', facilities: ['Looms', 'Fabric Testing Equipment', 'Design Tables', 'AC'],           pos: [ 1.84, 0,  5.98],sz: [2.1, H, 1.64], door: 'nx', wins: ['px'], corridorPt: [ 0.5, 0.2, 5.98] },
  { id: 'lift_bot',       name: 'Lift (South)',            label: 'Lift S',         emoji: '🛗', color: '#475569', gradient: 'linear-gradient(135deg,#475569,#334155)', capacity: 8,   floor: 'Ground Floor', facilities: ['Elevator', 'Accessible'],                                         pos: [ 1.4,  0,  7.2], sz: [0.8, H, 0.8],  door: 'nx', wins: [], corridorPt: [ 0.5, 0.2, 7.2] },
  { id: 'staircase_bot',  name: 'Staircase (South)',       label: 'Stairs S',       emoji: '🪜', color: '#334155', gradient: 'linear-gradient(135deg,#475569,#334155)', capacity: 20,  floor: 'Ground Floor', facilities: ['Fire Exit', 'Staircase'],                                         pos: [ 2.2,  0,  8.54],sz: [1.6, H, 1.9],  door: 'nx', wins: [], corridorPt: [ 0.5, 0.2, 8.54] },
];

/* ═══════════════════════════════════════════════════════════════════════
   STRICT 90-DEGREE ORTHOGONAL PATHFINDING (NO CURVES)
   ═══════════════════════════════════════════════════════════════════════ */
function computePathPoints(startRoomId, targetRoomId) {
  const startRoom = ROOMS.find(r => r.id === startRoomId);
  const targetRoom = ROOMS.find(r => r.id === targetRoomId);

  if (!startRoom || !targetRoom || startRoomId === targetRoomId) return [];

  const path = [];
  const y = 0.28;

  // 1. Inside start room
  path.push([startRoom.pos[0], y, startRoom.pos[2]]);

  // 2. Door exit point of start room
  let doorStartX = startRoom.pos[0];
  let doorStartZ = startRoom.pos[2];
  if (startRoom.door === 'px') doorStartX = startRoom.pos[0] + startRoom.sz[0] / 2;
  if (startRoom.door === 'nx') doorStartX = startRoom.pos[0] - startRoom.sz[0] / 2;
  if (startRoom.door === 'pz') doorStartZ = startRoom.pos[2] + startRoom.sz[2] / 2;
  if (startRoom.door === 'nz') doorStartZ = startRoom.pos[2] - startRoom.sz[2] / 2;

  path.push([doorStartX, y, doorStartZ]);

  // 3. Step out straight into corridor line
  const sX = startRoom.corridorPt[0];
  const sZ = startRoom.corridorPt[2];
  
  if (startRoom.door === 'px' || startRoom.door === 'nx') {
    path.push([sX, y, doorStartZ]);
    if (Math.abs(doorStartZ - sZ) > 0.05) {
      path.push([sX, y, sZ]);
    }
  } else {
    path.push([doorStartX, y, sZ]);
    if (Math.abs(doorStartX - sX) > 0.05) {
      path.push([sX, y, sZ]);
    }
  }

  const tX = targetRoom.corridorPt[0];
  const tZ = targetRoom.corridorPt[2];

  // 4. Corridor Navigation
  if (Math.abs(sX - tX) < 0.2) {
    // Same vertical corridor: straight walk along Z
    path.push([sX, y, tZ]);
  } else {
    // Cross corridor navigation
    let zCross = -2.5; // Central cross passage
    if (sZ < -6.0 || tZ < -6.0) zCross = -6.8; // Top entrance corridor
    else if (sZ > 6.0 && tZ > 6.0) zCross = 7.0;  // South corridor

    // Turn 90°: Move along start corridor to cross corridor height
    if (Math.abs(sZ - zCross) > 0.05) {
      path.push([sX, y, zCross]);
    }
    // Turn 90°: Cross straight horizontally to target corridor X
    path.push([tX, y, zCross]);
    // Turn 90°: Walk along target corridor to target Z
    if (Math.abs(zCross - tZ) > 0.05) {
      path.push([tX, y, tZ]);
    }
  }

  // 5. Turn 90° & Enter target room door
  let doorTargetX = targetRoom.pos[0];
  let doorTargetZ = targetRoom.pos[2];
  if (targetRoom.door === 'px') doorTargetX = targetRoom.pos[0] + targetRoom.sz[0] / 2;
  if (targetRoom.door === 'nx') doorTargetX = targetRoom.pos[0] - targetRoom.sz[0] / 2;
  if (targetRoom.door === 'pz') doorTargetZ = targetRoom.pos[2] + targetRoom.sz[2] / 2;
  if (targetRoom.door === 'nz') doorTargetZ = targetRoom.pos[2] - targetRoom.sz[2] / 2;

  if (targetRoom.door === 'px' || targetRoom.door === 'nx') {
    path.push([tX, y, doorTargetZ]);
    path.push([doorTargetX, y, doorTargetZ]);
  } else {
    path.push([doorTargetX, y, tZ]);
    path.push([doorTargetX, y, doorTargetZ]);
  }

  // 6. Target room center
  path.push([targetRoom.pos[0], y, targetRoom.pos[2]]);

  return path;
}

/* Subdivide path segments for dots */
function getDensePathDots(points) {
  if (!points || points.length < 2) return [];
  const dense = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dist = Math.hypot(p2[0] - p1[0], p2[2] - p1[2]);
    const steps = Math.max(1, Math.floor(dist / 0.5));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      dense.push([
        p1[0] + (p2[0] - p1[0]) * t,
        0.3,
        p1[2] + (p2[2] - p1[2]) * t,
      ]);
    }
  }
  dense.push(points[points.length - 1]);
  return dense;
}

/* Generate turn-by-turn text directions */
function generateDirections(startRoomId, targetRoomId) {
  const startRoom = ROOMS.find(r => r.id === startRoomId);
  const targetRoom = ROOMS.find(r => r.id === targetRoomId);
  if (!startRoom || !targetRoom || startRoomId === targetRoomId) return [];

  const steps = [];
  steps.push(`Exit ${startRoom.name} into the corridor.`);

  const sX = startRoom.corridorPt[0];
  const sZ = startRoom.corridorPt[2];
  const tX = targetRoom.corridorPt[0];
  const tZ = targetRoom.corridorPt[2];

  if (Math.abs(sX - tX) > 0.3) {
    let passageName = "Central Cross-Corridor";
    if (sZ < -6.0 || tZ < -6.0) passageName = "North Passage";
    else if (sZ > 6.0 && tZ > 6.0) passageName = "South Passage";

    steps.push(`Walk straight to the ${passageName}.`);
    steps.push(`Turn ${tX > sX ? 'Right' : 'Left'} and walk straight across.`);
  }

  if (tZ < sZ - 0.5) {
    steps.push(`Turn Left and walk straight North.`);
  } else if (tZ > sZ + 0.5) {
    steps.push(`Turn Right and walk straight South.`);
  }

  steps.push(`Turn into ${targetRoom.name}.`);
  return steps;
}

/* ═══════════════════════════════════════════════════════════════════════
   3D AR ANIMATED PATH OVERLAY (SHARP STRAIGHT LINES & 90° TURNS)
   ═══════════════════════════════════════════════════════════════════════ */
function ARPathOverlay({ points }) {
  const dotsRef = useRef();

  useFrame(({ clock }) => {
    if (dotsRef.current) {
      dotsRef.current.children.forEach((mesh, i) => {
        const t = (clock.getElapsedTime() * 3 + i * 0.3) % (Math.PI * 2);
        mesh.scale.setScalar(0.85 + 0.35 * Math.sin(t));
      });
    }
  });

  if (!points || points.length < 2) return null;

  const denseDots = getDensePathDots(points);
  const startPt = points[0];
  const endPt = points[points.length - 1];

  return (
    <group>
      {/* Sharp 90° Straight Perpendicular AR Line (NO CURVES) */}
      <Line
        points={points}
        color="#00f3ff"
        lineWidth={6}
      />

      {/* Dense Pulsing Waypoint Spheres Along Perpendicular Route */}
      <group ref={dotsRef}>
        {denseDots.map((pt, i) => (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[0.12, 14, 14]} />
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00f3ff"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      {/* Start Location Beacon (Green) */}
      <group position={startPt}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.25, 0.8, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.9} />
        </mesh>
        <Html center distanceFactor={8} position={[0, 1.2, 0]}>
          <div className="ar-beacon ar-beacon--start">📍 START</div>
        </Html>
      </group>

      {/* Destination Location Beacon (Red Flag) */}
      <group position={endPt}>
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.3, 0.8, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.0} />
        </mesh>
        <Html center distanceFactor={8} position={[0, 1.2, 0]}>
          <div className="ar-beacon ar-beacon--end">🎯 DESTINATION</div>
        </Html>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3D ROOM COMPONENTS (DOORS, WINDOWS, MESHES)
   ═══════════════════════════════════════════════════════════════════════ */
function Door({ side, sz }) {
  const [w, h, d] = sz;
  const doorW = Math.min(0.45, Math.min(w, d) * 0.55);
  const doorH = h * 0.68;
  const t = 0.07;
  const frameW = doorW + 0.08;
  const frameH = doorH + 0.06;

  let px = 0, py = -h / 2 + doorH / 2, pz = 0;
  let argW, argD;

  if (side === 'px') { px =  w / 2 + t / 2; argW = t;      argD = doorW; }
  if (side === 'nx') { px = -w / 2 - t / 2; argW = t;      argD = doorW; }
  if (side === 'pz') { pz =  d / 2 + t / 2; argW = doorW;  argD = t; }
  if (side === 'nz') { pz = -d / 2 - t / 2; argW = doorW;  argD = t; }

  const fArgW = side === 'px' || side === 'nx' ? t * 1.5 : frameW;
  const fArgD = side === 'px' || side === 'nx' ? frameW  : t * 1.5;

  return (
    <group position={[px, py, pz]}>
      <mesh>
        <boxGeometry args={[fArgW, frameH, fArgD]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[argW, doorH - 0.04, doorW - 0.04]} />
        <meshStandardMaterial color="#92400e" roughness={0.55} emissive="#78350f" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[
        side === 'px' ?  t * 0.8 : side === 'nx' ? -t * 0.8 : doorW * 0.3,
        -doorH * 0.05,
        side === 'pz' ?  t * 0.8 : side === 'nz' ? -t * 0.8 : doorW * 0.3,
      ]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function WindowPanel({ side, sz, offset = 0 }) {
  const [w, h, d] = sz;
  const winW = Math.min(0.7, (side === 'px' || side === 'nx' ? d : w) * 0.5);
  const winH = h * 0.38;
  const winY = h * 0.08;
  const t = 0.06;

  let px = 0, pz = 0;
  let argW, argD;

  if (side === 'px') { px =  w / 2 + t / 2; pz = offset; argW = t;     argD = winW; }
  if (side === 'nx') { px = -w / 2 - t / 2; pz = offset; argW = t;     argD = winW; }
  if (side === 'pz') { pz =  d / 2 + t / 2; px = offset; argW = winW;  argD = t; }
  if (side === 'nz') { pz = -d / 2 - t / 2; px = offset; argW = winW;  argD = t; }

  return (
    <group position={[px, winY, pz]}>
      <mesh>
        <boxGeometry args={[
          side === 'px' || side === 'nx' ? t : winW + 0.08,
          winH + 0.08,
          side === 'pz' || side === 'nz' ? t : winW + 0.08,
        ]} />
        <meshStandardMaterial color="#1c1917" roughness={0.7} />
      </mesh>
      <mesh>
        <boxGeometry args={[argW, winH, argD]} />
        <meshStandardMaterial
          color="#bae6fd"
          emissive="#7dd3fc"
          emissiveIntensity={0.35}
          transparent
          opacity={0.45}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}

function BuildingFloor() {
  const sections = [
    { pos: [0,    -0.02, -6.1 ], size: [11.2, 6.1 ] },
    { pos: [-4.02,-0.02,  3.2 ], size: [ 2.5,13.2 ] },
    { pos: [-1.1, -0.02, -3.0 ], size: [ 2.2, 2.5 ] },
    { pos: [ 1.84,-0.02,  3.2 ], size: [ 3.1,13.2 ] },
  ];
  return (
    <>
      {sections.map((s, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={s.pos} receiveShadow>
          <planeGeometry args={s.size} />
          <meshStandardMaterial color="#1e293b" roughness={0.85} metalness={0.05} />
        </mesh>
      ))}
      <gridHelper args={[24, 48, '#1e3a5f', '#1e3a5f']} position={[0, -0.01, 0]} />
    </>
  );
}

function RoomBox({ room, onSelect, isStart, isTarget }) {
  const [hovered, setHovered] = useState(false);
  const [w, h, d] = room.sz;

  const isHighlighted = isStart || isTarget;

  return (
    <group position={[room.pos[0], room.pos[1] + h / 2, room.pos[2]]}>
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onSelect(room); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e)  => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={isStart ? '#22c55e' : isTarget ? '#ef4444' : room.color}
          emissive={isStart ? '#22c55e' : isTarget ? '#ef4444' : room.color}
          emissiveIntensity={hovered || isHighlighted ? 0.75 : 0.15}
          roughness={0.35}
          metalness={0.18}
          transparent
          opacity={hovered ? 0.85 : 1}
        />
      </mesh>

      <Door side={room.door} sz={room.sz} />
      {room.wins.map((side, i) => (
        <WindowPanel key={side} side={side} sz={room.sz} offset={i === 0 ? 0 : 0.3} />
      ))}

      <Html
        center
        distanceFactor={9}
        position={[0, h / 2 + (hovered || isHighlighted ? 0.75 : 0.5), 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`room-label${hovered || isHighlighted ? ' room-label--hovered' : ''}`}
          style={{ background: isStart ? '#15803d' : isTarget ? '#b91c1c' : room.color }}
        >
          <span className="room-label__emoji">{room.emoji}</span>
          <span className="room-label__name">{room.label}</span>
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SCENE (Canvas + Orbit Controls + Path)
   ═══════════════════════════════════════════════════════════════════════ */
const Scene = memo(function Scene({ onSelect, pathPoints, startRoomId, targetRoomId }) {
  return (
    <Canvas
      shadows
      camera={{ position: [2, 20, 14], fov: 52 }}
      style={{ background: 'linear-gradient(160deg,#0d1117 0%,#0f172a 60%,#0d1117 100%)' }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[10, 22, 10]} intensity={1.8} castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
      />
      <pointLight position={[-8, 10, -6]} intensity={0.6} color="#818cf8" />
      <pointLight position={[ 5,  8,  8]} intensity={0.5} color="#67e8f9" />
      <hemisphereLight skyColor="#1e3a5f" groundColor="#0d1117" intensity={0.45} />

      <Suspense fallback={null}>
        <BuildingFloor />
        {ROOMS.map((room) => (
          <RoomBox
            key={room.id}
            room={room}
            onSelect={onSelect}
            isStart={room.id === startRoomId}
            isTarget={room.id === targetRoomId}
          />
        ))}
        <ARPathOverlay points={pathPoints} />
      </Suspense>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 1]}
      />
    </Canvas>
  );
});

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT & VOICE NAVIGATION
   ═══════════════════════════════════════════════════════════════════════ */
export default function ASBlockViewer() {
  const [mode, setMode] = useState('explore'); // 'explore' | 'navigate'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startRoomId, setStartRoomId] = useState('entrance');
  const [targetRoomId, setTargetRoomId] = useState('fullstack');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceLog, setVoiceLog] = useState('');

  const [, startTransition] = useTransition();

  const handleSelect = useCallback((room) => {
    if (mode === 'navigate') {
      setTargetRoomId(room.id);
    } else {
      startTransition(() => setSelectedRoom(room));
    }
  }, [mode]);

  const handleCloseSidebar = useCallback(() => setSelectedRoom(null), []);

  const pathPoints = mode === 'navigate' ? computePathPoints(startRoomId, targetRoomId) : [];
  const directions = mode === 'navigate' ? generateDirections(startRoomId, targetRoomId) : [];

  /* Voice Text-To-Speech Synthesis */
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  /* Voice Speech Recognition (Web Speech API) */
  const listenVoice = (fieldTarget) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceLog('Listening... Speak now!');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      setVoiceLog(`Heard: "${speechResult}"`);

      // Fuzzy Match Room Name
      const matched = ROOMS.find(r =>
        speechResult.includes(r.name.toLowerCase()) ||
        speechResult.includes(r.label.toLowerCase()) ||
        r.name.toLowerCase().includes(speechResult)
      );

      if (matched) {
        if (fieldTarget === 'start') {
          setStartRoomId(matched.id);
          speakText(`Starting position set to ${matched.name}.`);
        } else {
          setTargetRoomId(matched.id);
          speakText(`Destination set to ${matched.name}.`);
        }
      } else {
        speakText("Sorry, I could not find that room. Please try again.");
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceLog('Voice error or cancelled.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleStartVoiceNavigation = () => {
    if (directions.length === 0) return;
    const startName = ROOMS.find(r => r.id === startRoomId)?.name;
    const targetName = ROOMS.find(r => r.id === targetRoomId)?.name;
    const textToSay = `Navigating from ${startName} to ${targetName}. ` + directions.join(' ');
    speakText(textToSay);
  };

  return (
    <div className="asblock-viewer-wrapper">
      {/* Header bar */}
      <header className="viewer-header">
        <span className="viewer-header__icon">🏛️</span>
        <div>
          <h1 className="viewer-header__title">AS Block — 3D AR Navigation</h1>
          <p className="viewer-header__sub">Interactive AR Floor Plan & Voice Assistant</p>
        </div>

        {/* Mode Switcher */}
        <div className="mode-switcher">
          <button
            className={`mode-btn ${mode === 'explore' ? 'active' : ''}`}
            onClick={() => setMode('explore')}
          >
            🗺️ Explore 3D
          </button>
          <button
            className={`mode-btn ${mode === 'navigate' ? 'active' : ''}`}
            onClick={() => setMode('navigate')}
          >
            🧭 AR Navigation
          </button>
        </div>
      </header>

      {/* 3D Canvas Scene */}
      <Suspense fallback={
        <div className="viewer-loading">
          <span className="viewer-loading__spinner" />
          Loading 3D AR Environment…
        </div>
      }>
        <Scene
          onSelect={handleSelect}
          pathPoints={pathPoints}
          startRoomId={startRoomId}
          targetRoomId={targetRoomId}
        />
      </Suspense>

      {/* AR Navigation Drawer Panel */}
      {mode === 'navigate' && (
        <div className="ar-nav-panel">
          <div className="ar-nav-header">
            <h3>🧭 Indoor AR Pathfinding</h3>
            <span className="ar-badge">Voice Enabled</span>
          </div>

          <div className="ar-nav-inputs">
            {/* START LOCATION SELECT */}
            <div className="input-group">
              <label>📍 You are at (Start):</label>
              <div className="select-with-mic">
                <select
                  value={startRoomId}
                  onChange={(e) => setStartRoomId(e.target.value)}
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>
                  ))}
                </select>
                <button
                  className={`mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={() => listenVoice('start')}
                  title="Speak Start Location"
                >
                  🎙️
                </button>
              </div>
            </div>

            {/* DESTINATION SELECT */}
            <div className="input-group">
              <label>🎯 Navigate to (Destination):</label>
              <div className="select-with-mic">
                <select
                  value={targetRoomId}
                  onChange={(e) => setTargetRoomId(e.target.value)}
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>
                  ))}
                </select>
                <button
                  className={`mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={() => listenVoice('target')}
                  title="Speak Destination Location"
                >
                  🎙️
                </button>
              </div>
            </div>
          </div>

          {voiceLog && <div className="voice-log">{voiceLog}</div>}

          {/* TURN-BY-TURN DIRECTIONS */}
          <div className="ar-directions">
            <h4>📋 Turn-by-Turn Guide:</h4>
            <ol>
              {directions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          {/* VOICE GUIDE ACTION */}
          <button
            className={`ar-guide-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={handleStartVoiceNavigation}
          >
            {isSpeaking ? '🔊 Speaking Directions...' : '🔊 Voice Assistant Navigation'}
          </button>
        </div>
      )}

      {/* Controls Hint */}
      <div className="viewer-controls-hint">
        <span>🖱️ Drag to rotate</span>
        <span>🔍 Scroll to zoom</span>
        <span>👆 Click room to inspect/set</span>
      </div>

      {/* Room detail sidebar (Explore mode) */}
      {mode === 'explore' && selectedRoom && (
        <RoomSidebar room={selectedRoom} onClose={handleCloseSidebar} />
      )}
    </div>
  );
}

/* Sidebar for Explore Mode */
function RoomSidebar({ room, onClose }) {
  if (!room) return null;
  return (
    <div className="room-sidebar" onClick={onClose}>
      <div className="room-sidebar__card" onClick={(e) => e.stopPropagation()}>
        <div className="room-sidebar__header" style={{ background: room.gradient }}>
          <button className="room-sidebar__close" onClick={onClose}>✕</button>
          <div className="room-sidebar__emoji">{room.emoji}</div>
          <h2 className="room-sidebar__title">{room.name}</h2>
          <span className="badge badge--floor">{room.floor}</span>
        </div>

        <div className="room-sidebar__body">
          <div className="room-stat">
            <span className="room-stat__icon">👥</span>
            <div>
              <div className="room-stat__label">Capacity</div>
              <div className="room-stat__value">{room.capacity} seats</div>
            </div>
          </div>

          <div className="facilities-section">
            <h4 className="facilities-section__title">Available Facilities</h4>
            <div className="facilities-grid">
              {room.facilities.map((f) => (
                <span key={f} className="facility-chip" style={{ '--c': room.color }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        <p className="room-sidebar__hint">Click outside to close</p>
      </div>
    </div>
  );
}
