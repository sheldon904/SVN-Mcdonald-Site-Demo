// EPSG:3857 (Web Mercator) ↔ WGS84 (lat/lon) conversions

const EARTH_RADIUS = 6378137;

export function lonToMercatorX(lon: number): number {
  return (lon * Math.PI / 180) * EARTH_RADIUS;
}

export function latToMercatorY(lat: number): number {
  const latRad = lat * Math.PI / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2)) * EARTH_RADIUS;
}

export function mercatorXToLon(x: number): number {
  return (x / EARTH_RADIUS) * (180 / Math.PI);
}

export function mercatorYToLat(y: number): number {
  return (2 * Math.atan(Math.exp(y / EARTH_RADIUS)) - Math.PI / 2) * (180 / Math.PI);
}

export function latLonToMercator(lat: number, lon: number): [number, number] {
  return [lonToMercatorX(lon), latToMercatorY(lat)];
}
