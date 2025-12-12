"use client"

import { useEffect, useState, FormEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"

type User = {
    _id: string
    name: string
    email: string
    phone?: string
}

const emptyForm = { name: "", email: "", phone: "" }

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchUsers = async () => {
        const res = await fetch("/api/users")
        const data = await res.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (editingId) {
                await fetch(`/api/users/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                })
            } else {
                await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                })
            }

            setForm(emptyForm)
            setEditingId(null)
            await fetchUsers()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (user: User) => {
        setEditingId(user._id)
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this user?")) return

        await fetch(`/api/users/${id}`, {
            method: "DELETE",
        })
        await fetchUsers()
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
                <h1 className="text-2xl font-bold tracking-tight">User Dashboard</h1>
                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>{editingId ? "Update User" : "Add User"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={loading}>
                                    {editingId ? "Update" : "Add"}
                                </Button>
                                {editingId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setForm(emptyForm)
                                            setEditingId(null)
                                        }}
                                    >
                                        Cancel update
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead className="w-[140px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
