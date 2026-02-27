import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { generateTerrain } from '../../lib/potree/TerrainGenerator';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

export type PointCloudStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface UsePointCloudOptions {
  property: ShowcaseProperty;
  scene: THREE.Scene | null;
  enabled: boolean;
}

export function usePointCloud({ property, scene, enabled }: UsePointCloudOptions) {
  const [status, setStatus] = useState<PointCloudStatus>('idle');
  const pointsRef = useRef<THREE.Points | null>(null);

  const load = useCallback(() => {
    if (!enabled || !scene) return;
    setStatus('loading');

    // Generate on next frame to avoid blocking UI
    requestAnimationFrame(() => {
      try {
        const points = generateTerrain({
          profile: property.terrainProfile,
          pointCount: property.pointCount,
          extentX: property.terrainExtent.x,
          extentZ: property.terrainExtent.z,
        });

        pointsRef.current = points;
        scene.add(points);
        setStatus('loaded');
      } catch (err) {
        console.warn('Terrain generation error:', err);
        setStatus('error');
      }
    });
  }, [enabled, scene, property.terrainProfile, property.pointCount, property.terrainExtent]);

  useEffect(() => {
    load();

    return () => {
      if (pointsRef.current) {
        if (pointsRef.current.parent) {
          pointsRef.current.parent.remove(pointsRef.current);
        }
        pointsRef.current.geometry.dispose();
        if (pointsRef.current.material instanceof THREE.Material) {
          pointsRef.current.material.dispose();
        }
        pointsRef.current = null;
      }
    };
  }, [load]);

  return { status };
}
