import { BarChart3, Cookie, LockKeyhole, Settings2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const sections = [
  { icon: LockKeyhole, title: 'Essential cookies', body: 'Required for login state, security checks, saved sessions, and basic page behavior. These keep the site usable.' },
  { icon: Settings2, title: 'Preference cookies', body: 'Remember interface choices such as saved filters, listing workflow preferences, and repeated browsing context.' },
  { icon: BarChart3, title: 'Analytics cookies', body: 'Help us understand page performance, search paths, and directory sections that need improvement.' },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="border-b border-white/10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Cookie Policy</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
            Cookies that support directory browsing and account workflows.
          </h1>
          <p className="mt-5 text-sm text-[#a89ba5]">Last updated: March 16, 2026</p>
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="border border-white/10 bg-[#231f24] p-6">
              <section.icon className="h-6 w-6 text-[#c77ba3]" />
              <h2 className="mt-4 text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="border border-white/10 bg-white/5 p-6">
          <div className="flex gap-3">
            <Cookie className="h-6 w-6 shrink-0 text-[#c77ba3]" />
            <p className="text-sm leading-7 text-[#c9b0bc]">
              Browser settings can block or clear cookies. Some account and saved-state features may stop working if essential cookies are disabled.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
