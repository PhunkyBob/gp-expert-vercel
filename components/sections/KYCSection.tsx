"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldCheck, UserCheck, ClipboardCheck, Fingerprint, FileText, Clock } from "lucide-react"

const MotionDiv = motion.div as any
const MotionPath = motion.path as any
const MotionCircle = motion.circle as any
const MotionG = motion.g as any
const MotionText = motion.text as any

export default function KYCSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const progress = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const cardY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const scrollThresholds = value * steps.length * 2
      const visibleSet = new Set<number>()

      for (let i = 0; i < steps.length; i++) {
        if (scrollThresholds > i) {
          visibleSet.add(i)
        }
      }

      setVisibleSteps(visibleSet)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const steps = [
    { icon: UserCheck, label: "Identité", color: "text-blue-500" },
    { icon: ShieldCheck, label: "LCB-FT", color: "text-green-500" },
    { icon: ClipboardCheck, label: "MIF 2/DDA", color: "text-purple-500" },
    { icon: Fingerprint, label: "Profil risque", color: "text-yellow-500" },
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">KYC évolutif et digital</h2>
          <p className="text-xl text-slate-400">Parcours d'entrée en relation sans couture avec vérification d'identité</p>
        </MotionDiv>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <svg viewBox="0 0 100 40" className="w-full h-[500px] md:h-[400px]">
              <defs>
                <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <MotionPath
                d="M10,18 L90,18"
                fill="none"
                stroke="url(#glowGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />

              <MotionPath
                d="M10,18 L90,18"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="1.5"
                filter="url(#glow)"
                style={{ pathLength: progress }}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />

              {steps.map((step, i) => {
                const progress = i / (steps.length - 1)
                const x = 10 + progress * 80
                const y = 8

                const iconPath = step.label === "Identité" ? "/icons/user-check.svg"
                  : step.label === "LCB-FT" ? "/icons/shield-check.svg"
                    : step.label === "MIF 2/DDA" ? "/icons/clipboard-check.svg"
                      : "/icons/fingerprint-pattern.svg"
                const colors = {
                  'text-blue-500': { fill: '#3b82f6', stroke: '#3b82f6' },
                  'text-green-500': { fill: '#10b981', stroke: '#10b981' },
                  'text-purple-500': { fill: '#8b5cf6', stroke: '#8b5cf6' },
                  'text-yellow-500': { fill: '#eab308', stroke: '#eab308' },
                }

                return (
                  <g key={i}>
                    <MotionCircle
                      cx={x}
                      cy={y}
                      r="5"
                      fill={colors[step.color as keyof typeof colors].fill}
                      fillOpacity="0.2"
                      initial={false}
                      animate={{
                        opacity: visibleSteps.has(i) ? 1 : 0,
                        scale: visibleSteps.has(i) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <MotionCircle
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill="#1e293b"
                      stroke={colors[step.color as keyof typeof colors].stroke}
                      strokeWidth="0.7"
                      initial={false}
                      animate={{
                        opacity: visibleSteps.has(i) ? 1 : 0,
                        scale: visibleSteps.has(i) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <MotionG
                      initial={false}
                      animate={{ opacity: visibleSteps.has(i) ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <image
                        href={iconPath}
                        x={x - 2.5}
                        y={y - 2.5}
                        width="5"
                        height="5"
                      />
                    </MotionG>

                    <MotionG
                      initial={false}
                      animate={{ opacity: visibleSteps.has(i) ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <text
                        x={x}
                        y={y + 9}
                        textAnchor="middle"
                        fill="white"
                        fontWeight="bold"
                        fontSize="2.5"
                      >
                        {step.label}
                      </text>
                    </MotionG>

                  </g>
                )
              })}
            </svg>

            <MotionDiv
              style={{ opacity: cardOpacity, y: cardY }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4"
            >
              <div className="bg-card/80 backdrop-blur p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold">Lutte anti-blanchiment</h3>
                </div>
                <p className="text-sm text-slate-400">Vérification LCB-FT automatisée avec conformité réglementaire</p>
              </div>

              <div className="bg-card/80 backdrop-blur p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold">Profil investisseur</h3>
                </div>
                <p className="text-sm text-slate-400">Questionnaire MIF 2 / DDA interactif et personnalisé</p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
