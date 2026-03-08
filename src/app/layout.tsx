import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'Thomas Loridan — Technical Program Manager',
    template: '%s | Thomas Loridan',
  },
  description:
    'Technical Program Manager at Amazon EU Transportation. €30M+ portfolio across 30 countries. Targeting PM IC4/IC5 roles at Meta, Google, Microsoft, Netflix, and Apple.',
  keywords: [
    'Product Manager',
    'Technical Program Manager',
    'Amazon',
    'TPM',
    'Portfolio',
    'Luxembourg',
  ],
  authors: [{ name: 'Thomas Loridan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Thomas Loridan — TPM → Product Manager',
    description:
      'TPM at Amazon EU Transportation with €30M+ portfolio across 30 countries. Shipping specs and automating everything in between.',
    siteName: 'Thomas Loridan Portfolio',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased bg-white text-[#0a0a0a]">
        {children}
      </body>
    </html>
  );
}
