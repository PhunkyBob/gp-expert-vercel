"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FileText, PieChart, TrendingUp, CheckCircle, Download, FileCheck, Sparkles, BrainCircuit } from "lucide-react"

const MotionDiv = motion.div as any

export default function DocumentsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const cardScale = useTransform(scrollYProgress, [0.1, 0.6], [0.8, 1])
    const cardRotate = useTransform(scrollYProgress, [0.1, 0.6], [10, 0])
    const cardY = useTransform(scrollYProgress, [0.1, 0.6], [100, 0])

    const headerOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
    const section1Opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
    const section1X = useTransform(scrollYProgress, [0.3, 0.4], [-20, 0])

    const section2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
    const section2X = useTransform(scrollYProgress, [0.45, 0.55], [-20, 0])

    const section3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])
    const section3X = useTransform(scrollYProgress, [0.6, 0.7], [-20, 0])

    const badgeScale = useTransform(scrollYProgress, [0.75, 0.85], [0, 1])
    const badgeRotate = useTransform(scrollYProgress, [0.75, 0.85], [-45, 0])

    const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -100])
    const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -150])
    const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -50])

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center justify-center w-full">
                    
                    <div className="max-w-2xl">
                        <MotionDiv
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <FileText className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-blue-400 font-medium tracking-wide text-sm uppercase">Génération Intelligente</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Vos rapports experts,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    générés en un clic
                                </span>
                            </h2>
                            
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                Transformez vos analyses complexes en documents clients impeccables. Diagnostics, propositions d'investissement et rapports fiscaux, formatés automatiquement.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Sparkles, text: "Mise en page automatique et professionnelle" },
                                    { icon: BrainCircuit, text: "Contenu rédigé par IA contextuelle" },
                                    { icon: CheckCircle, text: "Conformité réglementaire intégrée" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300">
                                        <item.icon className="w-5 h-5 text-purple-400" />
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                {['Diagnostic Patrimonial', 'Recommandation', 'Analyse Fiscale', 'Succession'].map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </MotionDiv>
                    </div>

                    <div className="relative h-[600px] flex items-center justify-center">
                        <MotionDiv style={{ y: particle1Y }} className="absolute top-10 right-10 p-3 bg-card border border-white/5 rounded-xl shadow-lg z-0">
                            <PieChart className="w-6 h-6 text-pink-400" />
                        </MotionDiv>
                        <MotionDiv style={{ y: particle2Y }} className="absolute bottom-20 left-0 p-3 bg-card border border-white/5 rounded-xl shadow-lg z-0">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                        </MotionDiv>
                        <MotionDiv style={{ y: particle3Y }} className="absolute top-40 left-10 p-3 bg-card border border-white/5 rounded-xl shadow-lg z-0">
                            <FileCheck className="w-6 h-6 text-blue-400" />
                        </MotionDiv>

                        <MotionDiv 
                            style={{ scale: cardScale, rotate: cardRotate, y: cardY }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 z-10"
                        >
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                            <div className="p-8 space-y-8 bg-white text-slate-800">
                                
                                <MotionDiv style={{ opacity: headerOpacity }} className="flex justify-between items-start border-b border-slate-100 pb-6">
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="h-4 w-32 bg-slate-200 rounded" />
                                        <div className="h-3 w-24 bg-slate-100 rounded" />
                                    </div>
                                    <div className="text-right">
                                        <div className="h-3 w-20 bg-slate-100 rounded mb-2 ml-auto" />
                                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">
                                            Validé
                                        </div>
                                    </div>
                                </MotionDiv>

                                <MotionDiv style={{ opacity: section1Opacity, x: section1X }} className="space-y-3">
                                    <div className="h-4 w-40 bg-slate-800 rounded" />
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-slate-100 rounded" />
                                        <div className="h-2 w-full bg-slate-100 rounded" />
                                        <div className="h-2 w-3/4 bg-slate-100 rounded" />
                                    </div>
                                </MotionDiv>

                                <MotionDiv style={{ opacity: section2Opacity, x: section2X }} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-r-purple-500 border-t-blue-300" />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Actions</span>
                                            <span className="font-bold text-slate-900">45%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full w-[45%] bg-blue-500" />
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Obligations</span>
                                            <span className="font-bold text-slate-900">30%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full w-[30%] bg-purple-500" />
                                        </div>
                                    </div>
                                </MotionDiv>

                                <MotionDiv style={{ opacity: section3Opacity, x: section3X }} className="space-y-3 pt-2">
                                    <div className="h-4 w-32 bg-slate-800 rounded" />
                                    <div className="p-3 bg-blue-50 border-l-2 border-blue-500 text-xs text-blue-700 leading-relaxed">
                                        Recommandation d'arbitrage immédiat pour optimiser la fiscalité des plus-values latentes.
                                    </div>
                                </MotionDiv>

                                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                                    <div className="h-3 w-24 bg-slate-100 rounded" />
                                    <Download className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <MotionDiv 
                                style={{ scale: badgeScale, rotate: badgeRotate }}
                                className="absolute bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-xl z-20"
                            >
                                <CheckCircle className="w-8 h-8" />
                            </MotionDiv>
                        </MotionDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}
