import UserForm from "@/components/dashboard/user-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "User Management - Dashboard",
}

export default function UserPage() {
    return (
        <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <UserForm />
        </div>
    )
}
