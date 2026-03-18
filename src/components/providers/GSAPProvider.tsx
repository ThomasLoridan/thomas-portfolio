'use client';

/**
 * GSAPProvider — global GSAP + ScrollTrigger configuration.
 *
 * Responsibilities:
 *  1. Registers ScrollTrigger (via the gsap lib singleton).
 *  2. Sets global GSAP defaults that match the Apple easing system.
 *  3. Syncs ScrollTrigger with the browser's scroll on mount.
 *  4. Cleans up all ScrollTrigger instances on unmount (prevents
 *     stale triggers during Next.js hot reloads in development).
 *
 * Framer Motion coexistence notes:
 *  - GSAP and Framer Motion each manage their own RAF (requestAnimationFrame)
 *    loop. They do NOT share a scheduler, so running both is safe.
 *  - Do NOT apply GSAP animations to elements already controlled by
 *    Framer Motion's `animate` prop — pick one per element.
 *  - `will-change: transform` set by Framer Motion on animated elements
 *    is compatible with GSAP transforms on different elements.
 */

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apple expo easing as GSAP default — matches --ease-expo CSS token
    gsap.defaults({
      ease: 'power4.out',
      duration: 0.9,
    });

    // Sync ScrollTrigger with the actual scroll position on mount.
    // Prevents a flash of un-triggered animations on first load.
    ScrollTrigger.refresh();

    return () => {
      // Kill all ScrollTrigger instances on unmount.
      // Prevents stale triggers accumulating during Next.js HMR.
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
