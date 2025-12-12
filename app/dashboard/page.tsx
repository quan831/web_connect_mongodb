import UserDashboard from "./user-dashboard"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/jwt"
import { LogoutButton } from "@/components/logout-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    let username = "User"
    if (token) {
        const payload = await verifyJWT(token)
        if (payload?.username) {
            username = payload.username as string
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <Link href="/">
                        <Button variant="outline" size="sm">Back to Home page</Button>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <span>Welcome, <span className="font-semibold">{username}</span></span>
                    <LogoutButton />
                </div>
            </header>
            <div className="flex-1 overflow-auto">
                <UserDashboard />
            </div>
        </div>
    )
}