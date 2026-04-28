import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Harborline Advisory LLP",
    "Kaveri Metalworks Private Limited",
    "Third Space Interior Studio",
    "Bluecap Analytics India",
    "Niva Retail Collective",
  ],
  classified: [
    "CFA exam study group — weekend cohort",
    "Bengaluru Indiranagar 2BHK — May handover",
    "Contract product designer (8 weeks, remote)",
    "Event AV crew for two-day conference",
    "Short-term kitchen equipment lease",
  ],
  article: [
    "How procurement teams read a business directory",
    "Field notes: auditing supplier listings at scale",
    "What belongs in a listing vs. a classified",
    "Designing data-first cards without losing trust",
    "From spreadsheet to public index: operator workflow",
  ],
  image: [
    "Factory floor documentation — batch one",
    "Showroom lighting study",
    "Field visit — cold chain check",
    "Reference shots — packaging line",
    "Archive: pop-up fit-out",
  ],
  profile: [
    "Meera Krishnan — commercial lead",
    "Rahul Varma — operations",
    "Studio 11 Architecture",
    "Ananya Bose — finance partner",
    "Collective North — delivery desk",
  ],
  social: [
    "Q2 hiring window opening next week",
    "Waterfront project kickoff",
    "Community office hours: listings QA",
    "New connector release for directory sync",
    "Reader mail: industry taxonomy",
  ],
  pdf: [
    "Supplier onboarding checklist (2026)",
    "Directory data field dictionary",
    "Classifieds moderation guide",
    "Map embed policy — one pager",
    "Index SEO baseline report",
  ],
  org: [
    "Mumbai operations council",
    "Deswebcol partner network",
    "South India facilities guild",
    "Research desk — listings quality",
    "Field verification partners",
  ],
  sbm: [
    "ISO supplier evaluation templates",
    "OSM embed documentation",
    "Local business licensing portals (state list)",
    "Civil contractor reference sheet",
    "B2B payment terms primer",
  ],
  comment: [
    "Re: card layout for services firms",
    "Thread: map accuracy",
    "Response: category depth",
    "On listing vs profile split",
    "Hot take: imagery optional fields",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: [
    "Professional services",
    "Manufacturing",
    "Design & build",
    "Software & data",
    "Retail & distribution",
  ],
  classified: ["Housing", "Gigs", "Roles", "Events", "Equipment"],
  article: ["Ops", "Product", "Field notes", "Policy", "Design"],
  image: ["Field", "Reference", "Archive", "Space", "Process"],
  profile: ["Leadership", "Studio", "Team", "Partner", "Desk"],
  social: ["Update", "Calendar", "Ops", "Release", "Mailbag"],
  pdf: ["Playbook", "Spec", "Policy", "Template", "Report"],
  org: ["Council", "Network", "Guild", "Research", "Field"],
  sbm: ["Reference", "Compliance", "Maps", "Construction", "Finance"],
  comment: ["Discussion", "Support", "Thread", "Ops", "Opinion"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing:
    "Verified operating areas, contact channels, and service scope in a single register row.",
  classified: "Time-bound notice with a direct response path and lighter metadata than a full listing.",
  article: "Longer perspective that sits beside the index without replacing it.",
  image: "Visual reference when words are not enough; still cross-linked to listings.",
  profile: "Identity surface for a person, desk, or studio behind the work.",
  social: "Short operational signal; not a substitute for a business dossier.",
  pdf: "Downloadable file with versioned context for partners and members.",
  org: "Group or council page with structure above individual listings.",
  sbm: "Curated external links stored for repeat access during reviews.",
  comment: "Contextual response tied to the post it references.",
};

const randomFrom = (items: string[], index: number) => items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  const titleList = taskTitles[task];
  return Array.from({ length: 5 }).map((_, index) => {
    const title = titleList[index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location:
          index % 3 === 0
            ? "Bengaluru, Karnataka"
            : index % 3 === 1
              ? "Mumbai, Maharashtra"
              : "Hyderabad, Telangana",
        description: summaryByTask[task],
        website: "https://deswebcol.com",
        phone: "+91-80-4120-9000",
        email: "registry@deswebcol.com",
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: "Deswebcol Registry",
      publishedAt: new Date().toISOString(),
    };
  });
};
