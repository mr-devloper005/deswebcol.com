import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          ← Back to {taskLabel}
        </Link>

        <header className="mb-10 grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{category || taskLabel}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-normal uppercase leading-tight tracking-[0.03em] text-foreground md:text-5xl">
                {post.title}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Index record
              </span>
            </div>
          </div>
          <div className="relative h-28 w-full overflow-hidden rounded-md border border-border bg-muted/40 sm:h-32 lg:w-44">
            <ContentImage src={images[0]} alt={`${post.title} reference image`} fill className="object-cover" />
            <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              Reference
            </span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact & operations</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {location ? (
                  <div className="flex gap-3 rounded-md bg-muted/50 px-3 py-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Address / area</dt>
                      <dd className="text-foreground">{location}</dd>
                    </div>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex gap-3 rounded-md bg-muted/50 px-3 py-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</dt>
                      <dd className="font-mono text-foreground">{phone}</dd>
                    </div>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex gap-3 rounded-md bg-muted/50 px-3 py-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</dt>
                      <dd className="break-all text-foreground">{email}</dd>
                    </div>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex gap-3 rounded-md bg-muted/50 px-3 py-2.5">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Website</dt>
                      <dd>
                        <a href={website} className="text-primary underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
                          {website}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110"
                  >
                    Visit website
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Return to {taskLabel}
                </Link>
              </div>
            </section>

            {images.length > 1 ? (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Additional media</h2>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {images.slice(1, 5).map((image) => (
                    <div
                      key={image}
                      className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/40"
                    >
                      <ContentImage src={image} alt={`${post.title} gallery`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-md border border-border bg-card p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Narrative</h2>
              <p className="mt-3 text-sm leading-7 text-foreground/90">{description}</p>
              {highlights.length ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-primary/40 bg-muted/40 px-3 py-2 text-sm text-foreground/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </div>

          <div className="space-y-6">
            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Map</p>
                </div>
                <iframe
                  title={`${post.title} map`}
                  src={mapEmbedUrl}
                  className="h-[280px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
            <div className="rounded-md border border-dashed border-primary/30 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Index notes</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This layout keeps operational facts above the fold. Media supports the record; it does not replace category,
                area, or contact verification.
              </p>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-16 border-t border-border pt-10">
            <div className="flex items-end justify-between gap-4 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Same index</p>
                <h2 className="mt-2 text-2xl font-normal uppercase tracking-[0.03em]">Nearby matches</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                <Tag className="h-3.5 w-3.5" />
                {taskLabel}
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
