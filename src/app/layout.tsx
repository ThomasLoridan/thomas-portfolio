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
    default: 'Thomas Loridan — Technical Program Manager · Builder',
    template: '%s | Thomas Loridan',
  },
  description:
    'Product Manager & TPM. €30M+ portfolio across 26 countries at Amazon EU Transportation. Systems that scale. Impact by design.',
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
    title: 'Thomas Loridan — Technical Program Manager · Builder',
    description:
      '€30M+ programs. 26 countries. Amazon EU Transportation. Systems that scale, impact by design.',
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
      <body className="min-h-screen antialiased bg-white text-[#0a0a0a]" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
        {children}
      </body>
    </html>
  );
}
