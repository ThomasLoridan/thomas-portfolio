'use client';

import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';

function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 98 96" fill="currentColor" aria-hidden="true">
      <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0a0a0a]">
      {/* Main CTA block */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center gap-8 mb-20">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#5AC8FA',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Get in touch
          </p>
          <h2 className="text-[clamp(2.25rem,4vw,3.75rem)] font-bold text-white leading-[1.0] tracking-tight max-w-2xl">
            Let&apos;s build something.
          </h2>
          <p className="text-white/50 text-base max-w-md font-normal leading-relaxed">
            Open to Senior TPM, Lead PM, and Head of Product roles. Available for consulting and technical advisory.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.25)',
              lineHeight: 1.7,
            }}
          >
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0a0a0a] font-semibold rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
            >
              {profile.email}
              <ArrowRight size={14} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/[0.08] mb-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white tracking-tight">TL</span>
            <span className="text-white/20 text-sm mx-1">·</span>
            <span className="text-white/40 text-sm">{profile.title}</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubMark size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          <p className="text-white/25 text-sm">
            © 2025 {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
