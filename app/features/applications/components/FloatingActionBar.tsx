// features/applications/components/FloatingActionBar.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { useSelection } from "../context/SelectionContext"
import { useDeleteApplication } from "../hooks/useDeleteApplications"

export default function FloatingActionBar() {
    const { selectedIds, clearSelection } = useSelection()
    const { mutate: deleteApps, isPending } = useDeleteApplication()

    const [open, setOpen] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const count = selectedIds.size

    // Close dropdown when clicking outside
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
                setConfirming(false)
            }
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => document.removeEventListener("mousedown", onClickOutside)
    }, [])

    // Don't render anything when nothing is selected
    if (count === 0) return null

    function handleDelete() {
        if (!confirming) {
            // First click — just show the confirmation state
            // User must click again to actually delete
            setConfirming(true)
            return
        }

        // Second click — actually fire the mutation
        deleteApps(Array.from(selectedIds), {
            onSuccess: () => {
                clearSelection()
                setOpen(false)
                setConfirming(false)
            },
        })
    }

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1a1917] px-4 py-3 shadow-2xl shadow-black/40">

                {/* Count indicator */}
                <div className="flex items-center gap-2 border-r border-white/15 pr-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium text-white">
                        {count} selected
                    </span>
                </div>

                {/* Actions dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => { setOpen(o => !o); setConfirming(false) }}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        Actions
                        <svg
                            className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    {open && (
                        <div className="absolute bottom-full -left-12 mb-2 w-56 overflow-hidden rounded-xl border border-[#e0ded7] bg-white shadow-xl shadow-black/10">

                            {/* Dropdown header */}
                            <div className="border-b border-[#f3f2ee] px-3 py-2">
                                <p className="font-mono text-xs uppercase tracking-wider text-[#9c9a94]">
                                    {count} application{count > 1 ? "s" : ""} selected
                                </p>
                            </div>

                            {/* Delete button — two states */}
                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className={`
                  flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm
                  transition-colors disabled:cursor-not-allowed disabled:opacity-50
                  ${confirming
                                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                                        : "text-red-600 hover:bg-red-50"
                                    }
                `}
                            >
                                {/* Icon changes based on state */}
                                {isPending ? (
                                    <svg className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : confirming ? (
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                                    </svg>
                                )}

                                {/* Label changes based on state */}
                                {isPending
                                    ? "Deleting…"
                                    : confirming
                                        ? `Confirm — delete ${count} app${count > 1 ? "s" : ""}`
                                        : `Delete ${count} application${count > 1 ? "s" : ""}`
                                }
                            </button>

                        </div>
                    )}
                </div>

                {/* Clear selection button */}
                <button
                    onClick={clearSelection}
                    title="Clear selection"
                    className="ml-1 rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

            </div>
        </div>
    )
}