"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Vault, Calendar, Bell, Users, CheckCircle2, AlertCircle, FileText } from "lucide-react"

const MotionDiv = motion.div as any
const MotionRect = motion.rect as any

interface Document {
  name: string
  type: string
  status: "verified" | "pending"
  x: number
  y: number
}

interface Task {
  id: number
  title: string
  dueDate: string
  priority: "high" | "medium" | "low"
}

export default function ClientSpaceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const vaultScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const vaultOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const taskOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  const documents: Document[] = [
    { name: "Avis d'mposition", type: "Fiscal", status: "verified", x: 25, y: 20 },
    { name: "Acte notarié", type: "Immobilier", status: "pending", x: 75, y: 20 },
    { name: "Contrat d'assurance", type: "Prévoyance", status: "verified", x: 30, y: 75 },
    { name: "KBIS", type: "Entreprise", status: "verified", x: 80, y: 75 },
    { name: "Justificatif", type: "Identité", status: "pending", x: 52, y: 48 },
  ]

  const tasks: Task[] = [
    { id: 1, title: "Relance documents M. Dupont", dueDate: "15 Jan", priority: "high" },
    { id: 2, title: "Anniversaire contrat AV #2034", dueDate: "20 Jan", priority: "medium" },
    { id: 3, title: "Mise à jour profil risque", dueDate: "25 Jan", priority: "low" },
    { id: 4, title: "Signature mandat gestion", dueDate: "30 Jan", priority: "medium" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500"
      case "medium": return "text-yellow-500"
      case "low": return "text-green-500"
      default: return "text-slate-500"
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-background py-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Espace client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">collaboratif</span></h2>
          <p className="text-xl text-slate-400">Coffre-fort numérique partagé et workflow intelligent</p>
        </MotionDiv>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MotionDiv
              style={{ scale: vaultScale, opacity: vaultOpacity }}
              className="bg-card/30 backdrop-blur rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Vault className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold">Coffre-fort numérique</h3>
              </div>

              <div className="relative h-[400px]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="vaultGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  <rect x="5" y="5" width="90" height="90" rx="4" fill="url(#vaultGradient)" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.3" />

                  <MotionRect
                    x="5" y="5" width="90" height="90" rx="4"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />

                  {documents.map((doc, i) => (
                    <foreignObject key={i} x={doc.x - 20} y={doc.y - 20} width="40" height="40">
                      <MotionDiv
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="w-full h-full"
                      >
                        <div className="w-full h-full flex items-center justify-center pointer-events-none">
                          <div className="flex flex-col items-center justify-center transform scale-[0.25] origin-center min-w-[150px]">
                            <div className="relative">
                              <FileText className="w-16 h-16 text-blue-400" strokeWidth={1.5} />

                              {doc.status === "verified" && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              )}

                              {doc.status === "pending" && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                                  <AlertCircle className="w-5 h-5 text-white" />
                                </div>
                              )}
                            </div>

                            <span className="mt-2 text-sm font-medium text-slate-200 bg-slate-900/90 px-3 py-1 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                              {doc.name}
                            </span>
                          </div>
                        </div>
                      </MotionDiv>
                    </foreignObject>
                  ))}
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">5 documents</span>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-green-500">
                    <CheckCircle2 className="w-4 h-4" />
                    3 vérifiés
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <AlertCircle className="w-4 h-4" />
                    2 en attente
                  </span>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              style={{ opacity: taskOpacity }}
              className="bg-card/30 backdrop-blur rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold">Suivi des tâches</h3>
              </div>

              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <MotionDiv
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                  >
                    <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bell className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                          <span className="font-medium">{task.title}</span>
                        </div>
                        <span className="text-sm text-slate-400">{task.dueDate}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((j) => (
                            <div
                              key={j}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-card flex items-center justify-center text-xs text-white font-medium"
                            >
                              {String.fromCharCode(64 + j)}
                            </div>
                          ))}
                        </div>
                        <Users className="w-4 h-4 text-slate-400 ml-2" />
                        <span className="text-sm text-slate-400">Cabinet</span>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Workflow automatisé</div>
                    <div className="font-semibold">Relances et rappels programmés</div>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
