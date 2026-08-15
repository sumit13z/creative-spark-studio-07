/**
 * Single source of truth for brand + marketing content.
 * Swap these values to re-brand the whole site.
 */
export const brand = {
  name: "Visualy AI",
  shortName: "Visualy",
  tagline: "AI visual content platform",
  domain: "visualy.ai",
};

export type NavLink = { label: string; href: string; desc?: string };

export const createMenu: NavLink[] = [
  { label: "Presentations", href: "/templates", desc: "Decks that close deals" },
  { label: "Documents", href: "/templates", desc: "Proposals, one-pagers, ebooks" },
  { label: "Infographics", href: "/templates", desc: "Explain anything visually" },
  { label: "Data Visualization", href: "/templates", desc: "Live charts and maps" },
  { label: "Social Graphics", href: "/templates", desc: "Every format, on brand" },
  { label: "Videos", href: "/templates", desc: "Animated stories in minutes" },
  { label: "Whiteboards", href: "/templates", desc: "Think together in real time" },
  { label: "Forms", href: "/templates", desc: "Surveys people finish" },
  { label: "Charts", href: "/templates", desc: "40+ chart types" },
  { label: "Reports", href: "/templates", desc: "Recurring reporting, automated" },
  { label: "Interactive content", href: "/templates", desc: "Hotspots, popups, links" },
  { label: "Branded content", href: "/templates", desc: "Locked to your brand kit" },
];

export const solutionsMenu: NavLink[] = [
  { label: "Marketing", href: "/solutions", desc: "Campaign assets at speed" },
  { label: "Sales", href: "/solutions", desc: "Proposals and pitch decks" },
  { label: "HR & People", href: "/solutions", desc: "Onboarding and culture docs" },
  { label: "Education", href: "/solutions", desc: "Lessons and course material" },
  { label: "Small Business", href: "/solutions", desc: "Look bigger than you are" },
  { label: "Enterprise", href: "/solutions", desc: "Governance and SSO" },
  { label: "Agencies", href: "/solutions", desc: "Multi-client brand kits" },
];

export const resourcesMenu: NavLink[] = [
  { label: "Blog", href: "/resources", desc: "Playbooks and teardowns" },
  { label: "Guides", href: "/resources", desc: "Deep dives on visual comms" },
  { label: "Tutorials", href: "/resources", desc: "Learn the editor in minutes" },
  { label: "Webinars", href: "/resources", desc: "Live sessions with our team" },
  { label: "Templates", href: "/templates", desc: "6,000+ starting points" },
  { label: "Design inspiration", href: "/resources", desc: "Curated work from the community" },
  { label: "Help Center", href: "/resources", desc: "Docs and support" },
];

export const stats = [
  { value: "10M+", label: "creators" },
  { value: "50M+", label: "designs created" },
  { value: "100K+", label: "teams onboard" },
  { value: "190+", label: "countries" },
];
