// features/applications/components/ApplicationRow.tsx
"use client"

import Link from "next/link"
import type {
    Application,
    UpdateApplicationInput,
    ApplicationStatus,
} from "@/app/features/applications/types"
import { useUpdateApplication } from "@/app/features/applications/hooks/useUpdateApplication"
import { useSelection } from "../context/SelectionContext"
import EditableCell from "./EditableCell"
import EditableStatus from "./EditableStatus"

interface ApplicationRowProps {
    app: Application
    variant?: "table" | "card"
}

export default function ApplicationRow({
    app,
    variant = "table",
}: ApplicationRowProps) {
    const { mutate } = useUpdateApplication()
    const { isSelected, toggleId } = useSelection()
    const selected = isSelected(app.id)

    function saveField(field: keyof UpdateApplicationInput | string, value: string) {
        let data: UpdateApplicationInput
        const v = value.trim()

        if (field === "salaryAmount") {
            const parsed = parseInt(v.replaceAll(",", ""), 10)
            data = { salaryAmount: isNaN(parsed) ? null : parsed }
        } else if (field === "status") {
            data = { status: v as ApplicationStatus }
        } else if (field === "remote") {
            data = { remote: v === "true" }
        } else {
            const nullable = new Set(["country", "city", "linkOfApplication"])
            if ((field === "company" || field === "position") && v === "") return
            data = { [field]: nullable.has(field) && v === "" ? null : v }
        }

        mutate({ id: app.id, data })
    }

    // ── CARD VARIANT ──────────────────────────────────────────────────────────
    if (variant === "card") {
        return (
            <article className={`
        relative rounded-2xl border bg-white p-4 shadow-sm shadow-black/5
        transition-colors
        ${selected
                    ? "border-violet-300 bg-violet-50/40"
                    : "border-[#e0ded7] hover:border-[#d4d0c6]"
                }
      `}>

                {/* Checkbox — top right corner of the card */}
                <div className="absolute right-4 top-4">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleId(app.id)}
                        aria-label={`Select ${app.company}`}
                        className="h-4 w-4 cursor-pointer rounded border-[#ccc9bf] accent-violet-600 focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-0"
                    />
                </div>

                {/* Company + Status */}
                <div className="flex items-start justify-between gap-8 pr-8">
                    <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#9c9a94]">
                            Company
                        </div>
                        <div className="mt-1 text-base w-full font-semibold text-[#1a1917]">
                            <EditableCell value={app.company} field="company" onSave={saveField} />
                        </div>
                    </div>
                    <EditableStatus
                        status={app.status}
                        onChange={next => saveField("status", next)}
                    />
                </div>

                {/* Position */}
                <div className="mt-4 rounded-xl bg-[#fafaf8] px-3 py-2">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">
                        Role
                    </div>
                    <div className="mt-1 text-sm text-[#1a1917]">
                        <EditableCell value={app.position} field="position" onSave={saveField} />
                    </div>
                </div>

                {/* Grid of details */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">Country</div>
                        <div className="mt-1 text-sm text-[#1a1917]">
                            <EditableCell value={app.country ?? ""} field="country" onSave={saveField} />
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">City</div>
                        <div className="mt-1 text-sm text-[#1a1917]">
                            <EditableCell value={app.city ?? ""} field="city" onSave={saveField} />
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">Salary</div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-[#1a1917]">
                            <EditableCell
                                value={app.salaryAmount !== null ? String(app.salaryAmount) : ""}
                                field="salaryAmount"
                                onSave={saveField}
                            />
                            <span className="rounded-full border border-[#e0ded7] bg-[#f3f2ee] px-2 py-1 text-[11px] font-mono text-[#5c5a55]">
                                {app.salaryCurrency ?? "—"}
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                        <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">Application</div>
                        <div className="mt-1 text-sm">
                            {app.linkOfApplication ? (
                                <Link
                                    href={app.linkOfApplication}
                                    target="_blank"
                                    className="font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4 transition-colors hover:text-violet-600"
                                >
                                    Open link
                                </Link>
                            ) : (
                                <span className="text-[#9c9a94]">No link attached</span>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        )
    }

    // ── TABLE ROW VARIANT ─────────────────────────────────────────────────────
    return (
        <tr className={`
      border-b border-[#f3f2ee] transition-colors
      ${selected ? "bg-violet-50/60 hover:bg-violet-50" : "hover:bg-[#fafaf8]"}
    `}>

            {/* Checkbox cell */}
            <td className="w-10 py-4 pl-4 pr-0">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleId(app.id)}
                    aria-label={`Select ${app.company}`}
                    className="h-4 w-4 cursor-pointer rounded border-[#ccc9bf] accent-violet-600 focus:ring-2 focus:ring-violet-500/20 focus:ring-offset-0"
                />
            </td>

            <td className="px-4 py-4">
                <EditableCell value={app.company} field="company" onSave={saveField} />
            </td>

            <td className="px-4 py-4">
                <EditableCell value={app.position} field="position" onSave={saveField} />
            </td>

            <td className="px-4 py-4">
                <EditableCell value={app.country ?? ""} field="country" onSave={saveField} />
            </td>

            <td className="px-4 py-4">
                <EditableCell value={app.city ?? ""} field="city" onSave={saveField} />
            </td>

            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <EditableCell
                        value={app.salaryAmount !== null ? String(app.salaryAmount) : ""}
                        field="salaryAmount"
                        onSave={saveField}
                    />
                    {app.salaryCurrency && (
                        <span className="shrink-0 rounded-full border border-[#e0ded7] bg-[#f3f2ee] px-2 py-0.5 text-[10px] font-mono text-[#5c5a55]">
                            {app.salaryCurrency}
                        </span>
                    )}
                </div>
            </td>

            <td className="px-4 py-4">
                <EditableStatus
                    status={app.status}
                    onChange={next => saveField("status", next)}
                />
            </td>

            <td className="px-4 py-4">
                {app.linkOfApplication ? (
                    <Link
                        href={app.linkOfApplication}
                        target="_blank"
                        className="text-sm font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4 transition-colors hover:text-violet-600"
                    >
                        View ↗
                    </Link>
                ) : (
                    <span className="text-sm text-[#9c9a94]">—</span>
                )}
            </td>
        </tr>
    )
}