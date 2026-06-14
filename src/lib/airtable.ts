/**
 * Airtable CMS client.
 * Fetches all site content at startup with a 5-minute in-memory cache.
 * Falls back to static content.ts if the API key is missing (dev without .env).
 */

const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string
const BASE_URL = 'https://api.airtable.com/v0'

const TABLE_IDS = {
  Profile:      'tblW1LKngW54aqjLq',
  Stats:        'tblBuD0xSsDDcQCR7',
  CaseStudies:  'tbltl0brftgkG7zDV',
  Experience:   'tblLJPukK9BNG1Eic',
  Brands:       'tblffBGrb1W3doCgG',
  Services:     'tblZTebZMRr9LQ4Er',
  Process:      'tbliux6LE187Eq1L9',
  Packages:     'tblkAvlgwMbQL5QbG',
  Testimonials: 'tbllJxt9H3Kl7baC5',
  AboutChips:   'tblhnPej33X0tvVyB',
} as const

// ── Cache ──────────────────────────────────────────────────────────────────

let cachedContent: SiteContent | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// ── Types ──────────────────────────────────────────────────────────────────

export type AirtableStat = {
  value: number
  suffix: string
  label: string
  note: string
}

export type AirtableCaseStudy = {
  client: string
  niche: string
  headline: string
  blurb: string
  imageUrl?: string
  accent?: 'gold' | 'forest'
  metrics: { label: string; from?: string; to: string }[]
}

export type AirtableExperience = {
  role: string
  org: string
  period: string
  detail: string
}

export type AirtableService = { title: string; desc: string }
export type AirtableProcessStep = { n: string; title: string; desc: string }
export type AirtablePackage = { tier: string; name: string; features: string[]; featured?: boolean }
export type AirtableTestimonial = { quote: string; name: string; role: string }

export type SiteContent = {
  profile: {
    name: string
    brand: string
    title: string
    tagline: string
    pillars: string[]
    location: string
    reach: string
    email: string
    phone: string
    phoneHref: string
    linkedin: string
    portraitUrl: string
    deskUrl: string
    heroTitle: string
    heroTitleEm: string
    heroCTA1: string
    heroCTA2: string
    heroBadgeStat: string
    heroBadgeLabel: string
  }
  heroSub: string
  about: {
    lead: string
    body: string[]
    chips: string[]
  }
  stats: AirtableStat[]
  caseStudies: AirtableCaseStudy[]
  experience: AirtableExperience[]
  brands: string[]
  services: AirtableService[]
  processSteps: AirtableProcessStep[]
  packages: AirtablePackage[]
  testimonials: AirtableTestimonial[]
}

// ── Fetch helpers ──────────────────────────────────────────────────────────

async function fetchTable<T>(tableId: string, sort?: string): Promise<T[]> {
  const url = new URL(`${BASE_URL}/${BASE_ID}/${tableId}`)
  if (sort) {
    url.searchParams.set('sort[0][field]', sort)
    url.searchParams.set('sort[0][direction]', 'asc')
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  if (!res.ok) throw new Error(`Airtable fetch ${tableId}: ${res.status}`)
  const json = await res.json()
  return (json.records as { fields: T }[]).map(r => r.fields)
}

// ── Main fetch ─────────────────────────────────────────────────────────────

export async function fetchSiteContent(): Promise<SiteContent> {
  if (cachedContent && Date.now() - cacheTime < CACHE_TTL) return cachedContent

  const [profileRows, statsRows, caseRows, expRows, brandsRows, servicesRows, processRows, pkgsRows, testRows, chipsRows] =
    await Promise.all([
      fetchTable<{ Key: string; Value: string }>(TABLE_IDS.Profile, 'Key'),
      fetchTable<{ Value: number; Suffix: string; Label: string; Note: string; Order: number }>(TABLE_IDS.Stats, 'Order'),
      fetchTable<Record<string, string>>(TABLE_IDS.CaseStudies, 'Order'),
      fetchTable<{ Role: string; Org: string; Period: string; Detail: string; Order: number }>(TABLE_IDS.Experience, 'Order'),
      fetchTable<{ Name: string; Order: number }>(TABLE_IDS.Brands, 'Order'),
      fetchTable<{ Title: string; Desc: string; Order: number }>(TABLE_IDS.Services, 'Order'),
      fetchTable<{ StepNum: string; Title: string; Desc: string; Order: number }>(TABLE_IDS.Process, 'Order'),
      fetchTable<{ Tier: string; PackageName: string; Features: string; Featured: boolean; Order: number }>(TABLE_IDS.Packages, 'Order'),
      fetchTable<{ Quote: string; Name: string; Role: string; Order: number }>(TABLE_IDS.Testimonials, 'Order'),
      fetchTable<{ Label: string; Order: number }>(TABLE_IDS.AboutChips, 'Order'),
    ])

  // Profile key-value map
  const p: Record<string, string> = {}
  profileRows.forEach(r => { p[r.Key] = r.Value })

  cachedContent = {
    profile: {
      name: p.name,
      brand: p.brand,
      title: p.title,
      tagline: p.tagline,
      pillars: ['Strategy', 'Content', 'Growth', 'SMM'],
      location: p.location,
      reach: p.reach,
      email: p.email,
      phone: p.phone,
      phoneHref: p.phone?.replace(/\s+/g, '').replace('+', '+'),
      linkedin: p.linkedin,
      portraitUrl: p.portraitUrl || '',
      deskUrl: p.deskUrl || '',
      heroTitle: p.heroTitle || 'Transforming brands into',
      heroTitleEm: p.heroTitleEm || 'growth powerhouses.',
      heroCTA1: p.heroCTA1 || "Let's work together",
      heroCTA2: p.heroCTA2 || 'See the results',
      heroBadgeStat: p.heroBadgeStat || '100X',
      heroBadgeLabel: p.heroBadgeLabel || 'share of voice',
    },
    heroSub: p.heroSub,
    about: {
      lead: p.aboutLead,
      body: [p.aboutBody1, p.aboutBody2, p.aboutBody3].filter(Boolean),
      chips: chipsRows.map(r => r.Label),
    },
    stats: statsRows.map(r => ({
      value: r.Value,
      suffix: r.Suffix,
      label: r.Label,
      note: r.Note,
    })),
    caseStudies: caseRows.map(r => ({
      client: r.Client,
      niche: r.Niche,
      headline: r.Headline,
      blurb: r.Blurb,
      imageUrl: r.ImageUrl || undefined,
      accent: (r.Accent as 'gold' | 'forest') || undefined,
      metrics: [
        r.Metric1Label ? { label: r.Metric1Label, from: r.Metric1From || undefined, to: r.Metric1To } : null,
        r.Metric2Label ? { label: r.Metric2Label, from: r.Metric2From || undefined, to: r.Metric2To } : null,
        r.Metric3Label ? { label: r.Metric3Label, from: r.Metric3From || undefined, to: r.Metric3To } : null,
      ].filter(Boolean) as { label: string; from?: string; to: string }[],
    })),
    experience: expRows.map(r => ({ role: r.Role, org: r.Org, period: r.Period, detail: r.Detail })),
    brands: brandsRows.map(r => r.Name),
    services: servicesRows.map(r => ({ title: r.Title, desc: r.Desc })),
    processSteps: processRows.map(r => ({ n: r.StepNum, title: r.Title, desc: r.Desc })),
    packages: pkgsRows.map(r => ({
      tier: r.Tier,
      name: r.PackageName,
      features: (r.Features || '').split('\n').filter(Boolean),
      featured: r.Featured ?? false,
    })),
    testimonials: testRows.map(r => ({ quote: r.Quote, name: r.Name, role: r.Role })),
  }
  cacheTime = Date.now()
  return cachedContent
}
