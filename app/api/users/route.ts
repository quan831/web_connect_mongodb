import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/User"

type CreateUserBody = {
    name: string
    email: string
    phone?: string
}

export async function GET() {
    await connectDB()
    const users = await User.find().lean()
    return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
    try {
        const body: CreateUserBody = await req.json()
        await connectDB()

        const user = await User.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error: unknown) {
        console.error("POST /api/users error:", error)

        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Unknown error" },
            { status: 500 }
        )
    }
}