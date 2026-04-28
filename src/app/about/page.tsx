import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Database, MapPin, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const measures = [
  { label: 'Structured records', value: '8.6k+' },
  { label: 'Service categories', value: '120+' },
  { label: 'Buyer signals', value: '24/7' },
]

const principles = [
  { icon: Database, title: 'Data before decoration', body: 'Listings prioritize category, service area, contact paths, and useful business facts before visual polish.' },
  { icon: ShieldCheck, title: 'Trust is visible', body: 'Verified markers, clear metadata, and owner-friendly workflows help visitors judge a listing quickly.' },
  { icon: MapPin, title: 'Local context matters', body: 'The directory is built for practical discovery: city, coverage area, address, and reachability stay close to the surface.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main>
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">About {SITE_CONFIG.name}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
                A business directory built for serious comparison.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#c9b0bc]">
                {SITE_CONFIG.name} keeps business discovery focused on the details people actually need: what a company does, where it operates, and how to reach the right contact.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/listings" className="inline-flex items-center gap-2 rounded-md bg-[#a64d79] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8a3d65]">
                  Browse listings
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-[#231f24] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-3">
                <Building2 className="h-7 w-7 text-[#c77ba3]" />
                <div>
                  <p className="text-sm font-semibold text-white">Directory operating model</p>
                  <p className="text-xs text-[#a89ba5]">Structured, searchable, and built around business records.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {measures.map((item) => (
                  <div key={item.label} className="border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-[#a89ba5]">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm text-[#d8c3cd]">
                {['No noisy publishing lanes in the main experience', 'Listing cards tuned for fast vendor review', 'Search and category paths designed for repeat use'].map((item) => (
                  <div key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a64d79]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="border border-white/10 bg-white/5 p-6">
                <item.icon className="h-6 w-6 text-[#c77ba3]" />
                <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
