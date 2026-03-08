'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Radial glow behind photo */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(ellipse at center bottom, rgba(60,90,255,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Profile photo — dominant, centered, bottom-anchored */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '92vh',
          width: 'auto',
          zIndex: 1,
        }}
      >
        <Image
          src={profile.photo}
          alt={profile.name}
          height={1200}
          width={800}
          priority
          unoptimized={false}
          style={{
            height: '92vh',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            maskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Text — bottom left, on top of photo */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(48px, 7vh, 80px)',
          left: 'clamp(32px, 6vw, 96px)',
          zIndex: 2,
          maxWidth: '520px',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', fontFamily: 'Inter', marginBottom: '12px', letterSpacing: '0.04em' }}
        >
          Thomas Loridan
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: '20px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span style={{ color: '#fff', display: 'block' }}>Building bridges</span>
          <span style={{ color: '#fff', display: 'block' }}>between business</span>
          <span style={{ display: 'block' }}>
            <span style={{ color: '#fff' }}>& </span>
            <span style={{ color: '#5AC8FA' }}>technology.</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
            lineHeight: 1.65,
            marginBottom: '28px',
            maxWidth: '400px',
          }}
        >
          I lead cross-functional programs that create measurable impact across 26 countries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('experience')}
            style={{
              padding: '10px 22px',
              borderRadius: '980px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '0.9rem',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
            }}
          >
            View my work ↓
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              borderRadius: '980px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '0.9rem',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            LinkedIn <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
