import { useMemo } from 'react';
import * as THREE from 'three';
import type { CameraWaypoint } from '../../data/showcaseProperties';

export function useCameraPath(waypoints: CameraWaypoint[]) {
  const { positionCurve, lookAtCurve } = useMemo(() => {
    const posPoints = waypoints.map(
      (wp) => new THREE.Vector3(wp.position[0], wp.position[1], wp.position[2])
    );
    const lookPoints = waypoints.map(
      (wp) => new THREE.Vector3(wp.lookAt[0], wp.lookAt[1], wp.lookAt[2])
    );

    return {
      positionCurve: new THREE.CatmullRomCurve3(posPoints, false, 'centripetal', 0.5),
      lookAtCurve: new THREE.CatmullRomCurve3(lookPoints, false, 'centripetal', 0.5),
    };
  }, [waypoints]);

  function getCameraState(progress: number) {
    const t = Math.max(0, Math.min(1, progress));
    const position = positionCurve.getPoint(t);
    const lookAt = lookAtCurve.getPoint(t);
    return { position, lookAt };
  }

  return { getCameraState };
}
