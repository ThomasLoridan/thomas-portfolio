'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GithubIcon, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

/* ─── Bento project data ───────────────────────────────── */
interface BentoProject {
  id: string;
  name: string;
  subtitle: string;
  impact: string;
  description: string;
  tags: string[];
  githubUrl: string;
  style: 'gradient-orange' | 'dark-blue' | 'dark-indigo' | 'gradient-green';
}

const BENTO: BentoProject[] = [
  {
    id: 'sonar',
    name: 'SONAR',
    subtitle: 'Network Defense Automation',
    impact: '€13.3M ARR',
    description:
      'First production-grade post-scheduling system for 500+ Intermodal routes. Cut cycle time from 4 hours to 5 minutes for the entire EU network.',
    tags: ['Python', 'AWS ECS', 'S3', 'Automation', 'ETL'],
    githubUrl: 'https://github.com/ThomasLoridan',
    style: 'gradient-orange',
  },
  {
    id: 'exec-analytics',
    name: 'Executive Analytics',
    subtitle: 'Unified KPI Platform',
    impact: '80+ KPIs · 530 Lanes',
    description:
      'Unified fragmented reporting into a single source-of-truth for L7+ leadership across 35 countries.',
    tags: ['SQL', 'Python', 'QuickSight', 'AWS Glue', 'BI'],
    githubUrl: 'https://github.com/ThomasLoridan',
    style: 'dark-blue',
  },
  {
    id: 'oracle',
    name: 'ORACLE',
    subtitle: 'Capacity Audit Platform',
    impact: '€250K Savings',
    description:
      'Automated ground transportation auditing across 250+ routes in 26 EU countries. Replaced 40 hours/month of manual analysis.',
    tags: ['Python', 'SQL', 'QuickSight', 'ETL', '26 Countries'],
    githubUrl: 'https://github.com/ThomasLoridan',
    style: 'dark-indigo',
  },
  {
    id: 'pm-portfolio',
    name: 'PM Portfolio',
    subtitle: 'Open Source',
    impact: 'Open Source',
    description:
      'Public portfolio of PM projects with PRDs, architecture decision records, and shipped code demonstrating the full PM → Engineer execution loop.',
    tags: ['Next.js', 'TypeScript', 'Product Management'],
    githubUrl: 'https://github.com/ThomasLoridan',
    style: 'gradient-green',
  },
];

const CARD_STYLES: Record<BentoProject['style'], React.CSSProperties> = {
  'gradient-orange': {
    background: 'linear-gradient(135deg, #FF9900 0%, #e65c00 100%)',
    color: '#ffffff',
  },
  'dark-blue': {
    background: '#0a1628',
    color: '#ffffff',
  },
  'dark-indigo': {
    background: '#0f0a2a',
    color: '#ffffff',
  },
  'gradient-green': {
    background: 'linear-gradient(135deg, #00a86b 0%, #007a4d 100%)',
    color: '#ffffff',
  },
};

const TEXT_MUTED: Record<BentoProject['style'], string> = {
  'gradient-orange': 'rgba(255,255,255,0.7)',
  'dark-blue': 'rgba(255,255,255,0.55)',
  'dark-indigo': 'rgba(255,255,255,0.55)',
  'gradient-green': 'rgba(255,255,255,0.7)',
};

const TAG_STYLE: Record<BentoProject['style'], React.CSSProperties> = {
  'gradient-orange': {
    background: 'rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  'dark-blue': {
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  'dark-indigo': {
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  'gradient-green': {
    background: 'rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
};

function ProjectCard({ project, delay, inView }: { project: BentoProject; delay: number; inView: boolean }) {
  const baseStyle = CARD_STYLES[project.style];
  const muted = TEXT_MUTED[project.style];
  const tagStyle = TAG_STYLE[project.style];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        ...baseStyle,
        borderRadius: '20px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: '320px',
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: muted,
        }}
      >
        {project.subtitle}
      </p>

      {/* Impact number */}
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
          lineHeight: 1,
          color: '#ffffff',
        }}
      >
        {project.impact}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.2rem',
          color: '#ffffff',
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        style={{
          color: muted,
          fontSize: '0.88rem',
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              ...tagStyle,
              fontSize: '0.72rem',
              padding: '3px 10px',
              borderRadius: '99px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          color: muted,
          textDecoration: 'none',
          transition: 'color 0.2s',
          marginTop: '4px',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = muted)}
      >
        <GithubIcon size={13} />
        View on GitHub
      </a>
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────── */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding projects-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem,5vw,4.5rem)',
              color: '#ffffff',
              lineHeight: 1.05,
            }}
          >
            Things I&apos;ve{' '}
            <span style={{ color: '#5AC8FA' }}>shipped</span>
          </h2>
        </motion.div>

        {/* 2×2 Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
          className="grid-cols-1 sm:grid-cols-2"
        >
          {BENTO.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '99px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(255,255,255,0.14)';
              el.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(255,255,255,0.08)';
              el.style.color = 'rgba(255,255,255,0.75)';
            }}
          >
            <GithubIcon size={15} />
            See all projects on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
