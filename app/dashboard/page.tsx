import UserDashboard from "./user-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default function DashboardPage() {
    return <UserDashboard />
}