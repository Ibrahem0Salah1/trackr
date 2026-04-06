// app/dashboard/loading.tsx
export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#fafaf8]">

            {/* Navbar skeleton */}
            <div className="sticky top-0 z-40 border-b border-[#e0ded7] bg-[#fafaf8]/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
                    <div className="h-6 w-16 animate-pulse rounded-md bg-[#e0ded7]" />
                    <div className="h-8 w-24 animate-pulse rounded-full bg-[#e0ded7]" />
                </div>
            </div>

            {/* Hero section skeleton */}
            <section className="border-b border-[#e0ded7]">
                <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
                    <div className="max-w-3xl space-y-4">
                        <div className="h-3 w-20 animate-pulse rounded-full bg-[#e0ded7]" />
                        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-[#e0ded7]" />
                        <div className="h-10 w-1/2 animate-pulse rounded-xl bg-[#e0ded7]" />
                        <div className="h-5 w-3/4 animate-pulse rounded-md bg-[#e0ded7]" />
                    </div>
                </div>
            </section>

            {/* Table area skeleton */}
            <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">

                {/* Search + button row */}
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="h-10 w-72 animate-pulse rounded-lg bg-[#e0ded7]" />
                    <div className="h-10 w-36 animate-pulse rounded-lg bg-[#e0ded7]" />
                </div>

                {/* Table card */}
                <div className="overflow-hidden rounded-2xl border border-[#e0ded7] bg-white shadow-sm">

                    {/* Table header bar */}
                    <div className="flex items-center justify-between border-b border-[#e0ded7] px-5 py-3.5">
                        <div className="h-4 w-32 animate-pulse rounded-md bg-[#e0ded7]" />
                        <div className="h-6 w-16 animate-pulse rounded-full bg-[#e0ded7]" />
                    </div>

                    {/* Column headers */}
                    <div className="border-b border-[#e0ded7] bg-[#f3f2ee] px-5 py-3">
                        <div className="flex gap-8">
                            <div className="h-3 w-6 animate-pulse rounded bg-[#e0ded7]" />
                            {[80, 60, 70, 55, 70, 60, 40].map((w, i) => (
                                <div
                                    key={i}
                                    className="h-3 animate-pulse rounded bg-[#e0ded7]"
                                    style={{ width: w }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Skeleton rows */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-8 border-b border-[#f3f2ee] px-5 py-4 last:border-0"
                        >
                            {/* Checkbox */}
                            <div className="h-4 w-4 animate-pulse rounded bg-[#e0ded7]" />
                            {/* Cells — varying widths feel more natural than uniform */}
                            {[120, 100, 80, 70, 90, 72, 40].map((w, j) => (
                                <div
                                    key={j}
                                    className="h-3.5 animate-pulse rounded-md bg-[#e0ded7]"
                                    style={{
                                        width: w,
                                        // Stagger the animation so rows don't all pulse together
                                        animationDelay: `${i * 60}ms`,
                                    }}
                                />
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}