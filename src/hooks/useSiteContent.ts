import { useState, useEffect } from 'react'
import { fetchSiteContent, SiteContent } from '../lib/airtable'
import {
  profile as staticProfile,
  heroSub as staticHeroSub,
  stats as staticStats,
  about as staticAbout,
  caseStudies as staticCaseStudies,
  experience as staticExperience,
  brands as staticBrands,
  services as staticServices,
  processSteps as staticProcessSteps,
  packages as staticPackages,
  testimonials as staticTestimonials,
} from '../data/content'

const staticContent: SiteContent = {
  profile: staticProfile,
  heroSub: staticHeroSub,
  about: staticAbout,
  stats: staticStats,
  caseStudies: staticCaseStudies,
  experience: staticExperience,
  brands: staticBrands,
  services: staticServices,
  processSteps: staticProcessSteps,
  packages: staticPackages,
  testimonials: staticTestimonials,
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(staticContent)
  const [loading, setLoading] = useState(!!import.meta.env.VITE_AIRTABLE_TOKEN)

  useEffect(() => {
    if (!import.meta.env.VITE_AIRTABLE_TOKEN) return
    fetchSiteContent()
      .then(setContent)
      .catch(() => { /* silently use static fallback */ })
      .finally(() => setLoading(false))
  }, [])

  return { content, loading }
}
