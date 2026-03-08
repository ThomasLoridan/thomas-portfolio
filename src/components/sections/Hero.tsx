'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' as const },
  },
};

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-gradient-bg overflow-hidden"
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

      <div className="relative max-w-6xl mx-auto px-6 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7"
          >
            {/* Availability pill */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                Available for PM roles · 2025
              </span>
            </motion.div>

            {/* Massive headline */}
            <motion.h1
              variants={item}
              className="text-[clamp(3.5rem,8vw,7rem)] font-extrabold font-heading leading-[0.88] tracking-tight"
            >
              <span className="text-white block">{profile.name.split(' ')[0]}</span>
              <span className="text-gradient block">{profile.name.split(' ')[1]}</span>
            </motion.h1>

            {/* Role */}
            <motion.p variants={item} className="text-base font-mono text-white/50 tracking-widest uppercase">
              {profile.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-xl font-light text-white/75 max-w-lg leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => scrollTo('experience')}
                className="px-6 py-3 bg-white text-[#0a0a0a] font-semibold rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
              >
                View my work
              </button>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium rounded-full flex items-center gap-2 transition-all duration-200 text-sm hover:-translate-y-0.5"
              >
                LinkedIn <ExternalLink size={13} />
              </a>
            </motion.div>

            {/* Floating stat badges */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card px-4 py-2.5 rounded-2xl flex flex-col"
                >
                  <span className="text-white font-bold text-lg leading-none">{stat.value}</span>
                  <span className="text-white/40 text-[11px] mt-1 font-mono">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative animate-float">
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-emerald-500/10 blur-3xl scale-125 animate-pulse-glow" />

              {/* Photo card */}
              <div className="relative gradient-border rounded-2xl overflow-hidden w-[270px] h-[350px] md:w-[300px] md:h-[390px] lg:w-[320px] lg:h-[420px]">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} — Technical Program Manager`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 270px, (max-width: 1024px) 300px, 320px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-mono">Scroll</span>
        <div className="animate-scroll-bounce">
          <ArrowDown size={14} className="text-white/30" />
        </div>
      </motion.div>
    </section>
  );
}
