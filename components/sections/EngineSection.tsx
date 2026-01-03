"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Zap, TrendingUp, Calculator, CheckCircle2 } from "lucide-react"

const MotionDiv = motion.div as any
const MotionPath = motion.path as any

export default function EngineSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const scannerX = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"])

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center justify-center w-full">

                    <div className="max-w-2xl flex flex-col justify-center">
                        <MotionDiv
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-blue-400 font-medium tracking-wide text-sm uppercase">Calcul Intelligent</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Des heures de calcul,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    en secondes
                                </span>
                            </h2>

                            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                Simulations fiscales et patrimoniales complexes exécutées instantanément. Plus de feuilles de calcul, que des décisions.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: Calculator, text: "Calculs multi-scénarios simultanés" },
                                    { icon: TrendingUp, text: "Optimisation automatique" },
                                    { icon: CheckCircle2, text: "Conformité réglementaire intégrée" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300">
                                        <item.icon className="w-5 h-5 text-purple-400" />
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                {['IR', 'IFI', 'IS', 'Plus-values', 'Successions', 'Transmissions'].map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </MotionDiv>
                    </div>

                    <div className="relative flex flex-col justify-center">
                        <div className="relative h-[400px] bg-card/30 rounded-xl border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className="border-r border-b border-white" />
                                ))}
                            </div>

                            <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <MotionPath
                                    d="M0,45 C20,40 40,35 60,30 S80,25 100,20"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="0.5"
                                    strokeDasharray="5 5"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                                <path d="M0,45 L100,45" stroke="#334155" strokeWidth="0.2" />
                            </svg>

                            <MotionDiv
                                className="absolute inset-0 z-10"
                                style={{
                                    clipPath: useTransform(scannerX, (x) => `polygon(0 0, ${x} 0, ${x} 100%, 0 100%)`)
                                } as any}
                            >
                                <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <MotionPath
                                        d="M0,45 C20,35 40,25 60,15 S80,5 100,2"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1.5 }}
                                    />
                                    <path
                                        d="M0,45 C20,35 40,25 60,15 S80,5 100,2 V50 H0 Z"
                                        fill="url(#greenGradient)"
                                        opacity="0.2"
                                    />
                                    <defs>
                                        <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </MotionDiv>

                            <MotionDiv
                                style={{ left: scannerX }}
                                className="absolute top-4 bottom-0 w-1 bg-gradient-to-b from-transparent via-white to-transparent z-20 shadow-[0_0_20px_white]"
                            >
                                <div className="absolute -top-2 -translate-x-1/2 text-xs font-mono bg-white text-black px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                    OPTIMIZING
                                </div>
                            </MotionDiv>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
