"use client"

import { Button } from "@/components/ui/button"

export function Header() {
    const scrollToCTA = () => {
        document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="flex items-center gap-2">
                <img src="/wealthia-small.png" alt="Wealth IA" className="h-8" />
            </div>
            <Button variant="outline" className="text-sm font-medium border-white/10 hover:bg-white/5 hover:text-white rounded-full px-6" onClick={scrollToCTA}>
                Suivre le projet
            </Button>
        </header>
    )
}
