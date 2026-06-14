// All site content — sourced from Tanzia's deck + LinkedIn (CONTENT.md).
// Every number/quote here is real. Do not invent prices or metrics.

export const profile = {
  name: 'Tanzia Mehnaz',
  brand: 'The Socials Glow',
  title: 'Creative Director & Organic Growth Strategist',
  tagline: 'Transforming brands into growth powerhouses.',
  pillars: ['Strategy', 'Content', 'Growth', 'SMM'],
  location: 'New Delhi, India',
  reach: 'India · USA · UK · Dubai · Canada',
  email: 'tanziamehnazdbg@gmail.com',
  phone: '+91 75428 28405',
  phoneHref: '+917542828405',
  linkedin: 'https://www.linkedin.com/in/tanziamehnaz/',
  portraitUrl: '',
  deskUrl: '',
  heroTitle: 'Transforming brands into',
  heroTitleEm: 'growth powerhouses.',
  heroCTA1: "Let's work together",
  heroCTA2: 'See the results',
  heroBadgeStat: '100X',
  heroBadgeLabel: 'share of voice',
}

export const heroSub =
  'Creative Director & Organic Growth Strategist helping brands and founders grow organically through strategy-led content — built on clarity, collaboration, and intention.'

export const stats = [
  { value: 100, suffix: 'X', label: 'Share-of-voice growth', note: 'Nasheedio' },
  { value: 258, suffix: 'K', label: 'Followers grown', note: 'from 1K' },
  { value: 20, suffix: 'M', label: 'Reach scaled', note: 'Nikah Forever' },
  { value: 12, suffix: '+', label: 'Brands scaled', note: '4+ years' },
]

export const about = {
  lead:
    "Hi, I'm Tanzia — a results-driven Creative Director & Organic Growth Strategist with 4+ years transforming brands' online presence into powerful growth engines.",
  body: [
    "Based in New Delhi, I've worked with national and international clients — from startups to established businesses — delivering measurable outcomes: growing accounts from 1K to 258K followers, generating millions of organic views, and driving thousands of leads.",
    "I help brands and individuals grow organically through strategy-led content — but only where there's clarity, collaboration, and intention. Across 4 years I've scaled 20+ clients with an average retention of about a year.",
    "I'm an introvert who does her best work focused and deliberate. I lead creative teams — designers, editors, writers, and SMMs — through collaboration, not command.",
  ],
  chips: [
    'B.Sc., University of Delhi',
    '20+ clients · ~1yr retention',
    'Works across 5 countries',
    'Team leadership',
  ],
}

export type CaseStudy = {
  client: string
  niche: string
  headline: string
  metrics: { label: string; from?: string; to: string }[]
  blurb: string
  imageUrl?: string
  accent?: 'gold' | 'forest'
}

export const caseStudies: CaseStudy[] = [
  {
    client: 'Nasheedio',
    niche: 'Media / Music · Flagship',
    headline: '100X share of voice',
    metrics: [
      { label: 'Followers', from: '1K', to: '248K+' },
      { label: 'Reach (1 month)', from: '20K', to: '1.7M' },
      { label: 'Views (September)', to: '12M' },
    ],
    blurb:
      'Scaled 1K→32.5K in one month and another 1K→101K in 3.5 months. A single strategic 44-piece organic campaign took reach from 20K to 1.7M — amplifying share of voice 100X.',
    accent: 'gold',
  },
  {
    client: 'Nikah Forever',
    niche: 'App / Matrimony',
    headline: 'A reach turnaround at scale',
    metrics: [
      { label: 'Followers', from: '67K', to: '131K' },
      { label: 'Reach', from: '5M', to: '20M' },
      { label: 'Impressions', from: '−20%', to: '+82%' },
    ],
    blurb:
      '+9,000 followers in a single month and 0→83K in 1.5 months. Reach scaled 5M→20M with organic now contributing 37%, and impressions flipped from a −20% decline to +82% growth.',
  },
  {
    client: 'Hima',
    niche: 'Personal Brand',
    headline: '783% growth from a standstill',
    metrics: [
      { label: 'Followers', from: '600', to: '4,700' },
      { label: 'Timeframe', to: '3 months' },
      { label: 'Reel views', to: 'Millions' },
    ],
    blurb:
      'Transformed a stagnant account (600 followers, flat for 4 months) into 4,700 in just 3 months — a 783% increase — with a tailored, insight-led content strategy.',
  },
  {
    client: 'Barkat Blossom',
    niche: 'Lifestyle Brand',
    headline: 'From stuck to 10.6K',
    metrics: [
      { label: 'Followers', from: '1,250', to: '10.6K' },
      { label: 'Timeframe', to: '4 months' },
      { label: 'Reel views', to: '500K+' },
    ],
    blurb:
      'Unlocked rapid growth on an account stagnant for 6 months — 1,250→10.6K in 4 months — and generated half a million Reel views along the way.',
  },
  {
    client: 'Gut Health & Collagen Expert',
    niche: 'Health & Wellness',
    headline: 'Built a niche community from scratch',
    metrics: [
      { label: 'Followers', from: '0', to: '4,000' },
      { label: 'Views', to: '200K+' },
      { label: 'Leads', to: 'Hundreds' },
    ],
    blurb:
      'Partnered with a sustainable-weight-loss expert to build their presence from zero — 4,000 engaged followers, 200K+ views, and hundreds of leads through niche-focused content.',
  },
]

export type Experience = {
  role: string
  org: string
  period: string
  detail: string
}

export const experience: Experience[] = [
  {
    role: 'Head of Social Growth & Creative Director',
    org: 'Nasheedio',
    period: 'Jul 2024 — Present',
    detail:
      'Lead the social growth and content ecosystem across platforms — owning strategy, direction, and execution with designers, SMMs, and creators. Scaled the flagship Instagram to ~350K and contributed to 50K app downloads in the South Asian market.',
  },
  {
    role: 'Founder',
    org: 'eshaal.store',
    period: 'Feb 2024 — Present',
    detail: 'Founder of eshaal.store.',
  },
  {
    role: 'Social Media Manager',
    org: 'NikahForever',
    period: 'Aug 2024 — Sep 2025',
    detail:
      'Scaled 67K→131K followers in 4 months and reach 5M→20M with stronger organic performance, driving millions of views and meaningful app-registration growth.',
  },
  {
    role: 'Social Media Marketing',
    org: 'Show Insights AI',
    period: 'Aug 2025 — Nov 2025',
    detail:
      'Turned complex AI and data concepts into simple, impactful narratives through visuals and content that connected with the audience.',
  },
  {
    role: 'Social Media Assistant',
    org: 'Mortar Metrics · Canada',
    period: 'Oct 2024 — Nov 2024',
    detail: 'Social media management and video editing for a Canada-based brand.',
  },
]

export const brands = [
  'Nasheedio',
  'Nikah Forever',
  'Show Insights AI',
  'Aleph Agency',
  'Rafiqo',
  'Gurucool',
  'TCR Innovation',
  'Leading EDGE',
  'Mortar Metrics',
  'eshaal.store',
]

export type Service = { title: string; desc: string }

export const services: Service[] = [
  {
    title: 'Full Social Media Management',
    desc: 'End-to-end ownership of your channels — strategy, content, publishing, and reporting.',
  },
  {
    title: 'Content, Design & Video',
    desc: 'Pro-level content creation, graphic design (Canva Pro), and editing (VN, InShot, CapCut).',
  },
  {
    title: 'Organic Growth Strategy',
    desc: 'Data-driven content calendars, SEO, and hashtag systems built to compound reach.',
  },
  {
    title: 'Personal Branding',
    desc: "Helping founders show up with a clear, consistent voice that turns presence into trust.",
  },
  {
    title: 'Competitive Analysis',
    desc: 'Mapping the landscape to find the angles, formats, and gaps that win attention.',
  },
  {
    title: 'Influencer Management',
    desc: 'Sourcing and managing the right collaborators to extend reach authentically.',
  },
]

export type ProcessStep = { n: string; title: string; desc: string }

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Audience Analysis',
    desc: "Identify your audience's demographics, interests, and behavior for precise targeting.",
  },
  {
    n: '02',
    title: 'Goal Setting',
    desc: 'Define clear, measurable objectives — awareness, traffic, or leads.',
  },
  {
    n: '03',
    title: 'Content Strategy',
    desc: 'Build a content calendar of post types, frequency, and themes aligned to goals.',
  },
  {
    n: '04',
    title: 'Creation & Curation',
    desc: 'Produce original content and curate relevant material to engage the audience.',
  },
  {
    n: '05',
    title: 'Scheduling & Publishing',
    desc: 'Schedule and publish at optimal times for maximum engagement.',
  },
  {
    n: '06',
    title: 'Optimize & Scale',
    desc: 'Track analytics, engage, and continuously refine to exceed every objective.',
  },
]

export type Package = { tier: string; name: string; features: string[]; featured?: boolean }

export const packages: Package[] = [
  {
    tier: 'Tier 1',
    name: 'Essentials',
    features: [
      'Monthly content calendar',
      'Hashtags & SEO strategy',
      'Captions',
      'Monthly reporting',
    ],
  },
  {
    tier: 'Tier 2',
    name: 'Growth',
    featured: true,
    features: [
      'Monthly content calendar',
      'Hashtags & SEO strategy',
      'Uploading & publishing',
      'Engaging stories 4 days / week',
      'Monthly reporting',
    ],
  },
  {
    tier: 'Tier 3',
    name: 'Full Management',
    features: [
      'Monthly content calendar',
      'Hashtags & SEO strategy',
      'Complete social media management',
      'Quarterly reporting',
    ],
  },
]

export type Testimonial = { quote: string; name: string; role: string }

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tanzia's understanding of audience behavior is really good. She's always available with ideas so content connects and engages while keeping the brand image intact. She took Nasheedio's main Instagram to 350K — a huge penetration in the South Asian audience that contributed to 50K downloads.",
    name: 'Asim Junaid',
    role: 'GenAI @ MyRA AI',
  },
  {
    quote:
      'I cannot recommend Tanzia highly enough. More than a manager — a dedicated mentor with a unique ability to push you to do better while giving you the support to get there. A visionary leader and a brilliant professional.',
    name: 'Sidrah Noor',
    role: 'Founder, Color Trails',
  },
  {
    quote:
      'In just one month, her creative strategies helped us gain 9,000 new followers, with content that reached millions of views. Her attention to detail and unique design sense significantly boosted our brand visibility.',
    name: 'Hammad Rahman',
    role: 'NikahForever',
  },
  {
    quote:
      "Tanzia did amazing work as a social media designer. Her meticulousness added to our visibility — a true professional with an excellent eye for design and a dedication to the highest-calibre content.",
    name: 'Adil Meraj',
    role: 'Nasheedio',
  },
  {
    quote:
      'Rare to find someone as talented and dedicated. A remarkable ability to translate ideas into visually striking designs, with attention to detail and a commitment to excellence that makes her invaluable.',
    name: 'Kamran Akhtar',
    role: 'Client',
  },
]
