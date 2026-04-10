import { MetadataRoute } from 'next'
import { bars } from '@/lib/bars'
import { NATIONALITIES } from '@/lib/types'

const BASE_URL = 'https://worldcup-hub.vercel.app'

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const NEIGHBOURHOODS = [
  'Hollywood',
  'Silver Lake',
  'Santa Monica',
  'Downtown',
  'WeHo',
  'Venice',
  'Echo Park',
  'Koreatown',
  'Los Feliz',
  'Mid-City',
  'Highland Park',
  'Valley',
  'Pasadena',
  'Culver City',
  'Atwater Village',
  'Burbank',
  'East LA',
  'El Segundo',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const statics: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/bars`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/team`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/matches`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/promote`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Team pages
  const teamPages: MetadataRoute.Sitemap = NATIONALITIES.map((team) => ({
    url: `${BASE_URL}/team/${toSlug(team)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Neighbourhood pages
  const neighbourhoodPages: MetadataRoute.Sitemap = NEIGHBOURHOODS.map((n) => ({
    url: `${BASE_URL}/neighbourhood/${toSlug(n)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Individual bar pages
  const barPages: MetadataRoute.Sitemap = bars.map((bar) => ({
    url: `${BASE_URL}/bars/${bar.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...statics, ...teamPages, ...neighbourhoodPages, ...barPages]
}
