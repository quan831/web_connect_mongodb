import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/jwt"
import { LogoutButton } from "@/components/logout-button"
import { Sidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
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
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/20 px-6 justify-between">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Welcome, <span className="font-semibold">{username}</span></span>
                        <LogoutButton />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
