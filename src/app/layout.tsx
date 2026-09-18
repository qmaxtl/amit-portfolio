import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/lenis";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.meta.name} — ${PORTFOLIO_DATA.meta.role}`,
  description: `${PORTFOLIO_DATA.meta.tagline} Portfolio of autonomous systems, AI architectures, and bespoke digital experiences.`,
  keywords: [
    "Amit Kumar Gupta",
    "Founder",
    "Systems Architect",
    "Creative Engineer",
    "AI",
    "Autonomous Agents",
    "SaaS",
    "Next.js",
    "Three.js",
    "WebGL",
  ],
  authors: [{ name: PORTFOLIO_DATA.meta.name }],
  openGraph: {
    title: `${PORTFOLIO_DATA.meta.name} — ${PORTFOLIO_DATA.meta.role}`,
    description: PORTFOLIO_DATA.meta.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.meta.name} — ${PORTFOLIO_DATA.meta.role}`,
    description: PORTFOLIO_DATA.meta.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO_DATA.meta.name,
    jobTitle: PORTFOLIO_DATA.meta.role,
    description: PORTFOLIO_DATA.meta.tagline,
    nationality: "Indian",
    knowsAbout: [
      "Artificial Intelligence",
      "Autonomous Agents",
      "Software Architecture",
      "SaaS",
      "Creative Engineering",
      "WebGL",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#08090A] text-slate-100 antialiased selection:bg-brand-cyan selection:text-black`}
      >
        <SoundProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
