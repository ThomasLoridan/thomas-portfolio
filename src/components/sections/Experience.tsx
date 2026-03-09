'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Types ───────────────────────────────────────────────── */
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
          <strong key={i} style={{ color, fontWeight: 600 }}>
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
    label: 'Aug 2025 – Present · Luxembourg',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description:
      'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+', label: 'Stakeholders aligned' },
      { value: '€30M', label: 'Portfolio ARR' },
    ],
  },
  {
    id: 'amazon-ba-emea',
    label: 'Dec 2024 – Aug 2025 · Luxembourg',
    role: '**Performance** Business Analyst — **Transportation EMEA**',
    description:
      'Built real-time monitoring and AI-assisted audit workflows for 30+ L5–L7 leaders. Consolidated fragmented reporting across 35 countries into a single source of truth.',
    kpis: [
      { value: '80+', label: 'ETL pipelines built' },
      { value: '€1.5M/q', label: 'Capacity savings' },
      { value: '45%', label: 'Volume increase' },
    ],
  },
  {
    id: 'amazon-tpm-reliability',
    label: 'Apr 2024 – Dec 2024 · Barcelona',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description:
      'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    kpis: [
      { value: '25%', label: 'Downtime reduction' },
      { value: '10K+', label: 'Daily users' },
      { value: '€8.9M', label: 'Costs benchmarked' },
    ],
  },
  {
    id: 'auchan',
    label: 'Sep 2023 – Mar 2024 · Lille',
    role: '**Strategy Consultant** — DSI',
    description:
      'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio analyzed' },
      { value: '4', label: 'Retailers benchmarked' },
    ],
  },
  {
    id: 'loreal-freelance',
    label: 'Mar 2023 – Mar 2024 · Paris',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description:
      'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'Countries covered' },
      { value: '20%', label: 'Data quality lift' },
    ],
  },
  {
    id: 'loreal-delivery',
    label: 'Sep 2022 – Mar 2023 · Paris',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description:
      'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    kpis: [
      { value: '3', label: 'Global markets' },
      { value: '25%', label: 'Lead time reduction' },
    ],
  },
  {
    id: 'loreal-pm',
    label: 'Feb 2022 – Sep 2022 · Paris',
    role: 'Technical Project Manager — **Digital EMEA**',
    description:
      'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites, unlocking €100M ARR opportunity.',
    kpis: [
      { value: '€1.75M', label: 'UK journeys ARR' },
      { value: '€100M', label: 'Web stack opportunity' },
    ],
  },
  {
    id: 'familyad',
    label: 'Sep 2021 – Mar 2022 · Paris',
    role: 'Co-Founder, **CEO & CFO**',
    description:
      'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'Finalist' },
      { value: 'MVP', label: 'Launched' },
    ],
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

/* ─── KPI stat row — Apple spec style ────────────────────── */
function KPIRow({ kpis }: { kpis: KPI[] }) {
  return (
    <div style={{ display: 'flex', gap: 'clamp(28px, 4vw, 56px)', flexWrap: 'wrap' }}>
      {kpis.map((kpi) => (
        <div key={kpi.label} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
              color: '#5AC8FA',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {kpi.value}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,247,0.38)',
              lineHeight: 1,
            }}
          >
            {kpi.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Single role block — pure typography ─────────────────── */
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Period · Location */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: accentColor,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        {block.label}
      </p>

      {/* Role title */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'clamp(1.25rem, 2vw, 1.7rem)',
          color: '#ffffff',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          maxWidth: '640px',
        }}
      >
        <Highlight text={block.role} color="#5AC8FA" />
      </h3>

      {/* Description */}
      <p
        style={{
          color: 'rgba(245,245,247,0.62)',
          fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
          lineHeight: 1.75,
          fontWeight: 400,
          maxWidth: '600px',
        }}
      >
        {block.description}
      </p>

      {/* KPI stats */}
      <div style={{ paddingTop: '8px' }}>
        <KPIRow kpis={block.kpis} />
      </div>
    </motion.div>
  );
}

/* ─── Company section — groups all roles with whitespace ──── */
function CompanySection({ group }: { group: CompanyGroup }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const blocks = group.blockIds.map((id) => BLOCK_MAP[id]);

  return (
    <div
      ref={ref}
      style={{ paddingTop: 'clamp(56px, 8vh, 88px)', paddingBottom: 'clamp(16px, 2vh, 24px)' }}
    >
      {/* Company header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: 'clamp(36px, 5vh, 56px)' }}
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

        {/* Period + company name */}
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
              fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {group.company}
          </span>
        </div>

        {/* Hairline rule */}
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
      </motion.div>

      {/* Roles — separated by hairlines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {blocks.map((block, i) => (
          <div key={block.id}>
            <RoleBlock
              block={block}
              accentColor={group.accentColor}
              inView={inView}
              delay={i * 0.12}
            />
            {i < blocks.length - 1 && (
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  margin: 'clamp(32px, 4vh, 48px) 0',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-bg">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 64px)' }}>

        {/* Section header */}
        <div style={{ paddingTop: 'clamp(64px, 10vh, 112px)', paddingBottom: '0' }}>
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
                maxWidth: '520px',
              }}
            >
              4 years across Amazon, L&apos;Oréal, Auchan, and a startup — from €250M
              portfolios to building a company from zero.
            </p>
          </motion.div>
        </div>

        {/* Company sections */}
        {GROUPS.map((group) => (
          <CompanySection key={group.company} group={group} />
        ))}

        {/* Bottom padding */}
        <div style={{ height: 'clamp(48px, 7vh, 80px)' }} />
      </div>
    </section>
  );
}
