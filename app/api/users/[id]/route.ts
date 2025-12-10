import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/User"

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body: { name: string; email: string; phone?: string } =
            await req.json()

        await connectDB()

        const user = await User.findByIdAndUpdate(
            id,
            {
                name: body.name,
                email: body.email,
                phone: body.phone,
            },
            { new: true }
        )

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error: unknown) {
        console.error("PUT user error:", error)

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

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await connectDB()

        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Deleted" })
    } catch (error: unknown) {
        console.error("DELETE user error:", error)

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
