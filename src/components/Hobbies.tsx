'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface PassionImage {
  src: string;
  alt: string;
}

interface Passion {
  id: string;
  pattern: 'A' | 'B';
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  images: PassionImage[];
}

const PASSIONS: Passion[] = [
  {
    id: 'tennis',
    pattern: 'A',
    eyebrow: 'SPORTS',
    title: '10 years of tennis. Rowing. Swimming.',
    body: 'Sport taught me discipline before I knew what discipline was. Tennis in particular — the mental game, the solo accountability, the split-second decisions — translates directly to how I perform under pressure.',
    accent: 'mental game',
    images: [{ src: '/images/hobbies/tennis.jpg', alt: 'Tennis' }],
  },
  {
    id: 'asimov',
    pattern: 'B',
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
    pattern: 'A',
    eyebrow: 'SCIENCE FICTION',
    title: 'Dune.',
    body: 'Politics, ecology, religion, and power — all compressed into one universe. Dune taught me that the best strategies are the ones that account for a generation, not a quarter.',
    accent: 'Dune.',
    images: [{ src: '/images/hobbies/dune.jpg', alt: 'Dune' }],
  },
  {
    id: 'suits',
    pattern: 'B',
    eyebrow: 'SERIES',
    title: 'Suits — negotiation as a craft.',
    body: "Harvey Specter's approach to preparation, framing, and leverage mirrors how I approach stakeholder management. Every conversation is a negotiation.",
    accent: 'negotiation',
    images: [{ src: '/images/hobbies/suits.avif', alt: 'Suits' }],
  },
  {
    id: 'aktionnaire',
    pattern: 'A',
    eyebrow: 'FINANCE',
    title: 'Markets as a feedback loop.',
    body: 'Aktionnaire keeps me sharp on macro trends and company fundamentals. Understanding how capital flows helps me build better business cases and prioritize with sharper ROI instincts.',
    accent: 'ROI instincts',
    images: [{ src: '/images/hobbies/aktionnaire.png', alt: 'Aktionnaire' }],
  },
  {
    id: 'diary-ceo',
    pattern: 'B',
    eyebrow: 'PODCASTS',
    title: 'The Diary of a CEO.',
    body: "Steven Bartlett's interviews with founders and operators give me frameworks I apply directly to how I lead teams and manage uncertainty. Raw, honest, and consistently actionable.",
    accent: 'lead teams',
    images: [{ src: '/images/hobbies/diary-ceo.jpg', alt: 'The Diary of a CEO' }],
  },
  {
    id: 'claude',
    pattern: 'A',
    eyebrow: 'TECH',
    title: 'AI as an amplifier.',
    body: "Claude is my thinking partner, my coding co-pilot, and the tool that lets me operate at 10x. I don't just use AI — I build with it, on it, and think critically about where it's going.",
    accent: '10x',
    images: [{ src: '/images/hobbies/claude.jpg', alt: 'Claude AI' }],
  },
];

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

function ImagePanel({ images }: { images: PassionImage[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (images.length === 2) {
    return (
      <div style={{ display: 'flex', gap: '12px', height: 'clamp(260px, 42vw, 420px)' }}>
        {images.map((img, idx) => {
          const flexValue =
            hoveredIdx === null ? 1 : hoveredIdx === idx ? 1.4 : 0.6;
          return (
            <div
              key={img.src}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flex: flexValue,
                minWidth: 0,
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'flex 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized={false}
                style={{ objectFit: 'cover' }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        height: 'clamp(260px, 42vw, 420px)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        unoptimized={false}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

function PassionBloc({ passion }: { passion: Passion }) {
  const isA = passion.pattern === 'A';
  const [imageHovered, setImageHovered] = useState(false);
  const isSingle = passion.images.length === 1;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(48px, 8vh, 80px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        className={`flex flex-col gap-8 ${isA ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 80px)',
          width: '100%',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Image side:
            — single image: scale transform (image grows behind text, z-index 1)
            — dual images: ImagePanel handles internal flex push */}
        <div
          className="w-full md:w-[55%] shrink-0"
          onMouseEnter={() => isSingle && setImageHovered(true)}
          onMouseLeave={() => isSingle && setImageHovered(false)}
          style={{
            position: 'relative',
            zIndex: 1,
            transform: isSingle && imageHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: isA ? 'center left' : 'center right',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ImagePanel images={passion.images} />
          </motion.div>
        </div>

        {/* Text side — z-index 2 so it stays in front of scaled image */}
        <div
          className="w-full md:w-[45%] shrink-0"
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: isA ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isA ? 40 : -40 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ padding: 'clamp(24px, 4vw, 60px)' }}
          >
            <p
              style={{
                color: 'rgba(245,245,247,0.5)',
                fontSize: '0.82rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {passion.eyebrow}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              {passion.title}
            </h3>
            <p
              style={{
                color: 'rgba(245,245,247,0.88)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.8,
                fontWeight: 400,
                maxWidth: '400px',
              }}
            >
              <AccentText text={passion.body} accent={passion.accent} />
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Hobbies() {
  return (
    <section
      id="hobbies"
      style={{ backgroundColor: '#1d1d1f', paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          textAlign: 'center',
          marginBottom: '80px',
          padding: '0 clamp(24px, 6vw, 80px)',
        }}
      >
        <p
          style={{
            color: 'rgba(245,245,247,0.5)',
            fontSize: '0.82rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 500,
            fontFamily: 'var(--font-mono)',
          }}
        >
          Beyond work
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            color: '#ffffff',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            marginBottom: '20px',
          }}
        >
          Beyond the work.
        </h2>
        <p
          style={{
            color: 'rgba(245,245,247,0.72)',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          The things I read, watch, and obsess over outside of work.
        </p>
      </motion.div>

      {/* Passion blocs */}
      {PASSIONS.map((passion, i) => (
        <div key={passion.id}>
          <PassionBloc passion={passion} />
          {i < PASSIONS.length - 1 && (
            <div
              style={{
                maxWidth: '80%',
                margin: '0 auto',
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
              }}
            />
          )}
        </div>
      ))}
    </section>
  );
}
