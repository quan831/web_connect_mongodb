"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AccountForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const router = useRouter()

    const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const newEmail = formData.get("email") as string
        const currentPassword = formData.get("password") as string

        try {
            const res = await fetch("/api/auth/update-account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "email",
                    newEmail,
                    currentPassword,
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage({ type: "success", text: data.message })
                router.refresh()
                // Explicitly clear the form fields
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setMessage({ type: "error", text: data.error })
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong" })
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const currentPassword = formData.get("currentPassword") as string
        const newPassword = formData.get("newPassword") as string

        try {
            const res = await fetch("/api/auth/update-account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "password",
                    currentPassword,
                    newPassword,
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage({ type: "success", text: data.message })
                // Explicitly clear the form fields
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                setMessage({ type: "error", text: data.error })
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"} className={message.type === "success" ? "bg-green-50 text-green-900 border-green-200" : ""}>
                    <AlertDescription>{message.text}</AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Update Email</CardTitle>
                    <CardDescription>
                        Change your email address. You need to provide your current password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleEmailUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">New Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Current Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            Update Email
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription>
                        Change your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" name="currentPassword" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" name="newPassword" type="password" required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
