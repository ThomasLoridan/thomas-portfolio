'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';
import { profile } from '@/data/profile';

const STATS = [
  { value: '€30M+', label: 'Portfolio managed' },
  { value: '26', label: 'Countries' },
  { value: '8+', label: 'Years experience' },
  { value: '4', label: 'Amazon promos' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="about-bg section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp}>
            <p className="section-label mb-3">About Me</p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold font-heading text-[#0a0a0a] leading-tight">
              Builder. Strategist.
              <br />
              <span style={{ color: '#0075eb' }}>Executor.</span>
            </h2>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="light-card rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-extrabold font-heading text-[#0a0a0a] mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
            {/* Photo */}
            <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden w-[240px] h-[310px] border border-gray-200 shadow-lg">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                    sizes="240px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={stagger} className="flex flex-col gap-6">
              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-600 leading-relaxed"
              >
                {profile.bio}
              </motion.p>

              {/* Quick facts */}
              <motion.div variants={stagger} className="flex flex-col gap-3 pt-2">
                {[
                  { label: 'Location', value: 'Luxembourg · Remote-friendly' },
                  { label: 'Languages', value: 'French · English · Spanish' },
                  { label: 'Focus', value: 'PM IC4/IC5 at GAFAM companies' },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="text-xs font-mono text-gray-400 tracking-wider uppercase w-24 shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">{value}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="pt-2">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-black"
                >
                  Connect on LinkedIn
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
