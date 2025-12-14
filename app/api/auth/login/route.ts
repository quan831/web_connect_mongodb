import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Login from "@/models/Login";
import { comparePassword, signJWT } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const user = await Login.findOne({
            $or: [{ username }, { email: username }]
        });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = await signJWT({ userId: user._id.toString(), username: user.username });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "strict",
        });

        return NextResponse.json(
            { message: "Login successful", username: user.username },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
