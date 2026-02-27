import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EptLoader } from '../../lib/potree/EptLoader';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

export type PointCloudStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface UsePointCloudOptions {
  property: ShowcaseProperty;
  scene: THREE.Scene | null;
  enabled: boolean;
  timeoutMs?: number;
}

export function usePointCloud({ property, scene, enabled, timeoutMs = 15000 }: UsePointCloudOptions) {
  const [status, setStatus] = useState<PointCloudStatus>('idle');
  const loaderRef = useRef<EptLoader | null>(null);
  const pointsRef = useRef<THREE.Points[]>([]);

  const load = useCallback(async () => {
    if (!enabled || !scene) return;
    setStatus('loading');

    const loader = new EptLoader({
      endpoint: property.eptEndpoint,
      clipBox: property.boundingBox,
      maxDepth: 4,
      pointBudget: 2_000_000,
    });
    loaderRef.current = loader;

    // Timeout race
    const timeoutPromise = new Promise<'timeout'>((resolve) =>
      setTimeout(() => resolve('timeout'), timeoutMs)
    );

    try {
      const result = await Promise.race([loader.load(), timeoutPromise]);

      if (result === 'timeout') {
        loader.dispose();
        setStatus('error');
        return;
      }

      const points = result as THREE.Points[];
      pointsRef.current = points;
      for (const p of points) {
        scene.add(p);
      }
      setStatus('loaded');
    } catch (err) {
      console.warn('Point cloud load error:', err);
      loader.dispose();
      setStatus('error');
    }
  }, [enabled, scene, property.eptEndpoint, property.boundingBox, timeoutMs]);

  useEffect(() => {
    load();

    return () => {
      if (loaderRef.current) {
        loaderRef.current.dispose();
        loaderRef.current = null;
      }
      for (const p of pointsRef.current) {
        if (p.parent) p.parent.remove(p);
        p.geometry.dispose();
        if (p.material instanceof THREE.Material) {
          p.material.dispose();
        }
      }
      pointsRef.current = [];
    };
  }, [load]);

  return { status };
}
