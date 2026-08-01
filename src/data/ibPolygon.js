// src/data/ibPolygon.js
// Legacy approximate polygon coordinates (kept for Sports Ground only).
// All other blocks now use accurate GeoJSON files in src/data/*.json

export const ibPolygon = [
  [11.49725, 77.27615],
  [11.49725, 77.27665],
  [11.49678, 77.27665],
  [11.49678, 77.27615]
];

export const asPolygon = [
  [11.49715, 77.27730],
  [11.49715, 77.27780],
  [11.49670, 77.27780],
  [11.49670, 77.27730]
];

export const sfPolygon = [
  [11.49655, 77.27845],
  [11.49655, 77.27895],
  [11.49615, 77.27895],
  [11.49615, 77.27845]
];

// Only Sports Ground remains here — all other polygons are now rendered
// from accurate GeoJSON files via the GEOJSON_LAYERS array in CampusMap.jsx
export const BUILDING_POLYGONS = [
  {
    id: 5,
    name: 'Sports Ground',
    code: 'SPORTS-FLD',
    color: '#15803d',
    fillColor: '#4ade80',
    positions: [
      [11.49695, 77.27480],
      [11.49695, 77.27560],
      [11.49615, 77.27560],
      [11.49615, 77.27480]
    ]
  }
];
