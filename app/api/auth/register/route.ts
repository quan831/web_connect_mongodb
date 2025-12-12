import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Login from "@/models/Login";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await Login.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return NextResponse.json(
                { error: "Username or email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await Login.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: "User created successfully", userId: newUser._id },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
