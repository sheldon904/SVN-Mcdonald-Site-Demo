// Type declarations for Google Maps 3D API (alpha)
// The maps3d library is not yet in @types/google.maps

declare namespace google.maps.maps3d {
  class Map3DElement extends HTMLElement {
    center: { lat: number; lng: number; altitude: number };
    heading: number;
    tilt: number;
    range: number;
    defaultLabelsDisabled: boolean;
  }
}
