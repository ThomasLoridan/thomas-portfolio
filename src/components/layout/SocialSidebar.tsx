'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

const LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: Github, label: 'GitHub', href: profile.github },
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}` },
] as const;

export function SocialSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5"
    >
      {LINKS.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            background: 'rgba(18,18,20,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '99px',
            padding: '10px 16px 10px 13px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.01em',
            transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#0075eb';
            (e.currentTarget as HTMLElement).style.borderColor = '#0075eb';
            (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(18,18,20,0.88)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
            (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
          }}
        >
          <Icon size={13} />
          <span>{label}</span>
        </a>
      ))}
    </motion.div>
  );
}
