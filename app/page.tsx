import type { Metadata } from "next"
import HeroSection from "@/components/sections/HeroSection"
import GhostwriterSection from "@/components/sections/GhostwriterSection"
import VaultSection from "@/components/sections/VaultSection"
import DocumentsSection from "@/components/sections/DocumentsSection"
import EngineSection from "@/components/sections/EngineSection"
import ArbitrageSection from "@/components/sections/ArbitrageSection"
import RetirementSection from "@/components/sections/RetirementSection"
import KYCSection from "@/components/sections/KYCSection"
import ClientSpaceSection from "@/components/sections/ClientSpaceSection"
import AssistantSection from "@/components/sections/AssistantSection"
import CTASection from "@/components/sections/CTASection"
import { Header } from "@/components/layout/Header"

export const metadata: Metadata = {
  title: "Accueil",
  description: "Découvrez Wealth IA, la plateforme révolutionnaire d'IA pour les professionnels de la gestion de patrimoine.",
  openGraph: {
    title: "Wealth IA - Révolutionnez votre pratique patrimoniale",
    description: "Devenez l'architecte du futur de vos clients.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Wealth IA - Tableau de bord IA",
      },
    ],
  },
  twitter: {
    title: "Wealth IA - Révolutionnez votre pratique",
    description: "Éliminez 90% de la saisie administrative grâce à l'IA patrimoniale.",
    images: ["/twitter-home.png"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/30">
      <Header />
      <HeroSection />
      <KYCSection />
      <GhostwriterSection />
      <VaultSection />
      <DocumentsSection />
      <EngineSection />
      <ArbitrageSection />
      <RetirementSection />
      <ClientSpaceSection />
      <AssistantSection />
      <CTASection />

      <footer className="py-8 text-center text-sm text-slate-500 border-t border-white/5">
        <p>© 2026 Wealth IA. Tous droits réservés.</p>
      </footer>
    </main>
  )
}
