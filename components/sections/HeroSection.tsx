"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"

const DataGlobe = dynamic(() => import("@/components/3d/DataGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
})

const MotionDiv = motion.div as any
const MotionP = motion.p as any

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <MotionDiv
        style={{ scale: globeScale }}
        className="absolute inset-0 z-0 opacity-60 md:opacity-100"
      >
        <DataGlobe />
      </MotionDiv>

      <div className="container relative z-10 px-4 md:px-6 pointer-events-none">
        <MotionDiv
          style={{ y: titleY, opacity: titleOpacity }}
          className="max-w-4xl mx-auto text-center pointer-events-auto"
        >
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
              L'Intelligence Artificielle au service de l'excellence patrimoniale
            </h1>
          </MotionDiv>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Ne soyez plus un gestionnaire de données : <br className="hidden md:block" />
            Devenez l'architecte du futur de vos clients
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={scrollToCTA}
              size="lg"
              className="cursor-pointer bg-primary hover:bg-blue-700 text-white text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-105"
            >
              Suivre le projet
            </Button>
          </MotionDiv>
        </MotionDiv>
      </div>


    </section>
  )
}
