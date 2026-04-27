import { Code2, PackageCheck, Scale, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const licenses = [
  { name: 'Next.js', license: 'MIT License', use: 'Application framework, routing, rendering, and production build pipeline.' },
  { name: 'React', license: 'MIT License', use: 'Component model for the interactive user interface.' },
  { name: 'Tailwind CSS', license: 'MIT License', use: 'Utility classes for layout, spacing, color, and responsive styling.' },
  { name: 'Lucide React', license: 'ISC License', use: 'Interface icons used across buttons, navigation, and page sections.' },
]

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1d] text-[#f4eef1]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c77ba3]">Licenses</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-normal uppercase leading-tight tracking-wide sm:text-5xl">
              Open-source acknowledgements for the directory interface.
            </h1>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <PackageCheck className="h-7 w-7 text-[#c77ba3]" />
            <p className="mt-4 text-sm leading-7 text-[#c9b0bc]">
              These tools help power the public listing experience, page rendering, icons, and layout system.
            </p>
          </div>
        </section>

        <section className="grid gap-4 py-10 md:grid-cols-2">
          {licenses.map((item) => (
            <article key={item.name} className="border border-white/10 bg-[#231f24] p-6">
              <Code2 className="h-6 w-6 text-[#c77ba3]" />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <span className="border border-white/10 px-2 py-1 text-xs font-semibold text-[#c77ba3]">{item.license}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#c9b0bc]">{item.use}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-white/10 bg-white/5 p-5">
            <Scale className="h-6 w-6 text-[#c77ba3]" />
            <h2 className="mt-4 text-lg font-semibold text-white">License respect</h2>
            <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">We retain notices and use dependencies according to their published licenses.</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-5">
            <ShieldCheck className="h-6 w-6 text-[#c77ba3]" />
            <h2 className="mt-4 text-lg font-semibold text-white">Operational review</h2>
            <p className="mt-2 text-sm leading-7 text-[#c9b0bc]">Core dependencies are kept visible so the product stack remains understandable.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
