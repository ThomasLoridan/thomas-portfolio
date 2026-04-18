'use client';

import { useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ─── Types ─────────────────────────────────────────────────── */
type MediaConfig =
  | { type: 'image'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'gif';   src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'orbs';  gradient: string };

interface KPI { value: string; label: string }

interface ExperienceItem {
  number: string;
  company: string;
  accentColor: string;
  period: string;
  role: string;
  description: string;
  kpis: KPI[];
  media: MediaConfig;
}

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

/* ─── Experience items — sequential numbered blocks ──────────── */
const ITEMS: ExperienceItem[] = [
  {
    number: '01',
    company: 'Amazon',
    accentColor: '#FF9900',
    period: 'AUG 2025 – PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — **Tech & Innovation Portfolio**',
    description: 'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    kpis: [
      { value: '€13.3M', label: 'SONAR automation' },
      { value: '50+',    label: 'Stakeholders'      },
      { value: '€30M',   label: 'Portfolio ARR'     },
    ],
    media: { type: 'gif', src: '/images/companies/amazon-arrow.gif', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    number: '02',
    company: 'Amazon',
    accentColor: '#FF9900',
    period: 'DEC 2024 – AUG 2025 · LUXEMBOURG',
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
    number: '03',
    company: 'Amazon',
    accentColor: '#FF9900',
    period: 'APR 2024 – DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — **Global Strategic Reliability**',
    description: 'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    kpis: [
      { value: '25%',   label: 'Downtime cut' },
      { value: '10K+',  label: 'Daily users'  },
      { value: '€8.9M', label: 'Costs mapped' },
    ],
    media: { type: 'image', src: '/images/companies/amazon-dark.jpg', fit: 'contain', bg: '#0a0a0a' },
  },
  {
    number: '04',
    company: 'Auchan Retail',
    accentColor: '#E2001A',
    period: 'SEP 2023 – MAR 2024 · LILLE',
    role: '**Strategy Consultant** — DSI',
    description: 'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    kpis: [
      { value: '€250M', label: 'IT portfolio'          },
      { value: '4',     label: 'Retailers benchmarked' },
    ],
    media: { type: 'image', src: '/images/auchan/auchan-logo-full.png', fit: 'contain', bg: '#1a0000' },
  },
  {
    number: '05',
    company: "L'Oréal",
    accentColor: '#C8A951',
    period: 'MAR 2023 – MAR 2024 · PARIS',
    role: 'Business Analyst — **Global CDMO, Consumer Product Division**',
    description: 'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    kpis: [
      { value: '50+', label: 'Countries covered' },
      { value: '20%', label: 'Data quality'       },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-water.webp', fit: 'cover', bg: '#1a1300' },
  },
  {
    number: '06',
    company: "L'Oréal",
    accentColor: '#C8A951',
    period: 'SEP 2022 – MAR 2023 · PARIS',
    role: 'Technical Delivery Manager — **Global Data Team**',
    description: 'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    kpis: [
      { value: '3',   label: 'Global markets'  },
      { value: '25%', label: 'Lead time saved' },
    ],
    media: { type: 'image', src: '/images/loreal/loreal-pro.webp', fit: 'cover', bg: '#111' },
  },
  {
    number: '07',
    company: "L'Oréal",
    accentColor: '#C8A951',
    period: 'FEB 2022 – SEP 2022 · PARIS',
    role: 'Technical Project Manager — **Digital EMEA**',
    description: 'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites, unlocking €100M ARR opportunity.',
    kpis: [
      { value: '€1.75M', label: 'UK journeys ARR'      },
      { value: '€100M',  label: 'Web stack opportunity' },
    ],
    media: { type: 'gif', src: '/images/loreal/loreal-luxe-portrait.gif', fit: 'cover', bg: '#111' },
  },
  {
    number: '08',
    company: 'Familyad',
    accentColor: '#6366f1',
    period: 'SEP 2021 – MAR 2022 · PARIS',
    role: 'Co-Founder, **CEO & CFO**',
    description: 'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    kpis: [
      { value: 'Station F', label: 'Finalist' },
      { value: 'MVP',       label: 'Launched'  },
    ],
    media: { type: 'orbs', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)' },
  },
];

/* ─── MediaPanel ─────────────────────────────────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'relative', width: '100%', height: '100%',
          minHeight: '400px', background: media.gradient,
          overflow: 'hidden',
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
        minHeight: 'clamp(280px, 40vw, 500px)',
        background: media.bg ?? '#111', overflow: 'hidden',
      }}
    >
      <Image
        src={media.src}
        alt=""
        fill
        style={{ objectFit: media.fit ?? 'cover' }}
        unoptimized={media.type === 'gif'}
        loading="lazy"
        sizes="100vw"
      />
    </div>
  );
}

/* ─── ExperienceBlock — Joby-style numbered vertical block ───── */
function ExperienceBlock({
  item,
  blockRef,
}: {
  item: ExperienceItem;
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={blockRef}
      className="experience-block"
      style={{ opacity: 0 }}
    >
      {/* Full-width image */}
      <div
        style={{
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: 'clamp(28px, 4vw, 48px)',
        }}
      >
        <MediaPanel media={item.media} />
      </div>

      {/* Content row: number + text */}
      <div
        className="experience-content-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr',
          gap: 'clamp(16px, 3vw, 40px)',
          alignItems: 'start',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            color: item.accentColor,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            opacity: 0.5,
          }}
        >
          {item.number}
        </span>

        {/* Text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Company + period */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: item.accentColor,
                fontWeight: 500,
              }}
            >
              {item.company} · {item.period}
            </span>
          </div>

          {/* Role title */}
          <h3
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
            }}
          >
            <Highlight text={item.role} color="#5AC8FA" />
          </h3>

          {/* Description */}
          <p
            style={{
              color: 'rgba(245,245,247,0.72)',
              fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
              lineHeight: 1.85,
              maxWidth: '600px',
            }}
          >
            {item.description}
          </p>

          {/* KPIs */}
          <div
            className="experience-kpi-row"
            style={{
              display: 'flex',
              gap: '0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '20px',
              marginTop: '8px',
            }}
          >
            {item.kpis.map((kpi, i) => (
              <div
                key={i}
                className="experience-kpi-item"
                style={{
                  flex: 1,
                  paddingRight: i < item.kpis.length - 1 ? '20px' : 0,
                  paddingLeft: i > 0 ? '20px' : 0,
                  borderRight: i < item.kpis.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export function Experience() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const phraseRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const blockRefs    = useRef<(HTMLDivElement | null)[]>([]);

  const H2_PHRASES = ['Three companies.', 'Four years.', 'One standard.'];

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

      // Experience blocks — each has its own scroll trigger
      const blocks = blockRefs.current.filter(Boolean);
      blocks.forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Exit animations
      blocks.forEach((block) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'bottom 15%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(block, { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(block, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" style={{ background: '#000000' }}>
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 48px)',
        }}
      >
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            paddingTop: 'clamp(80px, 14vh, 140px)',
            paddingBottom: 'clamp(48px, 8vw, 80px)',
          }}
        >
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

        {/* Sequential numbered blocks */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(64px, 10vw, 120px)',
          }}
        >
          {ITEMS.map((item, i) => (
            <ExperienceBlock
              key={item.number}
              item={item}
              blockRef={(el) => { blockRefs.current[i] = el; }}
            />
          ))}
        </div>

        <div style={{ height: 'clamp(64px, 10vh, 120px)' }} />
      </div>
    </section>
  );
}
