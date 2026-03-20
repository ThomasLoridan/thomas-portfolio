'use client';

import { useState, useRef, useEffect } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/profile';

/* ─── Inline GitHub mark (lucide Github is deprecated) ───── */
function GitHubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 98 96" fill="currentColor" aria-hidden="true">
      <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );
}

/* ─── Floating label input / textarea ────────────────────── */
function FloatingField({
  label,
  type = 'text',
  name,
  required,
  isTextarea,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue]     = useState('');
  const isUp = focused || value.length > 0;

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    pointerEvents: 'none',
    zIndex: 1,
    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
    top: isTextarea
      ? (isUp ? '10px' : '18px')
      : (isUp ? '8px' : '50%'),
    transform: (!isTextarea && !isUp) ? 'translateY(-50%)' : 'none',
    fontSize: isUp ? '0.58rem' : '0.92rem',
    color: isUp ? '#5AC8FA' : 'rgba(255,255,255,0.32)',
    letterSpacing: isUp ? '0.14em' : '0',
    textTransform: isUp ? 'uppercase' : 'none',
    fontFamily: isUp ? 'var(--font-mono)' : 'var(--font-body)',
    fontWeight: isUp ? 500 : 400,
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused ? '#5AC8FA' : 'rgba(255,255,255,0.10)'}`,
    borderRadius: '12px',
    color: '#f5f5f7',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxShadow: focused ? '0 0 0 3px rgba(90,200,250,0.10)' : 'none',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label}</label>
      {isTextarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          style={{ ...fieldStyle, padding: '28px 16px 14px', resize: 'none', display: 'block' }}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          style={{ ...fieldStyle, padding: '26px 16px 10px', display: 'block' }}
        />
      )}
    </div>
  );
}

/* ─── Submit button with GSAP shimmer ────────────────────── */
function SubmitButton({ submitted }: { submitted: boolean }) {
  const shimmerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!shimmerRef.current) return;
    gsap.fromTo(shimmerRef.current,
      { x: '-120%' },
      { x: '120%', duration: 0.55, ease: 'power2.inOut' }
    );
  };

  return (
    <button
      type="submit"
      disabled={submitted}
      onMouseEnter={handleMouseEnter}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        padding: '16px 32px',
        borderRadius: '980px',
        background: '#ffffff',
        color: '#080808',
        fontSize: '0.95rem',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.01em',
        border: 'none',
        cursor: submitted ? 'default' : 'pointer',
        opacity: submitted ? 0.65 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      <span
        ref={shimmerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '55%', height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
          transform: 'translateX(-120%)',
          pointerEvents: 'none',
        }}
      />
      {submitted ? 'Message sent ✓' : 'Send message →'}
    </button>
  );
}

/* ─── Contact form ────────────────────────────────────────── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form   = e.currentTarget;
    const name   = (form.elements.namedItem('name')    as HTMLInputElement).value;
    const email  = (form.elements.namedItem('email')   as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    window.location.href =
      `mailto:${profile.email}?subject=Portfolio contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <FloatingField label="Name"    name="name"    required />
      <FloatingField label="Email"   name="email"   type="email" required />
      <FloatingField label="Message" name="message" required isTextarea />
      <div style={{ marginTop: '4px' }}>
        <SubmitButton submitted={submitted} />
      </div>
    </form>
  );
}

/* ─── Footer nav links ────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About',       href: '#about'       },
  { label: 'Experience',  href: '#experience'  },
  { label: 'Projects',    href: '#projects'    },
  { label: 'Skills',      href: '#skills'      },
  { label: 'Contact',     href: '#contact'     },
];

/* ─── Pill social link ────────────────────────────────────── */
function SocialPill({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '9px 18px',
        borderRadius: '99px',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#86868b',
        fontSize: '0.82rem',
        textDecoration: 'none',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = '#f5f5f7';
        el.style.borderColor = 'rgba(255,255,255,0.25)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = '#86868b';
        el.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
    >
      {children}
    </a>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export function Footer() {
  const contactRef  = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const p1InnerRef  = useRef<HTMLSpanElement>(null);
  const p2InnerRef  = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);
  const socialRef   = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Overline */
      gsap.fromTo(overlineRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* H2 clip */
      gsap.fromTo([p1InnerRef.current, p2InnerRef.current],
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Sub + form + social — staggered fade */
      gsap.fromTo([subRef.current, formRef.current, socialRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, delay: 0.3,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Footer row — simple fade */
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Contact section ──────────────────────────── */}
      <section
        ref={contactRef}
        id="contact"
        style={{
          background: '#080808',
          paddingBlock: 'clamp(80px, 12vw, 120px)',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 48px)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '44px' }}>
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
              Get in touch
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                marginBottom: '18px',
              }}
            >
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <span ref={p1InnerRef} style={{ display: 'inline-block', color: '#f5f5f7' }}>
                  {"Let's build\u00a0"}
                </span>
              </span>
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                <span ref={p2InnerRef} style={{ display: 'inline-block', color: '#5AC8FA' }}>
                  something.
                </span>
              </span>
            </h2>

            <p
              ref={subRef}
              style={{
                opacity: 0,
                color: '#86868b',
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                lineHeight: 1.8,
              }}
            >
              Open to Senior TPM, Lead PM, and Head of Product roles.
              Available for consulting and technical advisory.
            </p>
          </div>

          {/* Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            <ContactForm />
          </div>

          {/* Social pills */}
          <div
            ref={socialRef}
            style={{
              opacity: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '28px',
            }}
          >
            <SocialPill href={profile.linkedin} external>
              <Linkedin size={13} />
              LinkedIn
            </SocialPill>
            <SocialPill href={profile.github} external>
              <GitHubMark size={13} />
              GitHub
            </SocialPill>
            <SocialPill href={`mailto:${profile.email}`}>
              <Mail size={13} />
              Email
            </SocialPill>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer
        ref={footerRef}
        style={{
          opacity: 0,
          background: '#000000',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingBlock: 'clamp(24px, 3.5vw, 36px)',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#f5f5f7',
                letterSpacing: '-0.01em',
              }}
            >
              TL
            </span>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.75rem' }}>·</span>
            <span
              style={{
                color: 'rgba(255,255,255,0.32)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {profile.title}
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: 'clamp(16px, 2.5vw, 28px)', flexWrap: 'wrap' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#f5f5f7';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            © 2025 {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
