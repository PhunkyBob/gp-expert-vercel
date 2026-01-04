"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { waitlistSchema, WaitlistFormData } from "@/lib/validations"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"

const MotionDiv = motion.div as any

export default function CTASection() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      profession: undefined,
      email: "",
      advisorsCount: "",
      clientsCount: "",
      painPoint: "",
      honeypot: "",
    },
  })

  async function onSubmit(data: WaitlistFormData) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="relative min-h-screen flex items-center bg-background py-20">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center justify-center mb-12 space-y-4">
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-px bg-gradient-to-b from-transparent via-slate-700 to-blue-500/50"
            />
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-background/80 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-medium text-blue-200 uppercase tracking-widest">
                  Restez informé
                </span>
              </div>
            </MotionDiv>
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
                <MotionDiv
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500" />
                </MotionDiv>
                <h3 className="text-3xl font-bold">Inscription confirmée</h3>
                <p className="text-slate-400 max-w-md">
                  Vous êtes sur la liste d'attente prioritaire. Nous vous contacterons très prochainement.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Rejoignez l'avenir du conseil</h2>
                  <p className="text-slate-400">Accès anticipé pour les cabinets visionnaires.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont / Cabinet Dupont" {...field} className="bg-background/50 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-white/10">
                                <SelectValue placeholder="Sélectionnez votre profession" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CGP">CGP / Family Office</SelectItem>
                              <SelectItem value="Expert-comptable">Expert-comptable</SelectItem>
                              <SelectItem value="Avocat">Avocat Fiscaliste</SelectItem>
                              <SelectItem value="Banquier">Banquier Privé</SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jean.dupont@email.com" {...field} className="bg-background/50 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="advisorsCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collaborateurs</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="5" {...field} className="bg-background/50 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="clientsCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clients</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="150" {...field} className="bg-background/50 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="painPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plus grands défis actuels / points de frustration avec vos outils actuels (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Saisie manuelle, conformité, sourcing..."
                              className="bg-background/50 border-white/10 min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        "Suivre le projet"
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
