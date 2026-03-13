'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ─── Types ──────────────────────────────────────────────── */
export interface StackItem {
  name: string;
  role: string;
}

export interface ImpactItem {
  value: string;
  label: string;
  context: string;
}

export interface ProjectDetail {
  id: string;
  tag: string;
  headline: string;
  description: string;
  visual: ReactNode;
  metrics: { value: string; label: string }[];
  stackLine: string;
  /* Modal-only fields */
  overview: string;
  problemStatement: string;
  solutionStatement: string;
  stack: StackItem[];
  impact: ImpactItem[];
  process: string[];
  status: string;
}

type Tab = 'overview' | 'stack' | 'impact' | 'process';
const TABS: Tab[] = ['overview', 'stack', 'impact', 'process'];

/* ─── Modal component ────────────────────────────────────── */
export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectDetail;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Sheet — white, Apple style */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div
          style={{
            padding: '28px 28px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#6e6e73',
                marginBottom: '8px',
              }}
            >
              {project.tag}
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.002em',
                lineHeight: 1.15,
                color: '#1d1d1f',
                maxWidth: '460px',
              }}
            >
              {project.headline}
            </h2>
          </div>

          {/* Close button — dark circle */}
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#1d1d1f',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '4px',
            }}
            aria-label="Close"
          >
            <span style={{ color: '#fff', fontSize: '18px', lineHeight: 1, marginTop: '-2px' }}>
              ×
            </span>
          </button>
        </div>

        {/* ── Scrollable content ──────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 0' }}>
          {/* Visual hero */}
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 8',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              background: '#000',
              position: 'relative',
            }}
          >
            {project.visual}
          </div>

          {/* Status badge */}
          <p
            style={{
              fontSize: '11px',
              color: '#6e6e73',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            {project.status}
          </p>

          {/* ── Overview tab ─────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#424245', marginBottom: '28px' }}>
                {project.overview}
              </p>
              <div style={{ borderTop: '1px solid #e5e5ea', paddingTop: '24px', marginBottom: '24px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#6e6e73',
                    marginBottom: '12px',
                  }}
                >
                  The problem
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#424245' }}>
                  {project.problemStatement}
                </p>
              </div>
              <div style={{ borderTop: '1px solid #e5e5ea', paddingTop: '24px', marginBottom: '28px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#6e6e73',
                    marginBottom: '12px',
                  }}
                >
                  What I built
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#424245' }}>
                  {project.solutionStatement}
                </p>
              </div>
            </div>
          )}

          {/* ── Stack tab ────────────────────────────────── */}
          {activeTab === 'stack' && (
            <div style={{ paddingBottom: '8px' }}>
              {project.stack.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '14px 0',
                    borderBottom: '1px solid #e5e5ea',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', flexShrink: 0 }}>
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#86868b',
                      textAlign: 'right',
                      maxWidth: '55%',
                      paddingLeft: '16px',
                    }}
                  >
                    {s.role}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Impact tab ───────────────────────────────── */}
          {activeTab === 'impact' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                paddingBottom: '24px',
              }}
            >
              {project.impact.map((imp, i) => (
                <div
                  key={i}
                  style={{
                    background: '#f5f5f7',
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#1d1d1f',
                      marginBottom: '4px',
                      lineHeight: 1.1,
                    }}
                  >
                    {imp.value}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#6e6e73',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                    }}
                  >
                    {imp.label}
                  </p>
                  <p style={{ fontSize: '13px', color: '#86868b', lineHeight: 1.5 }}>
                    {imp.context}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ── Process tab ──────────────────────────────── */}
          {activeTab === 'process' && (
            <div style={{ paddingBottom: '8px' }}>
              {project.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: '20px' }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#1d1d1f',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginTop: '2px',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#424245' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: '20px' }} />
        </div>

        {/* ── Bottom tabs — Apple chip switcher ───────────── */}
        <div
          style={{
            borderTop: '1px solid #e5e5ea',
            padding: '0 20px',
            background: '#ffffff',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', gap: '4px', padding: '8px 0' }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === tab ? '#1d1d1f' : 'transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: activeTab === tab ? '#ffffff' : '#86868b',
                  }}
                >
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
