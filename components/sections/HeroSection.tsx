"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"


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

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 pointer-events-none">
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
            <div
              className="group flex flex-col items-center gap-4 cursor-pointer mt-8"
            >
              {/* Mouse Icon */}
              <div className="relative">
                <svg
                  width="28"
                  height="48"
                  viewBox="0 0 28 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-slate-500 group-hover:stroke-blue-400 transition-colors duration-500"
                >
                  <rect x="1.5" y="1.5" width="25" height="45" rx="12.5" strokeWidth="2" />
                  <motion.rect
                    x="12"
                    y="10"
                    width="4"
                    height="8"
                    rx="2"
                    className="fill-slate-500 group-hover:fill-blue-400 transition-colors duration-500"
                    stroke="none"
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  />
                </svg>
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[12px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
              </div>

              {/* Text */}
              <span className="text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase group-hover:text-blue-300 transition-colors duration-500 select-none">
                défilez pour découvrir
              </span>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>


    </section>
  )
}
