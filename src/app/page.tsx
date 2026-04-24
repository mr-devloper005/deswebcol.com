import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Clock, FileText, Image as ImageIcon, LayoutGrid, MapPin, Phone, Search, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone() {
  return {
    shell: 'bg-[#f0e8ec] text-[#1a1a1d]',
    hero: 'relative overflow-hidden bg-[#1a1a1d] text-[#f4eef1]',
    panel: 'border border-[#3b1c32]/25 bg-white shadow-[0_24px_64px_rgba(26,26,29,0.1)]',
    soft: 'border border-[#6a1e55]/20 bg-[#faf5f7]',
    muted: 'text-[#5c4552]',
    mutedOnDark: 'text-[#c9b0bc]',
    title: 'text-[#1a1a1d]',
    titleOnDark: 'text-[#faf5f7]',
    badge: 'bg-[#6a1e55] text-[#faf5f7]',
    badgeOnDark: 'border border-white/10 bg-white/5 text-[#e8d5de]',
    action: 'bg-[#a64d79] text-white hover:bg-[#8a3d65]',
    actionOnDark: 'bg-[#a64d79] text-white hover:brightness-110',
    actionAlt: 'border border-white/20 bg-transparent text-white hover:bg-white/10',
    line: 'from-[#6a1e55] to-[#a64d79]',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
}) {
  const tone = getDirectoryTone()
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)
  const indexRows = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 4)
  const secondaryLabel = siteContent.home.introBadge
  return (
    <main>
      <section className={tone.hero} aria-label="Directory hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(166,77,121,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(166,77,121,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className={`registry-live-rail inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] ${tone.badgeOnDark}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#a64d79]" aria-hidden />
                {siteContent.hero.badge}
              </div>
              <h1 className={`mt-6 max-w-[22ch] text-4xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-5xl lg:text-6xl ${tone.titleOnDark}`}>
                <span className="registry-hero-line block">{siteContent.hero.title[0]}</span>
                <span className="registry-hero-line block text-[#c77ba3]">{siteContent.hero.title[1]}</span>
              </h1>
              <p className={`registry-hero-line mt-6 max-w-2xl text-sm leading-7 sm:text-base ${tone.mutedOnDark}`}>
                {siteContent.hero.description}
              </p>
              <div className="registry-hero-line mt-10 flex flex-wrap gap-3">
                <Link
                  href={primaryTask?.route || '/listings'}
                  className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition ${tone.actionOnDark}`}
                >
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/search"
                  className={`inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}
                >
                  <Search className="h-4 w-4" />
                  Search the index
                </Link>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { k: 'Fields first', v: 'Category · area · contact before imagery' },
                  { k: 'Classifieds lane', v: 'Faster path for time-bound offers' },
                  { k: 'Index rhythm', v: 'Built to skim like a register, not a feed' },
                ].map((row) => (
                  <div key={row.k} className="rounded-md border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89ba5]">{row.k}</p>
                    <p className="mt-2 text-sm font-medium text-[#f4eef1]">{row.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-md border border-white/10 bg-[#231f24] p-6 text-[#e8d5de] shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a89ba5]">Index snapshot</p>
                <div className="mt-4 space-y-3 font-mono text-xs leading-relaxed text-[#d8c3cd]">
                  {indexRows.length
                    ? indexRows.map((post) => {
                        const meta = getPostMeta(post)
                        return (
                          <div
                            key={post.id}
                            className="flex items-start justify-between gap-2 border-b border-white/5 pb-3 last:border-0"
                          >
                            <span className="min-w-0 truncate text-[#faf5f7]">{post.title}</span>
                            <span className="shrink-0 text-[#a64d79]">
                              {meta.location || '—'}
                            </span>
                          </div>
                        )
                      })
                    : ['No live rows yet', 'Listings will stream here', 'Connector or mock data loads this block'].map((l) => (
                        <p key={l} className="text-[#7a6e76]">
                          {l}
                        </p>
                      ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#6a1e55]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> live rail
                  </span>
                  <span>deswebcol registry</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link
                      key={task.key}
                      href={task.route}
                      className="group rounded-md border border-white/8 bg-white/4 p-4 text-[#f4eef1] transition hover:border-[#a64d79]/50 hover:bg-white/8"
                    >
                      <Icon className="h-4 w-4 text-[#c77ba3]" />
                      <h3 className="mt-3 text-base font-normal uppercase tracking-wide">{task.label}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#a89ba5]">{task.description}</p>
                      <span className="mt-3 inline-flex text-[11px] font-semibold text-[#a64d79] group-hover:underline">
                        Open
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={`h-1 w-full bg-linear-to-r ${tone.line} opacity-90`} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Directory feed</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-normal uppercase leading-tight tracking-[0.03em] text-foreground">
              Featured dossiers
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {siteContent.home.introTitle}
            </p>
          </div>
          <Link
            href="/listings"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            {siteContent.home.primaryLink.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={tone.shell}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className={`rounded-md p-8 sm:p-10 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{secondaryLabel}</p>
            <h2 className="mt-4 text-2xl font-normal uppercase tracking-[0.04em] text-foreground">
              {siteContent.home.introTitle}
            </h2>
            {siteContent.home.introParagraphs.slice(0, 2).map((p) => (
              <p key={p.slice(0, 24)} className={`mt-4 text-sm leading-7 ${tone.muted}`}>
                {p}
              </p>
            ))}
            <ul className={`mt-6 space-y-2 text-sm ${tone.muted}`}>
              {siteContent.home.sidePoints.slice(0, 3).map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link
                  key={post.id}
                  href={getTaskHref(taskKey, post.slug)}
                  className={`block rounded-md p-5 transition ${tone.panel} hover:ring-1 hover:ring-primary/25`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">{meta.category || 'Record'}</p>
                      <h3 className="mt-1 text-lg font-medium text-foreground">{post.title}</h3>
                    </div>
                    <div className="shrink-0 text-right text-xs text-muted-foreground sm:text-left">
                      {meta.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {meta.location}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          Contact on file
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`mt-3 line-clamp-2 text-sm ${tone.muted}`}>
                    {post.summary || 'Structured business metadata for this entry.'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
