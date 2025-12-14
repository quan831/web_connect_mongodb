import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Login from "@/models/Login";
import { signJWT, hashPassword } from "@/lib/auth";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
    try {
        await connectDB();
        const { token, accessToken } = await req.json();

        let email: string;
        let name: string = "";

        if (token) {
            // Handle ID Token (Legacy/Standard Flow)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) throw new Error("Invalid Token");
            email = payload.email;
            name = payload.name || "";
        } else if (accessToken) {
            // Handle Access Token (Custom Button Flow)
            const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!userInfoResponse.ok) throw new Error("Failed to fetch user info");

            const userInfo = await userInfoResponse.json();
            if (!userInfo.email) throw new Error("No email found");

            email = userInfo.email;
            name = userInfo.name || "";
        } else {
            return NextResponse.json(
                { error: "Missing token" },
                { status: 400 }
            );
        }

        // Find or create user
        let user = await Login.findOne({ email });

        if (!user) {
            // Create new user
            // Generate a random password since they are using Google
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await hashPassword(randomPassword);

            // Use name from google or derive from email
            let username = name || email.split("@")[0];

            // Generate unique username if needed
            let count = 0;
            while (await Login.findOne({ username })) {
                count++;
                username = `${name || email.split("@")[0]}${count}`;
            }

            user = await Login.create({
                email,
                username,
                password: hashedPassword,
            });
        }

        // Create Session Token (Same as standard login)
        const authToken = await signJWT({ userId: user._id.toString(), username: user.username });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
            sameSite: "strict",
        });

        return NextResponse.json(
            { message: "Login successful", username: user.username },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Google Auth Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
