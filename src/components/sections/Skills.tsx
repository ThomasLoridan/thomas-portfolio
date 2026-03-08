'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Lightbulb, Network } from 'lucide-react';

/* ─── Skill card data ─────────────────────────────────── */
const SKILL_CARDS = [
  {
    icon: Code2,
    iconColor: '#0075eb',
    title: 'Technical depth.',
    body: 'Python, SQL, AWS, GCP. I build the systems, not just the specs.',
    tags: ['Python', 'SQL', 'AWS', 'GCP', 'BigQuery', 'ETL Pipelines', 'Docker', 'TypeScript', 'FastAPI', 'REST APIs'],
  },
  {
    icon: Lightbulb,
    iconColor: '#6366f1',
    title: 'Product thinking.',
    body: 'PRDs, roadmaps, OKRs. I define what to build and why it matters.',
    tags: ['PRD Writing', 'Roadmap Planning', 'OKR Definition', 'A/B Testing', 'User Research', 'Stakeholder Mgmt', 'Data-Driven Decisions'],
  },
  {
    icon: Network,
    iconColor: '#00a86b',
    title: 'Program leadership.',
    body: '50+ stakeholders across 26 countries. I align teams and ship at scale.',
    tags: ['Cross-functional', 'Agile/Scrum', 'Executive Reporting', 'Jira', 'Confluence', 'QuickSight', 'PowerBI', 'Figma'],
  },
];

/* ─── Values data ─────────────────────────────────────── */
const VALUES = [
  {
    emoji: '🎯',
    title: 'Impact-first.',
    body: 'Every decision backed by data and tied to business outcomes.',
  },
  {
    emoji: '🔒',
    title: 'Ownership.',
    body: 'I treat every product like my own. No escalation theater.',
  },
  {
    emoji: '⚡',
    title: 'Speed + precision.',
    body: "I move fast without breaking things. Or people.",
  },
];

const CARD_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Expandable skill card ───────────────────────────── */
function SkillCard({
  card,
  delay,
  inView,
}: {
  card: (typeof SKILL_CARDS)[number];
  delay: number;
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: CARD_EASE }}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '40px 36px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: '280px',
      }}
    >
      {/* Icon */}
      <Icon size={36} color={card.iconColor} style={{ marginBottom: '4px' }} />

      {/* Title + toggle button */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
            color: '#0a0a0a',
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </h3>
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          style={{
            flexShrink: 0,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#0a0a0a',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            lineHeight: 1,
            fontWeight: 300,
            transition: 'background 0.2s',
          }}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      {/* Body */}
      <p style={{ color: '#4b4b4b', fontSize: '1.05rem', lineHeight: 1.7 }}>
        {card.body}
      </p>

      {/* Expandable tags */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '8px' }}>
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '99px',
                    background: `${card.iconColor}10`,
                    border: `1px solid ${card.iconColor}25`,
                    color: card.iconColor,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────── */
export function Skills() {
  const partARef = useRef<HTMLDivElement>(null);
  const partAInView = useInView(partARef, { once: true, margin: '-15%' });
  const partBRef = useRef<HTMLDivElement>(null);
  const partBInView = useInView(partBRef, { once: true, margin: '-15%' });

  return (
    <section id="skills" className="skills-bg">
      {/* ── PART A: Skill cards ─────────────────────────── */}
      <div className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            ref={partARef}
            initial={{ opacity: 0, y: 24 }}
            animate={partAInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                color: '#0a0a0a',
                lineHeight: 1.05,
                marginBottom: '12px',
              }}
            >
              What I bring to the table.
            </h2>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0075eb',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Download my resume ↗
            </a>
          </motion.div>

          {/* 3 skill cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SKILL_CARDS.map((card, i) => (
              <SkillCard key={card.title} card={card} delay={i * 0.15} inView={partAInView} />
            ))}
          </div>
        </div>
      </div>

      {/* ── PART B: Values cards ────────────────────────── */}
      <div className="bg-white section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            ref={partBRef}
            initial={{ opacity: 0, y: 24 }}
            animate={partBInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                color: '#0a0a0a',
              }}
            >
              How I work.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 60 }}
                animate={partBInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: CARD_EASE }}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '40px 36px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  minHeight: '280px',
                }}
              >
                <span style={{ fontSize: '2rem', lineHeight: 1, display: 'block', marginBottom: '20px' }}>
                  {v.emoji}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
                    color: '#0a0a0a',
                    marginBottom: '10px',
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: '#4b4b4b', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
