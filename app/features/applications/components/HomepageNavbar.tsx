// app/components/HomeNavbar.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { logout } from "@/lib/logout"
import { UserData } from "../types"
export default function HomeNavbar({ userData }: { userData: UserData | null }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const initials = userData?.name
        .split(" ")
        .map(p => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[#fafaf8]/95 border-b border-[#e0ded7] backdrop-blur">

            {/* Logo */}
            <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a1917]">
                Track<span className="text-violet-600 ">r</span>
            </Link>
            {/* Right side — changes based on auth */}
            <div className="flex items-center gap-2.5 ">
                {userData ? (
                    // ── LOGGED IN ──────────────────────────────────────────────────
                    <>
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 text-sm bg-[#1a1917] text-white rounded-lg hover:bg-[#2d2c29] transition-colors"
                        >
                            Dashboard
                        </Link>

                        {/* User dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(o => !o)}
                                className={`
                flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3
                transition-all
                ${open
                                        ? "border-[#ccc9bf] bg-white shadow-sm"
                                        : "border-[#e0ded7] hover:border-[#ccc9bf] hover:bg-white"
                                    }
                `}
                            >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1917] text-[11px] font-medium text-white">
                                    {initials}
                                </div>
                                <span className="hidden text-sm font-medium text-[#1a1917] sm:block">
                                    {userData?.name.split(" ")[0]}
                                </span>
                                <svg
                                    className={`h-3.5 w-3.5 text-[#9c9a94] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {open && (
                                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[#e0ded7] bg-white shadow-xl shadow-black/8">
                                    <div className="flex items-center gap-3 border-b border-[#f3f2ee] px-4 py-3.5">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1917] text-sm font-medium text-white">
                                            {initials}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-[#1a1917]">{userData?.name}</p>
                                            <p className="truncate text-xs text-[#9c9a94]">{userData?.email}</p>
                                        </div>
                                    </div>
                                    <div className="p-1.5">
                                        <form action={logout}>
                                            <button
                                                type="submit"
                                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                            >
                                                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                                Log out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // ── NOT LOGGED IN ───────────────────────────────────────────────
                    <>
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm border border-[#ccc9bf] rounded-lg hover:bg-[#f3f2ee] transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 text-sm bg-[#1a1917] text-white rounded-lg hover:bg-[#2d2c29] transition-colors"
                        >
                            Get started
                        </Link>
                    </>
                )}
            </div>

        </nav>
    )
}