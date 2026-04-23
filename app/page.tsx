// app/page.tsx
import Link from "next/link"
import { getUser } from "@/lib/getUser"
import { getUserData } from "@/lib/getUserData"
import HomeNavbar from "./features/applications/components/HomepageNavbar"
export default async function Home() {
  // Runs on the server — no loading state, no flicker
  const token = await getUser()
  const userData = token
    ? await getUserData(Number(token.userId))
    : null

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1917] font-sans">

      {/* Nav receives auth state */}
      <HomeNavbar userData={userData} />

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-20 text-center">
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.08] tracking-[-0.03em] mb-6">
          Your job search,<br />
          <em className="italic text-[#5c5a55]">finally organised</em>
        </h1>

        <p className="text-lg md:text-xl text-[#5c5a55] font-light max-w-lg mx-auto mb-10 leading-relaxed">
          Track every application, follow-up, and offer in one clean workspace.
          No more lost emails or forgotten deadlines.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {userData ? (
            // Logged in — send them to dashboard
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1917] text-white text-sm font-medium rounded-xl hover:bg-[#2d2c29] hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Go to dashboard
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            // Not logged in — send them to signup
            <>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1917] text-white text-sm font-medium rounded-xl hover:bg-[#2d2c29] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Start for free
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border-2 border-[#ccc9bf] rounded-xl hover:bg-[#f3f2ee] hover:border-[#1a1917] transition-all"
              >
                View dashboard
              </Link>
            </>
          )}
        </div>

        <p className="text-xs text-[#9c9a94] mt-5 font-mono">
          No credit card required · Takes 60 seconds
        </p>
      </section>
      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e0ded7] px-6 md:px-12 py-8 flex items-center justify-between">
        <span className="font-serif text-lg">
          Track<span className="text-violet-600">r</span>
        </span>
        <span className="text-xs text-[#9c9a94] font-mono">
          © 2026 Trackr. All rights reserved.
        </span>
      </footer>

    </div>
  )
}
