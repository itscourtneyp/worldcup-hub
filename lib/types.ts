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
  | 'Pasadena'
  | 'Culver City'
  | 'Atwater Village'
  | 'Burbank'
  | 'East LA'
  | 'El Segundo'

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
  | 'Colombia'
  | 'Japan'
  | 'Ireland'
  | 'Spain'
  | 'Australia'
  | 'Austria'
  | 'Peru'
  | 'Canada'
  | 'Netherlands'

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
  Colombia: '🇨🇴',
  Japan: '🇯🇵',
  Ireland: '🇮🇪',
  Spain: '🇪🇸',
  Australia: '🇦🇺',
  Austria: '🇦🇹',
  Peru: '🇵🇪',
  Canada: '🇨🇦',
  Netherlands: '🇳🇱',
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
  'Colombia',
  'Japan',
  'Ireland',
  'Spain',
  'Australia',
  'Austria',
  'Peru',
  'Canada',
  'Netherlands',
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
