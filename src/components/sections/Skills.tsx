'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Code2, Lightbulb, Network, Target, Shield, Zap } from 'lucide-react';

/* ─── Skill card data — unchanged ────────────────────────── */
const SKILL_CARDS = [
  {
    icon: Code2,
    iconColor: '#5AC8FA',
    title: 'Technical depth.',
    body: 'Python, SQL, AWS, GCP. Production systems serving 2,300+ sites and processing 500+ routes in real time.',
    tags: ['Python', 'SQL', 'AWS', 'GCP', 'BigQuery', 'ETL Pipelines', 'Docker', 'TypeScript', 'FastAPI', 'REST APIs'],
  },
  {
    icon: Lightbulb,
    iconColor: '#5AC8FA',
    title: 'Product thinking.',
    body: 'PRDs, roadmaps, OKRs. €30M portfolio managed end-to-end — from discovery to stakeholder alignment to delivery.',
    tags: ['PRD Writing', 'Roadmap Planning', 'OKR Definition', 'A/B Testing', 'User Research', 'Stakeholder Mgmt', 'Data-Driven Decisions'],
  },
  {
    icon: Network,
    iconColor: '#5AC8FA',
    title: 'Program leadership.',
    body: "50+ stakeholders across 26 countries. Programs that ship on time and infrastructure teams don't want to lose.",
    tags: ['Cross-functional', 'Agile/Scrum', 'Executive Reporting', 'Jira', 'Confluence', 'QuickSight', 'PowerBI', 'Figma'],
  },
];

/* ─── Values data — unchanged ─────────────────────────────── */
const VALUES = [
  {
    icon: Target,
    title: 'Impact-first.',
    body: 'Every decision backed by data and tied to business outcomes.',
  },
  {
    icon: Shield,
    title: 'Ownership.',
    body: 'I treat every product like my own. No escalation theater.',
  },
  {
    icon: Zap,
    title: 'Speed + precision.',
    body: 'I move fast without breaking things. Or people.',
  },
];

/* ─── Apple pill tag ──────────────────────────────────────── */
function Pill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '5px 14px',
        borderRadius: '99px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.04)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 500,
        color: 'rgba(245,245,247,0.65)',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export function Skills() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [paused, setPaused]         = useState(false);
  const intervalRef                 = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Refs for GSAP */
  const headerRef       = useRef<HTMLDivElement>(null);
  const p1InnerRef      = useRef<HTMLSpanElement>(null);
  const p2InnerRef      = useRef<HTMLSpanElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const valuesRef       = useRef<HTMLDivElement>(null);
  const valuesTitleRef  = useRef<HTMLHeadingElement>(null);
  const valueCardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Auto-advance carousel ─────────────────────────── */
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SKILL_CARDS.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!paused) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, startInterval]);

  /* ── GSAP scroll reveals ───────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // H2 clip reveal
      gsap.fromTo([p1InnerRef.current, p2InnerRef.current],
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sub
      gsap.fromTo(subRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.35,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Values title
      gsap.fromTo(valuesTitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Value cards stagger
      const cards = valueCardRefs.current.filter(Boolean);
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Exit animations — value cards fade out as they leave the top
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'bottom 18%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(card, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" style={{ background: '#000000' }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: 'clamp(64px, 10vh, 96px) clamp(24px, 5vw, 64px) 48px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 800,
            fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <span ref={p1InnerRef} style={{ display: 'inline-block', color: '#f5f5f7' }}>
              Three strengths.&nbsp;
            </span>
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <span ref={p2InnerRef} style={{ display: 'inline-block', color: '#5AC8FA' }}>
              One output.
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
          Technical depth, product thinking, and program leadership.
        </p>
      </div>

      {/* ── Carousel ─────────────────────────────────────── */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        {/* Track */}
        <div style={{ overflow: 'hidden', borderRadius: '20px' }}>
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${activeIdx * 100}%)`,
              transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {SKILL_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  style={{
                    flex: '0 0 100%',
                    background: '#141414',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: 'clamp(32px, 4vw, 52px)',
                    boxSizing: 'border-box',
                  }}
                >
                  <Icon
                    size={28}
                    color={card.iconColor}
                    style={{ marginBottom: '20px' }}
                  />

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                      color: '#f5f5f7',
                      lineHeight: 1.08,
                      letterSpacing: '-0.01em',
                      marginBottom: '16px',
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      color: '#86868b',
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                      lineHeight: 1.75,
                      marginBottom: '32px',
                      maxWidth: '560px',
                    }}
                  >
                    {card.body}
                  </p>

                  {/* Pill tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {card.tags.map((tag) => (
                      <Pill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '24px',
            paddingBottom: 'clamp(40px, 6vh, 64px)',
          }}
        >
          {SKILL_CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); startInterval(); }}
              aria-label={`Go to skill ${i + 1}`}
              className="nav-dot-btn"
              style={{
                padding: '12px 4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{
                display: 'block',
                width: i === activeIdx ? '24px' : '8px',
                height: '8px',
                borderRadius: '99px',
                background: i === activeIdx ? '#5AC8FA' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Values ───────────────────────────────────────── */}
      <div
        ref={valuesRef}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px) clamp(64px, 10vh, 96px)',
        }}
      >
        <h2
          ref={valuesTitleRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#f5f5f7',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '36px',
          }}
        >
          How I work.
        </h2>

        <div
          className="skills-value-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}
        >
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                ref={(el) => { valueCardRefs.current[i] = el; }}
                style={{
                  opacity: 0,
                  background: '#000000',
                  padding: 'clamp(28px, 3.5vw, 44px)',
                }}
              >
                <Icon size={24} color="#5AC8FA" style={{ marginBottom: '16px' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                    color: '#f5f5f7',
                    marginBottom: '10px',
                    lineHeight: 1.2,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: '#86868b',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                  }}
                >
                  {v.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
