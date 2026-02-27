import { useRef, useEffect, useCallback } from 'react';
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

  const setup = useCallback(() => {
    if (!enabled || !triggerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
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

  return progressRef;
}
