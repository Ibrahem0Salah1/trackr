// features/applications/components/ApplicationsTable.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { useQueryStates } from "nuqs"
import { getApplications } from "@/app/features/applications/api/client"
import { searchParamsParsers } from "@/app/features/applications/search-params"
import { SelectionProvider } from "../context/SelectionContext"
import type { PaginatedApplications } from "@/app/features/applications/types"
import ApplicationRow from "./ApplicationRow"
import Pagination from "./Pagination"
import FloatingActionBar from "./FloatingActionBar"

// ── Inner component ────────────────────────────────────────────────────────
// Lives INSIDE SelectionProvider so it can call useSelection freely
// (FloatingActionBar and ApplicationRow also call useSelection — they work
//  because they're children of this component which is inside the Provider)
function TableInner() {
    const [{ q, page }] = useQueryStates(searchParamsParsers)

    const { data, isLoading, isFetching } = useQuery<PaginatedApplications>({
        queryKey: ["applications", { q, page }],
        queryFn: () => getApplications(q, page),
        placeholderData: prev => prev,
    })

    const apps = data?.data ?? []
    const meta = data?.meta
    const hasQuery = q.length > 0

    if (isLoading && !data) {
        return (
            <div className="flex items-center justify-center py-16 text-sm text-[#9c9a94]">
                Loading…
            </div>
        )
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-[#e0ded7] bg-white">

                {/* Header bar */}
                <div className="flex flex-col gap-3 border-b border-[#e0ded7] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <span className="text-sm font-medium text-[#1a1917]">
                        My applications
                    </span>
                    <span className="inline-flex w-fit rounded-full border border-[#e0ded7] bg-[#f3f2ee] px-2.5 py-1 font-mono text-xs text-[#9c9a94]">
                        {hasQuery
                            ? `${meta?.total ?? 0} results for "${q}"`
                            : `${meta?.total ?? 0} total`
                        }
                    </span>
                </div>

                <div className={`transition-opacity duration-150 ${isFetching ? "opacity-50" : "opacity-100"}`}>
                    {apps.length === 0 ? (
                        <div className="px-6 py-16 text-center text-sm text-[#9c9a94]">
                            {hasQuery
                                ? `No applications matching "${q}"`
                                : "No applications yet — add your first one above."
                            }
                        </div>
                    ) : (
                        <>
                            {/* ── MOBILE / TABLET: card grid ── */}
                            <div className="grid gap-3 py-4 px-2 lg:hidden">
                                {apps.map(app => (
                                    <ApplicationRow key={app.id} app={app} variant="card" />
                                ))}
                            </div>

                            {/* ── DESKTOP: table ── */}
                            <div className="hidden lg:block lg:overflow-x-auto">
                                <table className="w-full min-w-[980px]">
                                    <thead>
                                        <tr className="border-b border-[#e0ded7]">
                                            {/* Empty th for the checkbox column */}
                                            <th className="w-10 pl-4" />
                                            {["Company", "Role", "Country", "City", "Salary", "Status", "Link"].map(h => (
                                                <th
                                                    key={h}
                                                    className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-[#9c9a94]"
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apps.map(app => (
                                            <ApplicationRow key={app.id} app={app} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {meta && meta.pageCount > 1 && (
                    <div className="border-t border-[#e0ded7] px-4 py-4 sm:px-6">
                        <Pagination pageCount={meta.pageCount} />
                    </div>
                )}

            </div>

            {/* FloatingActionBar renders fixed to the bottom of the viewport
          It reads selectedIds from context — no props needed */}
            <FloatingActionBar />
        </>
    )
}

// ── Outer component ────────────────────────────────────────────────────────
// Creates the SelectionProvider box, renders TableInner inside it
// TableInner, ApplicationRow, and FloatingActionBar all live inside
// the box so they can all reach into it via useSelection()
export default function ApplicationsTable() {
    return (
        <SelectionProvider>
            <TableInner />
        </SelectionProvider>
    )
}