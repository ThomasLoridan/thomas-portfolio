'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers: Array<{ observer: IntersectionObserver; element: Element }> = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: `-${offset}px 0px -55% 0px`,
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, offset]);

  return activeSection;
}
