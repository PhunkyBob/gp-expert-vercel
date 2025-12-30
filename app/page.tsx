import HeroSection from "@/components/sections/HeroSection"
import GhostwriterSection from "@/components/sections/GhostwriterSection"
import VaultSection from "@/components/sections/VaultSection"
import EngineSection from "@/components/sections/EngineSection"
import ArbitrageSection from "@/components/sections/ArbitrageSection"
import RetirementSection from "@/components/sections/RetirementSection"
import KYCSection from "@/components/sections/KYCSection"
import ClientSpaceSection from "@/components/sections/ClientSpaceSection"
import AssistantSection from "@/components/sections/AssistantSection"
import CTASection from "@/components/sections/CTASection"
import { Header } from "@/components/layout/Header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500/30">
      <Header />
      <HeroSection />
      <KYCSection />
      <GhostwriterSection />
      <VaultSection />
      <EngineSection />
      <ArbitrageSection />
      <RetirementSection />
      <ClientSpaceSection />
      <AssistantSection />
      <CTASection />

      <footer className="py-8 text-center text-sm text-slate-500 border-t border-white/5">
        <p>© 2025 Wealth AI Co-pilot. Tous droits réservés.</p>
      </footer>
    </main>
  )
}
