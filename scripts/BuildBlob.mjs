import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { BufferGeometry, IcosahedronGeometry } from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const outputDir = './public/models';
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Create geometry
const icosaGeo = new IcosahedronGeometry(1, 3);
mergeVertices(icosaGeo);

// Convert to non-indexed and clone into a base BufferGeometry (strips class type)
const nonIndexed = icosaGeo.toNonIndexed();
const bufferGeo = new BufferGeometry();
bufferGeo.copy(nonIndexed);

// ✅ Now it will include data.attributes + data.index
const json = bufferGeo.toJSON();

writeFileSync(`${outputDir}/blob-geometry.json`, JSON.stringify(json, null, 2));
console.log('✅ Fully serialized BufferGeometry written to blob-geometry.json');
