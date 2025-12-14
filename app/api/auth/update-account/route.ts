import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Login from "@/models/Login"
import { comparePassword, hashPassword } from "@/lib/auth"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/jwt"

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth_token")?.value

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const payload = await verifyJWT(token)
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }

        const body = await req.json()
        const { type, currentPassword, newPassword, newEmail } = body

        await connectDB()
        const user = await Login.findById(payload.userId)

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        if (type === "email") {
            const isMatch = await comparePassword(currentPassword, user.password)
            if (!isMatch) {
                return NextResponse.json({ error: "Incorrect password" }, { status: 400 })
            }

            user.email = newEmail
            await user.save()

            return NextResponse.json({ message: "Email updated successfully" })
        } else if (type === "password") {
            const isMatch = await comparePassword(currentPassword, user.password)
            if (!isMatch) {
                return NextResponse.json({ error: "Incorrect current password" }, { status: 400 })
            }

            user.password = await hashPassword(newPassword)
            await user.save()

            return NextResponse.json({ message: "Password updated successfully" })
        }

        return NextResponse.json({ error: "Invalid update type" }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth_token")?.value

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const payload = await verifyJWT(token)
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }

        await connectDB()
        const deletedUser = await Login.findByIdAndDelete(payload.userId)

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Clear the auth cookie using NextResponse
        const response = NextResponse.json({ message: "Account deleted successfully" })
        response.cookies.set("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Expire immediately
            path: "/",
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
