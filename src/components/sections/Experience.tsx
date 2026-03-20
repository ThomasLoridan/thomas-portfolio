'use client';

import { useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ─── Types ─────────────────────────────────────────────────── */
type MediaConfig =
  | { type: 'image'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'gif';   src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'orbs';  gradient: string };

interface KPI   { value: string; label: string }
interface Block {
  id: string; pattern: 'A' | 'B'; label: string;
  role: string; description: string; kpis: KPI[]; media: MediaConfig;
}
interface CompanyGroup {
  company: string; period: string; blockIds: string[]; accentColor: string;
}

/* ─── H2 phrases ─────────────────────────────────────────────── */
const H2_PHRASES = ['Three companies.', 'Four years.', 'One standard.'];

/* ─── Highlight parser ───────────────────────────────────────── */
function Highlight({ text, color }: { text: string; color: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color, fontWeight: 700 }}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ─── Block data ────────────────────────────────────────────── */
const BLOCKS: Block[] = [
  {
    id: 'amazon-tpm-innovation', pattern: 'A',
    label: 'AUG 2025–PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description: 'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+',    label: 'Stakeholders'      },
      { value: '€30M',   label: 'Portfolio ARR'      },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-arrow.gif', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    id: 'amazon-ba-emea', pattern: 'B',
    label: 'DEC 2024–AUG 2025 · LUXEMBOURG',
    role: '**Performance** Business Analyst — **Transportation EMEA**',
    description: 'Built real-time monitoring and AI-assisted audit workflows for 30+ L5–L7 leaders. Consolidated fragmented reporting across 35 countries into a single source of truth.',
    kpis: [
      { value: '80+',     label: 'ETL pipelines'    },
      { value: '€1.5M/q', label: 'Capacity savings' },
      { value: '45%',     label: 'Volume growth'    },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-light.gif', fit: 'contain', bg: '#ffffff' },
  },
  {
    id: 'amazon-tpm-reliability', pattern: 'A',
    label: 'APR 2024–DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description: 'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    kpis: [
      { value: '25%',  label: 'Downtime cut'  },
      { value: '10K+', label: 'Daily users'   },
      { value: '€8.9M',label: 'Costs mapped'  },
    ],
    media: { type: 'image', src: '/images/companies/amazon-dark.jpg', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    id: 'auchan', pattern: 'A',
    label: 'SEP 2023–MAR 2024 · LILLE',
    role: '**Strategy Consultant** — DSI',
    description: 'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio'         },
      { value: '4',     label: 'Retailers benchmarked'},
    ],
    media: { type: 'image', src: '/images/auchan/auchan-logo-full.png', fit: 'contain', bg: '#1a0000' },
  },
  {
    id: 'loreal-freelance', pattern: 'A',
    label: 'MAR 2023–MAR 2024 · PARIS',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description: 'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'Countries covered' },
      { value: '20%', label: 'Data quality'       },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-water.webp', fit: 'cover', bg: '#1a1300' },
  },
  {
    id: 'loreal-delivery', pattern: 'B',
    label: 'SEP 2022–MAR 2023 · PARIS',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description: 'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    kpis: [
      { value: '3',   label: 'Global markets'  },
      { value: '25%', label: 'Lead time saved' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-pro.webp', fit: 'cover', bg: '#111' },
  },
  {
    id: 'loreal-pm', pattern: 'A',
    label: 'FEB 2022–SEP 2022 · PARIS',
    role: 'Technical Project Manager — **Digital EMEA**',
    description: 'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites, unlocking €100M ARR opportunity.',
    kpis: [
      { value: '€1.75M', label: 'UK journeys ARR'     },
      { value: '€100M',  label: 'Web stack opportunity'},
    ],
    media: { type: 'gif', src: '/images/loreal/loreal-luxe-portrait.gif', fit: 'cover', bg: '#111' },
  },
  {
    id: 'familyad', pattern: 'A',
    label: 'SEP 2021–MAR 2022 · PARIS',
    role: 'Co-Founder, **CEO & CFO**',
    description: 'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'Finalist' },
      { value: 'MVP',       label: 'Launched'  },
    ],
    media: { type: 'orbs', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)' },
  },
];

const GROUPS: CompanyGroup[] = [
  { company: 'Amazon',      period: 'April 2024 – Present',    accentColor: '#FF9900', blockIds: ['amazon-tpm-innovation', 'amazon-ba-emea', 'amazon-tpm-reliability'] },
  { company: 'Auchan Retail', period: 'Sep 2023 – Mar 2024',   accentColor: '#E2001A', blockIds: ['auchan'] },
  { company: "L'Oréal",    period: 'Feb 2022 – Mar 2024',      accentColor: '#C8A951', blockIds: ['loreal-freelance', 'loreal-delivery', 'loreal-pm'] },
  { company: 'Familyad',   period: 'Sep 2021 – Mar 2022',      accentColor: '#6366f1', blockIds: ['familyad'] },
];

const BLOCK_MAP = Object.fromEntries(BLOCKS.map(b => [b.id, b]));

/* ─── KPIDisplay — static (no count-up) ─────────────────────── */
function KPIDisplay({ kpi, borderRight }: { kpi: KPI; borderRight: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        paddingRight: borderRight ? '20px' : 0,
        paddingLeft: borderRight ? 0 : '20px',
        borderRight: borderRight ? '1px solid rgba(255,255,255,0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter)',
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
  );
}

/* ─── KPIStats row ───────────────────────────────────────────── */
function KPIStats({ kpis }: { kpis: KPI[] }) {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '20px',
        marginTop: '4px',
      }}
    >
      {kpis.map((kpi, i) => (
        <KPIDisplay key={i} kpi={kpi} borderRight={i < kpis.length - 1} />
      ))}
    </div>
  );
}

/* ─── MediaPanel ─────────────────────────────────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'relative', width: '100%', height: '100%',
          minHeight: '340px', background: media.gradient,
          borderRadius: '14px', overflow: 'hidden',
        }}
      >
        <div className="animate-pulse-glow" style={{ position: 'absolute', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)', top: '-50px', right: '-50px' }} />
        <div className="animate-pulse-glow" style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', bottom: '-30px', left: '-30px', animationDelay: '1s' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 800, fontSize: '1.4rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Familyad</span>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        position: 'relative', width: '100%', height: '100%',
        minHeight: 'clamp(200px, 28vw, 380px)',
        background: media.bg ?? '#111', borderRadius: '14px', overflow: 'hidden',
      }}
    >
      <Image src={media.src} alt="" fill style={{ objectFit: media.fit ?? 'cover' }} unoptimized={media.type === 'gif'} loading="lazy" sizes="(max-width: 768px) 100vw, 55vw" />
    </div>
  );
}

/* ─── RoleBlock ──────────────────────────────────────────────── */
function RoleBlock({ block, accentColor }: { block: Block; accentColor: string }) {
  const isA = block.pattern === 'A';
  return (
    <div style={{ padding: 'clamp(28px, 4vh, 48px) 0' }}>
      <div
        className={`grid grid-cols-1 items-center gap-6 md:gap-10 ${
          isA ? 'md:grid-cols-[58fr_42fr]'
              : 'md:grid-cols-[42fr_58fr] md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
        }`}
      >
        <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
          <MediaPanel media={block.media} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 'clamp(16px, 2.5vw, 36px)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor, fontWeight: 500 }}>
            {block.label}
          </p>
          <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'clamp(1.2rem, 1.8vw, 1.65rem)', color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            <Highlight text={block.role} color="#5AC8FA" />
          </h3>
          <p style={{ color: 'rgba(245,245,247,0.72)', fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.8 }}>
            {block.description}
          </p>
          <KPIStats kpis={block.kpis} />
        </div>
      </div>
    </div>
  );
}

/* ─── CompanySection ─────────────────────────────────────────── */
function CompanySection({
  group,
  onRef,
}: {
  group: CompanyGroup;
  onRef: (el: HTMLDivElement | null) => void;
}) {
  const blocks = group.blockIds.map(id => BLOCK_MAP[id]);
  return (
    <div
      ref={onRef}
      style={{
        opacity: 0,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: 'clamp(24px, 3vw, 36px)',
        marginBottom: '20px',
      }}
    >
      {/* Company header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
        <div style={{ width: '3px', height: '44px', borderRadius: '2px', background: group.accentColor, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: group.accentColor, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            {group.period}
          </span>
          <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {group.company}
          </span>
        </div>
      </div>

      {/* Role blocks with hairline dividers */}
      {blocks.map((block, i) => (
        <div key={block.id}>
          <RoleBlock block={block} accentColor={group.accentColor} />
          {i < blocks.length - 1 && (
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export function Experience() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const phraseRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // H2 phrase-by-phrase clip reveal
      const phrases = phraseRefs.current.filter(Boolean);
      gsap.fromTo(phrases,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.14,
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      // Subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );

      // Company cards — stagger 120ms
      const cards = cardRefs.current.filter(Boolean);
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'bottom 80%', toggleActions: 'play none none reverse' } }
      );

      // Exit animations — cards fade out as they leave the top
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'bottom 18%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(card, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="experience-bg">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>

        {/* Section header */}
        <div ref={headerRef} style={{ paddingTop: 'clamp(64px, 10vh, 112px)', paddingBottom: '48px' }}>
          {/* H2 — Inter bold, phrase-by-phrase clip reveal */}
          <h2
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 800,
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: '20px',
            }}
          >
            {H2_PHRASES.map((phrase, i) => (
              <span
                key={phrase}
                style={{ display: 'block', overflow: 'hidden', lineHeight: 1.08 }}
              >
                <span
                  ref={el => { phraseRefs.current[i] = el; }}
                  style={{ display: 'block', color: i === 2 ? '#5AC8FA' : '#ffffff' }}
                >
                  {phrase}
                </span>
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              opacity: 0,
              color: 'rgba(245,245,247,0.65)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.8,
              maxWidth: '520px',
            }}
          >
            From L&apos;Oréal to Amazon — 3 markets grew to 26 countries, €100M analyzed became €30M managed.
          </p>
        </div>

        {/* Company cards */}
        {GROUPS.map((group, i) => (
          <CompanySection
            key={group.company}
            group={group}
            onRef={el => { cardRefs.current[i] = el; }}
          />
        ))}

        <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />
      </div>
    </section>
  );
}
