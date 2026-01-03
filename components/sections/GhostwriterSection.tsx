"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const MotionDiv = motion.div as any
const MotionPath = motion.path as any

export default function GhostwriterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const waveProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const waveMotion = useTransform(scrollYProgress, [0, 1], [0, 2 * Math.PI])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const waveforms = useMemo(() => {
    const generateBars = (seed: number) => {
      let d = "";
      const totalBars = 60;
      const width = 200;

      for (let i = 0; i <= totalBars; i++) {
        const x = (i / totalBars) * width;
        const time = i * 0.15;
        const envelope = Math.abs(Math.sin(time + seed) * Math.cos(time * 0.5 + seed * 2));
        const texture = Math.sin(i * 1.5) * 0.3 + 1;

        let h = envelope * texture * 40;

        if (i % 7 === 0 || i % 13 === 0) h *= 1.2;

        h = Math.max(2, Math.min(45, h));

        d += `M ${x.toFixed(1)} ${50 - h} L ${x.toFixed(1)} ${50 + h} `;
      }
      return d;
    };

    return {
      main: generateBars(0),
      secondary: generateBars(42)
    };
  }, []);

  const animatedMainPath = useTransform(waveMotion, (motion) => {
    const timeOffset = motion * 0.5;
    let d = "";
    const totalBars = 60;
    const width = 200;

    for (let i = 0; i <= totalBars; i++) {
      const x = (i / totalBars) * width;
      const time = i * 0.15 + timeOffset;
      const envelope = Math.abs(Math.sin(time) * Math.cos(time * 0.5));
      const texture = Math.sin(i * 1.5) * 0.3 + 1;

      let h = envelope * texture * 40;

      if (i % 7 === 0 || i % 13 === 0) h *= 1.2;

      h = Math.max(2, Math.min(45, h));

      d += `M ${x.toFixed(1)} ${50 - h} L ${x.toFixed(1)} ${50 + h} `;
    }
    return d;
  });

  const [currentFieldValues, setCurrentFieldValues] = useState<Record<string, string>>({})

  const fieldGroups = [
    {
      groupIndex: 0,
      fields: [
        { label: "Civilité", value: "Monsieur", id: "civilite" },
        { label: "Nom", value: "Dupont", id: "nom" },
        { label: "Prénom", value: "Martin", id: "prenom" }
      ]
    },
    {
      groupIndex: 1,
      fields: [
        { label: "Profession", value: "Chef d'entreprise", id: "profession" }
      ]
    },
    {
      groupIndex: 2,
      fields: [
        { label: "Patrimoine", value: "2.3 M€", id: "patrimoine" },
        { label: "Fiscalité", value: "IR + IFI", id: "fiscalite" }
      ]
    }
  ]

  const allFields = fieldGroups.flatMap(g => g.fields)

  const totalCharacters = allFields.reduce((sum, field) => sum + field.value.length, 0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const currentCharIndex = Math.floor(value * totalCharacters)
      let charCount = 0

      const newValues: Record<string, string> = {}

      for (const field of allFields) {
        const fieldEndIndex = charCount + field.value.length

        if (currentCharIndex >= fieldEndIndex) {
          newValues[field.id] = field.value
        } else if (currentCharIndex > charCount) {
          const charsInThisField = currentCharIndex - charCount
          newValues[field.id] = field.value.slice(0, charsInThisField)
        } else {
          newValues[field.id] = ""
        }

        charCount = fieldEndIndex
      }

      setCurrentFieldValues(newValues)
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, totalCharacters, allFields])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center w-full">

        <div className="order-1 md:order-1 relative h-[300px] md:h-[500px] flex items-center justify-center">
          {mounted && (
            <svg viewBox="0 0 200 100" className="w-full h-full text-primary overflow-visible">
              <MotionPath
                d={waveforms.secondary}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                style={{ pathLength: waveProgress, opacity: waveProgress }}
                className="opacity-20 blur-[1px]"
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <MotionPath
                d={animatedMainPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                style={{ pathLength: waveProgress, opacity: waveProgress }}
                className="opacity-90"
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <div className="order-2 md:order-2 space-y-8 z-10">
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Écoutez, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                l'IA s'occupe du reste</span>
            </h2>
            <p className="text-lg text-slate-400">
              Aucune saisie post-RDV. Le Ghostwriter écoute, structure et remplit le dossier client en temps réel
            </p>
          </MotionDiv>

          <MotionDiv
            className="bg-card/50 backdrop-blur border border-white/10 rounded-xl p-6 shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
              <span className="text-xs font-mono text-slate-400">LIVE RECORDING • 04:20</span>
            </div>

            <div className="space-y-4">
              {fieldGroups.map((group, groupIdx) => (
                <MotionDiv
                  key={groupIdx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className={`flex gap-4 ${group.fields.length > 1 ? 'flex-wrap md:flex-nowrap' : ''}`}
                >
                  {group.fields.map((field, fieldIdx) => (
                    <div key={fieldIdx} className="flex-1 min-w-[120px] flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider text-slate-500">{field.label}</span>
                      <div className="font-mono text-lg text-white bg-black/20 p-3 rounded border border-white/5">
                        {currentFieldValues[field.id] || ""}
                      </div>
                    </div>
                  ))}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </div>

      </div>
    </section>
  )
}
