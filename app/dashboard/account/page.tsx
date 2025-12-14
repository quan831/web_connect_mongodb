import AccountForm from "@/components/dashboard/account-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Account Management - Dashboard",
}

export default function AccountPage() {
    return (
        <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6">Account Management</h1>
            <AccountForm />
        </div>
    )
}
