import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

// Syne — headings uniquement : subset strict pour réduire le bundle font
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// DM Sans — body + UI text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Thomas — Technical Program Manager",
    template: "%s | Thomas",
  },
  description:
    "Technical Program Manager chez Amazon EU Transportation. €30M+ portfolio, 26 pays. En transition vers un rôle PM IC4/IC5 chez Meta, Google ou Microsoft.",
  keywords: ["Product Manager", "Technical Program Manager", "Amazon", "Portfolio"],
  authors: [{ name: "Thomas" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Thomas — Technical Program Manager",
    description: "TPM Amazon EU Transportation → PM IC4/IC5",
    siteName: "Portfolio Thomas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      // suppressHydrationWarning : évite le mismatch si ThemeProvider (next-themes)
      // est ajouté plus tard pour le toggle dark/light
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}