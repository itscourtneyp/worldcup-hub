import { Bar } from './types'
import barsData from '@/data/bars.json'

export const bars: Bar[] = barsData as unknown as Bar[]

export function getBarBySlug(slug: string): Bar | undefined {
  return bars.find((b) => b.slug === slug)
}

export function getFeaturedBars(): Bar[] {
  return bars.filter((b) => b.promoted).slice(0, 6)
}

export function getBarsByTeam(team: string): Bar[] {
  return bars.filter((b) => b.teams.includes(team as Bar['teams'][number]))
}

export function getBarsByNeighbourhood(neighbourhood: string): Bar[] {
  return bars.filter((b) => b.neighbourhood === neighbourhood)
}
