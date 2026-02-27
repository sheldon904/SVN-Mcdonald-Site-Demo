import * as THREE from 'three';
import type { EptJson, EptNodeKey, BoundingBox } from './types';

/**
 * Minimal EPT (Entwine Point Tile) loader.
 * Streams point cloud data from USGS S3 in a simple octree traversal.
 * Only loads binary/uncompressed tiles for simplicity.
 */

interface LoadedNode {
  key: EptNodeKey;
  points: THREE.BufferGeometry;
  numPoints: number;
}

interface EptLoaderOptions {
  endpoint: string; // URL to ept.json directory (no trailing slash)
  clipBox?: { minX: number; minY: number; maxX: number; maxY: number }; // EPSG:3857
  maxDepth?: number;
  pointBudget?: number;
}

export class EptLoader {
  private endpoint: string;
  private clipBox: { minX: number; minY: number; maxX: number; maxY: number } | undefined;
  private maxDepth: number;
  private pointBudget: number;
  private eptJson: EptJson | null = null;
  private hierarchy: Map<string, number> = new Map();
  private loadedNodes: LoadedNode[] = [];
  private totalPoints = 0;
  private abortController: AbortController | null = null;

  constructor(options: EptLoaderOptions) {
    this.endpoint = options.endpoint.replace(/\/ept\.json$/, '').replace(/\/$/, '');
    this.clipBox = options.clipBox;
    this.maxDepth = options.maxDepth ?? 5;
    this.pointBudget = options.pointBudget ?? 2_000_000;
  }

  async fetchEptJson(): Promise<EptJson> {
    this.abortController = new AbortController();
    const res = await fetch(`${this.endpoint}/ept.json`, {
      signal: this.abortController.signal,
    });
    if (!res.ok) throw new Error(`EPT fetch failed: ${res.status}`);
    this.eptJson = await res.json();
    return this.eptJson!;
  }

  async fetchHierarchy(key: EptNodeKey): Promise<Map<string, number>> {
    const keyStr = `${key.d}-${key.x}-${key.y}-${key.z}`;
    const url = `${this.endpoint}/ept-hierarchy/${keyStr}.json`;
    try {
      const res = await fetch(url, { signal: this.abortController?.signal });
      if (!res.ok) return new Map();
      const data: Record<string, number> = await res.json();
      for (const [k, v] of Object.entries(data)) {
        this.hierarchy.set(k, v);
      }
      return new Map(Object.entries(data));
    } catch {
      return new Map();
    }
  }

  private nodeKeyStr(key: EptNodeKey): string {
    return `${key.d}-${key.x}-${key.y}-${key.z}`;
  }

  private getNodeBounds(key: EptNodeKey): BoundingBox {
    if (!this.eptJson) throw new Error('EPT not loaded');
    const [bMinX, bMinY, bMinZ, bMaxX, bMaxY, bMaxZ] = this.eptJson.bounds;
    const size = 1 / (1 << key.d);
    return {
      minX: bMinX + key.x * size * (bMaxX - bMinX),
      minY: bMinY + key.y * size * (bMaxY - bMinY),
      minZ: bMinZ + key.z * size * (bMaxZ - bMinZ),
      maxX: bMinX + (key.x + 1) * size * (bMaxX - bMinX),
      maxY: bMinY + (key.y + 1) * size * (bMaxY - bMinY),
      maxZ: bMinZ + (key.z + 1) * size * (bMaxZ - bMinZ),
    };
  }

  private intersectsClipBox(nodeBounds: BoundingBox): boolean {
    if (!this.clipBox) return true;
    return !(
      nodeBounds.maxX < this.clipBox.minX ||
      nodeBounds.minX > this.clipBox.maxX ||
      nodeBounds.maxY < this.clipBox.minY ||
      nodeBounds.minY > this.clipBox.maxY
    );
  }

  async loadNode(key: EptNodeKey): Promise<LoadedNode | null> {
    if (!this.eptJson) return null;
    if (this.totalPoints >= this.pointBudget) return null;

    const keyStr = this.nodeKeyStr(key);
    const pointCount = this.hierarchy.get(keyStr);
    if (!pointCount || pointCount <= 0) return null;

    const nodeBounds = this.getNodeBounds(key);
    if (!this.intersectsClipBox(nodeBounds)) return null;

    // Try binary format
    const url = `${this.endpoint}/ept-data/${keyStr}.bin`;
    try {
      const res = await fetch(url, { signal: this.abortController?.signal });
      if (!res.ok) return null;

      const buffer = await res.arrayBuffer();
      const geometry = this.parseBuffer(buffer, pointCount);
      if (!geometry) return null;

      const node: LoadedNode = { key, points: geometry, numPoints: pointCount };
      this.loadedNodes.push(node);
      this.totalPoints += pointCount;
      return node;
    } catch {
      return null;
    }
  }

  private parseBuffer(buffer: ArrayBuffer, expectedPoints: number): THREE.BufferGeometry | null {
    if (!this.eptJson) return null;

    const schema = this.eptJson.schema;
    const recordSize = schema.reduce((sum, s) => sum + s.size, 0);
    const actualPoints = Math.min(expectedPoints, Math.floor(buffer.byteLength / recordSize));
    if (actualPoints === 0) return null;

    // Find X, Y, Z offsets in schema
    let byteOffset = 0;
    const fieldOffsets: Record<string, { offset: number; size: number; type: string; scale?: number; schemaOffset?: number }> = {};
    for (const entry of schema) {
      fieldOffsets[entry.name] = {
        offset: byteOffset,
        size: entry.size,
        type: entry.type,
        scale: entry.scale,
        schemaOffset: entry.offset,
      };
      byteOffset += entry.size;
    }

    const positions = new Float32Array(actualPoints * 3);
    const colors = new Float32Array(actualPoints * 3);
    const view = new DataView(buffer);

    // Calculate center for relative positioning
    const bounds = this.eptJson.bounds;
    const cx = (bounds[0] + bounds[3]) / 2;
    const cy = (bounds[1] + bounds[4]) / 2;
    const cz = (bounds[2] + bounds[5]) / 2;

    const xField = fieldOffsets['X'];
    const yField = fieldOffsets['Y'];
    const zField = fieldOffsets['Z'];
    const rField = fieldOffsets['Red'];
    const gField = fieldOffsets['Green'];
    const bField = fieldOffsets['Blue'];
    const zClassField = fieldOffsets['Classification'];

    for (let i = 0; i < actualPoints; i++) {
      const base = i * recordSize;

      // Read position
      let x = 0, y = 0, z = 0;
      if (xField) {
        x = this.readField(view, base + xField.offset, xField);
      }
      if (yField) {
        y = this.readField(view, base + yField.offset, yField);
      }
      if (zField) {
        z = this.readField(view, base + zField.offset, zField);
      }

      // Center-relative (Y-up in Three.js, Z-up in LiDAR → swap Y/Z)
      positions[i * 3] = x - cx;
      positions[i * 3 + 1] = z - cz; // LiDAR Z → Three.js Y
      positions[i * 3 + 2] = -(y - cy); // LiDAR Y → Three.js -Z

      // Colors: use RGB if available, else classification-based
      if (rField && gField && bField) {
        const r = this.readField(view, base + rField.offset, rField);
        const g = this.readField(view, base + gField.offset, gField);
        const b = this.readField(view, base + bField.offset, bField);
        // USGS often uses 16-bit RGB
        const maxVal = rField.size >= 2 ? 65535 : 255;
        colors[i * 3] = r / maxVal;
        colors[i * 3 + 1] = g / maxVal;
        colors[i * 3 + 2] = b / maxVal;
      } else if (zClassField) {
        const cls = this.readField(view, base + zClassField.offset, zClassField);
        const c = this.classificationColor(cls);
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];
      } else {
        // Elevation-based coloring
        const normalizedZ = (z - bounds[2]) / (bounds[5] - bounds[2] || 1);
        colors[i * 3] = 0.2 + normalizedZ * 0.5;
        colors[i * 3 + 1] = 0.4 + normalizedZ * 0.4;
        colors[i * 3 + 2] = 0.2 + normalizedZ * 0.3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }

  private readField(
    view: DataView,
    offset: number,
    field: { size: number; type: string; scale?: number; schemaOffset?: number }
  ): number {
    if (offset + field.size > view.byteLength) return 0;
    let val = 0;
    try {
      if (field.type === 'float' && field.size === 8) {
        val = view.getFloat64(offset, true);
      } else if (field.type === 'float' && field.size === 4) {
        val = view.getFloat32(offset, true);
      } else if (field.type === 'signed' && field.size === 4) {
        val = view.getInt32(offset, true);
      } else if (field.type === 'unsigned' && field.size === 4) {
        val = view.getUint32(offset, true);
      } else if (field.type === 'unsigned' && field.size === 2) {
        val = view.getUint16(offset, true);
      } else if (field.type === 'unsigned' && field.size === 1) {
        val = view.getUint8(offset);
      } else if (field.type === 'signed' && field.size === 2) {
        val = view.getInt16(offset, true);
      } else if (field.type === 'signed' && field.size === 1) {
        val = view.getInt8(offset);
      } else {
        // Generic fallback for unexpected combos
        val = view.getFloat64(offset, true);
      }
    } catch {
      return 0;
    }

    if (field.scale) val *= field.scale;
    if (field.schemaOffset) val += field.schemaOffset;
    return val;
  }

  private classificationColor(cls: number): [number, number, number] {
    // LAS classification colors
    switch (cls) {
      case 2: return [0.55, 0.40, 0.25]; // Ground (brown)
      case 3: return [0.2, 0.6, 0.2];    // Low vegetation
      case 4: return [0.1, 0.7, 0.1];    // Medium vegetation
      case 5: return [0.0, 0.5, 0.0];    // High vegetation (dark green)
      case 6: return [0.6, 0.3, 0.2];    // Building (red-brown)
      case 9: return [0.2, 0.4, 0.8];    // Water (blue)
      default: return [0.5, 0.5, 0.5];   // Other (grey)
    }
  }

  /**
   * Loads the point cloud via BFS octree traversal.
   * Returns an array of THREE.Points objects ready to add to the scene.
   */
  async load(): Promise<THREE.Points[]> {
    await this.fetchEptJson();
    if (!this.eptJson) throw new Error('Failed to load ept.json');

    // Load root hierarchy
    const rootKey: EptNodeKey = { d: 0, x: 0, y: 0, z: 0 };
    await this.fetchHierarchy(rootKey);

    // BFS traversal
    const queue: EptNodeKey[] = [rootKey];
    const pointsObjects: THREE.Points[] = [];

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      sizeAttenuation: true,
    });

    while (queue.length > 0 && this.totalPoints < this.pointBudget) {
      const key = queue.shift()!;
      if (key.d > this.maxDepth) continue;

      const node = await this.loadNode(key);
      if (node && node.points) {
        const points = new THREE.Points(node.points, material.clone());
        pointsObjects.push(points);
      }

      // Enqueue children
      if (key.d < this.maxDepth) {
        for (let dx = 0; dx < 2; dx++) {
          for (let dy = 0; dy < 2; dy++) {
            for (let dz = 0; dz < 2; dz++) {
              const childKey: EptNodeKey = {
                d: key.d + 1,
                x: key.x * 2 + dx,
                y: key.y * 2 + dy,
                z: key.z * 2 + dz,
              };
              const childStr = this.nodeKeyStr(childKey);
              if (this.hierarchy.has(childStr)) {
                // Check if child is a hierarchy node (value = -1 means subhierarchy)
                const val = this.hierarchy.get(childStr)!;
                if (val === -1) {
                  await this.fetchHierarchy(childKey);
                }
                queue.push(childKey);
              }
            }
          }
        }
      }
    }

    return pointsObjects;
  }

  dispose(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    for (const node of this.loadedNodes) {
      node.points.dispose();
    }
    this.loadedNodes = [];
    this.hierarchy.clear();
    this.totalPoints = 0;
  }
}
