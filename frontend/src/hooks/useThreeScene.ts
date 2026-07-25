/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useRef, useState, useCallback } from 'react';
import { createScene, loadAvatar, SceneContext } from '../lib/three/scene';
import { updateWordList, animateFrame } from '../lib/three/animation';

export function useThreeScene(containerId: string, labelId: string) {
  const [isInitialized, setIsInitialized] = useState(false);

  const stateRef = useRef({
    flag: false,
    pending: false,
    animations: [] as any[],
    characters: [] as any[],
    avatar: null as any,
    speed: 0.12,
    pause: 100,
    animate: () => {}, // No-op function to prevent legacy scripts from crashing
  });

  const sceneCtxRef = useRef<SceneContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setSpeed = useCallback((val: number) => {
    stateRef.current.speed = val;
    stateRef.current.pause = Math.max(0, 400 - val * 1000);
  }, []);

  const queueWords = useCallback((data: string[]) => {
    updateWordList(data, stateRef.current);
    stateRef.current.pending = true;
  }, []);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.querySelector('canvas')) {
      setIsInitialized(true);
      return;
    }

    const sceneCtx = createScene(container);
    sceneCtxRef.current = sceneCtx;

    const renderLoop = () => {
      if (stateRef.current.pending) {
        animateFrame(stateRef.current, labelId);
      }
      
      if (sceneCtxRef.current) {
        sceneCtxRef.current.renderer.render(
          sceneCtxRef.current.scene,
          sceneCtxRef.current.camera
        );
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    loadAvatar(sceneCtx, stateRef.current, () => {
      // Avatar is loaded and added to scene
    });
    
    setIsInitialized(true);
    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sceneCtx.renderer && sceneCtx.renderer.domElement) {
        container.removeChild(sceneCtx.renderer.domElement);
        sceneCtx.renderer.dispose();
      }
    };
  }, [containerId, labelId]);

  return { isInitialized, queueWords, setSpeed };
}
