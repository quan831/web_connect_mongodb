import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/dashboard")) {
        const token = req.cookies.get("auth_token")?.value;
        const verifiedToken = token ? await verifyJWT(token) : null;

        if (!verifiedToken) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname === "/login" || pathname === "/register") {
        const token = req.cookies.get("auth_token")?.value;
        const verifiedToken = token ? await verifyJWT(token) : null;

        if (verifiedToken) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
