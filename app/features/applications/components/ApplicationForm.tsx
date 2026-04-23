"use client"
// app/features/applications/components/ApplicationForm.tsx
import { useState } from "react"
import { useCreateApplication } from "@/app/features/applications/hooks/useCreateApplication"
import type { CreateApplicationInput } from "@/app/features/applications/types"

interface Props {
    onSuccess: () => void
    onCancel?: () => void
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

export default function ApplicationForm({ onSuccess, onCancel }: Props) {
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-4">
                {/* Company */}
                <div className="space-y-2">
                    <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                        Company
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#9c9a94]">
                            @
                        </span>
                        <input
                            name="company"
                            placeholder="e.g. Stripe, Figma…"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-[#e0ded7] bg-white py-3 pl-8 pr-3.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                        />
                    </div>
                </div>

                {/* Position */}
                <div className="space-y-2">
                    <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                        Position
                    </label>
                    <input
                        name="position"
                        placeholder="e.g. Senior Frontend Engineer"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                    />
                </div>

                {/* Salary + Currency */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                            Salary
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#9c9a94]">
                                $
                            </span>
                            <input
                                name="salary"
                                type="number"
                                placeholder="120000"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#e0ded7] bg-white py-3 pl-8 pr-3.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                            Currency
                        </label>
                        <select
                            name="salaryCurrency"
                            value={formData.salaryCurrency}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="EGP">EGP</option>
                        </select>
                    </div>
                </div>

                {/* Country + City */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                            Country
                        </label>
                        <input
                            name="country"
                            placeholder="Egypt"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                            City
                        </label>
                        <input
                            name="city"
                            placeholder="Cairo"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                    >
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="OFFER">Offer</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>

                {/* Application link */}
                <div className="space-y-2">
                    <label className="font-mono text-xs font-medium uppercase tracking-wider text-[#5c5a55]">
                        Application link
                    </label>
                    <input
                        name="linkOfApplication"
                        placeholder="https://jobs.company.com/…"
                        value={formData.linkOfApplication}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#e0ded7] bg-white px-3.5 py-3 text-sm text-[#1a1917] placeholder:text-[#9c9a94] transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/10"
                    />
                </div>

                {/* Remote toggle */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#e0ded7] bg-[#f3f2ee] px-3.5 py-3">
                    <div className="relative">
                        <input
                            name="remote"
                            type="checkbox"
                            checked={formData.remote}
                            onChange={handleChange}
                            className="peer sr-only"
                        />
                        <div className="h-5 w-9 rounded-full bg-[#ccc9bf] transition-colors peer-checked:bg-violet-500" />
                        <div className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span className="text-sm text-[#1a1917]">Remote position</span>
                </label>

                {/* Error */}
                {isError && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-600">
                        Failed to create application. Please try again.
                    </p>
                )}
            </div>

            <div className="pt-2">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="min-h-11 rounded-lg border border-[#e0ded7] px-4 py-2.5 text-sm font-medium text-[#5c5a55] transition-colors hover:bg-[#f3f2ee]"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="min-h-11 w-full rounded-lg bg-[#1a1917] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2d2c29] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[11rem]"
                    >
                        {isPending ? "Saving…" : "Save application"}
                    </button>
                </div>
            </div>

        </form>
    )
}
