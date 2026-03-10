import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';

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
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold font-heading text-white leading-[0.92] tracking-tight max-w-2xl">
            Let&apos;s build something.
          </h2>
          <p className="text-white/50 text-base max-w-md font-light leading-relaxed">
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
            Based in Luxembourg · Paris · Barcelona · Open to relocation · French &amp; English
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
        <div className="h-px w-full bg-white/8 mb-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold font-heading text-white tracking-tight">TL</span>
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
              <Github size={16} />
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
