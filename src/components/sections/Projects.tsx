'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GithubIcon, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Types ──────────────────────────────────────────────── */
interface ProjectKPI {
  label: string;
  value: string;
}

interface Project {
  id: string;
  name: string;
  headline: string;
  company: string;
  context: string;
  companyColor: string;
  description: string;
  kpis: ProjectKPI[];
  stack: string;
  githubUrl: string;
  accentColor: string;
  visualBg: string;
}

/* ─── Data — exact v2 copy ──────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'sonar',
    name: 'SONAR',
    headline: 'The audit that never sleeps.',
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Post-scheduling automation for 500+ EU Intermodal routes. Cut cycle time from 4 hours to 5 minutes.',
    kpis: [
      { label: 'ARR impact', value: '€13.3M' },
      { label: 'cycle time', value: '5 min' },
    ],
    stack: 'Python + AWS ECS → real-time processing · S3 → audit history at scale',
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#FF9900',
    visualBg: 'radial-gradient(ellipse at 50% 55%, #3d2000 0%, #1a0d00 52%, #080400 100%)',
  },
  {
    id: 'exec-analytics',
    name: 'Exec Analytics',
    headline: 'One source. 35 countries.',
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Unified 80+ fragmented KPIs for L7+ leadership. Consolidated fragmented reporting into a single platform.',
    kpis: [
      { label: 'KPIs unified', value: '80+' },
      { label: 'countries', value: '35' },
    ],
    stack: 'QuickSight + Glue → unified KPI layer · Python → automated refresh',
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#4da3ff',
    visualBg: 'radial-gradient(ellipse at 50% 55%, #001840 0%, #000d20 52%, #000408 100%)',
  },
  {
    id: 'oracle',
    name: 'ORACLE',
    headline: 'Ground coverage. Automated.',
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Real-time audit pipeline for 250+ ground routes across 26 EU countries. Replaced 40 hrs/month of manual analysis.',
    kpis: [
      { label: 'annual savings', value: '€250K' },
      { label: 'routes', value: '250+' },
    ],
    stack: 'Python + SQL → live coverage audit · ETL → zero manual extraction',
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#a78bfa',
    visualBg: 'radial-gradient(ellipse at 50% 55%, #18003d 0%, #080010 52%, #030008 100%)',
  },
  {
    id: 'pm-portfolio',
    name: 'Portfolio',
    headline: 'This portfolio. Open source.',
    company: 'Personal',
    context: 'Open Source',
    companyColor: '#34d399',
    description:
      'Built end-to-end with Next.js, TypeScript, and Framer Motion.',
    kpis: [
      { label: 'stack', value: 'Next.js' },
      { label: 'license', value: 'Open' },
    ],
    stack: 'Next.js + Framer Motion → performant, animated · TypeScript → zero runtime errors',
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#34d399',
    visualBg: 'radial-gradient(ellipse at 50% 55%, #003320 0%, #001208 52%, #000503 100%)',
  },
];

/* ─── Project card ───────────────────────────────────────── */
function ProjectCard({
  project,
  delay,
  inView,
}: {
  project: Project;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      style={{
        background: '#111113',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Visual block — branded color + project name ── */}
      <div
        style={{
          background: project.visualBg,
          height: '160px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Company — top left */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: project.companyColor,
            fontWeight: 600,
          }}
        >
          {project.company}
        </span>

        {/* Context — top right */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,247,0.25)',
          }}
        >
          {project.context}
        </span>

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.accentColor}20 0%, transparent 65%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Project name — centered */}
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
            color: project.accentColor,
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.name}
        </span>
      </div>

      {/* ── Text area ── */}
      <div
        style={{
          padding: '20px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: 1,
        }}
      >
        {/* Editorial headline */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
            color: '#ffffff',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {project.headline}
        </p>

        {/* Description */}
        <p
          style={{
            color: 'rgba(245,245,247,0.60)',
            fontSize: '0.8rem',
            lineHeight: 1.65,
            flex: 1,
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* ── KPI row — 2 stats, portfolio-wide #5AC8FA values ── */}
        <div
          style={{
            display: 'flex',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {project.kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingRight: i === 0 ? '12px' : 0,
                paddingLeft: i === 1 ? '12px' : 0,
                borderRight: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.56rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,247,0.3)',
                  lineHeight: 1,
                }}
              >
                {kpi.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  color: '#5AC8FA',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tags + GitHub */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'rgba(245,245,247,0.22)',
              letterSpacing: '0.03em',
              margin: 0,
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {project.stack}
          </p>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(245,245,247,0.25)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              flexShrink: 0,
              marginLeft: '8px',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.65)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.25)')
            }
          >
            <GithubIcon size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding projects-bg">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginBottom: '48px' }}
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
                  marginBottom: '16px',
                }}
              >
                Systems{' '}
                <span style={{ color: '#5AC8FA' }}>in production.</span>
              </h2>
              <p
                style={{
                  color: 'rgba(245,245,247,0.65)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: '480px',
                }}
              >
                From €13.3M automation systems to open-source PM tools — built end-to-end.
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
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 500,
                fontSize: '0.82rem',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
                alignSelf: 'flex-end',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.12)';
                el.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.07)';
                el.style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              <GithubIcon size={14} />
              All projects
              <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>

        {/* 4-column tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
