"use client"

import { useRef } from "react"
import { useQueryStates } from "nuqs"
import { useIsFetching } from "@tanstack/react-query"
import { searchParamsParsers } from "@/app/features/applications/search-params"

export default function SearchBar() {
    const [{ q }, setSearchParams] = useQueryStates(searchParamsParsers)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isFetching = useIsFetching({ queryKey: ["applications"] })

    function updateQuery(value: string) {
        if (debounceRef.current !== null) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setSearchParams({ q: value || null, page: 1 })
            debounceRef.current = null
        }, 400)
    }

    function handleClear() {
        if (debounceRef.current !== null) {
            clearTimeout(debounceRef.current)
            debounceRef.current = null
        }
        if (inputRef.current) inputRef.current.value = ""
        setSearchParams({ q: null, page: 1 })
    }

    return (
        <div className="relative">

            {/* Search icon — hides when fetching */}
            {!isFetching && (
                <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c9a94]"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            )}

            {/* Spinner — shows when fetching */}
            {!!isFetching && (
                <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500 animate-spin"
                    viewBox="0 0 24 24" fill="none"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}

            <input
                ref={inputRef}
                defaultValue={q}
                onChange={e => updateQuery(e.target.value)}
                placeholder="Search by company, role, city…"
                className="w-full bg-white border border-[#e0ded7] rounded-lg pl-10 pr-9 py-2.5 text-sm text-[#1a1917] placeholder:text-[#9c9a94] font-sans focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
            />

            {q && !isFetching && (
                <button
                    onClick={handleClear}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9c9a94] hover:text-[#1a1917] transition-colors cursor-pointer"
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            )}

        </div>
    )
}