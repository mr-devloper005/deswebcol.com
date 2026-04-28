import { Building2, Mail, MapPin, MessageSquare, Phone, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  { icon: Building2, title: 'Listing support', body: 'Request updates to business details, categories, ownership notes, or display information.' },
  { icon: ShieldCheck, title: 'Verification help', body: 'Ask about claim status, evidence, duplicate records, or corrections to trusted listing data.' },
  { icon: MapPin, title: 'Coverage requests', body: 'Tell us about missing local areas, service categories, or business clusters we should index next.' },
]

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@deswebcol.com'

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-5 text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
              Reach the right desk for business listing work.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-8 text-[#c9b0bc]">
              Send listing corrections, claim requests, coverage ideas, or partnership questions. We route messages by operational need instead of treating every request like a generic support ticket.
            </p>
            <div className="mt-8 grid gap-3">
              <div className="flex gap-3 border border-white/10 bg-white/5 p-4 text-sm text-[#d8c3cd]">
                <Mail className="h-5 w-5 text-[#c77ba3]" />
                {contactEmail}
              </div>
              <div className="flex gap-3 border border-white/10 bg-white/5 p-4 text-sm text-[#d8c3cd]">
                <Phone className="h-5 w-5 text-[#c77ba3]" />
                Response window: 1-2 business days
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {lanes.map((lane) => (
              <article key={lane.title} className="border border-white/10 bg-[#231f24] p-6">
                <lane.icon className="h-6 w-6 text-[#c77ba3]" />
                <h2 className="mt-4 text-xl font-semibold text-white">{lane.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{lane.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1fr]">
          <div className="border border-white/10 bg-white/5 p-6">
            <MessageSquare className="h-6 w-6 text-[#c77ba3]" />
            <h2 className="mt-4 text-2xl font-semibold text-white">Send a message</h2>
            <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">
              Include the listing name, URL, category, and the exact detail that needs attention.
            </p>
          </div>
          <form className="grid gap-4">
            <input className="h-12 border border-white/10 bg-[#231f24] px-4 text-sm text-white placeholder:text-[#a89ba5]" placeholder="Your name" />
            <input className="h-12 border border-white/10 bg-[#231f24] px-4 text-sm text-white placeholder:text-[#a89ba5]" placeholder="Email address" />
            <input className="h-12 border border-white/10 bg-[#231f24] px-4 text-sm text-white placeholder:text-[#a89ba5]" placeholder="Listing or request type" />
            <textarea className="min-h-36 border border-white/10 bg-[#231f24] px-4 py-3 text-sm text-white placeholder:text-[#a89ba5]" placeholder="Share the full context." />
            <button type="submit" className="inline-flex h-12 items-center justify-center rounded-md bg-[#a64d79] px-6 text-sm font-semibold text-white hover:bg-[#8a3d65]">
              Send message
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
