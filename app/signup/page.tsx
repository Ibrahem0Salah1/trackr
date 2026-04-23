"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiErrorMessage } from "@/lib/getApiErrorMessage"
import AuthFrame from "../features/auth/components/AuthFrame"

export default function SignupPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const getPasswordStrength = () => {
        const { password } = form
        if (!password) return { strength: 0, text: "", color: "" }

        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z\d]/.test(password)) strength++

        const levels = [
            { strength: 0, text: "Very Weak", color: "bg-red-500" },
            { strength: 1, text: "Weak", color: "bg-orange-500" },
            { strength: 2, text: "Fair", color: "bg-yellow-500" },
            { strength: 3, text: "Good", color: "bg-blue-500" },
            { strength: 4, text: "Strong", color: "bg-green-500" },
        ]

        return levels[strength]
    }

    const passwordStrength = getPasswordStrength()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters")
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await res.json().catch(() => null)

            if (!res.ok) {
                setError(getApiErrorMessage(data, "Signup failed"))
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
            eyebrow="Create account"
            title="Start building a cleaner job search system."
            subtitle="Create your Trackr account to capture every role, compare compensation, and keep your search moving with less chaos."
            footerText="Already have an account?"
            footerHref="/login"
            footerLinkLabel="Sign in"
        >
            <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                    Get started
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#494846]">
                    Set up your account once, then manage the whole application pipeline from one table.
                </p>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-[#5c5a55]">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9a94]" size={18} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={form.name}
                                onChange={(e) => setForm({
                                    ...form,
                                    name: e.target.value,
                                })}
                                className="w-full rounded-xl border border-[#e0ded7] bg-[#fafaf8] py-3 pl-10 pr-4 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                            />
                        </div>
                    </div>

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
                                placeholder="Create a strong password"
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

                        {form.password && (
                            <div className="mt-2">
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs text-[#5c5a55]">Password strength:</span>
                                    <span
                                        className={`text-xs font-medium ${passwordStrength.strength >= 3
                                            ? "text-green-600"
                                            : passwordStrength.strength >= 2
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {passwordStrength.text}
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-[#5c5a55]">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9a94]" size={18} />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                required
                                value={form.confirmPassword}
                                onChange={(e) => setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                })}
                                className="w-full rounded-xl border border-[#e0ded7] bg-[#fafaf8] py-3 pl-10 pr-11 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c9a94] transition-colors hover:text-[#1a1917]"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {form.confirmPassword && form.password === form.confirmPassword && (
                            <div className="mt-2 flex items-center text-sm text-green-600">
                                <CheckCircle2 size={16} className="mr-1" />
                                <span>Passwords match</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-start rounded-xl border border-[#e0ded7] bg-[#fafaf8] px-4 py-3">
                        <input
                            id="terms"
                            type="checkbox"
                            required
                            className="mt-1 h-4 w-4 rounded border-[#ccc9bf] text-violet-600 focus:ring-violet-500"
                        />
                        <label htmlFor="terms" className="ml-3 text-sm leading-relaxed text-[#5c5a55]">
                            I agree to the{" "}
                            <Link
                                href="/terms"
                                className="font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4 hover:text-violet-600"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4 hover:text-violet-600"
                            >
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1917] px-4 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#2d2c29] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <span>{isLoading ? "Creating account..." : "Create Account"}</span>
                        {!isLoading && <ArrowRight size={18} />}
                    </button>
                </form>
            </div>
        </AuthFrame>
    )
}
