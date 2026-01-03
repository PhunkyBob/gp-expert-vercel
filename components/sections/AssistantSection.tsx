"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const MotionDiv = motion.div as any

export default function AssistantSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50])

    const [query, setQuery] = useState("")
    const [result, setResult] = useState("")
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query) return
        setIsSearching(true)
        setResult("")

        await new Promise(r => setTimeout(r, 1000))

        const text = "Selon l'article 964 du Code Général des Impôts, l'IFI cible uniquement les actifs immobiliers. Toutefois, les biens affectés à l'activité professionnelle principale du redevable ou de son conjoint sont exonérés. Concernant votre holding, si elle est animatrice, ses parts peuvent être qualifiées de biens professionnels..."

        setIsSearching(false)

        for (let i = 0; i <= text.length; i++) {
            setResult(text.slice(0, i))
            await new Promise(r => setTimeout(r, 5))
        }
    }

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
            <MotionDiv
                style={{ y: bgY }}
                className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden"
            >
                <div className="text-xs md:text-sm font-mono text-justify leading-relaxed p-8 break-all whitespace-pre-wrap">
                    {Array(20).fill("LOI n° 2018-1317 du 28 décembre 2018 de finances pour 2019 - Article 885 A (abrogé) Article 964 Créé par LOI n°2017-1837 du 30 décembre 2017 - art. 31 (V) Il est institué un impôt annuel sur la fortune immobilière désigné par l'abréviation : IFI. Sont soumises à cet impôt, lorsque la valeur de leurs actifs immobiliers est supérieure au seuil mentionné à l'article 965, les personnes physiques ayant leur domicile fiscal en France, à raison de leurs actifs immobiliers situés en France ou hors de France. ").join(" ")}
                </div>
            </MotionDiv>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Votre expert juridique interne<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">disponible 24/7</span></h2>
                    <p className="text-xl text-slate-400 mb-8">Certitude juridique absolue. RAG sur 50,000+ textes de loi et jurisprudence</p>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            Mis à jour en temps réel
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                        {['BOFIP', 'Code Général des Impôts', 'Jurisprudence', 'Bulletins officiels', 'Circulaires', 'Documents internes'].map((source, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                {source}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSearch} className="relative mb-8">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Posez une question juridique (ex: IFI et holdings)..."
                            className="h-14 pl-12 bg-card/80 backdrop-blur border-white/10 text-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] focus:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-shadow rounded-xl text-white placeholder:text-slate-500"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <button type="submit" className="hidden" />
                    </form>

                    <div className="bg-card/90 backdrop-blur border border-white/10 rounded-xl p-6 min-h-[200px] shadow-2xl relative">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-2 h-2 rounded-full ${isSearching ? "bg-yellow-500 animate-ping" : "bg-green-500"}`} />
                            <span className="text-xs font-mono text-slate-400">AI CO-PILOT</span>
                        </div>

                        {isSearching ? (
                            <div className="flex items-center gap-2 text-slate-400">
                                <span className="animate-pulse">Analyse de la jurisprudence en cours...</span>
                            </div>
                        ) : result ? (
                            <p className="text-lg leading-relaxed text-slate-200 font-light">
                                {result}
                                <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse align-middle" />
                            </p>
                        ) : (
                            <p className="text-slate-500 italic">
                                Posez une question pour obtenir une analyse juridique instantanée.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
