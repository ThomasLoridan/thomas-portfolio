'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { GithubIcon, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Types ──────────────────────────────────────────────── */
interface ProjectMetric {
  value: string;
  label: string;
}

interface Project {
  id: string;
  companyTag: string;
  editorialHeadline: string;
  body: string;
  metrics: ProjectMetric[];
  stackLine: string;
  imagePath: string;
  imageFallbackBg: string;
  layoutDirection: 'image-left' | 'image-right';
}

/* ─── Data ────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'sonar',
    companyTag: 'AMAZON · INTERNAL TOOL',
    editorialHeadline: 'The audit that never sleeps.',
    body: 'Post-scheduling automation for 500+ EU Intermodal routes. Cut cycle time from 4 hours to 5 minutes — zero human intervention.',
    metrics: [
      { value: '€13.3M', label: 'ARR impact' },
      { value: '5 min', label: 'Cycle time' },
      { value: '500+', label: 'Routes covered' },
    ],
    stackLine: 'Python + AWS ECS → real-time route processing · S3 → audit history at scale',
    imagePath: '/images/projects/Amazon-container-Houston-2.c6ed13.jpg',
    imageFallbackBg: 'radial-gradient(ellipse at 40% 60%, #111c2e 0%, #06090f 60%, #020305 100%)',
    layoutDirection: 'image-left',
  },
  {
    id: 'oracle',
    companyTag: 'AMAZON · INTERNAL TOOL',
    editorialHeadline: 'Ground coverage. Automated.',
    body: 'Real-time audit pipeline for 250+ ground routes across 26 EU countries. Replaced 40 hours per month of manual analysis — permanently.',
    metrics: [
      { value: '€250K', label: 'Annual savings' },
      { value: '250+', label: 'Routes audited' },
      { value: '26', label: 'EU countries' },
    ],
    stackLine: 'Python + SQL → live coverage audit · ETL → zero manual extraction',
    imagePath: '/images/projects/oracle_camion_amazon.webp',
    imageFallbackBg: 'radial-gradient(ellipse at 60% 40%, #1a1000 0%, #090600 60%, #030200 100%)',
    layoutDirection: 'image-right',
  },
  {
    id: 'exec-analytics',
    companyTag: 'AMAZON · ANALYTICS PLATFORM',
    editorialHeadline: 'One source. 35 countries.',
    body: 'Unified 80+ fragmented KPIs into a single source of truth for L7+ leadership across 35 countries. Eliminated 6 hours of weekly manual consolidation.',
    metrics: [
      { value: '80+', label: 'KPIs unified' },
      { value: '35', label: 'Countries' },
      { value: '€1.5M/q', label: 'Capacity savings' },
    ],
    stackLine: 'QuickSight + AWS Glue → unified KPI layer · Python → automated refresh pipeline',
    imagePath: '/images/projects/amazon_quick_suite.jpg',
    imageFallbackBg: 'radial-gradient(ellipse at 50% 50%, #001428 0%, #000814 60%, #000408 100%)',
    layoutDirection: 'image-left',
  },
];

/* ─── Project card ───────────────────────────────────────── */
function ProjectCard({
  project,
  inView,
  delay,
}: {
  project: Project;
  inView: boolean;
  delay: number;
}) {
  const isLeft = project.layoutDirection === 'image-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}
      className={`md:grid-cols-[55fr_45fr] ${
        isLeft
          ? ''
          : 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
      }`}
    >
      {/* Image column */}
      <div style={{ position: 'relative', minHeight: '280px', overflow: 'hidden' }}>
        {/* Fallback gradient (visible when image hasn't loaded or path not set) */}
        <div style={{ position: 'absolute', inset: 0, background: project.imageFallbackBg }} />

        {/* Real image — rendered on top of fallback */}
        <Image
          src={project.imagePath}
          alt={project.editorialHeadline}
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 55vw"
        />

        {/* Gradient overlay blending image into content side */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isLeft
              ? 'linear-gradient(to right, rgba(15,15,15,0) 35%, rgba(15,15,15,0.92) 100%)'
              : 'linear-gradient(to left, rgba(15,15,15,0) 35%, rgba(15,15,15,0.92) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Mobile bottom fade */}
        <div
          className="md:hidden"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, #0f0f0f)',
          }}
        />
      </div>

      {/* Content column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
          gap: '18px',
          background: '#0f0f0f',
        }}
      >
        {/* Company tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FF9900',
            fontWeight: 500,
            margin: 0,
          }}
        >
          {project.companyTag}
        </motion.p>

        {/* Editorial headline */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.18, ease: EASE }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {project.editorialHeadline}
        </motion.h3>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.28, ease: EASE }}
          style={{
            color: 'rgba(245,245,247,0.58)',
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {project.body}
        </motion.p>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.36, ease: EASE }}
          style={{
            display: 'flex',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {project.metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                flex: 1,
                paddingRight: i < project.metrics.length - 1 ? '14px' : 0,
                paddingLeft: i > 0 ? '14px' : 0,
                borderRight:
                  i < project.metrics.length - 1
                    ? '1px solid rgba(255,255,255,0.07)'
                    : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                  color: '#5AC8FA',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.54rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,247,0.28)',
                  lineHeight: 1.2,
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stack line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.44, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.57rem',
            color: 'rgba(245,245,247,0.18)',
            letterSpacing: '0.04em',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {project.stackLine}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ background: '#0f0f0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          style={{ paddingTop: 'clamp(64px, 10vh, 112px)', paddingBottom: '56px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'rgba(245,245,247,0.5)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Projects
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                  color: '#ffffff',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  marginBottom: '14px',
                }}
              >
                Systems{' '}
                <span style={{ color: '#5AC8FA' }}>in production.</span>
              </h2>
              <p
                style={{
                  color: 'rgba(245,245,247,0.55)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: '480px',
                }}
              >
                Three automation systems. €16.3M+ ARR impact. Built end-to-end.
              </p>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '99px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.50)',
                fontWeight: 500,
                fontSize: '0.82rem',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
                alignSelf: 'flex-end',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.10)';
                el.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.06)';
                el.style.color = 'rgba(255,255,255,0.50)';
              }}
            >
              <GithubIcon size={14} />
              All projects
              <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>

        {/* Project cards — vertical stack */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} inView={inView} delay={i * 0.12} />
          ))}
        </div>

        {/* Bottom border */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ height: 'clamp(48px, 7vh, 80px)' }} />
      </div>
    </section>
  );
}
