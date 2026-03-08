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
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
    >
      {/* Decorative line above icons */}
      <div className="w-px h-14 bg-gray-300/60" />

      {LINKS.map(({ icon: Icon, label, href }) => (
        <div key={label} className="relative group">
          <a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/[0.05] text-gray-500 hover:bg-[#0075eb] hover:text-white transition-all duration-200 hover:scale-110"
          >
            <Icon size={15} />
          </a>
          {/* Tooltip */}
          <span className="absolute left-12 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
