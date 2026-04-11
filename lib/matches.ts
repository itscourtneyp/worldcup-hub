export interface Match {
  slug: string
  date: string
  dateShort: string
  timeDisplay: string
  teams: string
  teamA: string
  teamB: string
  flagA: string
  flagB: string
  group: string
  stage: 'group' | 'knockout'
  isUSA: boolean
  barTeams: string[]
  barTeamSlugs: string[]
  highlight?: string
  venue: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

export const LA_MATCHES: Match[] = [
  {
    slug: 'usa-vs-paraguay-june-12',
    date: '2026-06-12',
    dateShort: 'June 12',
    timeDisplay: '3:00 PM PT',
    teams: 'USA vs Paraguay',
    teamA: 'USA',
    teamB: 'Paraguay',
    flagA: '🇺🇸',
    flagB: '🇵🇾',
    group: 'Group D',
    stage: 'group',
    isUSA: true,
    barTeams: ['USA'],
    barTeamSlugs: ['usa'],
    highlight: "🇺🇸 USMNT Opening Match — Don't miss it",
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch USA vs Paraguay — World Cup 2026 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'USMNT opens the 2026 World Cup at SoFi Stadium on June 12. Find the best bars in LA to watch USA vs Paraguay — from Santa Monica to Downtown.',
    keywords: [
      'watch usa vs paraguay los angeles',
      'usmnt world cup june 12 bar la',
      'where to watch usa world cup 2026 la',
      'world cup watch party los angeles june 12',
    ],
  },
  {
    slug: 'iran-vs-new-zealand-june-15',
    date: '2026-06-15',
    dateShort: 'June 15',
    timeDisplay: 'TBC',
    teams: 'Iran vs New Zealand',
    teamA: 'Iran',
    teamB: 'New Zealand',
    flagA: '🇮🇷',
    flagB: '🇳🇿',
    group: 'Group D',
    stage: 'group',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch Iran vs New Zealand — World Cup 2026 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'Iran vs New Zealand at SoFi Stadium on June 15. Find a bar in LA to watch this World Cup 2026 group stage match.',
    keywords: [
      'watch iran vs new zealand los angeles',
      'world cup june 15 bar la',
      'sofi stadium world cup june 15',
    ],
  },
  {
    slug: 'switzerland-vs-bosnia-june-18',
    date: '2026-06-18',
    dateShort: 'June 18',
    timeDisplay: 'TBC',
    teams: 'Switzerland vs Bosnia & Herzegovina',
    teamA: 'Switzerland',
    teamB: 'Bosnia & Herzegovina',
    flagA: '🇨🇭',
    flagB: '🇧🇦',
    group: 'Group D',
    stage: 'group',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch Switzerland vs Bosnia — World Cup 2026 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'Switzerland vs Bosnia & Herzegovina at SoFi Stadium on June 18. Find a bar in LA to watch this World Cup 2026 group stage match.',
    keywords: [
      'watch switzerland vs bosnia los angeles',
      'world cup june 18 bar la',
      'sofi stadium world cup june 18',
    ],
  },
  {
    slug: 'belgium-vs-iran-june-21',
    date: '2026-06-21',
    dateShort: 'June 21',
    timeDisplay: 'TBC',
    teams: 'Belgium vs Iran',
    teamA: 'Belgium',
    teamB: 'Iran',
    flagA: '🇧🇪',
    flagB: '🇮🇷',
    group: 'Group G',
    stage: 'group',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch Belgium vs Iran — World Cup 2026 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'Belgium vs Iran at SoFi Stadium on June 21. Find the best bars in LA to watch this World Cup 2026 match.',
    keywords: [
      'watch belgium vs iran los angeles',
      'world cup june 21 bar la',
      'sofi stadium world cup june 21',
    ],
  },
  {
    slug: 'turkiye-vs-usa-june-25',
    date: '2026-06-25',
    dateShort: 'June 25',
    timeDisplay: 'TBC',
    teams: 'Türkiye vs USA',
    teamA: 'Türkiye',
    teamB: 'USA',
    flagA: '🇹🇷',
    flagB: '🇺🇸',
    group: 'Group D',
    stage: 'group',
    isUSA: true,
    barTeams: ['USA'],
    barTeamSlugs: ['usa'],
    highlight: '🇺🇸 USMNT must-win group decider',
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch Türkiye vs USA — World Cup 2026 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'USMNT group decider vs Türkiye at SoFi Stadium on June 25. Find the best LA bars — this could be the game that sends USA through.',
    keywords: [
      'watch turkiye vs usa los angeles',
      'usmnt world cup june 25 bar la',
      'turkey vs usa world cup 2026 la bar',
      'world cup watch party los angeles june 25',
    ],
  },
  {
    slug: 'round-of-32-june-28',
    date: '2026-06-28',
    dateShort: 'June 28',
    timeDisplay: 'TBC',
    teams: 'Round of 32',
    teamA: 'TBD',
    teamB: 'TBD',
    flagA: '⚽',
    flagB: '⚽',
    group: 'Round of 32',
    stage: 'knockout',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch World Cup Round of 32 — June 28 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'World Cup 2026 Round of 32 at SoFi Stadium on June 28. Find LA bars showing the knockout round match.',
    keywords: [
      'world cup round of 32 bar los angeles',
      'world cup june 28 la bar',
      'world cup knockout bar los angeles',
    ],
  },
  {
    slug: 'round-of-32-july-2',
    date: '2026-07-02',
    dateShort: 'July 2',
    timeDisplay: 'TBC',
    teams: 'Round of 32',
    teamA: 'TBD',
    teamB: 'TBD',
    flagA: '⚽',
    flagB: '⚽',
    group: 'Round of 32',
    stage: 'knockout',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch World Cup Round of 32 — July 2 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'World Cup 2026 Round of 32 at SoFi Stadium on July 2. Find LA bars showing the knockout round match.',
    keywords: [
      'world cup round of 32 bar los angeles july 2',
      'world cup july 2 la bar',
    ],
  },
  {
    slug: 'quarterfinal-july-10',
    date: '2026-07-10',
    dateShort: 'July 10',
    timeDisplay: 'TBC',
    teams: 'Quarterfinal',
    teamA: 'TBD',
    teamB: 'TBD',
    flagA: '⚽',
    flagB: '⚽',
    group: 'Quarterfinal',
    stage: 'knockout',
    isUSA: false,
    barTeams: [],
    barTeamSlugs: [],
    venue: 'SoFi Stadium, Inglewood',
    seoTitle: 'Where to Watch World Cup Quarterfinal — July 10 Los Angeles | WorldCup Hub LA',
    seoDescription:
      'World Cup 2026 Quarterfinal at SoFi Stadium on July 10. Find LA bars showing this knockout match.',
    keywords: [
      'world cup quarterfinal bar los angeles',
      'world cup july 10 la bar',
      'world cup quarterfinal watch party la',
    ],
  },
]

export function getMatchBySlug(slug: string): Match | undefined {
  return LA_MATCHES.find((m) => m.slug === slug)
}
