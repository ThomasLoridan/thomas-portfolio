'use client';

import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { RefObject } from 'react';
import type { MotionValue } from 'framer-motion';

export interface ScrollRevealValues {
  ref: RefObject<HTMLDivElement | null>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}

/**
 * Scroll-linked reveal animation.
 * Element fades + rises into view as it reaches viewport center —
 * animation speed is proportional to scroll velocity (Apple-style).
 *
 * @param yDistance   vertical travel distance in px (default 40)
 * @param scaleFrom   starting scale (default 0.97, use 1.0 for text)
 * @param offsetStart scroll offset to start animating (default '0 1' = element bottom enters viewport)
 * @param offsetEnd   scroll offset at full opacity (default '0.35 0.65' ≈ viewport center)
 */
export function useScrollReveal(
  yDistance = 40,
  scaleFrom = 0.97,
  offsetStart = '0 1',
  offsetEnd = '0.35 0.65',
): ScrollRevealValues {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd] as any,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0, 1],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [yDistance, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [scaleFrom, 1],
  );

  return { ref, opacity, y, scale };
}
