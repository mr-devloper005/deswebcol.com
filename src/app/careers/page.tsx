import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Database, MapPinned, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Directory Operations Lead', location: 'Remote', type: 'Full-time', focus: 'Listing quality, category hygiene, and verification queues.' },
  { title: 'Frontend Product Engineer', location: 'Hybrid / Remote', type: 'Full-time', focus: 'Fast listing workflows, search surfaces, and owner dashboards.' },
  { title: 'Local Data Researcher', location: 'Flexible', type: 'Contract', focus: 'Coverage mapping, business record cleanup, and regional expansion.' },
]

const traits = [
  'Comfortable turning messy business information into structured records',
  'Careful with details that affect trust, contactability, and local search',
  'Interested in calm, durable software for repeated operational work',
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main>
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Careers</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
                  Help build the operating layer for business listings.
                </h1>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-[#c9b0bc]">
                  {SITE_CONFIG.name} needs people who like clean systems, practical data, and interfaces that make repeated work feel lighter.
                </p>
              </div>
              <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-md bg-[#a64d79] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8a3d65]">
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-4">
            {roles.map((role) => (
              <article key={role.title} className="border border-white/10 bg-[#231f24] p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-[#c77ba3]">
                  <span className="border border-white/10 px-2 py-1">{role.type}</span>
                  <span className="border border-white/10 px-2 py-1">{role.location}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">{role.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{role.focus}</p>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c77ba3] hover:text-white">
                  Discuss role
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="border border-white/10 bg-white/5 p-6">
              <BriefcaseBusiness className="h-7 w-7 text-[#c77ba3]" />
              <h2 className="mt-4 text-2xl font-semibold text-white">How we work</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">
                Small teams, direct ownership, quiet tools, and a bias toward accuracy over noise.
              </p>
            </div>
            {[Database, Search, MapPinned].map((Icon, index) => (
              <div key={index} className="flex gap-3 border border-white/10 bg-[#231f24] p-4 text-sm text-[#d8c3cd]">
                <Icon className="h-5 w-5 shrink-0 text-[#c77ba3]" />
                <span>{traits[index]}</span>
              </div>
            ))}
            <div className="border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Good fit signals</p>
              <div className="mt-4 space-y-3 text-sm text-[#c9b0bc]">
                {['You care about metadata quality.', 'You can simplify dense workflows.', 'You like tools that operators use every day.'].map((item) => (
                  <div key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a64d79]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
