import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Business data, not stock-photo theatre',
  },
  footer: {
    tagline: 'Structured business directory',
    exploreMoreTitle: 'More',
    exploreMore: [
      { label: 'Business Listings', href: '/listings' },
      { label: 'Search Directory', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ] as const,
  },
  hero: {
    badge: 'Live business index',
    title: ['A registry for', 'companies you can actually evaluate.'],
    description:
      'Deswebcol prioritises contact details, categories, and service facts over decorative imagery so teams and buyers can compare businesses quickly.',
    primaryCta: {
      label: 'Open business listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Search listings',
      href: '/search',
    },
    searchPlaceholder: 'Search companies, services, and categories',
    focusLabel: 'Index',
    featureCardBadge: 'Data-led cards',
    featureCardTitle: 'The listing card is built around what matters on paper.',
    featureCardDescription:
      'Category, location, and contact lines lead; photography supports—mirroring how serious buyers skim a directory.',
  },
  home: {
    metadata: {
      title: 'Deswebcol — business listings built for serious comparison',
      description:
        'Search verified business listings with a layout that foregrounds company facts, service scope, and contact channels.',
      openGraphTitle: 'Deswebcol — data-first business listings',
      openGraphDescription:
        'Compare companies with a directory interface designed around categories, operating areas, and clear contact metadata.',
      keywords: [
        'business directory',
        'company listings',
        'B2B discovery',
        'local services',
        'business listings',
        'Deswebcol',
      ],
    },
    introBadge: 'Why this directory exists',
    introTitle: 'We treat a listing like a business record, not a lifestyle advert.',
    introParagraphs: [
      'Deswebcol is tuned for operators, procurement teams, and owners who need accurate labels—what a business does, where it operates, and how to reach a human—without wading through visual noise.',
      'The primary experience is the business listing: structured fields, transparent categories, and a scan rhythm that mirrors a spreadsheet more than a magazine cover.',
      'The experience stays focused on business listings so teams can compare options quickly with less distraction.',
    ],
    sideBadge: 'Index principles',
    sidePoints: [
      'Contact and category data lead every surface; imagery is secondary.',
      'Listings are the only primary content surface in main navigation.',
      'Motion and colour reinforce hierarchy, not decoration.',
      'The interface stays fast: CSS-first animation, no heavy client scripts for visuals.',
    ],
    primaryLink: {
      label: 'View all listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Search listings',
      href: '/search',
    },
  },
  cta: {
    badge: 'List or respond',
    title: 'Claim a slot in the business listings index.',
    description:
      'Registration keeps owner workflows intact while the public site stays focused on discoverable business facts.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Newest entries in this index section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and field notes',
    description: 'Long-form analysis, operator interviews, and guidance that complement the business index.',
  },
  listing: {
    title: 'Business listings',
    description: 'Searchable company pages with category, service area, and direct contact details.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Short-form offers, roles, and local notices with a faster response path than the main index.',
  },
  image: {
    title: 'Visual references',
    description: 'Image-led posts when a story truly needs a visual anchor beyond the data-first cards.',
  },
  profile: {
    title: 'Public profiles',
    description: 'Identity pages for teams, studios, and operators referenced across the site.',
  },
  sbm: {
    title: 'Research shelf',
    description: 'Hand-picked links and resources saved in a text-forward layout.',
  },
  pdf: {
    title: 'Documents and PDFs',
    description: 'Downloadable briefs, one-pagers, and reference packs.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings: the core Deswebcol index',
    paragraphs: [
      'Each record is organised so you can read it like a company dossier: legal name, category, geography, and contact points appear before marketing copy.',
      'Thumbnails and galleries are present when supplied, but they never crowd out the operational facts procurement teams need on first glance.',
      'Filter by category when you are comparing vendors and move quickly through records with clean, consistent fields.',
    ],
    links: [
      { label: 'Search listings', href: '/search' },
      { label: 'Create account', href: '/register' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  article: {
    title: 'Articles, interviews, and reference essays',
    paragraphs: [
      'Editorial content on Deswebcol is intentionally separate from the index: it exists to add depth when a buyer or partner needs more than a listing card.',
      'Typography and spacing here favour reading comfort, not the dense data blocks used in the directory section.',
      'You can always return to the listings index to verify facts against the article narrative.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'See image posts', href: '/images' },
      { label: 'Download PDFs', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds for timely offers and notices',
    paragraphs: [
      'The classifieds lane is intentionally lighter: fewer fields, more emphasis on what is happening right now and how to respond quickly.',
      'It complements the business listing index by catching short-term roles, subleases, and flash offers without duplicating a full company dossier.',
      'When a notice matures into an ongoing business, the listing index is the right home for a fuller record.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Browse articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Visual reference posts',
    paragraphs: [
      'Some stories need a strong still or sequence; this space keeps those posts from overwhelming the data-first business cards.',
      'Imagery here supports a narrative, while listings stay focused on operational metadata.',
      'Start from an image when you are researching creative suppliers, then cross-check details in the listing index.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Operator and studio profiles',
    paragraphs: [
      'Profiles give you a person- or team-level anchor when a company listing alone is not enough context.',
      'Use them to understand who answers the phone, who signed the proposal, and what other work they reference.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Image posts', href: '/images' },
    ],
  },
  sbm: {
    title: 'Saved links and small bibliographies',
    paragraphs: [
      'Bookmark collections stay textual and compact, closer to a research log than a media grid.',
      'Use them to warehouse methodology links, spec sheets, and tools you want to reopen during vendor reviews.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  pdf: {
    title: 'PDFs and long-form documents',
    paragraphs: [
      'The PDF library stores decks, SOPs, and reports that are awkward to fit into a listing card or article body.',
      'Each entry is labelled so you can see format and subject matter before you download anything.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Community and status posts',
    paragraphs: [
      'Short updates point to work-in-progress, hiring signals, and operational notes without replacing the business listing itself.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Threaded comments',
    paragraphs: [
      'Comments keep discussion tied to the article or post they refer to, instead of bloating the directory index with chatter.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  org: {
    title: 'Organisation pages',
    paragraphs: [
      'Larger teams and collectives can expose structure—studios, guilds, agencies—while individual listings still carry the buyer-ready facts.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
}
