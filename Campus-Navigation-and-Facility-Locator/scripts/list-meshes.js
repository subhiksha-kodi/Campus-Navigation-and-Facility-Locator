import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../public/models/ASBlock1.glb');
const buffer = fs.readFileSync(filePath);

const chunkLength = buffer.readUInt32LE(12);
const jsonString = buffer.slice(20, 20 + chunkLength).toString('utf8');
const gltf = JSON.parse(jsonString);

console.log('\n=== GLB Mesh Names ===');
(gltf.meshes || []).forEach((mesh, i) => {
  console.log(`[${i}] ${mesh.name}`);
});

console.log('\n=== GLB Node Names (with mesh) ===');
(gltf.nodes || []).forEach((node, i) => {
  if (node.mesh !== undefined) {
    console.log(`[node ${i}] name="${node.name}" → mesh[${node.mesh}] "${gltf.meshes[node.mesh]?.name}"`);
  }
});
