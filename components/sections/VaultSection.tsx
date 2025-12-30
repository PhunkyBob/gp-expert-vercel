"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Building2, Wallet, Landmark, CreditCard, PieChart, Coins } from "lucide-react"

const MotionDiv = motion.div as any
const MotionCircle = motion.circle as any

const logos = [
    { Icon: Building2, color: "text-blue-500" },
    { Icon: Landmark, color: "text-green-500" },
    { Icon: Wallet, color: "text-purple-500" },
    { Icon: CreditCard, color: "text-yellow-500" },
    { Icon: PieChart, color: "text-red-500" },
    { Icon: Coins, color: "text-indigo-500" },
    { Icon: Building2, color: "text-cyan-500" },
    { Icon: Landmark, color: "text-orange-500" },
    { Icon: Wallet, color: "text-pink-500" },
]

export default function VaultSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const gridOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])
    const gridScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5])
    const gridRotate = useTransform(scrollYProgress, [0.3, 0.5], [0, 90])

    const donutOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
    const donutScale = useTransform(scrollYProgress, [0.5, 0.7], [0.5, 1])

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Votre vue panoramique, sans effort</h2>
                        <p className="text-xl text-slate-400">Agrégation 360° en temps réel. Banques, immobilier, private equity, crypto</p>
                    </MotionDiv>
                </div>

                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                    <MotionDiv
                        style={{ opacity: gridOpacity, scale: gridScale, rotate: gridRotate }}
                        className="absolute grid grid-cols-3 gap-4"
                    >
                        {logos.map((logo, i) => (
                            <div key={i} className="w-24 h-24 bg-card border border-white/5 rounded-2xl flex items-center justify-center shadow-lg">
                                <logo.Icon className={`w-10 h-10 ${logo.color}`} />
                            </div>
                        ))}
                    </MotionDiv>

                    <MotionDiv
                        style={{ opacity: donutOpacity, scale: donutScale }}
                        className="absolute"
                    >
                        <div className="relative w-80 h-80">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                                <MotionCircle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#3b82f6"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    whileInView={{ strokeDashoffset: 251.2 * 0.55 }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />
                                <MotionCircle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#8b5cf6"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    whileInView={{ strokeDashoffset: 251.2 * 0.7 }}
                                    style={{ rotate: 162 }}
                                    transition={{ duration: 1.5, delay: 0.4 }}
                                />
                                <MotionCircle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#fbbf24"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    whileInView={{ strokeDashoffset: 251.2 * 0.82 }}
                                    style={{ rotate: 270 }}
                                    transition={{ duration: 1.5, delay: 0.6 }}
                                />
                                <MotionCircle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#f97316"
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="251.2"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    whileInView={{ strokeDashoffset: 251.2 * 0.93 }}
                                    style={{ rotate: 335 }}
                                    transition={{ duration: 1.5, delay: 0.8 }}
                                />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-bold text-white">4.2M€</span>
                                <span className="text-sm text-slate-400">Patrimoine Total</span>
                            </div>

                            <MotionDiv
                                className="absolute top-1/2 -right-4 md:-right-40 -translate-y-1/2 space-y-2 bg-card/80 backdrop-blur p-4 rounded-xl border border-white/10"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-sm whitespace-nowrap">Immobilier 45%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    <span className="text-sm whitespace-nowrap">Assurance-vie 30%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <span className="text-sm whitespace-nowrap">Actions 18%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <span className="text-sm whitespace-nowrap">Crypto 7%</span>
                                </div>
                            </MotionDiv>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </section>
    )
}
