import { useEffect, useRef, useState } from 'react';
import { formatNumberWithSpaces, interpolateCounter } from '../utils/pricing';

interface AnimatedCounterProps {
  target: number;
  triggered: boolean;
}

export function AnimatedCounter({ target, triggered }: AnimatedCounterProps) {
  const [val, setVal] = useState(target);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!triggered || animatedRef.current) return;
    animatedRef.current = true;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVal(target);
      return;
    }

    const duration = 1100;
    let startTime: number | null = null;
    let rafId = 0;

    setVal(0);
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setVal(interpolateCounter(target, progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target]);

  return <span>{formatNumberWithSpaces(val)}</span>;
}
