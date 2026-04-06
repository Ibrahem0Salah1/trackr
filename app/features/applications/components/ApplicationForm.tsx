"use client"
// app/features/applications/components/ApplicationForm.tsx
import { useState } from "react"
import { useCreateApplication } from "@/app/features/applications/hooks/useCreateApplication"
import type { CreateApplicationInput } from "@/app/features/applications/types"

interface Props {
    onSuccess: () => void
}

// All fields are strings or booleans here — HTML inputs only produce strings.
// Conversion to numbers happens in handleSubmit, at the boundary.
const defaultFormData = {
    company: "",
    position: "",
    salary: "",   // string — converted to number | null at submit
    salaryCurrency: "EGP" as const,
    country: "",
    city: "",
    remote: false,
    status: "APPLIED" as const,
    linkOfApplication: "",
}

export default function ApplicationForm({ onSuccess }: Props) {
    const [formData, setFormData] = useState(defaultFormData)
    const { mutate, isPending, isError } = useCreateApplication()

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value, type } = e.target
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        // This is the boundary — convert form strings to the types the API expects
        const payload: CreateApplicationInput = {
            company: formData.company,
            position: formData.position,
            salaryAmount: formData.salary !== "" ? parseInt(formData.salary, 10) : null,
            salaryCurrency: formData.salaryCurrency,
            country: formData.country || undefined,
            city: formData.city || undefined,
            remote: formData.remote,
            status: formData.status,
            linkOfApplication: formData.linkOfApplication || undefined,
        }

        mutate(payload, {
            onSuccess: () => {
                setFormData(defaultFormData)
                onSuccess()
            },
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-1.5">

            {/* Company */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                    Company
                </label>
                <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c9a94] text-xs font-mono">
                        @
                    </span>
                    <input
                        name="company"
                        placeholder="e.g. Stripe, Figma…"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-[#e0ded7] rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                    />
                </div>
            </div>

            {/* Position */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                    Position
                </label>
                <input
                    name="position"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                />
            </div>

            {/* Salary + Currency */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                        Salary
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c9a94] text-xs font-mono">
                            $
                        </span>
                        <input
                            name="salary"
                            type="number"
                            placeholder="120,000"
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full bg-white border border-[#e0ded7] rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                        Currency
                    </label>
                    <select
                        name="salaryCurrency"
                        value={formData.salaryCurrency}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all appearance-none"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="EGP">EGP</option>
                    </select>
                </div>
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                        Country
                    </label>
                    <input
                        name="country"
                        placeholder="Egypt"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                        City
                    </label>
                    <input
                        name="city"
                        placeholder="Cairo"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                    />
                </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                    Status
                </label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all appearance-none"
                >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            {/* Application link */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#5c5a55] uppercase tracking-wider font-mono">
                    Application link
                </label>
                <input
                    name="linkOfApplication"
                    placeholder="https://jobs.company.com/…"
                    value={formData.linkOfApplication}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#e0ded7] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
                />
            </div>

            {/* Remote toggle */}
            <label className="flex items-center gap-3 px-3.5 py-3 bg-[#f3f2ee] border border-[#e0ded7] rounded-lg cursor-pointer">
                <div className="relative">
                    <input
                        name="remote"
                        type="checkbox"
                        checked={formData.remote}
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#ccc9bf] peer-checked:bg-violet-500 rounded-full transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 pointer-events-none" />
                </div>
                <span className="text-sm text-[#1a1917]">Remote position</span>
            </label>

            {/* Error */}
            {isError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                    Failed to create application. Please try again.
                </p>
            )}

            {/* Submit */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#1a1917] hover:bg-[#2d2c29] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                >
                    {isPending ? "Saving…" : "Save application"}
                </button>
            </div>

        </form>
    )
}