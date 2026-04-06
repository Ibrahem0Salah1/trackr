// app/page.tsx
import Link from "next/link"
import { getUser } from "@/lib/getUser"
import { getUserData } from "@/lib/getUserData"
import HomeNavbar from "./features/applications/components/HomepageNavbar"

const previewStatusStyles = {
  APPLIED: "bg-blue-50 text-blue-700 border-blue-200",
  INTERVIEW: "bg-amber-50 text-amber-700 border-amber-200",
  OFFER: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
} as const

const dashboardPreviewRows = [
  {
    id: 1,
    company: "Stripe",
    position: "Senior Frontend Engineer",
    country: "USA",
    city: "San Francisco",
    salaryAmount: "180,000",
    salaryCurrency: "USD",
    status: "INTERVIEW",
    linkLabel: "View ↗",
    selected: true,
  },
  {
    id: 2,
    company: "Figma",
    position: "Product Designer",
    country: "USA",
    city: "New York",
    salaryAmount: "140,000",
    salaryCurrency: "USD",
    status: "APPLIED",
    linkLabel: "View ↗",
    selected: false,
  },
  {
    id: 3,
    company: "Vercel",
    position: "DX Engineer",
    country: "Remote",
    city: "Global",
    salaryAmount: "155,000",
    salaryCurrency: "USD",
    status: "OFFER",
    linkLabel: "View ↗",
    selected: false,
  },
  {
    id: 4,
    company: "Meta",
    position: "React Native Engineer",
    country: "USA",
    city: "Menlo Park",
    salaryAmount: "200,000",
    salaryCurrency: "USD",
    status: "REJECTED",
    linkLabel: "View ↗",
    selected: false,
  },
] as const

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

      {/* ── DASHBOARD PREVIEW ── */}
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-12">
        <div className="rounded-[32px] border border-[#e0ded7] bg-[linear-gradient(180deg,#f7f4ef_0%,#f1eee7_100%)] p-2 shadow-[0_28px_80px_rgba(17,16,14,0.12)]">
          <div className="overflow-hidden rounded-[28px] border border-[#d8d4cb] bg-[#fafaf8]">
            <div className="flex items-center gap-2 border-b border-[#e0ded7] bg-[#f3f2ee] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
                <div className="flex w-full max-w-56 items-center justify-center rounded-md border border-[#e0ded7] bg-white px-3 py-1 text-xs text-[#9c9a94] font-mono">
                  trackr.app/dashboard
                </div>
              </div>
            </div>

            <div className="border-b border-[#e0ded7] bg-[#fafaf8]/95 px-4 py-4 backdrop-blur md:px-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="font-serif text-xl tracking-tight text-[#1a1917]">
                    Track<span className="text-violet-600">r</span>
                  </div>
                  <span className="hidden rounded-full border border-[#e0ded7] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#5c5a55] sm:inline-flex">
                    Home
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#e0ded7] bg-white py-1.5 pl-1.5 pr-3 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1917] text-[11px] font-medium text-white">
                    JD
                  </div>
                  <span className="hidden text-sm font-medium text-[#1a1917] sm:inline">John</span>
                  <svg className="h-3.5 w-3.5 text-[#9c9a94]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#fafaf8] px-3 py-4 sm:px-4 md:px-6 md:py-6">
              <div className="rounded-[28px] border border-[#e0ded7] bg-[#f7f4ef] p-3 shadow-[0_18px_40px_rgba(26,25,23,0.05)] md:p-4">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-sm">
                    <svg
                      className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9c9a94]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <div className="w-full rounded-lg border border-[#e0ded7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#9c9a94]">
                      Search by company, role, city...
                    </div>
                  </div>

                  <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a1917] px-5 py-3 text-sm font-medium text-white sm:w-auto">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Application
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-[#e0ded7] bg-white">
                  <div className="flex flex-col gap-3 border-b border-[#e0ded7] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <span className="text-sm font-medium text-[#1a1917]">
                      My applications
                    </span>
                    <span className="inline-flex w-fit rounded-full border border-[#e0ded7] bg-[#f3f2ee] px-2.5 py-1 font-mono text-xs text-[#9c9a94]">
                      24 total
                    </span>
                  </div>

                  <div className="grid gap-3 px-2 py-4 lg:hidden">
                    {dashboardPreviewRows.slice(0, 2).map((row) => (
                      <article
                        key={row.id}
                        className={`relative rounded-2xl border bg-white p-4 shadow-sm shadow-black/5 ${
                          row.selected
                            ? "border-violet-300 bg-violet-50/40"
                            : "border-[#e0ded7]"
                        }`}
                      >
                        <div className="absolute right-4 top-4">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            readOnly
                            aria-label={`Select ${row.company}`}
                            className="h-4 w-4 rounded border-[#ccc9bf] accent-violet-600"
                          />
                        </div>

                        <div className="flex items-start justify-between gap-8 pr-8">
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#9c9a94]">
                              Company
                            </div>
                            <div className="mt-1 text-base font-semibold text-[#1a1917]">
                              {row.company}
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${previewStatusStyles[row.status]}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {row.status === "INTERVIEW" ? "Interview" : row.status.charAt(0) + row.status.slice(1).toLowerCase()}
                          </span>
                        </div>

                        <div className="mt-4 rounded-xl bg-[#fafaf8] px-3 py-2">
                          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">
                            Role
                          </div>
                          <div className="mt-1 text-sm text-[#1a1917]">{row.position}</div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">Country</div>
                            <div className="mt-1 text-sm text-[#1a1917]">{row.country}</div>
                          </div>
                          <div className="rounded-xl border border-[#ece9e1] px-3 py-3">
                            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#9c9a94]">City</div>
                            <div className="mt-1 text-sm text-[#1a1917]">{row.city}</div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="hidden lg:block lg:overflow-x-auto">
                    <table className="w-full min-w-[980px]">
                      <thead>
                        <tr className="border-b border-[#e0ded7]">
                          <th className="w-10 pl-4" />
                          {["Company", "Role", "Country", "City", "Salary", "Status", "Link"].map((heading) => (
                            <th
                              key={heading}
                              className="px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-[#9c9a94]"
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardPreviewRows.map((row) => (
                          <tr
                            key={row.id}
                            className={`border-b border-[#f3f2ee] transition-colors ${
                              row.selected
                                ? "bg-violet-50/60"
                                : "hover:bg-[#fafaf8]"
                            }`}
                          >
                            <td className="w-10 py-4 pl-4 pr-0">
                              <input
                                type="checkbox"
                                checked={row.selected}
                                readOnly
                                aria-label={`Select ${row.company}`}
                                className="h-4 w-4 rounded border-[#ccc9bf] accent-violet-600"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-[#1a1917]">{row.company}</td>
                            <td className="px-4 py-4 text-sm text-[#1a1917]">{row.position}</td>
                            <td className="px-4 py-4 text-sm text-[#1a1917]">{row.country}</td>
                            <td className="px-4 py-4 text-sm text-[#1a1917]">{row.city}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-[#1a1917]">{row.salaryAmount}</span>
                                <span className="shrink-0 rounded-full border border-[#e0ded7] bg-[#f3f2ee] px-2 py-0.5 text-[10px] font-mono text-[#5c5a55]">
                                  {row.salaryCurrency}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${previewStatusStyles[row.status]}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {row.status === "INTERVIEW" ? "Interview" : row.status.charAt(0) + row.status.slice(1).toLowerCase()}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm font-medium text-[#1a1917] underline decoration-[#ccc9bf] underline-offset-4">
                                {row.linkLabel}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#e0ded7] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <span className="text-xs font-mono text-[#9c9a94]">Page 1 of 3</span>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-lg border border-[#e0ded7] px-3 py-1.5 text-xs font-mono text-[#9c9a94]">
                        ← Prev
                      </span>
                      {[1, 2, 3].map((page) => (
                        <span
                          key={page}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-mono ${
                            page === 1
                              ? "border-[#1a1917] bg-[#1a1917] text-white"
                              : "border-[#e0ded7] text-[#1a1917]"
                          }`}
                        >
                          {page}
                        </span>
                      ))}
                      <span className="rounded-lg border border-[#e0ded7] px-3 py-1.5 text-xs font-mono text-[#1a1917]">
                        Next →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-[#f3f2ee] border-y border-[#e0ded7] py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-[#9c9a94] uppercase tracking-widest mb-4">Features</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-14">
            Everything your<br />job search needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e0ded7] rounded-2xl overflow-hidden border border-[#e0ded7]">
            {[
              { icon: "📋", title: "Application tracking", desc: "Log every application with company, role, salary, and status. Never lose track of where you applied." },
              { icon: "✏️", title: "Inline editing", desc: "Click any cell to edit it instantly — like Notion. Updates save automatically without breaking your flow." },
              { icon: "🎯", title: "Status pipeline", desc: "Move applications through Applied, Interview, Offer, and Rejected stages with clear visual badges." },
              { icon: "💰", title: "Salary comparison", desc: "Track salary amounts in USD, EUR, or EGP across all your applications and compare offers at a glance." },
              { icon: "🌍", title: "Remote-first", desc: "Flag remote positions clearly. Prioritize roles that match your location preferences." },
              { icon: "🔒", title: "Secure & private", desc: "Your job search data belongs to you. Fully authenticated, user-scoped, and never shared." },
            ].map(f => (
              <div key={f.title} className="bg-white p-8 hover:bg-[#fafaf8] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#f3f2ee] border border-[#e0ded7] flex items-center justify-center text-lg mb-5">{f.icon}</div>
                <h3 className="text-sm font-medium mb-2">{f.title}</h3>
                <p className="text-sm text-[#5c5a55] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 grid grid-cols-3 gap-8 text-center">
        {[
          { n: "2 min", l: "Average setup time" },
          { n: "100%", l: "Free to get started" },
          { n: "∞", l: "Applications to track" },
        ].map(s => (
          <div key={s.l}>
            <div className="font-serif text-5xl tracking-tight text-[#1a1917]">{s.n}</div>
            <div className="text-sm text-[#9c9a94] mt-2 font-mono">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="bg-[#f3f2ee] border-t border-[#e0ded7] py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-[#9c9a94] uppercase tracking-widest mb-4">How it works</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-14">
            Up and running<br />in three steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Create your account", desc: "Sign up in under a minute. No credit card, no onboarding call, no friction." },
              { n: "02", title: "Log your first application", desc: 'Hit "Add Application", fill in the company and role. Everything else is optional.' },
              { n: "03", title: "Stay on top of it", desc: "Update statuses as you hear back. Click any cell to edit. Your pipeline stays current." },
            ].map(s => (
              <div key={s.n} className="pl-5 border-l-2 border-[#e0ded7]">
                <div className="font-mono text-xs text-[#9c9a94] mb-3">{s.n}</div>
                <h3 className="text-sm font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-[#5c5a55] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <div className="bg-[#1a1917] rounded-2xl px-12 py-16 text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Start tracking your<br />job search today
          </h2>
          <p className="text-base text-white/60 font-light mb-10">
            Join the beta. Free forever for early users.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#1a1917] px-8 py-3.5 rounded-xl text-sm font-medium hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5 transition-all"
          >
            Create free account →
          </Link>
        </div>
      </div>

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
