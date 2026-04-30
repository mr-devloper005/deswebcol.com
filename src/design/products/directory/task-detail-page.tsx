"use client"

import Link from 'next/link'
import { useState } from 'react'
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  Link as LinkIcon,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Share2,
  ShieldCheck,
  Tag,
  UserRound,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { ImageModal } from '@/components/shared/image-modal'
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
  const [modalImage, setModalImage] = useState<string | null>(null)
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const logo = typeof content.logo === 'string' ? content.logo : images[0]
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const tags = Array.isArray(post.tags) ? post.tags.filter((tag): tag is string => typeof tag === 'string') : []
  const addressParts = location.split(',').map((item) => item.trim()).filter(Boolean)
  const detailUrl = `${taskRoute}/${post.slug}`
  const directionsUrl = location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    : ''
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: detailUrl,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-white text-[#24314f]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#596277] hover:text-[#0b62d6]"
        >
          Back to {taskLabel}
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-normal leading-tight text-[#24314f] sm:text-4xl">
            {post.title}
          </h1>
          {location ? (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#38425c]">{location}</p>
          ) : null}
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div>
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-white p-8 sm:min-h-[440px]">
              <button
                onClick={() => setModalImage(logo || '/placeholder.svg?height=900&width=1400')}
                className="cursor-pointer"
                aria-label="Open image in modal"
              >
                <ContentImage
                  src={logo || '/placeholder.svg?height=900&width=1400'}
                  alt={`${post.title} logo`}
                  fill
                  className="object-contain"
                  intrinsicWidth={1200}
                  intrinsicHeight={900}
                />
              </button>
            </div>

            <section className="mt-10 max-w-3xl">
              <h2 className="text-xl font-medium text-[#005ee8]">{post.title}</h2>
              <RichContent html={descriptionHtml} className="mt-6 text-sm leading-7 text-[#38425c]" />
            </section>

            <section className="mt-8 flex items-center gap-4 bg-[#f7f7f9] px-5 py-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e4e7ee] bg-white">
                <ContentImage
                  src={logo || '/placeholder.svg?height=80&width=80'}
                  alt={`${post.title} author`}
                  fill
                  className="object-contain p-1"
                  intrinsicWidth={80}
                  intrinsicHeight={80}
                />
              </div>
              <div className="min-w-0 text-sm">
                <span className="text-[#38425c]">Author: </span>
                <span className="font-medium text-[#005ee8]">{post.authorName || post.title}</span>
              </div>
            </section>

            {images.length > 1 ? (
              <section className="mt-10">
                <h2 className="text-sm font-semibold text-[#24314f]">Gallery</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {images.slice(1, 5).map((image) => (
                    <button
                      key={image}
                      onClick={() => setModalImage(image)}
                      className="relative aspect-[4/3] overflow-hidden border border-[#e4e7ee] bg-white cursor-pointer hover:opacity-80 transition"
                      aria-label="Open image in modal"
                    >
                      <ContentImage src={image} alt={`${post.title} gallery`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {highlights.length ? (
              <section className="mt-8 max-w-3xl border border-[#e4e7ee] bg-white p-5">
                <h2 className="text-sm font-semibold text-[#24314f]">Highlights</h2>
                <ul className="mt-4 grid gap-2 text-sm text-[#38425c] sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#18a34a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4 lg:pt-10">
            <div>
              <p className="mb-3 text-sm text-[#596277]">Share this:</p>
              <div className="flex gap-2">
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(detailUrl)}`}
                  className="inline-flex h-8 w-9 items-center justify-center rounded bg-[#3159a6] text-white hover:brightness-110"
                  aria-label="Share by email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(detailUrl)}`}
                  className="inline-flex h-8 w-9 items-center justify-center rounded bg-[#1d9bf0] text-white hover:brightness-110"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                >
                  <Share2 className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${detailUrl}`)}`}
                  className="inline-flex h-8 w-9 items-center justify-center rounded bg-[#1fae5b] text-white hover:brightness-110"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <LinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <section className="overflow-hidden rounded-md border border-[#dfe3eb] bg-white text-sm">
              <div className="flex gap-2 border-b border-[#e9ecf2] px-4 py-3">
                <Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                <div>
                  <span className="text-[#24314f]">Category: </span>
                  <Link href={`/search?category=${encodeURIComponent(category)}`} className="text-[#005ee8] hover:underline">
                    {category || taskLabel}
                  </Link>
                </div>
              </div>

              {tags.length ? (
                <div className="flex gap-2 border-b border-[#e9ecf2] px-4 py-3">
                  <Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                  <div>
                    <span className="text-[#24314f]">Tags: </span>
                    <span className="text-[#005ee8]">{tags.join(' ')}</span>
                  </div>
                </div>
              ) : null}

              {location ? (
                <div className="flex gap-2 border-b border-[#e9ecf2] px-4 py-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                  <div className="min-w-0">
                    <span className="text-[#24314f]">Address: </span>
                    <div className="mt-1 leading-5 text-[#24314f] break-words">
                      {addressParts.length ? addressParts.map((part) => <div key={part}>{part}</div>) : location}
                    </div>
                  </div>
                </div>
              ) : null}

              {phone ? (
                <div className="flex gap-2 border-b border-[#e9ecf2] px-4 py-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                  <div>
                    <span className="text-[#24314f]">Phone: </span>
                    <a href={`tel:${phone}`} className="text-[#005ee8] hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>
              ) : null}

              {email ? (
                <div className="flex gap-2 border-b border-[#e9ecf2] px-4 py-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                  <div>
                    <span className="text-[#24314f]">Email: </span>
                    <a href={`mailto:${email}`} className="break-all text-[#005ee8] hover:underline">
                      {email}
                    </a>
                  </div>
                </div>
              ) : null}

              {website ? (
                <div className="flex gap-2 px-4 py-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#24314f]" />
                  <a href={website} className="inline-flex items-center gap-1 text-[#005ee8] hover:underline" target="_blank" rel="noreferrer">
                    Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : null}
            </section>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded border border-[#27c658] px-4 py-2 text-xs font-semibold text-[#0f7331]">
                <ShieldCheck className="h-4 w-4" />
                Verified Listing
              </span>
            </div>

            {directionsUrl ? (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#0073ae] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#005f91]"
              >
                <Navigation className="h-3.5 w-3.5" />
                Get Directions
              </a>
            ) : null}

            <div className="h-4 w-full bg-[repeating-linear-gradient(135deg,#9aa1ae_0,#9aa1ae_1px,transparent_1px,transparent_8px)] opacity-80" />

            {mapEmbedUrl ? (
              <div className="overflow-hidden border border-[#dfe3eb] bg-white">
                <iframe
                  title={`${post.title} map`}
                  src={mapEmbedUrl}
                  className="h-56 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <section className="border border-[#e4e7ee] bg-[#f7f9fc] p-4">
              <div className="flex gap-3">
                <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-[#005ee8]" />
                <div>
                  <p className="text-sm font-semibold text-[#24314f]">Business record</p>
                  <p className="mt-1 text-xs leading-5 text-[#596277]">
                    Contact details, category, and location are arranged for quick vendor comparison.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {related.length ? (
          <section className="mt-14 border-t border-[#e4e7ee] pt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[#596277]">Same index</p>
                <h2 className="mt-1 text-2xl font-normal text-[#24314f]">Nearby matches</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#005ee8]">
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
      <ImageModal
        isOpen={modalImage !== null}
        imageUrl={modalImage}
        alt={post.title}
        onClose={() => setModalImage(null)}
      />
    </div>
  )
}
