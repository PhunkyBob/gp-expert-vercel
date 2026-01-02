import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wealthia.fr'),
  title: {
    default: "Wealth IA - L'IA au service de l'excellence patrimoniale",
    template: "%s | Wealth IA"
  },
  description: "Éliminez 90% de la saisie administrative. La plateforme SaaS révolutionnaire pour CGP, experts-comptables et avocats. Intelligence artificielle pour l'ingénierie patrimoniale, l'agrégation 360° des données et la simulation fiscale.",
  keywords: [
    "intelligence artificielle patrimoniale",
    "SaaS CGP",
    "logiciel gestion de patrimoine",
    "IA finance",
    "simulateur fiscal",
    "agrégation données financières",
    "ingénierie patrimoniale",
    "optimisation fiscale",
    "conseiller en gestion de patrimoine",
    "expert-comptable IA",
    "assistant juridique IA",
    "transmission patrimoine",
    "IFI simulation",
    "impôt revenus"
  ],
  authors: [{ name: "Wealth IA Team" }],
  creator: "Wealth IA",
  publisher: "Wealth IA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.wealthia.fr",
    title: "Wealth IA - L'IA au service de l'excellence patrimoniale",
    description: "Éliminez 90% de la saisie administrative. Plateforme SaaS pour CGP, experts-comptables et avocats. Intelligence artificielle pour l'ingénierie patrimoniale.",
    siteName: "Wealth IA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wealth IA - Intelligence Artificielle Patrimoniale",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.wealthia.fr",
  },
  category: "technology",
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`} suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
