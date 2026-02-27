import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { usePointCloud } from './usePointCloud';
import { useCameraPath } from './useCameraPath';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface PointCloudViewerProps {
  property: ShowcaseProperty;
  progressRef: React.RefObject<number>;
  onStatusChange: (status: 'loading' | 'loaded' | 'error') => void;
}

const PointCloudViewer = ({ property, progressRef, onStatusChange }: PointCloudViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rafRef = useRef<number>(0);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const { getCameraState } = useCameraPath(property.waypoints);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x181818, 1);

    const newScene = new THREE.Scene();
    newScene.fog = new THREE.FogExp2(0x181818, 0.0003);

    // Ambient light for point visibility
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    newScene.add(ambient);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
    camera.position.set(0, 2000, 0);

    rendererRef.current = renderer;
    sceneRef.current = newScene;
    cameraRef.current = camera;
    setScene(newScene);

    // Handle resize
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      renderer.forceContextLoss();
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      setScene(null);
    };
  }, []);

  // Load point cloud
  const { status } = usePointCloud({
    property,
    scene,
    enabled: scene !== null,
  });

  useEffect(() => {
    if (status === 'loading' || status === 'loaded' || status === 'error') {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  // Animation loop
  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const currentScene = sceneRef.current;
    if (!renderer || !camera || !currentScene) return;

    const progress = progressRef.current ?? 0;
    const { position, lookAt } = getCameraState(progress);

    camera.position.copy(position);
    camera.lookAt(lookAt);
    renderer.render(currentScene, camera);

    rafRef.current = requestAnimationFrame(animate);
  }, [getCameraState, progressRef]);

  useEffect(() => {
    if (status === 'loaded') {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ touchAction: 'none' }}
    />
  );
};

export default PointCloudViewer;
