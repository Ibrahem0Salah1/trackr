// app/features/applications/components/Navbar.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { logout } from "@/lib/logout"
import { UserData } from "../types"


export default function Navbar({ userData }: { userData: UserData | null }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])
    if (!userData) return null; // Navbar is only rendered when userData is available, but we add this check for type safety

    // Initials for the avatar — "John Doe" → "JD"
    const initials = userData.name
        .split(" ")
        .map(part => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <nav className="sticky top-0 z-40 border-b border-[#e0ded7] bg-[#fafaf8]/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">

                {/* Logo */}
                <Link
                    href="/"
                    className="font-serif text-xl tracking-tight text-[#1a1917]"
                >
                    Track<span className="text-violet-600">r</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-full border border-[#e0ded7] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#5c5a55] transition-colors hover:bg-white"
                    >
                        Home
                    </Link>

                    {/* User dropdown */}
                    <div className="relative cursor-pointer" ref={dropdownRef}>

                        {/* Trigger button */}
                        <button
                            onClick={() => setOpen(o => !o)}
                            className={`
                flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3
                transition-all cursor-pointer
                ${open
                                    ? "border-[#ccc9bf] bg-white shadow-sm"
                                    : "border-[#e0ded7] hover:border-[#ccc9bf] hover:bg-white"
                                }
              `}
                        >
                            {/* Avatar circle with initials */}
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1917] text-[11px] font-medium text-white">
                                {initials}
                            </div>

                            {/* Name — hidden on very small screens */}
                            <span className="hidden text-sm font-medium text-[#1a1917] sm:block">
                                {userData.name.split(" ")[0]}
                            </span>

                            {/* Chevron */}
                            <svg
                                className={`h-3.5 w-3.5 text-[#9c9a94] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        {/* Dropdown panel */}
                        {open && (
                            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[#e0ded7] bg-white shadow-xl shadow-black/8">

                                {/* User info header */}
                                <div className="flex items-center gap-3 border-b border-[#f3f2ee] px-4 py-3.5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1917] text-sm font-medium text-white">
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        {/* truncate prevents long names from breaking the layout */}
                                        <p className="truncate text-sm font-medium text-[#1a1917]">
                                            {userData.name}
                                        </p>
                                        <p className="truncate text-xs text-[#9c9a94]">
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-1.5">
                                    {/* Logout — calls Server Action directly */}
                                    {/* form + formAction is the correct pattern for Server Actions */}
                                    {/* it works without JavaScript too (progressive enhancement) */}
                                    <form action={logout}>
                                        <button
                                            type="submit"
                                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition-colors cursor-pointer hover:bg-red-50"
                                        >
                                            <svg
                                                className="h-4 w-4 shrink-0"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            >
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
                </div>

            </div>
        </nav>
    )
}