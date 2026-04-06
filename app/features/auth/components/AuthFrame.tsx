import type { ReactNode } from "react"
import Link from "next/link"

interface AuthFrameProps {
    eyebrow: string
    title: string
    subtitle: string
    footerText: string
    footerHref: string
    footerLinkLabel: string
    children: ReactNode
}

export default function AuthFrame({
    eyebrow,
    title,
    subtitle,
    footerText,
    footerHref,
    footerLinkLabel,
    children,
}: AuthFrameProps) {
    return (
        <div className="min-h-screen bg-[#fafaf8] text-[#1a1917]">
            <nav className="border-b border-[#e0ded7] bg-[#fafaf8]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
                    <Link href="/" className="font-serif text-xl tracking-tight">
                        Track<span className="text-violet-600">r</span>
                    </Link>
                    <Link
                        href="/"
                        className="rounded-lg border border-[#ccc9bf] px-4 py-2 text-sm transition-colors hover:bg-[#f3f2ee]"
                    >
                        Back home
                    </Link>
                </div>
            </nav>

            <main className="mx-auto grid min-h-[calc(100vh-77px)] max-w-7xl gap-10 px-6 py-10 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <section className="rounded-[32px] border border-[#e0ded7] bg-[#f3f2ee] p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ccc9bf] bg-white px-4 py-1.5 text-xs font-mono text-[#5c5a55]">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Secure application workspace
                    </div>

                    <p className="mt-8 text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                        {eyebrow}
                    </p>
                    <h1 className="mt-4 max-w-lg font-serif text-5xl leading-[1.05] tracking-[-0.03em] md:text-6xl">
                        {title}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5c5a55] md:text-lg">
                        {subtitle}
                    </p>

                    <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#e0ded7] bg-[#e0ded7] md:grid-cols-3">
                        {[
                            { label: "Fast setup", value: "60 sec" },
                            { label: "Private data", value: "100%" },
                            { label: "Track roles", value: "Unlimited" },
                        ].map((item) => (
                            <div key={item.label} className="bg-white px-5 py-6">
                                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                                    {item.label}
                                </p>
                                <p className="mt-3 font-serif text-3xl tracking-tight text-[#1a1917]">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[32px] border border-[#e0ded7] bg-white p-8 shadow-2xl shadow-black/5 md:p-10">
                    {children}

                    <p className="mt-8 text-center text-sm text-[#5c5a55]">
                        {footerText}{" "}
                        <Link
                            href={footerHref}
                            className="font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4 hover:text-violet-600"
                        >
                            {footerLinkLabel}
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    )
}
