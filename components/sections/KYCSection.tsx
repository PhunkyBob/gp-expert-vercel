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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium tracking-wide text-sm uppercase">Conformité Digital</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                KYC évolutif<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  et digital
                </span>
              </h2>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Parcours d'entrée en relation sans couture avec vérification d'identité automatisée.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Clock, text: "Processus en temps réel" },
                  { icon: FileText, text: "Conformité réglementaire" },
                  { icon: ShieldCheck, text: "Sécurité intégrée" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {['Identité', 'LCB-FT', 'MIF 2', 'Risque'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </div>

          <div className="relative h-[500px] flex items-center justify-center flex-col justify-center">
            <div className="relative w-full">
              <div className="relative mb-8">
                <svg viewBox="0 0 100 20" preserveAspectRatio="xMidYMin meet" className="w-full h-[150px] md:h-[150px]">
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
                    const y = 10

                    const circleRadius = isMobile ? 9 : 5
                    const borderRadius = isMobile ? 6 : 3.5
                    const iconSize = isMobile ? 8 : 5
                    const iconOffset = iconSize / 2
                    const fontSize = isMobile ? "4" : "2.5"
                    const textY = isMobile ? y + 15 : y + 9

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
                          r={circleRadius}
                          fill={colors[step.color as keyof typeof colors].fill}
                          fillOpacity="0.2"
                          initial={false}
                          animate={{
                            opacity: visibleSteps.has(i) ?1 : 0,
                            scale: visibleSteps.has(i) ?1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <MotionCircle
                          cx={x}
                          cy={y}
                          r={borderRadius}
                          fill="#1e293b"
                          stroke={colors[step.color as keyof typeof colors].stroke}
                          strokeWidth="0.7"
                          initial={false}
                          animate={{
                            opacity: visibleSteps.has(i) ?1 : 0,
                            scale: visibleSteps.has(i) ?1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <MotionG
                          initial={false}
                          animate={{ opacity: visibleSteps.has(i) ?1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <image
                            href={iconPath}
                            x={x - iconOffset}
                            y={y - iconOffset}
                            width={iconSize}
                            height={iconSize}
                          />
                        </MotionG>

                        <MotionG
                          initial={false}
                          animate={{ opacity: visibleSteps.has(i) ?1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <text
                            x={x}
                            y={textY}
                            textAnchor="middle"
                            fill="white"
                            fontWeight="bold"
                            fontSize={fontSize}
                          >
                            {step.label}
                          </text>
                        </MotionG>

                      </g>
                    )
                  })}
                </svg>
              </div>

              <MotionDiv
                style={{ opacity: cardOpacity, y: cardY }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
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
      </div>
    </section>
  )
}
