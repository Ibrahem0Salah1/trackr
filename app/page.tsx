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

      {/* ── DASHBOARD PREVIEW ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <div className="rounded-2xl border border-[#e0ded7] overflow-hidden shadow-2xl shadow-black/8">
          <div className="bg-[#f3f2ee] border-b border-[#e0ded7] px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-48 bg-white border border-[#e0ded7] rounded-md px-3 py-1 text-xs text-[#9c9a94] font-mono">
              trackr.app/dashboard
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-medium">My applications</span>
              <span className="text-xs text-[#9c9a94] bg-[#f3f2ee] border border-[#e0ded7] px-3 py-1 rounded-full font-mono">4 total</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0ded7]">
                  {["Company / Role", "Location", "Salary", "Status"].map(h => (
                    <th key={h} className="pb-2.5 text-left text-xs font-medium text-[#9c9a94] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { co: "Stripe", role: "Senior Frontend Engineer", loc: "San Francisco", sal: "$180,000", status: "Interview", cls: "bg-amber-50 text-amber-700 border-amber-200" },
                  { co: "Figma", role: "Product Designer", loc: "New York", sal: "$140,000", status: "Applied", cls: "bg-blue-50 text-blue-700 border-blue-200" },
                  { co: "Vercel", role: "DX Engineer", loc: "Remote", sal: "—", status: "Offer", cls: "bg-green-50 text-green-700 border-green-200" },
                  { co: "Meta", role: "React Native Engineer", loc: "Menlo Park", sal: "$200,000", status: "Rejected", cls: "bg-red-50 text-red-700 border-red-200" },
                ].map(row => (
                  <tr key={row.co} className="border-b border-[#f3f2ee] hover:bg-[#fafaf8] transition-colors">
                    <td className="py-3.5">
                      <div className="font-medium text-[#1a1917] text-sm">{row.co}</div>
                      <div className="text-xs text-[#9c9a94] mt-0.5">{row.role}</div>
                    </td>
                    <td className="py-3.5 text-sm text-[#5c5a55]">{row.loc}</td>
                    <td className="py-3.5 text-sm font-mono text-[#1a1917]">{row.sal}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${row.cls}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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