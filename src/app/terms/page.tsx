import { AlertTriangle, ClipboardCheck, FileText, Scale, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  { icon: ClipboardCheck, title: 'Account responsibilities', body: 'Keep login details secure, submit accurate information, and maintain authority to edit or claim business records.' },
  { icon: FileText, title: 'Listing content', body: 'You remain responsible for business descriptions, contact details, media, claims, and any changes submitted through the platform.' },
  { icon: ShieldCheck, title: 'Acceptable use', body: 'Do not post misleading records, spam, harmful content, scraping activity, impersonation, or unlawful material.' },
  { icon: Scale, title: 'Platform rights', body: `${SITE_CONFIG.name} may review, edit, hide, or remove records when needed for directory quality, safety, compliance, or abuse prevention.` },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Terms of Service</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
              Terms for using and maintaining directory records.
            </h1>
            <p className="mt-5 text-sm text-[#a89ba5]">Last updated: March 16, 2026</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <AlertTriangle className="h-6 w-6 text-[#c77ba3]" />
            <p className="mt-4 text-sm leading-7 text-[#c9b0bc]">
              These terms are written for a practical business-listing product: accuracy, ownership, and responsible use matter most.
            </p>
          </div>
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="border border-white/10 bg-[#231f24] p-6">
              <section.icon className="h-6 w-6 text-[#c77ba3]" />
              <h2 className="mt-4 text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{section.body}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
