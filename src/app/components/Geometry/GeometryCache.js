import { IcosahedronGeometry } from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils';

// Caches for high and low-resolution geometries
let cachedHighResGeo = null;
let cachedLowResGeo = null;

// Helper function to create a new IcosahedronGeometry
const createIcosahedronGeometry = (radius, detailLevel) => {
  const geometry = new IcosahedronGeometry(radius, detailLevel);
  return mergeVertices(geometry); // Merge duplicate vertices for optimization
};

// Function to get the cached geometry (either high-res or low-res)
export const getCachedGeometry = (shouldReduceQuality) => {
  if (shouldReduceQuality) {
    if (!cachedLowResGeo) {
      cachedLowResGeo = createIcosahedronGeometry(1, 40); // Lower detail
    }
    return cachedLowResGeo;
  } else {
    if (!cachedHighResGeo) {
      cachedHighResGeo = createIcosahedronGeometry(1, 80); // Higher detail
    }
    return cachedHighResGeo;
  }
};

// Function to dispose of geometry and its attributes
const disposeGeometry = (geometry) => {
  if (geometry) {
    // Loop through all attributes of the geometry
    Object.keys(geometry.attributes).forEach((key) => {
      const attribute = geometry.attributes[key];

      // Check if the attribute is a BufferAttribute before calling dispose
      if (attribute && attribute.isBufferAttribute) {
        // Only call dispose if it's a valid BufferAttribute
        if (typeof attribute.dispose === 'function') {
          attribute.dispose(); // Dispose of the attribute's buffer
        }
      }
    });

    
    // Dispose the geometry itself if possible
    if (typeof geometry.dispose === 'function') {
      geometry.dispose(); // Dispose of the geometry's resources
    }
  }
};


// Function to clear the cached geometries
export const clearGeometryCache = () => {
  disposeGeometry(cachedHighResGeo);
  cachedHighResGeo = null;

  disposeGeometry(cachedLowResGeo);
  cachedLowResGeo = null;
};

// Additional cache management for other resources (like textures, materials, etc.)
let cachedTexture = null;
let cachedMaterial = null;

// Function to clear all cached resources
export const clearAllCache = () => {
  clearGeometryCache(); // Clear cached geometries

  // Dispose of textures if cached
  if (cachedTexture) {
    cachedTexture.dispose?.();
    cachedTexture = null;
  }

  // Dispose of materials if cached
  if (cachedMaterial) {
    cachedMaterial.dispose?.();
    cachedMaterial = null;
  }
};




// import { BufferGeometryLoader } from 'three/examples/jsm/loaders/BufferGeometryLoader';

// let cachedGeo = null;

// export async function getCachedGeometry() {
//   if (cachedGeo) return cachedGeo;

//   const res = await fetch('/models/blob-geometry.json');

//   if (!res.ok) {
//     throw new Error(`Failed to load geometry: ${res.statusText}`);
//   }

//   const json = await res.json();

//   // Debug log
//   console.log('Loaded JSON:', json);

//   const loader = new BufferGeometryLoader();
//   cachedGeo = loader.parse(json);

//   return cachedGeo;
// }