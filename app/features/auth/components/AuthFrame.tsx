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

            <main className="mx-auto flex min-h-[calc(100vh-77px)] max-w-7xl gap-10 px-6 py-10 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center justify-center">
                <section className="mx-auto w-[95%]  sm:w-[70%] md:w-[60%] lg:w-[40%]  sm:border  sm:p-6 border-[#e0ded7] rounded-3xl  shadow-black/5 md:p-10">
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
