"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TrendingUp, Calendar, PiggyBank, ShieldCheck } from "lucide-react"

const MotionDiv = motion.div as any
const MotionPath = motion.path as any
const MotionRect = motion.rect as any

interface SankeyNode {
  x: number
  y: number
  width: number
  height: number
  color: string
}

interface SankeyLink {
  from: { x: number; y: number }
  to: { x: number; y: number }
  control1: { x: number; y: number }
  control2: { x: number; y: number }
  color: string
  opacity: number
}

export default function RetirementSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const flowProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  // Source nodes (left side)
  const sourceNodes: SankeyNode[] = [
    { x: 10, y: 20, width: 15, height: 8, color: "#3b82f6" },
    { x: 10, y: 45, width: 15, height: 8, color: "#10b981" },
    { x: 10, y: 70, width: 15, height: 8, color: "#8b5cf6" },
  ]

  const middleNodes: SankeyNode[] = [
    { x: 45, y: 25, width: 12, height: 6, color: "#06b6d4" },
    { x: 45, y: 55, width: 12, height: 6, color: "#f59e0b" },
  ]

  const destNodes: SankeyNode[] = [
    { x: 80, y: 15, width: 15, height: 6, color: "#ec4899" },
    { x: 80, y: 35, width: 15, height: 6, color: "#ec4899" },
    { x: 80, y: 55, width: 15, height: 6, color: "#ec4899" },
    { x: 80, y: 75, width: 15, height: 6, color: "#ec4899" },
  ]

  const links: SankeyLink[] = [
    {
      from: { x: 25, y: 24 },
      to: { x: 45, y: 27 },
      control1: { x: 35, y: 24 },
      control2: { x: 35, y: 27 },
      color: "#3b82f6",
      opacity: 0.6
    },
    {
      from: { x: 25, y: 49 },
      to: { x: 45, y: 57 },
      control1: { x: 35, y: 49 },
      control2: { x: 35, y: 57 },
      color: "#10b981",
      opacity: 0.6
    },
    {
      from: { x: 25, y: 74 },
      to: { x: 45, y: 57 },
      control1: { x: 35, y: 74 },
      control2: { x: 35, y: 57 },
      color: "#8b5cf6",
      opacity: 0.6
    },
    {
      from: { x: 25, y: 74 },
      to: { x: 45, y: 27 },
      control1: { x: 35, y: 74 },
      control2: { x: 35, y: 27 },
      color: "#8b5cf6",
      opacity: 0.4
    },

    {
      from: { x: 57, y: 27 },
      to: { x: 80, y: 17 },
      control1: { x: 68, y: 27 },
      control2: { x: 68, y: 17 },
      color: "#06b6d4",
      opacity: 0.5
    },
    {
      from: { x: 57, y: 27 },
      to: { x: 80, y: 37 },
      control1: { x: 68, y: 27 },
      control2: { x: 68, y: 37 },
      color: "#06b6d4",
      opacity: 0.5
    },
    {
      from: { x: 57, y: 57 },
      to: { x: 80, y: 57 },
      control1: { x: 68, y: 52 },
      control2: { x: 68, y: 62 },
      color: "#f59e0b",
      opacity: 0.5
    },
    {
      from: { x: 57, y: 57 },
      to: { x: 80, y: 77 },
      control1: { x: 68, y: 57 },
      control2: { x: 68, y: 77 },
      color: "#f59e0b",
      opacity: 0.5
    },
  ]

  const createPath = (link: SankeyLink) => {
    return `M ${link.from.x} ${link.from.y} C ${link.control1.x} ${link.control1.y}, ${link.control2.x} ${link.control2.y}, ${link.to.x} ${link.to.y}`
  }

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
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-blue-400 font-medium tracking-wide text-sm uppercase">Projection Revenus</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Analyse des flux<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  futurs
                </span>
              </h2>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Analyse des flux futurs de revenus basés sur les droits acquis, les investissements et les évènements de la vie.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Calendar, text: "Projection sur le long terme" },
                  { icon: PiggyBank, text: "Visualisation des revenus acquis" },
                  { icon: ShieldCheck, text: "Scénarios de vie intégrés" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {['Retraite', 'Revenus', 'Investissements', 'Droits'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </MotionDiv>
          </div>

          <div className="relative h-[550px] flex items-center justify-center flex-col justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-[500px] md:h-[600px]" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="flowGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {links.map((link, i) => (
                <MotionPath
                  key={i}
                  d={createPath(link)}
                  fill="none"
                  stroke={link.color}
                  strokeWidth="0.8"
                  strokeOpacity={link.opacity}
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  style={{ pathLength: flowProgress, opacity: flowProgress }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}

              {sourceNodes.map((node, i) => (
                <MotionRect
                  key={`source-${i}`}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx="0.5"
                  fill={node.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0, x: node.x - 10 }}
                  whileInView={{ opacity: 1, x: node.x }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                />
              ))}

              {middleNodes.map((node, i) => (
                <MotionRect
                  key={`middle-${i}`}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx="0.5"
                  fill={node.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 + i * 0.1 }}
                  style={{ transformOrigin: `${node.x + node.width / 2}% ${node.y + node.height / 2}%` }}
                />
              ))}

              {destNodes.map((node, i) => (
                <MotionRect
                  key={`dest-${i}`}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx="0.5"
                  fill={node.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0, x: node.x + 10 }}
                  whileInView={{ opacity: 1, x: node.x }}
                  transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
