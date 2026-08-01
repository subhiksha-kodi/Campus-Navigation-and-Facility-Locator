// src/data/campusRoadNetwork.js
// BIT Campus Road Network Graph for Road-Following Navigation

export const ROAD_NODES = {
  // Main Entrance & Gate Area
  n1:  { lat: 11.500359, lng: 77.275013, name: 'Main Entrance Gate' },
  n2:  { lat: 11.498910, lng: 77.278712, name: 'North Main Gate Junction' },
  n3:  { lat: 11.498732, lng: 77.278321, name: 'SBI ATM Junction' },

  // North-West & Sports Field Roads
  n4:  { lat: 11.497600, lng: 77.275200, name: 'North-West Sports Junction' },
  n5:  { lat: 11.496567, lng: 77.275185, name: 'Sports Field Road' },
  n6:  { lat: 11.494300, lng: 77.275300, name: 'Gate C Road' },
  n7:  { lat: 11.493500, lng: 77.274800, name: 'South-West Medical Junction' },

  // North Cross-Road (connects East & West past Agri-Land)
  n8:  { lat: 11.497500, lng: 77.276800, name: 'Agri Land North Junction' },
  n9:  { lat: 11.497500, lng: 77.277800, name: 'Research Park North Junction' },

  // Central Spine Avenue (Between IB Block & AS Block)
  n10: { lat: 11.497000, lng: 77.276900, name: 'IB / AS Block North Gate' },
  n11: { lat: 11.495800, lng: 77.276900, name: 'Central Spine Mid' },
  n12: { lat: 11.494800, lng: 77.276900, name: 'Auditorium & Learning Centre Junction' },

  // East Ring Road (Research Park, SF, Mech, Civil)
  n13: { lat: 11.497929, lng: 77.278689, name: 'Research Park Road' },
  n14: { lat: 11.496365, lng: 77.278735, name: 'SF Block Road' },
  n15: { lat: 11.495776, lng: 77.278651, name: 'Mech Block Road' },
  n16: { lat: 11.494984, lng: 77.278838, name: 'Civil Store Junction' },
  n17: { lat: 11.494078, lng: 77.278687, name: 'Power House Junction' },
  n18: { lat: 11.494260, lng: 77.279632, name: 'Boys Hostel Road' },

  // South Cafeteria & Tennis Court Loop
  n19: { lat: 11.494000, lng: 77.277200, name: 'Learning Centre South Road' },
  n20: { lat: 11.493531, lng: 77.277642, name: 'Cafeteria Plaza Junction' },
  n21: { lat: 11.493106, lng: 77.277977, name: 'Tennis Court Road' },
  n22: { lat: 11.492738, lng: 77.275358, name: 'Womens Hostel Road' },
};

// Bi-directional Road Edges connecting junctions
export const ROAD_EDGES = [
  // North Entrance Connections
  ['n1', 'n4'],
  ['n1', 'n8'],
  ['n2', 'n3'],
  ['n3', 'n9'],
  ['n9', 'n8'],
  ['n8', 'n4'],

  // West Road Corridor
  ['n4', 'n5'],
  ['n5', 'n6'],
  ['n6', 'n7'],
  ['n7', 'n22'],

  // Central Spine Avenue
  ['n8', 'n10'],
  ['n10', 'n11'],
  ['n11', 'n12'],
  ['n12', 'n19'],
  ['n19', 'n20'],

  // East Ring Road Corridor
  ['n9', 'n13'],
  ['n13', 'n14'],
  ['n14', 'n15'],
  ['n15', 'n16'],
  ['n16', 'n17'],
  ['n17', 'n18'],

  // Cross Roads (East-West Connections)
  ['n12', 'n16'], // Central Cross Road (Auditorium <-> Civil Store)
  ['n20', 'n21'], // Cafeteria <-> Tennis Court
  ['n20', 'n17'], // Cafeteria <-> Power House / Boys Hostel
  ['n7',  'n20'], // West Medical <-> South Cafeteria Cross Road
];

// Helper: Calculate Euclidean distance between two lat/lng points
function getDistance(p1, p2) {
  const dx = p1.lat - p2.lat;
  const dy = p1.lng - p2.lng;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find nearest road node ID for any target coordinate
function findNearestNode(point) {
  let nearestId = null;
  let minDist = Infinity;
  for (const [id, node] of Object.entries(ROAD_NODES)) {
    const d = getDistance(point, node);
    if (d < minDist) {
      minDist = d;
      nearestId = id;
    }
  }
  return nearestId;
}

// Dijkstra shortest path calculation along campus roads
export function computeRoadRoute(startPt, destPt) {
  const startNodeId = findNearestNode(startPt);
  const destNodeId = findNearestNode(destPt);

  if (!startNodeId || !destNodeId) {
    return [[startPt.lat, startPt.lng], [destPt.lat, destPt.lng]];
  }

  // Build Adjacency List
  const adj = {};
  for (const id of Object.keys(ROAD_NODES)) adj[id] = [];
  for (const [u, v] of ROAD_EDGES) {
    const weight = getDistance(ROAD_NODES[u], ROAD_NODES[v]);
    adj[u].push({ node: v, weight });
    adj[v].push({ node: u, weight });
  }

  // Dijkstra algorithm
  const dists = {};
  const prev = {};
  const unvisited = new Set(Object.keys(ROAD_NODES));

  for (const id of Object.keys(ROAD_NODES)) {
    dists[id] = Infinity;
    prev[id] = null;
  }
  dists[startNodeId] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let current = null;
    let minD = Infinity;
    for (const node of unvisited) {
      if (dists[node] < minD) {
        minD = dists[node];
        current = node;
      }
    }

    if (current === null || current === destNodeId) break;
    unvisited.delete(current);

    for (const neighbor of adj[current]) {
      if (!unvisited.has(neighbor.node)) continue;
      const alt = dists[current] + neighbor.weight;
      if (alt < dists[neighbor.node]) {
        dists[neighbor.node] = alt;
        prev[neighbor.node] = current;
      }
    }
  }

  // Reconstruct node path
  const pathNodes = [];
  let curr = destNodeId;
  while (curr !== null) {
    pathNodes.unshift(curr);
    curr = prev[curr];
  }

  // Assemble coordinates: start point -> road nodes -> destination point
  const routeWaypoints = [];
  routeWaypoints.push([startPt.lat, startPt.lng]);

  for (const nodeId of pathNodes) {
    const node = ROAD_NODES[nodeId];
    routeWaypoints.push([node.lat, node.lng]);
  }

  routeWaypoints.push([destPt.lat, destPt.lng]);

  return routeWaypoints;
}
