import { Database, Eye, LockKeyhole, Mail, ShieldCheck, UserCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  { icon: Database, title: 'Information we collect', body: 'Account details, submitted listing content, contact fields, support messages, and basic usage signals that help us operate the directory.' },
  { icon: Eye, title: 'How information is used', body: 'We use data to display business records, improve search quality, verify listing updates, prevent abuse, and respond to support requests.' },
  { icon: UserCheck, title: 'Your choices', body: 'You can ask to correct public listing data, update account details, change communication preferences, or request account deletion.' },
  { icon: LockKeyhole, title: 'Protection and retention', body: 'We keep operational data only as long as needed for directory quality, compliance, dispute handling, and security monitoring.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="border-b border-white/10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Privacy Policy</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
            Clear rules for business data and account information.
          </h1>
          <p className="mt-5 text-sm text-[#a89ba5]">Last updated: March 16, 2026</p>
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

        <section className="border border-white/10 bg-white/5 p-6">
          <div className="flex gap-3">
            <Mail className="h-6 w-6 shrink-0 text-[#c77ba3]" />
            <div>
              <h2 className="text-xl font-semibold text-white">Privacy requests</h2>
              <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">
                For access, correction, deletion, or listing privacy questions, contact {SITE_CONFIG.name} with the account email or listing URL involved.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
