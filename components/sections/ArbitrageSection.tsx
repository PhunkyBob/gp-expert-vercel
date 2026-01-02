"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const MotionDiv = motion.div as any
const MotionPath = motion.path as any

interface DataPoint {
  year: number
  before: number
  after: number
}

export default function ArbitrageSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const progress = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const data: DataPoint[] = [
    { year: 2025, before: 100, after: 100 },
    { year: 2026, before: 105, after: 108 },
    { year: 2027, before: 110, after: 120 },
    { year: 2028, before: 114, after: 135 },
    { year: 2029, before: 118, after: 155 },
    { year: 2030, before: 122, after: 180 },
    { year: 2031, before: 126, after: 210 },
    { year: 2032, before: 130, after: 245 },
  ]

  const maxAfterValue = Math.max(...data.map(d => d.after))
  const maxBeforeValue = Math.max(...data.map(d => d.before))
  const maxValue = Math.max(maxAfterValue, maxBeforeValue)

  const width = 100
  const height = 100
  const padding = { top: 10, right: 5, bottom: 20, left: 5 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth
  const yScale = (value: number) => padding.top + chartHeight - ((value / maxValue) * chartHeight * 0.9)

  const generatePath = (key: keyof DataPoint) => {
    return data.map((d, i) => {
      const x = xScale(i)
      const y = yScale(d[key] as number)
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    }).join(" ")
  }

  const generateAreaPath = (key: keyof DataPoint) => {
    const path = generatePath(key)
    const lastPoint = data[data.length - 1]
    const firstPoint = data[0]
    return `${path} L ${xScale(data.length - 1)} ${padding.top + chartHeight} L ${xScale(0)} ${padding.top + chartHeight} Z`
  }

  const generateGradientAreaPath = () => {
    const beforePath = data.map((d, i) => {
      const x = xScale(i)
      const y = yScale(d.before)
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    }).join(" ")

    const afterPath = data.map((d, i) => {
      const x = xScale(i)
      const y = yScale(d.after)
      return `${i === 0 ? "L" : "L"} ${x} ${y}`
    }).join(" ")

    return `${beforePath} ${afterPath} L ${xScale(0)} ${padding.top + chartHeight} Z`
  }

  const beforePath = generatePath("before")
  const afterPath = generatePath("after")
  const beforeAreaPath = generateAreaPath("before")
  const afterAreaPath = generateAreaPath("after")
  const gradientAreaPath = generateGradientAreaPath()

  const gainPercentage = ((maxAfterValue - maxBeforeValue) / maxBeforeValue * 100).toFixed(1)

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simulateur d'arbitrage</h2>
          <p className="text-xl text-slate-400 mb-8">Comparaison avant/après sur une stratégie d'investissement</p>
        </MotionDiv>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {mounted && (
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[500px] md:h-[600px]" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="beforeAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="afterAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {data.map((_, i) => (
                  <line
                    key={i}
                    x1={xScale(i)}
                    y1={padding.top}
                    x2={xScale(i)}
                    y2={padding.top + chartHeight}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.1"
                    strokeDasharray="0.5 0.5"
                  />
                ))}

                <line
                  x1={padding.left}
                  y1={padding.top + chartHeight}
                  x2={width - padding.right}
                  y2={padding.top + chartHeight}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.15"
                />

                {data.map((d, i) => (
                  <text
                    key={i}
                    x={xScale(i)}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize="3"
                    fill="rgba(255,255,255,0.4)"
                    fontWeight="400"
                  >
                    {d.year}
                  </text>
                ))}

                <MotionPath
                  d={gradientAreaPath}
                  fill="url(#gradientArea)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                <MotionPath
                  d={beforeAreaPath}
                  fill="url(#beforeAreaGradient)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />

                <MotionPath
                  d={afterAreaPath}
                  fill="url(#afterAreaGradient)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                <MotionPath
                  d={beforePath}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="0.8"
                  strokeOpacity="0.7"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                <MotionPath
                  d={afterPath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                />

                {data.map((d, i) => (
                  <MotionDiv
                    key={`dot-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  >
                    <circle
                      cx={xScale(i)}
                      cy={yScale(d.before)}
                      r="1.5"
                      fill="#64748b"
                      opacity="0.8"
                    />
                  </MotionDiv>
                ))}

                {data.map((d, i) => (
                  <MotionDiv
                    key={`dot-after-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                  >
                    <circle
                      cx={xScale(i)}
                      cy={yScale(d.after)}
                      r="1.8"
                      fill="#3b82f6"
                      filter="url(#glow)"
                    />
                  </MotionDiv>
                ))}

                <MotionDiv
                  initial={{ opacity: 0, x: xScale(data.length - 1), y: yScale(maxAfterValue) - 8 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <circle
                    cx={xScale(data.length - 1)}
                    cy={yScale(maxAfterValue)}
                    r="0.5"
                    fill="#ffffff"
                  />
                </MotionDiv>
              </svg>
            )}

            <MotionDiv
              className="absolute top-8 right-8 md:right-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg px-4 py-3 backdrop-blur"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <div className="text-xs text-slate-400 mb-1">Gain total</div>
              <div className="text-2xl font-bold text-green-400">+{gainPercentage}%</div>
            </MotionDiv>

            <MotionDiv
              className="absolute bottom-12 left-8 md:left-12 flex flex-col gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-0.5 bg-slate-500 opacity-70" />
                <span className="text-sm text-slate-400">Avant arbitrage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-0.5 bg-blue-500" />
                <span className="text-sm text-blue-400">Après arbitrage</span>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
