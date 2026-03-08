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
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(0,117,235,0.4) 0%, transparent 70%)',
            top: '-150px',
            right: '-100px',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
            bottom: '-100px',
            left: '-150px',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Profile photo — dominant, bottom-anchored, right 60% */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '55%',
          transform: 'translateX(-50%)',
          height: '88vh',
          width: '55vw',
          maxWidth: '860px',
          zIndex: 1,
          maskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 100%)',
        }}
      >
        <Image
          src={profile.photo}
          alt={`${profile.name} — Technical Program Manager`}
          fill
          className="object-contain object-bottom"
          priority
          sizes="(max-width: 768px) 80vw, 55vw"
        />
      </motion.div>

      {/* Text — bottom left, above photo */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 6vh, 72px)',
          left: 'clamp(32px, 5vw, 80px)',
          maxWidth: '480px',
          zIndex: 2,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.95rem',
            marginBottom: '14px',
            letterSpacing: '0.04em',
          }}
        >
          Thomas Loridan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontSize: 'clamp(3.2rem, 6vw, 6.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
            lineHeight: 1.6,
            marginBottom: '28px',
            maxWidth: '360px',
          }}
        >
          I lead cross-functional programs that create measurable impact across 26 countries.
        </motion.p>

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
