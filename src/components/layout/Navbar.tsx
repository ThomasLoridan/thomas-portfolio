'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const DARK_SECTIONS = new Set(['hero', 'experience', 'testimonials', 'projects', 'contact']);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Detect which section the navbar is currently over
      let activeDark = true; // default to dark (hero is first)
      document.querySelectorAll<HTMLElement>('section[id]').forEach((el) => {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y + 60 >= top && y + 60 < bottom) {
          activeDark = DARK_SECTIONS.has(el.id);
        }
      });
      setIsHero(activeDark);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Color scheme: white text on dark hero, dark text on light sections
  const onDark = isHero;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled && !onDark
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 py-3 shadow-sm'
            : scrolled && onDark
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-lg font-extrabold font-heading transition-colors tracking-tight ${
              onDark ? 'text-white hover:text-blue-400' : 'text-[#0a0a0a] hover:text-[#0075eb]'
            }`}
            aria-label="Back to top"
          >
            TL
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  activeSection === href
                    ? onDark ? 'text-white' : 'text-[#0a0a0a]'
                    : onDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-[#0a0a0a]'
                }`}
              >
                {label}
                {activeSection === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${onDark ? 'bg-blue-400' : 'bg-[#0075eb]'}`}
                  />
                )}
              </button>
            ))}

            {/* Get in touch CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                onDark
                  ? 'bg-white text-[#0a0a0a] hover:bg-gray-100'
                  : 'bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Get in touch
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-1.5 transition-colors ${
              onDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-[#0a0a0a]'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-gray-200 flex flex-col p-8 gap-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-extrabold font-heading text-[#0a0a0a] tracking-tight">TL</span>
                <button
                  className="text-gray-400 hover:text-[#0a0a0a] p-1.5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="text-left text-xl font-medium text-gray-600 hover:text-[#0a0a0a] transition-colors font-heading"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('contact')}
                  className="mt-4 btn-black self-start"
                >
                  Get in touch
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
