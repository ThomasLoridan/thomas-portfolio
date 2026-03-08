'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ─── Types ───────────────────────────────────────────────── */
type MediaConfig =
  | { type: 'image'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'gif'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'orbs'; gradient: string };

interface KPI {
  value: string;
  label: string;
}

interface Block {
  id: string;
  pattern: 'A' | 'B';
  label: string;
  role: string;
  description: string;
  kpis: KPI[];
  accentColor: string;
  media: MediaConfig;
}

interface CompanyGroup {
  company: string;
  period: string;
  blockIds: string[];
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Highlight text parser ───────────────────────────────── */
function Highlight({ text, color }: { text: string; color: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color, fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ─── Block data ──────────────────────────────────────────── */
const BLOCKS: Block[] = [
  {
    id: 'amazon-tpm-innovation',
    pattern: 'A',
    label: 'AUG 2025–PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description:
      'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+', label: 'stakeholders aligned' },
      { value: '€30M', label: 'portfolio managed' },
    ],
    accentColor: '#FF9900',
    media: {
      type: 'gif',
      src: '/images/companies/amazon-arrow.gif',
      fit: 'contain',
      bg: '#0a0a0a',
    },
  },
  {
    id: 'amazon-ba-emea',
    pattern: 'B',
    label: 'DEC 2024–AUG 2025 · LUXEMBOURG',
    role: '**Performance** Business Analyst — **Transportation EMEA**',
    description:
      'Built real-time monitoring and AI-assisted audit workflows for 30+ L5–L7 leaders. Consolidated fragmented reporting across 35 countries into a single source of truth.',
    kpis: [
      { value: '80+', label: 'ETL pipelines' },
      { value: '€1.5M/q', label: 'capacity savings' },
      { value: '45%', label: 'volume increase' },
    ],
    accentColor: '#FF9900',
    media: {
      type: 'gif',
      src: '/images/companies/amazon-light.gif',
      fit: 'contain',
      bg: '#ffffff',
    },
  },
  {
    id: 'amazon-tpm-reliability',
    pattern: 'A',
    label: 'APR 2024–DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description:
      'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    kpis: [
      { value: '25%', label: 'downtime reduction' },
      { value: '10K+', label: 'daily users' },
      { value: '€8.9M', label: 'costs benchmarked' },
    ],
    accentColor: '#FF9900',
    media: {
      type: 'image',
      src: '/images/companies/amazon-dark.jpg',
      fit: 'contain',
      bg: '#0a0a0a',
    },
  },
  {
    id: 'auchan',
    pattern: 'B',
    label: 'SEP 2023–MAR 2024 · LILLE',
    role: '**Strategy Consultant** — DSI',
    description:
      'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio' },
      { value: '4', label: 'companies benchmarked' },
    ],
    accentColor: '#E2001A',
    media: {
      type: 'image',
      src: '/images/auchan/auchan-logo-full.png',
      fit: 'contain',
      bg: '#1a0000',
    },
  },
  {
    id: 'loreal-freelance',
    pattern: 'A',
    label: 'MAR 2023–MAR 2024 · PARIS',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description:
      'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'countries' },
      { value: '20%', label: 'data quality lift' },
    ],
    accentColor: '#C8A951',
    media: {
      type: 'image',
      src: '/images/loreal/loreal-water.webp',
      fit: 'cover',
      bg: '#1a1300',
    },
  },
  {
    id: 'loreal-delivery',
    pattern: 'B',
    label: 'SEP 2022–MAR 2023 · PARIS',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description:
      'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    kpis: [
      { value: '3', label: 'markets covered' },
      { value: '25%', label: 'lead time reduction' },
    ],
    accentColor: '#C8A951',
    media: {
      type: 'image',
      src: '/images/loreal/loreal-pro.webp',
      fit: 'cover',
      bg: '#111',
    },
  },
  {
    id: 'loreal-pm',
    pattern: 'A',
    label: 'FEB 2022–SEP 2022 · PARIS',
    role: 'Technical Project Manager — **Digital EMEA**',
    description:
      'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites, unlocking €100M ARR opportunity.',
    kpis: [
      { value: '€1.75M', label: 'UK journeys ARR' },
      { value: '€100M', label: 'web stack opportunity' },
    ],
    accentColor: '#C8A951',
    media: {
      type: 'gif',
      src: '/images/loreal/loreal-luxe-portrait.gif',
      fit: 'cover',
      bg: '#111',
    },
  },
  {
    id: 'familyad',
    pattern: 'B',
    label: 'SEP 2021–MAR 2022 · PARIS',
    role: 'Co-Founder, **CEO & CFO**',
    description:
      'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'finalist' },
      { value: 'MVP', label: 'launched' },
    ],
    accentColor: '#6366f1',
    media: {
      type: 'orbs',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)',
    },
  },
];

const GROUPS: CompanyGroup[] = [
  {
    company: 'Amazon',
    period: 'April 2024 – Present',
    blockIds: ['amazon-tpm-innovation', 'amazon-ba-emea', 'amazon-tpm-reliability'],
  },
  {
    company: 'Auchan Retail',
    period: 'Sep 2023 – Mar 2024',
    blockIds: ['auchan'],
  },
  {
    company: "L'Oréal",
    period: 'Feb 2022 – Mar 2024',
    blockIds: ['loreal-freelance', 'loreal-delivery', 'loreal-pm'],
  },
  {
    company: 'Familyad',
    period: 'Sep 2021 – Mar 2022',
    blockIds: ['familyad'],
  },
];

const BLOCK_MAP = Object.fromEntries(BLOCKS.map((b) => [b.id, b]));

/* ─── KPI stat row ────────────────────────────────────────── */
function KPIStats({ kpis }: { kpis: KPI[] }) {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        marginTop: '28px',
        paddingTop: '20px',
      }}
    >
      {kpis.map((kpi, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            paddingRight: i < kpis.length - 1 ? '20px' : 0,
            paddingLeft: i > 0 ? '20px' : 0,
            borderRight: i < kpis.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 1.8vw, 1.65rem)',
              color: '#5AC8FA',
              lineHeight: 1.05,
            }}
          >
            {kpi.value}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.3,
            }}
          >
            {kpi.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── Company group header ────────────────────────────────── */
function GroupHeader({ group }: { group: CompanyGroup }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        maxWidth: '1152px',
        margin: '0 auto',
        padding: '0 24px',
        paddingTop: 'clamp(56px, 9vh, 96px)',
        paddingBottom: '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#ffffff',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {group.company}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
          }}
        >
          {group.period}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Media panel ─────────────────────────────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '480px',
          background: media.gradient,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
            top: '-60px',
            right: '-60px',
          }}
        />
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            bottom: '-40px',
            left: '-40px',
            animationDelay: '1s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Familyad
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        background: media.bg ?? '#111',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={media.src}
        alt=""
        fill
        style={{ objectFit: media.fit ?? 'cover' }}
        unoptimized={media.type === 'gif'}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

/* ─── Single experience block ─────────────────────────────── */
function ExperienceBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const isPatternA = block.pattern === 'A';

  const mediaMotion = {
    initial: { opacity: 0, scale: 1.15 },
    animate: inView ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 1, ease: EASE },
  };

  const textMotion = {
    initial: { opacity: 0, x: isPatternA ? 40 : -40 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.7, delay: 0.2, ease: EASE },
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(40px, 7vh, 72px) 0',
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(11px, 2.6vw, 36px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 2,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div
          className={`grid grid-cols-1 items-center gap-8 md:gap-12 ${
            isPatternA
              ? 'md:grid-cols-[62fr_38fr]'
              : 'md:grid-cols-[38fr_62fr] md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
          }`}
        >
          {/* Image panel */}
          <motion.div
            {...mediaMotion}
            style={{ borderRadius: '16px', overflow: 'hidden', minHeight: '480px' }}
          >
            <MediaPanel media={block.media} />
          </motion.div>

          {/* Text panel */}
          <motion.div
            {...textMotion}
            className="flex flex-col gap-5"
            style={{ padding: 'clamp(24px, 3vw, 48px)' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5AC8FA',
                fontWeight: 500,
              }}
            >
              {block.label}
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              <Highlight text={block.role} color="#5AC8FA" />
            </h3>

            <p
              style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              {block.description}
            </p>

            <KPIStats kpis={block.kpis} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-bg" style={{ position: 'relative' }}>
      {/* Timeline vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(15px, 3vw, 40px)',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(255,255,255,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            Where I&apos;ve made{' '}
            <span style={{ color: '#5AC8FA' }}>an impact</span>
          </h2>
        </motion.div>
      </div>

      {/* Grouped blocks */}
      {GROUPS.map((group) => (
        <div key={group.company}>
          <GroupHeader group={group} />
          {group.blockIds.map((id, i) => {
            const block = BLOCK_MAP[id];
            return (
              <div key={id}>
                <ExperienceBlock block={block} />
                {i < group.blockIds.length - 1 && (
                  <div
                    style={{
                      maxWidth: '1152px',
                      margin: '0 auto',
                      padding: '0 24px',
                    }}
                  >
                    <div
                      style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Bottom padding */}
      <div style={{ height: 'clamp(48px, 8vh, 80px)' }} />
    </section>
  );
}
