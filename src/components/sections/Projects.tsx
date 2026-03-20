'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/profile';
import { ProjectVisualSONAR } from '@/components/visuals/ProjectVisualSONAR';
import { ProjectVisualORACLE } from '@/components/visuals/ProjectVisualORACLE';
import { ProjectVisualExecAnalytics } from '@/components/visuals/ProjectVisualExecAnalytics';
import { ProjectModal } from '@/components/projects/ProjectModal';
import type { ProjectDetail } from '@/components/projects/ProjectModal';
import { ExternalLink } from 'lucide-react';

function GitHubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 98 96" fill="currentColor" aria-hidden="true">
      <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );
}

/* ─── Project data (card + modal) ────────────────────────── */
const PROJECTS: ProjectDetail[] = [
  {
    id: 'sonar',
    tag: 'AMAZON · INTERNAL TOOL',
    headline: 'The audit that never sleeps.',
    description:
      'Post-scheduling automation for 500+ EU Intermodal routes. Cut cycle time from 4 hours to 5 minutes — zero human intervention.',
    visual: <ProjectVisualSONAR />,
    metrics: [
      { value: '€13.3M', label: 'ARR impact' },
      { value: '5 min', label: 'Cycle time' },
      { value: '500+', label: 'Routes covered' },
    ],
    stackLine: 'Python + AWS ECS → real-time route processing · S3 → audit history at scale',
    overview:
      'SONAR is a post-scheduling audit engine that runs automatically after every intermodal scheduling cycle across 500+ EU routes. It detects VRID misconfigurations, CIT breaches, and scheduling anomalies — and alerts the right team within minutes, not days.',
    problemStatement:
      'Before SONAR, the ROC team spent 6–8 hours every week manually cross-referencing 500+ route schedules against CIMS data to find SEA and RAIL configuration breaches. Errors were caught late — often after operational impact had already occurred.',
    solutionStatement:
      'A fully automated Python pipeline running on AWS ECS that pulls post-scheduling data, compares it against CIMS bank holiday and CPT override rules, classifies every route by breach type, generates a structured Excel report, and routes it to the correct team (ROC vs NetExc) based on a 48-hour cutoff rule.',
    stack: [
      { name: 'Python 3.11', role: 'Core processing engine — 4,400+ lines' },
      { name: 'AWS ECS', role: 'Containerized execution — fully serverless' },
      { name: 'AWS S3', role: 'Audit history storage and report archiving' },
      { name: 'CIMS API', role: 'Bank holiday and CPT override source of truth' },
      { name: 'openpyxl', role: 'Structured Excel report generation' },
      { name: 'SMTP (SES)', role: 'Conditional alert routing by team and cutoff' },
    ],
    impact: [
      { value: '€13.3M', label: 'ARR impact', context: 'Breach prevention across SEA/RAIL lanes' },
      { value: '5 min', label: 'Cycle time', context: 'Down from 6–8 hours of manual work' },
      { value: '500+', label: 'Routes covered', context: 'Every EU Intermodal route audited' },
      { value: '0', label: 'Manual steps', context: 'Fully automated — no human trigger needed' },
    ],
    process: [
      'Identified the gap during a weekly ROC review when a breach was found 4 days late, after delivery impact. The manual process had no reliable cadence.',
      'Mapped the full data flow: scheduling trigger → CIMS rules → route classification → team routing logic. Designed the breach taxonomy: VRID mismatch, CIT override miss, CPT window violation.',
      'Built the Python engine over 3 weeks, iterating on the classification logic and the 48-hour ROC vs NetExc split rule with the operations team.',
      'Deployed on AWS ECS with an S3-based audit trail. Report generation triggers automatically post-scheduling — no human intervention after setup.',
      'System has been running in production since 2024, covering every EU Intermodal scheduling cycle with zero maintenance incidents.',
    ],
    status: 'Production · Amazon EU Transportation · Since 2024',
  },
  {
    id: 'oracle',
    tag: 'AMAZON · INTERNAL TOOL',
    headline: 'Ground coverage. Automated.',
    description:
      'Real-time audit pipeline for 250+ ground routes across 26 EU countries. Replaced 40 hours per month of manual analysis — permanently.',
    visual: <ProjectVisualORACLE />,
    metrics: [
      { value: '€250K', label: 'Annual savings' },
      { value: '250+', label: 'Routes audited' },
      { value: '26', label: 'EU countries' },
    ],
    stackLine: 'Python + SQL → live coverage audit · ETL → zero manual extraction',
    overview:
      'ORACLE is a 26-country contract coverage audit engine for Amazon\'s ground transportation network. It runs weekly across 250+ EU lanes, detects coverage gaps up to 6 weeks ahead, and generates actionable prioritization reports for the network planning team.',
    problemStatement:
      'Ground lane contract coverage was audited manually — a 40-hour monthly process relying on manual SQL queries, copy-paste into Excel, and subjective prioritization. Coverage gaps were often discovered only when a route failed to tender.',
    solutionStatement:
      'A Python-based audit pipeline that queries Redshift for live coverage data, applies a 6-week forward visibility window, classifies each lane by risk tier (critical/warning/healthy), and generates a formatted multi-sheet Excel report with priority scoring. Reduced audit cycle from 40 hours/month to under 2 hours.',
    stack: [
      { name: 'Python 3.11', role: 'ETL and classification engine' },
      { name: 'AWS Redshift', role: 'Ground lane and contract data source' },
      { name: 'openpyxl', role: 'Multi-sheet formatted Excel output' },
      { name: 'pandas', role: 'Data transformation and aggregation' },
      { name: 'CIMS', role: 'Bank holiday and operational calendar' },
    ],
    impact: [
      { value: '€250K', label: 'Annual savings', context: '0.2 FTE reduction in manual audit hours' },
      { value: '250+', label: 'Routes audited', context: 'Every active EU ground lane weekly' },
      { value: '26', label: 'EU countries', context: 'Complete network coverage' },
      { value: '6 wks', label: 'Forward visibility', context: 'vs. reactive same-week alerts before' },
    ],
    process: [
      'Received a request from the network planning lead: reduce the time spent on monthly coverage audits. Spent a week shadowing the manual process to understand every step.',
      'Identified 3 core inefficiencies: no forward-looking window (only current state), no risk tiering (every gap treated equally), and no automated delivery.',
      'Designed the classification model: critical (coverage <7 days), warning (7–21 days), healthy (21+ days). Added 6-week forward projection using booking patterns.',
      'Built the pipeline with a Redshift query layer that handles 26 countries\' data in a single run, with bank holiday adjustments from CIMS.',
      'Delivered a formatted Excel report that could be sent directly to stakeholders — zero reformatting needed. Adopted by the full network planning team in week 2.',
    ],
    status: 'Production · Amazon EU Transportation · Since 2024',
  },
  {
    id: 'exec-analytics',
    tag: 'AMAZON · ANALYTICS PLATFORM',
    headline: 'One source. 35 countries.',
    description:
      'Unified 80+ fragmented KPIs into a single source of truth for L7+ leadership across 35 countries. Eliminated 6 hours of weekly manual consolidation.',
    visual: <ProjectVisualExecAnalytics />,
    metrics: [
      { value: '80+', label: 'KPIs unified' },
      { value: '35', label: 'Countries' },
      { value: '€1.5M/q', label: 'Capacity savings' },
    ],
    stackLine: 'QuickSight + AWS Glue → unified KPI layer · Python → automated refresh pipeline',
    overview:
      'A unified BI platform for L7+ transportation leadership across 35 EU countries. Consolidates 80+ KPIs from fragmented reporting systems into a single QuickSight dashboard with automated Python refresh pipelines — eliminating 6 hours of weekly manual consolidation.',
    problemStatement:
      '35-country operational data lived in 7+ disconnected systems. L7 leaders spent 6 hours every week manually pulling, formatting, and reconciling KPIs before each MBR. No single source of truth existed. Data was always at least 48 hours stale.',
    solutionStatement:
      'An end-to-end data platform: 80+ ETL pipelines feeding a unified Redshift schema, automated Python refresh jobs, and a QuickSight dashboard layer with drill-down capability. Built from scratch in 6 months. Now the standard analytics platform for EU Transportation MBRs.',
    stack: [
      { name: 'Amazon QuickSight', role: 'Dashboard layer for L7+ leaders' },
      { name: 'AWS Redshift', role: 'Unified data warehouse across 35 countries' },
      { name: 'AWS Glue', role: '80+ ETL pipeline orchestration' },
      { name: 'Python', role: 'Automated KPI refresh and anomaly detection' },
      { name: 'S3', role: 'Data lake for raw operational feeds' },
    ],
    impact: [
      { value: '80+', label: 'KPIs unified', context: 'From 7 disconnected reporting systems' },
      { value: '35', label: 'Countries', context: 'Full EU transportation network' },
      { value: '€1.5M/q', label: 'Capacity savings', context: 'Operational efficiency gains' },
      { value: '6h', label: 'Weekly time saved', context: 'Per MBR cycle — L7 leadership' },
    ],
    process: [
      'Inherited a fragmented analytics environment: 7 reporting systems, no shared schema, no ownership. First 2 weeks: mapped every data flow and identified the 80 KPIs that L7 leaders actually used.',
      'Designed the Redshift schema from scratch — a unified operational fact table with 35-country dimension tables, optimized for QuickSight query patterns.',
      'Built 80+ Glue ETL pipelines over 3 months, each with validation logic and failure alerting. Established a Python refresh layer for near-real-time KPI updates.',
      'Designed the QuickSight dashboard in close collaboration with 6 L7 stakeholders across Luxembourg, Barcelona, and London. 4 design iterations over 6 weeks.',
      'Launched as the official MBR analytics platform in Q1 2025. Zero manual consolidation since launch. Adopted by 30+ L5–L7 leaders.',
    ],
    status: 'Production · Amazon EU Transportation · Since Q1 2025',
  },
];

/* ─── Project card — hover lift + mouse-move parallax ───── */
function ProjectCard({
  project,
  onViewProject,
}: {
  project: ProjectDetail;
  onViewProject: (id: string) => void;
}) {
  const revealRef  = useRef<HTMLDivElement>(null);
  const hoverRef   = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: revealRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Hover lift
  const handleMouseEnter = useCallback(() => {
    gsap.to(hoverRef.current, { y: -8, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
  }, []);

  // Reset lift + parallax on leave
  const handleMouseLeave = useCallback(() => {
    gsap.to(hoverRef.current,  { y: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(visualRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
  }, []);

  // Image parallax on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current || !hoverRef.current) return;
    const rect = hoverRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    gsap.to(visualRef.current, {
      x: dx * 14,
      y: dy * 8,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  return (
    <div ref={revealRef} style={{ opacity: 0, marginBottom: 'clamp(80px, 10vw, 120px)' }}>
      <div
        ref={hoverRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ willChange: 'transform' }}
      >
        {/* 1. Category tag */}
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6e6e73',
            marginBottom: '20px',
          }}
        >
          {project.tag}
        </p>

        {/* 2. Headline — serif, before the visual */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.08,
            color: '#f5f5f7',
            marginBottom: '32px',
            maxWidth: '800px',
          }}
        >
          {project.headline}
        </h3>

        {/* 3. Full-bleed visual — parallax wrapper inside overflow:hidden */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 7',
            overflow: 'hidden',
            borderRadius: 0,
            marginBottom: '40px',
          }}
        >
          <div
            ref={visualRef}
            style={{ width: '100%', height: '100%', willChange: 'transform' }}
          >
            {project.visual}
          </div>
          {/* Bottom gradient — blends into page background */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, #1d1d1f)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 4. Description */}
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.75,
            color: '#86868b',
            maxWidth: '640px',
            marginBottom: '40px',
          }}
        >
          {project.description}
        </p>

        {/* 5. Metrics — no card, no border */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#6e6e73',
                  marginBottom: '6px',
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#f5f5f7',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* 6. Stack line */}
        <p
          style={{
            fontSize: '13px',
            color: '#424245',
            lineHeight: 1.6,
            marginBottom: '40px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {project.stackLine}
        </p>

        {/* 7. View project bar */}
        <button
          onClick={() => onViewProject(project.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            cursor: 'pointer',
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: '#f5f5f7',
              letterSpacing: '-0.01em',
            }}
          >
            View project details
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#5AC8FA',
              color: '#000000',
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            +
          </span>
        </button>
      </div>
    </div>
  );
}

/* ─── Section header — GSAP serif clip reveal ───────────── */
function ProjectsHeader() {
  const sectionRef      = useRef<HTMLDivElement>(null);
  const overlineRef     = useRef<HTMLParagraphElement>(null);
  const phrase1InnerRef = useRef<HTMLSpanElement>(null);
  const phrase2InnerRef = useRef<HTMLSpanElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const githubRef       = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overline
      gsap.fromTo(
        overlineRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // H2 phrase clip reveal
      gsap.fromTo(
        [phrase1InnerRef.current, phrase2InnerRef.current],
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sub + github fade
      gsap.fromTo(
        [subRef.current, githubRef.current],
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ paddingTop: 'clamp(64px, 10vh, 112px)', paddingBottom: '72px' }}
    >
      <p
        ref={overlineRef}
        style={{
          opacity: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 500,
          color: '#5AC8FA',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '24px',
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
          {/* H2 — serif, two-phrase clip reveal */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
            }}
          >
            <span
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <span
                ref={phrase1InnerRef}
                style={{ display: 'inline-block', color: '#f5f5f7' }}
              >
                The&nbsp;
              </span>
            </span>
            <span
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <span
                ref={phrase2InnerRef}
                style={{ display: 'inline-block', color: '#5AC8FA' }}
              >
                systems.
              </span>
            </span>
          </h2>

          <p
            ref={subRef}
            style={{
              opacity: 0,
              color: '#86868b',
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
          ref={githubRef}
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            opacity: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '99px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: '#86868b',
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
            el.style.color = '#f5f5f7';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(255,255,255,0.06)';
            el.style.color = '#86868b';
          }}
        >
          <GitHubMark size={14} />
          All projects
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const activeProjectData = PROJECTS.find((p) => p.id === activeProject) ?? null;

  return (
    <section id="projects" style={{ background: '#1d1d1f' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)' }}>
        <ProjectsHeader />

        <div>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={(id) => setActiveProject(id)}
            />
          ))}
        </div>

        <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />
      </div>

      <AnimatePresence>
        {activeProjectData && (
          <ProjectModal
            key={activeProjectData.id}
            project={activeProjectData}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
