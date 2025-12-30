"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Transformez des heures de calcul en secondes de décision</h2>
                        <p className="text-xl text-slate-400 mb-8">Simulations fiscales et patrimoniales complexes</p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-wrap justify-center gap-2 text-sm">
                                {['IR', 'IFI', 'IS', 'Plus-values', 'Successions', 'Transmissions', 'SCI', 'Décembrement'].map((type, i) => (
                                    <span key={i} className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </MotionDiv>
                </div>

                <div className="relative max-w-5xl mx-auto h-[400px] bg-card/30 rounded-xl border border-white/10 overflow-hidden">
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
        </section>
    )
}
