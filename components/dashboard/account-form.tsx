"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                    onClick={() => {
                                        // TODO: Implement actual delete logic
                                        setMessage({ type: "success", text: "Account deletion simulated. (No API connected yet)" })
                                    }}
                                >
                                    Delete Account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}
