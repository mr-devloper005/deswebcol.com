import Link from 'next/link'
import { ArrowRight, Building2, CircleHelp, FileCheck2, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const topics = [
  { icon: Building2, title: 'Create a listing', body: 'Prepare business name, category, service area, contact email, phone, website, and a short operating summary.' },
  { icon: ShieldCheck, title: 'Verify details', body: 'Use the same contact and ownership signals customers already see publicly: website, email domain, address, and support phone.' },
  { icon: SlidersHorizontal, title: 'Improve search fit', body: 'Choose a precise category, avoid keyword stuffing, and keep location data consistent across your record.' },
  { icon: FileCheck2, title: 'Request corrections', body: 'Send the listing URL and exact field change so the directory can be updated without ambiguity.' },
]

const faqs = [
  { q: 'How do I claim a business listing?', a: 'Use the contact page with the listing URL, business email, and a short ownership note. The team will review the record and route next steps.' },
  { q: 'What makes a listing useful?', a: 'Clear category, accurate location, direct contact details, service scope, and a plain-language description are the highest value fields.' },
  { q: 'Can I update contact information later?', a: 'Yes. Submit the exact field changes and include any public evidence that helps confirm the update.' },
  { q: 'Why was a listing grouped under a category?', a: 'Categories are chosen for search usefulness. If the current category is misleading, request a correction with the better fit.' },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Help Center</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
              Practical help for cleaner business listings.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#c9b0bc]">
              Find the shortest path to creating, correcting, claiming, and improving records in the directory.
            </p>
          </div>
          <div className="border border-white/10 bg-[#231f24] p-5">
            <Search className="h-6 w-6 text-[#c77ba3]" />
            <h2 className="mt-4 text-xl font-semibold text-white">Need direct support?</h2>
            <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">Include the listing URL, field name, and desired correction.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c77ba3] hover:text-white">
              Contact support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-2">
          {topics.map((topic) => (
            <article key={topic.title} className="border border-white/10 bg-white/5 p-6">
              <topic.icon className="h-6 w-6 text-[#c77ba3]" />
              <h2 className="mt-4 text-xl font-semibold text-white">{topic.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{topic.body}</p>
            </article>
          ))}
        </section>

        <section className="border-t border-white/10 pt-10">
          <div className="flex items-center gap-3">
            <CircleHelp className="h-6 w-6 text-[#c77ba3]" />
            <h2 className="text-2xl font-semibold text-white">Common questions</h2>
          </div>
          <div className="mt-6 grid gap-3">
            {faqs.map((faq) => (
              <article key={faq.q} className="border border-white/10 bg-[#231f24] p-5">
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
