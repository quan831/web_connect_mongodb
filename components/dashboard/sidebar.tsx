"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings } from "lucide-react"

const sidebarItems = [
    {
        title: "User Management",
        href: "/dashboard/user",
        icon: LayoutDashboard,
    },
    {
        title: "Account Management",
        href: "/dashboard/account",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col border-r bg-muted/20">
            <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span>Web Connect</span>
                </Link>
            </div>
            <div className="flex-1 py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
