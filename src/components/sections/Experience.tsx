'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
  label: string;
  role: string;
  description: string;
  kpis: KPI[];
  media: MediaConfig;
}

interface CompanyGroup {
  company: string;
  period: string;
  blockIds: string[];
  accentColor: string;
}

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
    label: 'AUG 2025–PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description:
      'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal. Drive the €30M ARR roadmap across analytics and automation platforms.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+', label: 'stakeholders' },
      { value: '€30M', label: 'portfolio' },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-arrow.gif', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    id: 'amazon-ba-emea',
    label: 'DEC 2024–AUG 2025 · LUXEMBOURG',
    role: '**Performance** Business Analyst — **Transportation EMEA**',
    description:
      'Built real-time monitoring and AI-assisted audit workflows for 30+ L5–L7 leaders across 35 countries.',
    kpis: [
      { value: '80+', label: 'ETL pipelines' },
      { value: '€1.5M/q', label: 'capacity saved' },
      { value: '45%', label: 'volume increase' },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-light.gif', fit: 'contain', bg: '#ffffff' },
  },
  {
    id: 'amazon-tpm-reliability',
    label: 'APR 2024–DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description:
      'Drove product development for operational analytics across 2,300 global fulfillment sites. Built 3 strategic data platforms.',
    kpis: [
      { value: '25%', label: 'downtime reduction' },
      { value: '10K+', label: 'daily users' },
      { value: '€8.9M', label: 'costs benchmarked' },
    ],
    media: { type: 'image', src: '/images/companies/amazon-dark.jpg', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    id: 'auchan',
    label: 'SEP 2023–MAR 2024 · LILLE',
    role: '**Strategy Consultant** — DSI',
    description:
      'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio' },
      { value: '4', label: 'companies benchmarked' },
    ],
    media: { type: 'image', src: '/images/auchan/auchan-logo-full.png', fit: 'contain', bg: '#1a0000' },
  },
  {
    id: 'loreal-freelance',
    label: 'MAR 2023–MAR 2024 · PARIS',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description:
      'Led global data governance across 50+ countries. Designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'countries' },
      { value: '20%', label: 'data quality lift' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-water.webp', fit: 'cover', bg: '#1a1300' },
  },
  {
    id: 'loreal-delivery',
    label: 'SEP 2022–MAR 2023 · PARIS',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description:
      'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US.',
    kpis: [
      { value: '3', label: 'markets covered' },
      { value: '25%', label: 'lead time reduction' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-pro.webp', fit: 'cover', bg: '#111' },
  },
  {
    id: 'loreal-pm',
    label: 'FEB 2022–SEP 2022 · PARIS',
    role: 'Technical Project Manager — **Digital EMEA**',
    description:
      'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites.',
    kpis: [
      { value: '€1.75M', label: 'UK journeys ARR' },
      { value: '€100M', label: 'web opportunity' },
    ],
    media: { type: 'gif', src: '/images/loreal/loreal-luxe-portrait.gif', fit: 'cover', bg: '#111' },
  },
  {
    id: 'familyad',
    label: 'SEP 2021–MAR 2022 · PARIS',
    role: 'Co-Founder, **CEO & CFO**',
    description:
      'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'finalist' },
      { value: 'MVP', label: 'launched' },
    ],
    media: { type: 'orbs', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)' },
  },
];

const GROUPS: CompanyGroup[] = [
  {
    company: 'Amazon',
    period: 'April 2024 – Present',
    accentColor: '#FF9900',
    blockIds: ['amazon-tpm-innovation', 'amazon-ba-emea', 'amazon-tpm-reliability'],
  },
  {
    company: 'Auchan Retail',
    period: 'Sep 2023 – Mar 2024',
    accentColor: '#E2001A',
    blockIds: ['auchan'],
  },
  {
    company: "L'Oréal",
    period: 'Feb 2022 – Mar 2024',
    accentColor: '#C8A951',
    blockIds: ['loreal-freelance', 'loreal-delivery', 'loreal-pm'],
  },
  {
    company: 'Familyad',
    period: 'Sep 2021 – Mar 2022',
    accentColor: '#6366f1',
    blockIds: ['familyad'],
  },
];

const BLOCK_MAP = Object.fromEntries(BLOCKS.map((b) => [b.id, b]));

/* ─── Media panel (fills parent container) ────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: media.gradient,
          overflow: 'hidden',
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)',
            top: '-60px',
            right: '-40px',
          }}
        />
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            bottom: '-30px',
            left: '-30px',
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
              fontSize: '1.4rem',
              color: 'rgba(255,255,255,0.65)',
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
        position: 'absolute',
        inset: 0,
        background: media.bg ?? '#111',
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
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  );
}

/* ─── KPI row — Apple spec style (label above, value below) ─ */
function KPIRow({ kpis }: { kpis: KPI[] }) {
  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '14px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: 'auto',
      }}
    >
      {kpis.map((kpi, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            paddingRight: i < kpis.length - 1 ? '12px' : 0,
            paddingLeft: i > 0 ? '12px' : 0,
            borderRight:
              i < kpis.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.56rem',
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
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
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
  );
}

/* ─── Portrait role card (multi-role company groups) ─────── */
function RoleCard({
  block,
  accentColor,
  inView,
  delay,
}: {
  block: Block;
  accentColor: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Media — top portion */}
      <div style={{ position: 'relative', height: '180px', flexShrink: 0 }}>
        <MediaPanel media={block.media} />
      </div>

      {/* Text — bottom portion */}
      <div
        style={{
          padding: '18px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
        }}
      >
        {/* Period / location */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accentColor,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {block.label}
        </p>

        {/* Role title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(0.92rem, 1.1vw, 1.1rem)',
            color: '#ffffff',
            lineHeight: 1.3,
          }}
        >
          <Highlight text={block.role} color="#5AC8FA" />
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'rgba(245,245,247,0.6)',
            fontSize: '0.82rem',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {block.description}
        </p>

        {/* KPIs */}
        <KPIRow kpis={block.kpis} />
      </div>
    </motion.div>
  );
}

/* ─── Landscape role card (single-role companies) ─────────── */
function LandscapeRoleCard({
  block,
  accentColor,
  inView,
}: {
  block: Block;
  accentColor: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Media — left side on desktop, top on mobile */}
      <div style={{ position: 'relative', minHeight: '280px' }}>
        <MediaPanel media={block.media} />
      </div>

      {/* Text — right side */}
      <div
        style={{
          padding: 'clamp(24px, 3vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: accentColor,
            fontWeight: 500,
          }}
        >
          {block.label}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          <Highlight text={block.role} color="#5AC8FA" />
        </h3>

        <p
          style={{
            color: 'rgba(245,245,247,0.7)',
            fontSize: 'clamp(0.88rem, 1vw, 0.95rem)',
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {block.description}
        </p>

        <KPIRow kpis={block.kpis} />
      </div>
    </motion.div>
  );
}

/* ─── Company block — groups all roles under one cluster ──── */
function CompanyBlock({ group }: { group: CompanyGroup }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const blocks = group.blockIds.map((id) => BLOCK_MAP[id]);
  const isLandscape = blocks.length === 1;
  const gridClass =
    blocks.length === 3
      ? 'grid grid-cols-1 md:grid-cols-3 gap-3'
      : 'grid grid-cols-1 md:grid-cols-2 gap-3';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: 'clamp(20px, 3vw, 32px)',
        marginBottom: '20px',
      }}
    >
      {/* Company header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: '3px',
            height: '44px',
            borderRadius: '2px',
            background: group.accentColor,
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: group.accentColor,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {group.period}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {group.company}
          </span>
        </div>
      </div>

      {/* Role cards */}
      {isLandscape ? (
        <LandscapeRoleCard
          block={blocks[0]}
          accentColor={group.accentColor}
          inView={inView}
        />
      ) : (
        <div className={gridClass}>
          {blocks.map((block, i) => (
            <RoleCard
              key={block.id}
              block={block}
              accentColor={group.accentColor}
              inView={inView}
              delay={i * 0.1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-bg">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 64px)' }}>

        {/* Section header */}
        <div style={{ paddingTop: 'clamp(64px, 10vh, 112px)', paddingBottom: '48px' }}>
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
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
              Experience
            </p>
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
              Where I&apos;ve made{' '}
              <span style={{ color: '#5AC8FA' }}>an impact</span>
            </h2>
            <p
              style={{
                color: 'rgba(245,245,247,0.65)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.8,
                fontWeight: 400,
                maxWidth: '560px',
              }}
            >
              4 years across Amazon, L&apos;Oréal, Auchan, and a startup — from €250M
              portfolios to building a company from zero.
            </p>
          </motion.div>
        </div>

        {/* Company blocks */}
        {GROUPS.map((group) => (
          <CompanyBlock key={group.company} group={group} />
        ))}

        {/* Bottom padding */}
        <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />
      </div>
    </section>
  );
}
