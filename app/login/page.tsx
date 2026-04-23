"use client"

import { useState } from "react"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/getApiErrorMessage"
import AuthFrame from "../features/auth/components/AuthFrame"

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await res.json().catch(() => null)

            if (!res.ok) {
                setError(getApiErrorMessage(data, "Login failed"))
            } else {
                router.push("/dashboard")
                router.refresh()
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthFrame
            eyebrow="Sign in"
            title="Pick up your pipeline where you left it."
            subtitle="Open your Trackr workspace, review every active role, and keep interviews, offers, and follow-ups organized."
            footerText="Don't have an account?"
            footerHref="/signup"
            footerLinkLabel="Create one">
            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-[#5c5a55]">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9a94]" size={18} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={form.email}
                                onChange={(e) => setForm({
                                    ...form,
                                    email: e.target.value,
                                })}
                                className="w-full rounded-xl border border-[#e0ded7] bg-[#fafaf8] py-3 pl-10 pr-4 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-[#5c5a55]">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9a94]" size={18} />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({
                                    ...form,
                                    password: e.target.value,
                                })}
                                className="w-full rounded-xl border border-[#e0ded7] bg-[#fafaf8] py-3 pl-10 pr-11 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c9a94] transition-colors hover:text-[#1a1917]"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <label className="flex items-center gap-3 rounded-xl border border-[#e0ded7] bg-[#fafaf8] px-4 py-3 text-sm text-[#5c5a55]">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-[#ccc9bf] text-violet-600 focus:ring-violet-500"
                        />
                        Keep me signed in on this device
                    </label>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1917] px-4 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#2d2c29] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                        {!isLoading && <ArrowRight size={18} />}
                    </button>
                </form>
            </div>
        </AuthFrame>
    )
}
