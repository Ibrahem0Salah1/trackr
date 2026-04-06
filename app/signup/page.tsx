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
                <h2 className="mt-3 font-serif text-4xl tracking-tight text-[#1a1917]">
                    Create your workspace
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#5c5a55]">
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

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#e0ded7]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                        <span className="bg-white px-4">Alternative access</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center rounded-xl border border-[#e0ded7] px-4 py-3 text-sm font-medium text-[#1a1917] transition-colors hover:bg-[#f3f2ee]"
                    >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center rounded-xl border border-[#e0ded7] px-4 py-3 text-sm font-medium text-[#1a1917] transition-colors hover:bg-[#f3f2ee]"
                    >
                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </div>
            </div>
        </AuthFrame>
    )
}
