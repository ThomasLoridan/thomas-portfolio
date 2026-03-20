'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

/* ─── Passion data — unchanged ───────────────────────────── */
const PASSIONS = [
  {
    id: 'tennis',
    eyebrow: 'SPORTS',
    title: '10 years of tennis. Rowing. Swimming.',
    body: 'Sport taught me discipline before I knew what discipline was. Tennis in particular — the mental game, the solo accountability, the split-second decisions — translates directly to how I perform under pressure.',
    accent: 'mental game',
    images: [{ src: '/images/hobbies/tennis.jpg', alt: 'Tennis' }],
  },
  {
    id: 'asimov',
    eyebrow: 'READING',
    title: 'Science fiction as a lens for the future.',
    body: "Isaac Asimov's Robot series and Foundation shaped how I think about systems, civilization, and the long arc of technology. Required reading for anyone building at scale.",
    accent: 'Foundation',
    images: [
      { src: '/images/hobbies/asimov.jpg', alt: 'Isaac Asimov Robot Series' },
      { src: '/images/hobbies/foundation.jpg', alt: 'Foundation Series' },
    ],
  },
  {
    id: 'dune',
    eyebrow: 'SCIENCE FICTION',
    title: 'Dune.',
    body: 'Politics, ecology, religion, and power — all compressed into one universe. Dune taught me that the best strategies are the ones that account for a generation, not a quarter.',
    accent: 'Dune.',
    images: [{ src: '/images/hobbies/dune.jpg', alt: 'Dune' }],
  },
  {
    id: 'suits',
    eyebrow: 'SERIES',
    title: 'Suits — negotiation as a craft.',
    body: "Harvey Specter's approach to preparation, framing, and leverage mirrors how I approach stakeholder management. Every conversation is a negotiation.",
    accent: 'negotiation',
    images: [{ src: '/images/hobbies/suits.avif', alt: 'Suits' }],
  },
  {
    id: 'aktionnaire',
    eyebrow: 'FINANCE',
    title: 'Markets as a feedback loop.',
    body: 'Aktionnaire keeps me sharp on macro trends and company fundamentals. Understanding how capital flows helps me build better business cases and prioritize with sharper ROI instincts.',
    accent: 'ROI instincts',
    images: [{ src: '/images/hobbies/aktionnaire.png', alt: 'Aktionnaire' }],
  },
  {
    id: 'diary-ceo',
    eyebrow: 'PODCASTS',
    title: 'The Diary of a CEO.',
    body: "Steven Bartlett's interviews with founders and operators give me frameworks I apply directly to how I lead teams and manage uncertainty. Raw, honest, and consistently actionable.",
    accent: 'lead teams',
    images: [{ src: '/images/hobbies/diary-ceo.jpg', alt: 'The Diary of a CEO' }],
  },
  {
    id: 'claude',
    eyebrow: 'TECH',
    title: 'AI as an amplifier.',
    body: "Claude is my thinking partner, my coding co-pilot, and the tool that lets me operate at 10x. I don't just use AI — I build with it, on it, and think critically about where it's going.",
    accent: '10x',
    images: [{ src: '/images/hobbies/claude.jpg', alt: 'Claude AI' }],
  },
];

/* ─── Inline accent highlight ─────────────────────────────── */
function AccentText({ text, accent }: { text: string; accent: string }) {
  const idx = text.indexOf(accent);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#5AC8FA' }}>{accent}</span>
      {text.slice(idx + accent.length)}
    </>
  );
}

/* ─── Single hobby block ─────────────────────────────────── */
const PARALLAX_PX = 24;

function HobbyBlock({
  passion,
  blockRef,
}: {
  passion: (typeof PASSIONS)[number];
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);

  /* Image parallax — scrub, no toggleActions (continuously linked to scroll) */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { y: -PARALLAX_PX },
        {
          y: PARALLAX_PX,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={blockRef} style={{ opacity: 0 }}>
      {/* Image container — overflow:hidden clips the parallax movement */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: 'clamp(220px, 32vw, 320px)',
          overflow: 'hidden',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        {/* Parallax wrapper — extends beyond container edges */}
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            top: `-${PARALLAX_PX}px`,
            left: 0,
            right: 0,
            height: `calc(100% + ${PARALLAX_PX * 2}px)`,
          }}
        >
          {passion.images.length === 2 ? (
            /* Two-image side-by-side (asimov) */
            <div style={{ display: 'flex', height: '100%', gap: '4px' }}>
              {passion.images.map((img) => (
                <div key={img.src} style={{ flex: 1, position: 'relative' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={passion.images[0].src}
                alt={passion.images[0].alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          fontWeight: 500,
          color: '#5AC8FA',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        {passion.eyebrow}
      </p>

      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 2vw, 1.65rem)',
          color: '#f5f5f7',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          marginBottom: '12px',
        }}
      >
        {passion.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1vw, 1rem)',
          color: '#86868b',
          lineHeight: 1.75,
        }}
      >
        <AccentText text={passion.body} accent={passion.accent} />
      </p>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export function Hobbies() {
  const sectionRef   = useRef<HTMLElement>(null);
  const overlineRef  = useRef<HTMLParagraphElement>(null);
  const p1InnerRef   = useRef<HTMLSpanElement>(null);
  const p2InnerRef   = useRef<HTMLSpanElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const blockRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Overline */
      gsap.fromTo(overlineRef.current,
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

      /* H2 clip reveal */
      gsap.fromTo([p1InnerRef.current, p2InnerRef.current],
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

      /* Sub */
      gsap.fromTo(subRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Grid blocks — each has its own trigger; right-col blocks get delay:0.15 */
      blockRefs.current.filter(Boolean).forEach((block, i) => {
        const isRightCol = i % 2 === 1;
        gsap.fromTo(block,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0,
            duration: 0.75,
            ease: 'power3.out',
            delay: isRightCol ? 0.15 : 0,
            scrollTrigger: {
              trigger: block,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      style={{
        background: '#1d1d1f',
        paddingBlock: 'clamp(80px, 12vw, 120px)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        {/* ── Header — flush left ─────────────────────────── */}
        <div style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}>
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
              marginBottom: '20px',
            }}
          >
            Beyond work
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p1InnerRef} style={{ display: 'inline-block', color: '#f5f5f7' }}>
                Beyond the&nbsp;
              </span>
            </span>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p2InnerRef} style={{ display: 'inline-block', color: '#5AC8FA' }}>
                work.
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
              maxWidth: '440px',
            }}
          >
            The things I read, watch, and obsess over outside of work.
          </p>
        </div>

        {/* ── 2-column staggered grid ─────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            columnGap: 'clamp(24px, 4vw, 56px)',
            rowGap: 'clamp(48px, 7vw, 80px)',
          }}
        >
          {PASSIONS.map((passion, i) => (
            <HobbyBlock
              key={passion.id}
              passion={passion}
              blockRef={(el) => { blockRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
