import * as THREE from 'three';

/**
 * Procedural terrain point cloud generator.
 * Creates realistic LiDAR-style point clouds for each showcase property
 * with terrain features matching the property character.
 */

export type TerrainProfile = 'airpark' | 'industrial' | 'horse-country';

interface TerrainOptions {
  profile: TerrainProfile;
  pointCount: number; // total points to generate
  extentX: number;    // meters width
  extentZ: number;    // meters depth
}

// Seeded pseudo-random for reproducible terrain
function mulberry32(seed: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 2D simplex-like noise using sin hash
function noise2D(x: number, z: number, seed: number): number {
  const dot = x * 12.9898 + z * 78.233 + seed * 43.7585;
  return (Math.sin(dot) * 43758.5453) % 1;
}

// Smooth noise via bilinear interpolation
function smoothNoise(x: number, z: number, scale: number, seed: number): number {
  const sx = x / scale;
  const sz = z / scale;
  const ix = Math.floor(sx);
  const iz = Math.floor(sz);
  const fx = sx - ix;
  const fz = sz - iz;

  // Smoothstep
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);

  const n00 = noise2D(ix, iz, seed);
  const n10 = noise2D(ix + 1, iz, seed);
  const n01 = noise2D(ix, iz + 1, seed);
  const n11 = noise2D(ix + 1, iz + 1, seed);

  const nx0 = n00 + (n10 - n00) * ux;
  const nx1 = n01 + (n11 - n01) * ux;
  return nx0 + (nx1 - nx0) * uz;
}

// Multi-octave fractal noise
function fbm(x: number, z: number, octaves: number, seed: number): number {
  let val = 0;
  let amp = 1;
  let freq = 1;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x * freq, z * freq, 200, seed + i * 137) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return val / max;
}

function generateAirpark(opts: TerrainOptions): THREE.BufferGeometry {
  const { pointCount, extentX, extentZ } = opts;
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const rand = mulberry32(42);
  const halfX = extentX / 2;
  const halfZ = extentZ / 2;

  // Runway: centered strip, ~60m wide, ~2300m long (7550 ft)
  const runwayHalfWidth = 30;
  const runwayHalfLength = 1150;

  for (let i = 0; i < pointCount; i++) {
    const x = (rand() - 0.5) * extentX;
    const z = (rand() - 0.5) * extentZ;

    // Base terrain: very flat Florida (3–20m elevation)
    let y = 10 + fbm(x + halfX, z + halfZ, 4, 7) * 8;

    // Runway: flat strip at 12m
    const inRunway = Math.abs(x) < runwayHalfWidth && Math.abs(z) < runwayHalfLength;
    const nearRunway = Math.abs(x) < runwayHalfWidth + 15 && Math.abs(z) < runwayHalfLength + 30;

    if (inRunway) {
      y = 12.0; // Perfectly flat runway surface
    } else if (nearRunway) {
      // Taxiway aprons
      y = 12.0 + (Math.abs(x) - runwayHalfWidth) * 0.1;
    }

    // Tree clusters (scattered around property, not on runway)
    const treeNoise = fbm(x * 3 + 500, z * 3 + 500, 3, 31);
    const isVegetation = !nearRunway && treeNoise > 0.55 && rand() < 0.3;
    if (isVegetation) {
      y += rand() * 12 + 3; // Tree canopy 3–15m above ground
    }

    // Hangar structures (along runway edges)
    const hangarZone = Math.abs(x) > runwayHalfWidth + 20 && Math.abs(x) < runwayHalfWidth + 80;
    const hangarSlot = Math.abs(z) < runwayHalfLength - 100;
    const hangarNoise = smoothNoise(x, z, 60, 99);
    const isBuilding = hangarZone && hangarSlot && hangarNoise > 0.6;
    if (isBuilding) {
      y = 12 + rand() * 8 + 4; // Building height 4–12m above ground
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Colors
    if (inRunway) {
      // Asphalt grey
      const g = 0.3 + rand() * 0.05;
      colors[i * 3] = g;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = g;
    } else if (isBuilding) {
      // Building: light grey/white
      const b = 0.55 + rand() * 0.15;
      colors[i * 3] = b;
      colors[i * 3 + 1] = b - 0.05;
      colors[i * 3 + 2] = b - 0.08;
    } else if (isVegetation) {
      // Tree canopy: greens
      colors[i * 3] = 0.05 + rand() * 0.15;
      colors[i * 3 + 1] = 0.25 + rand() * 0.3;
      colors[i * 3 + 2] = 0.05 + rand() * 0.1;
    } else {
      // Ground: grass/dirt
      const gv = fbm(x + 200, z + 200, 2, 13);
      if (gv > 0.5) {
        // Grass
        colors[i * 3] = 0.15 + rand() * 0.1;
        colors[i * 3 + 1] = 0.35 + rand() * 0.15;
        colors[i * 3 + 2] = 0.1 + rand() * 0.05;
      } else {
        // Sandy/dirt
        colors[i * 3] = 0.45 + rand() * 0.1;
        colors[i * 3 + 1] = 0.35 + rand() * 0.08;
        colors[i * 3 + 2] = 0.2 + rand() * 0.05;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function generateIndustrial(opts: TerrainOptions): THREE.BufferGeometry {
  const { pointCount, extentX, extentZ } = opts;
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const rand = mulberry32(77);

  // Main building: ~300m x 200m footprint (943K SF ≈ 87,600 m²)
  const bldgHalfX = 150;
  const bldgHalfZ = 100;
  const bldgHeight = 14; // ~45 ft clear height

  for (let i = 0; i < pointCount; i++) {
    const x = (rand() - 0.5) * extentX;
    const z = (rand() - 0.5) * extentZ;

    // Flat terrain (industrial pad site)
    let y = 8 + fbm(x + 2000, z + 2000, 3, 5) * 3;

    const inBuilding = Math.abs(x) < bldgHalfX && Math.abs(z) < bldgHalfZ;
    const onRoof = inBuilding && rand() < 0.6;

    // Parking / loading docks
    const inParking = (Math.abs(x) < bldgHalfX + 80 && Math.abs(z) < bldgHalfZ + 60) && !inBuilding;

    // Road / I-75 corridor (far edge)
    const isRoad = z > extentZ / 2 - 60 && z < extentZ / 2 - 20;

    if (onRoof) {
      y = 8 + bldgHeight + rand() * 1.5; // Roof with HVAC units
    } else if (inBuilding) {
      // Building walls (points scattered on vertical face)
      y = 8 + rand() * bldgHeight;
    } else if (inParking) {
      y = 8 + rand() * 0.3; // Flat pavement
    }

    // Scattered trees around perimeter
    const distFromBldg = Math.max(Math.abs(x) - bldgHalfX, Math.abs(z) - bldgHalfZ);
    const isTree = distFromBldg > 80 && fbm(x * 2, z * 2, 3, 19) > 0.6 && rand() < 0.25;
    if (isTree) {
      y += 4 + rand() * 10;
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Colors
    if (onRoof) {
      // White membrane roof
      const r = 0.7 + rand() * 0.1;
      colors[i * 3] = r;
      colors[i * 3 + 1] = r;
      colors[i * 3 + 2] = r;
    } else if (inBuilding) {
      // Tilt-up concrete walls
      const w = 0.55 + rand() * 0.1;
      colors[i * 3] = w;
      colors[i * 3 + 1] = w - 0.02;
      colors[i * 3 + 2] = w - 0.04;
    } else if (inParking) {
      // Asphalt
      const p = 0.25 + rand() * 0.08;
      colors[i * 3] = p;
      colors[i * 3 + 1] = p;
      colors[i * 3 + 2] = p;
    } else if (isRoad) {
      const rd = 0.28 + rand() * 0.05;
      colors[i * 3] = rd;
      colors[i * 3 + 1] = rd;
      colors[i * 3 + 2] = rd;
    } else if (isTree) {
      colors[i * 3] = 0.05 + rand() * 0.12;
      colors[i * 3 + 1] = 0.2 + rand() * 0.3;
      colors[i * 3 + 2] = 0.05 + rand() * 0.08;
    } else {
      // Grass/ground
      colors[i * 3] = 0.2 + rand() * 0.1;
      colors[i * 3 + 1] = 0.35 + rand() * 0.15;
      colors[i * 3 + 2] = 0.12 + rand() * 0.06;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function generateHorseCountry(opts: TerrainOptions): THREE.BufferGeometry {
  const { pointCount, extentX, extentZ } = opts;
  const positions = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const rand = mulberry32(123);
  const halfX = extentX / 2;
  const halfZ = extentZ / 2;

  for (let i = 0; i < pointCount; i++) {
    const x = (rand() - 0.5) * extentX;
    const z = (rand() - 0.5) * extentZ;

    // Rolling terrain — gentle hills (Marion County limestone karst)
    let y = 20 + fbm(x + halfX, z + halfZ, 5, 3) * 18;
    // Broader gentle undulations
    y += Math.sin(x * 0.003) * 5 + Math.cos(z * 0.004) * 4;

    // Fence lines (subtle linear features)
    const onFence = (Math.abs((x + 100) % 200 - 100) < 1) && rand() < 0.1;
    if (onFence) {
      y += 1.2; // Fence posts
    }

    // Oak tree clusters — the signature feature
    const oakNoise = fbm(x * 1.5 + 300, z * 1.5 + 300, 4, 47);
    const isOakCanopy = oakNoise > 0.55 && rand() < 0.35;
    if (isOakCanopy) {
      y += 5 + rand() * 15; // Live oaks: 5–20m tall with spreading canopy
    }

    // Small pond/water feature
    const pondDist = Math.sqrt((x + 100) ** 2 + (z - 50) ** 2);
    const isPond = pondDist < 40;
    if (isPond) {
      y = 15 + rand() * 0.2; // Flat water surface
    }

    // Dirt paths/trails
    const isPath = Math.abs(Math.sin(z * 0.01) * 80 - x) < 3;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Colors — pastoral palette
    if (isPond) {
      colors[i * 3] = 0.1 + rand() * 0.05;
      colors[i * 3 + 1] = 0.25 + rand() * 0.1;
      colors[i * 3 + 2] = 0.35 + rand() * 0.15;
    } else if (isOakCanopy) {
      // Rich greens with variation (live oaks)
      colors[i * 3] = 0.04 + rand() * 0.12;
      colors[i * 3 + 1] = 0.2 + rand() * 0.25;
      colors[i * 3 + 2] = 0.04 + rand() * 0.08;
    } else if (isPath) {
      // Sandy path
      colors[i * 3] = 0.5 + rand() * 0.1;
      colors[i * 3 + 1] = 0.4 + rand() * 0.08;
      colors[i * 3 + 2] = 0.25 + rand() * 0.05;
    } else {
      // Pasture grass — varies from bright green to golden
      const grassVar = fbm(x * 0.5 + 100, z * 0.5 + 100, 2, 71);
      if (grassVar > 0.55) {
        // Lush green
        colors[i * 3] = 0.15 + rand() * 0.12;
        colors[i * 3 + 1] = 0.4 + rand() * 0.2;
        colors[i * 3 + 2] = 0.1 + rand() * 0.06;
      } else {
        // Golden/dry
        colors[i * 3] = 0.4 + rand() * 0.15;
        colors[i * 3 + 1] = 0.38 + rand() * 0.12;
        colors[i * 3 + 2] = 0.15 + rand() * 0.08;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export function generateTerrain(options: TerrainOptions): THREE.Points {
  let geometry: THREE.BufferGeometry;

  switch (options.profile) {
    case 'airpark':
      geometry = generateAirpark(options);
      break;
    case 'industrial':
      geometry = generateIndustrial(options);
      break;
    case 'horse-country':
      geometry = generateHorseCountry(options);
      break;
  }

  const material = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
}
