// app/features/applications/components/Pagination.tsx
"use client";
import { useQueryState } from "nuqs";
import { searchParamsParsers } from "@/app/features/applications/search-params";

interface props {
    pageCount: number
}
export default function Pagination({ pageCount }: props) {
    const [page, setPage] = useQueryState(
        "page",
        searchParamsParsers.page
    )
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

    const visible = pages.filter(p =>
        p === 1 ||
        p === pageCount ||
        Math.abs(p - page) <= 1
    )

    const withEllipsis = visible.reduce<(number | "...")[]>((acc, p, i) => {
        if (i > 0 && p - (visible[i - 1] as number) > 1) acc.push("...")
        acc.push(p)
        return acc
    }, [])

    return (
        <div className="flex flex-col gap-3   sm:flex-row items-center justify-between">
            <span className="text-xs text-[#9c9a94] font-mono">
                Page {page} of {pageCount}
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-3 cursor-pointer py-1.5 text-xs border border-[#e0ded7] rounded-lg text-[#1a1917] hover:bg-[#f3f2ee] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-mono"
                >
                    ← Prev
                </button>

                {withEllipsis.map((p, i) =>
                    p === "..." ? (
                        <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-[#9c9a94]">
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => setPage(p as number)}
                            className={`
                w-8 h-8 text-xs rounded-lg border transition-colors font-mono cursor-pointer
                ${page === p
                                    ? "bg-[#1a1917] text-white border-[#1a1917]"
                                    : "border-[#e0ded7] text-[#1a1917] hover:bg-[#f3f2ee]"
                                }
              `}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pageCount}
                    className="px-3 cursor-pointer py-1.5 text-xs border border-[#e0ded7] rounded-lg text-[#1a1917] hover:bg-[#f3f2ee] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-mono"
                >
                    Next →
                </button>
            </div>

        </div>
    )
}
