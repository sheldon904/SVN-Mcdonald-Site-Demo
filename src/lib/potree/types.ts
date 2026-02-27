export interface EptJson {
  bounds: [number, number, number, number, number, number]; // [minX, minY, minZ, maxX, maxY, maxZ]
  boundsConforming: [number, number, number, number, number, number];
  dataType: string; // "laszip" | "binary" | "zstandard"
  hierarchyType: string; // "json"
  points: number;
  schema: EptSchemaEntry[];
  span: number;
  srs?: {
    authority?: string;
    horizontal?: string;
    wkt?: string;
  };
  version: string;
}

export interface EptSchemaEntry {
  name: string;
  type: string;
  size: number;
  scale?: number;
  offset?: number;
}

export interface EptNodeKey {
  d: number; // depth
  x: number;
  y: number;
  z: number;
}

export interface BoundingBox {
  minX: number; minY: number; minZ: number;
  maxX: number; maxY: number; maxZ: number;
}
