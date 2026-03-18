/**
 * GSAP singleton — registers ScrollTrigger once, SSR-safe.
 * Import from here instead of directly from 'gsap' to guarantee
 * the plugin is always registered before use.
 *
 * Framer Motion coexistence: GSAP uses imperative refs and its own
 * RAF loop. Framer Motion runs its own RAF loop independently.
 * They do not share state and will not conflict.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
