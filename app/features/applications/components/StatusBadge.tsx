import type { ApplicationStatus } from "@/app/features/applications/types"

export const statusConfig = {
    APPLIED: { label: "Applied", classes: "bg-blue-50 text-blue-700 border-blue-200" },
    INTERVIEW: { label: "Interview", classes: "bg-amber-50 text-amber-700 border-amber-200" },
    OFFER: { label: "Offer", classes: "bg-green-50 text-green-700 border-green-200" },
    REJECTED: { label: "Rejected", classes: "bg-red-50 text-red-700 border-red-200" },
} as const

export default function StatusBadge({ status }: { status: ApplicationStatus | string }) {
    const config = statusConfig[status as ApplicationStatus] ?? {
        label: status,
        classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    }

    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${config.classes}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {config.label}
        </span>
    )
}
