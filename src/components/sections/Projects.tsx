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
  company: string;
  context: string;
  companyColor: string;
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
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Production-grade post-scheduling system for 500+ EU Intermodal routes. Cut cycle time from 4 hours to 5 minutes across the entire network.',
    kpis: [
      { label: 'ARR impact', value: '€13.3M' },
      { label: 'cycle time', value: '5 min' },
      { label: 'routes', value: '500+' },
    ],
    tags: ['Python', 'AWS ECS', 'S3', 'ETL'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#FF9900',
    visualBg: 'radial-gradient(ellipse at 50% 60%, #3d2000 0%, #1a0d00 55%, #0a0500 100%)',
  },
  {
    id: 'exec-analytics',
    name: 'Exec Analytics',
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Single source of truth for L7+ leadership across 35 countries — unifying 80+ KPIs from fragmented reporting systems.',
    kpis: [
      { label: 'KPIs unified', value: '80+' },
      { label: 'countries', value: '35' },
    ],
    tags: ['SQL', 'Python', 'QuickSight', 'AWS Glue'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#4da3ff',
    visualBg: 'radial-gradient(ellipse at 50% 60%, #001840 0%, #000d20 55%, #000508 100%)',
  },
  {
    id: 'oracle',
    name: 'ORACLE',
    company: 'Amazon',
    context: 'Internal Tool',
    companyColor: '#FF9900',
    description:
      'Automated ground transport auditing across 26 EU countries. Replaced 40 hours/month of manual analysis with a real-time pipeline.',
    kpis: [
      { label: 'annual savings', value: '€250K' },
      { label: 'routes', value: '250+' },
      { label: 'saved / month', value: '40 hrs' },
    ],
    tags: ['Python', 'SQL', 'ETL', '26 countries'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#a78bfa',
    visualBg: 'radial-gradient(ellipse at 50% 60%, #18003d 0%, #08000f 55%, #040008 100%)',
  },
  {
    id: 'pm-portfolio',
    name: 'Portfolio',
    company: 'Personal',
    context: 'Open Source',
    companyColor: '#34d399',
    description:
      'Open-source portfolio with PRDs, architecture records, and shipped code — the full PM → engineer execution loop.',
    kpis: [
      { label: 'stack', value: 'Next.js' },
      { label: 'license', value: 'Open' },
    ],
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    githubUrl: 'https://github.com/ThomasLoridan',
    accentColor: '#34d399',
    visualBg: 'radial-gradient(ellipse at 50% 60%, #003320 0%, #001208 55%, #000604 100%)',
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
      {/* ── Visual top ── */}
      <div
        style={{
          background: project.visualBg,
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Company label — top left */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: project.companyColor,
            fontWeight: 600,
          }}
        >
          {project.company}
        </span>

        {/* Context label — top right */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,247,0.28)',
          }}
        >
          {project.context}
        </span>

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${project.accentColor}22 0%, transparent 65%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Project name */}
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
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
          padding: '22px 22px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flex: 1,
        }}
      >
        {/* Apple-style inline description: bold name → plain body */}
        <p
          style={{
            color: 'rgba(245,245,247,0.75)',
            fontSize: '0.875rem',
            lineHeight: 1.65,
            flex: 1,
            margin: 0,
          }}
        >
          <strong style={{ color: '#ffffff', fontWeight: 700 }}>{project.name}.</strong>{' '}
          {project.description}
        </p>

        {/* ── KPI stats — Apple style ──
            label   (muted, 0.6rem, uppercase, mono)
            value   (accent color, bold, 1.2rem heading)   */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            paddingTop: '14px',
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
                gap: '5px',
                paddingRight: i < project.kpis.length - 1 ? '12px' : 0,
                paddingLeft: i > 0 ? '12px' : 0,
                borderRight:
                  i < project.kpis.length - 1
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,247,0.32)',
                  lineHeight: 1,
                }}
              >
                {kpi.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
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
              fontSize: '0.6rem',
              color: 'rgba(245,245,247,0.25)',
              letterSpacing: '0.05em',
              margin: 0,
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
              color: 'rgba(245,245,247,0.28)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              flexShrink: 0,
              marginLeft: '8px',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.7)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(245,245,247,0.28)')
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
