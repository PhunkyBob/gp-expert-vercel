import { NextResponse } from "next/server"
import { waitlistSchema } from "@/lib/validations"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = waitlistSchema.parse(json)
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Inscription validée" })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Données invalides" }, 
      { status: 422 }
    )
  }
}
