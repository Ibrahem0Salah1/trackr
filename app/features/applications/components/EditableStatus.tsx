"use client"
// app/features/applications/components/EditableStatus.tsx
import type { ApplicationStatus } from "@/app/features/applications/types"
import { statusConfig } from "./StatusBadge"

const statusOptions = Object.entries(statusConfig) as Array<
    [ApplicationStatus, (typeof statusConfig)[ApplicationStatus]]
>

interface EditableStatusProps {
    status: ApplicationStatus
    onChange: (status: ApplicationStatus) => void
}

export default function EditableStatus({ status, onChange }: EditableStatusProps) {
    const currentStatus = statusConfig[status]

    return (
        <label className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${currentStatus.classes}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span>{currentStatus.label}</span>
            <svg
                className="h-3.5 w-3.5 opacity-70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
            <select
                aria-label="Update application status"
                value={status}
                onChange={(event) => onChange(event.target.value as ApplicationStatus)}
                className="absolute inset-0 cursor-pointer opacity-0"
            >
                {statusOptions.map(([value, config]) => (
                    <option key={value} value={value}>
                        {config.label}
                    </option>
                ))}
            </select>
        </label>
    )
}
