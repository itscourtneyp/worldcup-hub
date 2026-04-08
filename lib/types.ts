export type Neighbourhood =
  | 'Hollywood'
  | 'Silver Lake'
  | 'Santa Monica'
  | 'Downtown'
  | 'WeHo'
  | 'Venice'
  | 'Echo Park'
  | 'Koreatown'
  | 'Los Feliz'
  | 'Mid-City'
  | 'Highland Park'
  | 'Valley'

export type Vibe = 'rowdy' | 'electric' | 'chill' | 'local'

export type Team =
  | 'Argentina'
  | 'Brazil'
  | 'Mexico'
  | 'England'
  | 'USA'
  | 'South Korea'
  | 'France'
  | 'Germany'
  | 'Portugal'

export const TEAM_FLAGS: Record<Team, string> = {
  Argentina: '🇦🇷',
  Brazil: '🇧🇷',
  Mexico: '🇲🇽',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  USA: '🇺🇸',
  'South Korea': '🇰🇷',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Portugal: '🇵🇹',
}

export const NATIONALITIES: Team[] = [
  'Argentina',
  'Brazil',
  'Mexico',
  'England',
  'USA',
  'South Korea',
  'France',
  'Germany',
  'Portugal',
]

export interface BarFeatures {
  outdoorScreen: boolean
  commentaryLanguage: string
}

export interface Bar {
  id: string
  slug: string
  name: string
  address: string
  neighbourhood: Neighbourhood
  about: string
  teams: Team[]
  vibe: Vibe
  vibeRating: number
  capacity: number
  features: BarFeatures
  promoted: boolean
  phone?: string
  website?: string
  hours: string
  screens: number
}
