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
  subtitle: string;
  description: string;
  kpis: ProjectKPI[];
  tags: string[];
  githubUrl: string;
  accentColor: string;
  visualBg: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'sonar',
    name: 'SONAR',
    subtitle: 'Network Defense Automation',
    description:
      'Production-grade post-scheduling system for EU Intermodal. Cut cycle time from 4 hours to 5 minutes across the entire network.',
    kpis: [
      { label: 'ARR impact', value: '€13.3M' },
      { label: 'cycle time', value: '5 min' },
      { label: 'routes', value: '500+' },
    ],
    tags: ['Python', 'AWS ECS', 'S3', 'ETL'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#FF9900',
    visualBg: 'radial-gradient(ellipse at 60% 40%, #3d1f00 0%, #1c0a00 55%, #0a0400 100%)',
  },
  {
    id: 'exec-analytics',
    name: 'Exec Analytics',
    subtitle: 'Unified KPI Platform',
    description:
      'Single source of truth for L7+ leadership across 35 countries — consolidating 80+ KPIs from fragmented systems.',
    kpis: [
      { label: 'KPIs unified', value: '80+' },
      { label: 'countries', value: '35' },
    ],
    tags: ['SQL', 'Python', 'QuickSight', 'AWS Glue'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#4da3ff',
    visualBg: 'radial-gradient(ellipse at 60% 40%, #001840 0%, #000d20 55%, #000508 100%)',
  },
  {
    id: 'oracle',
    name: 'ORACLE',
    subtitle: 'Capacity Audit Platform',
    description:
      'Automated ground transport auditing across 26 EU countries. Replaced 40 hours/month of manual analysis.',
    kpis: [
      { label: 'annual savings', value: '€250K' },
      { label: 'routes', value: '250+' },
      { label: 'saved / month', value: '40 hrs' },
    ],
    tags: ['Python', 'SQL', 'ETL', '26 countries'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#a78bfa',
    visualBg: 'radial-gradient(ellipse at 60% 40%, #18003d 0%, #08000f 55%, #040008 100%)',
  },
  {
    id: 'pm-portfolio',
    name: 'Portfolio',
    subtitle: 'This website',
    description:
      'Open-source portfolio with PRDs, architecture records, and shipped code — the full PM → engineer execution loop.',
    kpis: [
      { label: 'stack', value: 'Next.js' },
      { label: 'license', value: 'Open' },
    ],
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#34d399',
    visualBg: 'radial-gradient(ellipse at 60% 40%, #003320 0%, #001208 55%, #000604 100%)',
  },
];

/* ─── Project card (iOS-tile style) ─────────────────────── */
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
      {/* Visual top — branded gradient + project name */}
      <div
        style={{
          background: project.visualBg,
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Centered glow */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.accentColor}28 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
            color: project.accentColor,
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.name}
        </span>
      </div>

      {/* Text area */}
      <div
        style={{
          padding: '24px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: 1,
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,247,0.38)',
          }}
        >
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            color: 'rgba(245,245,247,0.78)',
            fontSize: '0.875rem',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* ── KPI stats — Apple style ──
            label (muted, tiny, uppercase) above
            value (accent color, bold, large) below        */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexWrap: 'wrap',
          }}
        >
          {project.kpis.map((kpi) => (
            <div key={kpi.label} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,247,0.35)',
                  lineHeight: 1,
                }}
              >
                {kpi.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                  color: project.accentColor,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tags + GitHub icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '6px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'rgba(245,245,247,0.28)',
              letterSpacing: '0.04em',
            }}
          >
            {project.tags.join(' · ')}
          </p>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(245,245,247,0.32)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              flexShrink: 0,
              marginLeft: '8px',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.75)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.32)')
            }
          >
            <GithubIcon size={14} />
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
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
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
                Things I&apos;ve{' '}
                <span style={{ color: '#5AC8FA' }}>shipped</span>.
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
                color: 'rgba(255,255,255,0.65)',
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
                el.style.color = 'rgba(255,255,255,0.65)';
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
