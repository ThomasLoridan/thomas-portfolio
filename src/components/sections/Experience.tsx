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
  pattern: 'A' | 'B';
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
    pattern: 'A',
    label: 'AUG 2025–PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description:
      'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+', label: 'Stakeholders aligned' },
      { value: '€30M', label: 'Portfolio ARR' },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-arrow.gif', fit: 'contain', bg: '#0a0a0a' },
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
      { value: '€1.5M/q', label: 'Capacity savings' },
      { value: '45%', label: 'Volume increase' },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-light.gif', fit: 'contain', bg: '#ffffff' },
  },
  {
    id: 'amazon-tpm-reliability',
    pattern: 'A',
    label: 'APR 2024–DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description:
      'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    kpis: [
      { value: '25%', label: 'Downtime reduction' },
      { value: '10K+', label: 'Daily users' },
      { value: '€8.9M', label: 'Costs benchmarked' },
    ],
    media: { type: 'image', src: '/images/companies/amazon-dark.jpg', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    id: 'auchan',
    pattern: 'A',
    label: 'SEP 2023–MAR 2024 · LILLE',
    role: '**Strategy Consultant** — DSI',
    description:
      'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio' },
      { value: '4', label: 'Retailers benchmarked' },
    ],
    media: { type: 'image', src: '/images/auchan/auchan-logo-full.png', fit: 'contain', bg: '#1a0000' },
  },
  {
    id: 'loreal-freelance',
    pattern: 'A',
    label: 'MAR 2023–MAR 2024 · PARIS',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description:
      'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'Countries covered' },
      { value: '20%', label: 'Data quality lift' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-water.webp', fit: 'cover', bg: '#1a1300' },
  },
  {
    id: 'loreal-delivery',
    pattern: 'B',
    label: 'SEP 2022–MAR 2023 · PARIS',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description:
      'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    kpis: [
      { value: '3', label: 'Global markets' },
      { value: '25%', label: 'Lead time reduction' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-pro.webp', fit: 'cover', bg: '#111' },
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
      { value: '€100M', label: 'Web stack opportunity' },
    ],
    media: { type: 'gif', src: '/images/loreal/loreal-luxe-portrait.gif', fit: 'cover', bg: '#111' },
  },
  {
    id: 'familyad',
    pattern: 'A',
    label: 'SEP 2021–MAR 2022 · PARIS',
    role: 'Co-Founder, **CEO & CFO**',
    description:
      'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'Finalist' },
      { value: 'MVP', label: 'Launched' },
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

/* ─── KPI stat row ────────────────────────────────────────── */
function KPIStats({ kpis }: { kpis: KPI[] }) {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '20px',
        marginTop: '4px',
        gap: '0',
      }}
    >
      {kpis.map((kpi, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            paddingRight: i < kpis.length - 1 ? '20px' : 0,
            paddingLeft: i > 0 ? '20px' : 0,
            borderRight: i < kpis.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
              color: '#5AC8FA',
              lineHeight: 1.05,
            }}
          >
            {kpi.value}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
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

/* ─── Media panel ─────────────────────────────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '340px',
          background: media.gradient,
          borderRadius: '14px',
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
            top: '-50px',
            right: '-50px',
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
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 'clamp(200px, 28vw, 380px)',
        background: media.bg ?? '#111',
        borderRadius: '14px',
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
        sizes="(max-width: 768px) 100vw, 55vw"
      />
    </div>
  );
}

/* ─── Role block — alternating image + text layout ─────────── */
function RoleBlock({
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
  const isA = block.pattern === 'A';

  const mediaMotion = {
    initial: { opacity: 0, scale: 1.08 },
    animate: inView ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.9, ease: EASE },
  };

  const textMotion = {
    initial: { opacity: 0, x: isA ? 32 : -32 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.65, delay: delay + 0.15, ease: EASE },
  };

  return (
    <div style={{ padding: 'clamp(28px, 4vh, 48px) 0' }}>
      <div
        className={`grid grid-cols-1 items-center gap-6 md:gap-10 ${
          isA
            ? 'md:grid-cols-[58fr_42fr]'
            : 'md:grid-cols-[42fr_58fr] md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
        }`}
      >
        {/* Image */}
        <motion.div {...mediaMotion} style={{ borderRadius: '14px', overflow: 'hidden' }}>
          <MediaPanel media={block.media} />
        </motion.div>

        {/* Text */}
        <motion.div
          {...textMotion}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: 'clamp(16px, 2.5vw, 36px)',
          }}
        >
          {/* Period label */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: accentColor,
              fontWeight: 500,
            }}
          >
            {block.label}
          </p>

          {/* Role title */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.3rem, 2vw, 1.9rem)',
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            <Highlight text={block.role} color="#5AC8FA" />
          </h3>

          {/* Description */}
          <p
            style={{
              color: 'rgba(245,245,247,0.72)',
              fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            {block.description}
          </p>

          {/* KPIs */}
          <KPIStats kpis={block.kpis} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Company section — block container with role blocks ───── */
function CompanySection({ group }: { group: CompanyGroup }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  const blocks = group.blockIds.map((id) => BLOCK_MAP[id]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: 'clamp(24px, 3vw, 36px)',
        marginBottom: '20px',
      }}
    >
      {/* Company header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
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
              letterSpacing: '0.1em',
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

      {/* Role blocks with hairline dividers */}
      {blocks.map((block, i) => (
        <div key={block.id}>
          <RoleBlock
            block={block}
            accentColor={group.accentColor}
            inView={inView}
            delay={i * 0.1}
          />
          {i < blocks.length - 1 && (
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-bg">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>

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
              Four years.{' '}
              <span style={{ color: '#5AC8FA' }}>One standard.</span>
            </h2>
            <p
              style={{
                color: 'rgba(245,245,247,0.65)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.8,
                fontWeight: 400,
                maxWidth: '520px',
              }}
            >
              From L&apos;Oréal to Amazon — 3 markets grew to 26 countries, €100M analyzed became €30M managed.
            </p>
          </motion.div>
        </div>

        {/* Company sections */}
        {GROUPS.map((group) => (
          <CompanySection key={group.company} group={group} />
        ))}

        <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />
      </div>
    </section>
  );
}
