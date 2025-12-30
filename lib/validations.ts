import * as z from "zod"

export const waitlistSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  profession: z.enum(["CGP", "Expert-comptable", "Avocat", "Banquier", "Autre"]),
  advisorsCount: z.string().min(1, {
    message: "Requis",
  }),
  clientsCount: z.string().min(1, {
    message: "Requis",
  }),
  painPoint: z.string().optional(),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>
