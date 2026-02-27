import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollProgressOptions {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}

export function useScrollProgress({ triggerRef, enabled }: UseScrollProgressOptions) {
  const progressRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  // State for UI updates (throttled to ~15fps for captions/progress bar)
  const [displayProgress, setDisplayProgress] = useState(0);
  const lastUpdateRef = useRef(0);

  const setup = useCallback(() => {
    if (!enabled || !triggerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        // Throttle state updates to ~15fps
        const now = Date.now();
        if (now - lastUpdateRef.current > 66) {
          lastUpdateRef.current = now;
          setDisplayProgress(self.progress);
        }
      },
    });
  }, [enabled, triggerRef]);

  useEffect(() => {
    setup();
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [setup]);

  return { progressRef, displayProgress };
}
