import { notFound } from 'next/navigation'
import Link from 'next/link'
import { bars, getBarsByTeam } from '@/lib/bars'
import { TEAM_FLAGS, NATIONALITIES, Team } from '@/lib/types'
import BarCard from '@/components/BarCard'

// Team slug → Team name mapping (handles spaces e.g. "South Korea" → "south-korea")
const teamSlugMap: Record<string, Team> = Object.fromEntries(
  NATIONALITIES.map((t) => [t.toLowerCase().replace(/\s+/g, '-'), t])
)

// SEO-friendly descriptions per team
const TEAM_COPY: Record<Team, { headline: string; subhead: string; about: string; keywords: string[] }> = {
  Argentina: {
    headline: 'Where Argentines Watch the World Cup in LA',
    subhead: 'Find the LA bars where the Argentine community gathers on matchday — great food, Spanish commentary, and La Scaloneta passion.',
    about: 'Los Angeles has one of the largest Argentine communities in the US. From the parillas of Hollywood to the backyards of the Valley, porteños and fans of the Albiceleste turn matchday into a full celebration. These are the bars where Argentina watches.',
    keywords: ['argentina world cup bar los angeles', 'where do argentines watch world cup la', 'albiceleste bar los angeles 2026'],
  },
  Brazil: {
    headline: 'Where Brazilians Watch the World Cup in LA',
    subhead: 'Caipirinhas, samba vibes, and Portuguese commentary — find the best bars for Brazilian fans in Los Angeles.',
    about: 'LA's Brazilian community is passionate and loud when the Seleção plays. From Café Brasil to beachside spots in Venice, these venues transform into unofficial fan parks on matchday — full of yellow shirts, drums, and caipirinha-fueled energy.',
    keywords: ['brazil world cup bar los angeles', 'where do brazilians watch world cup la', 'selecao bar los angeles 2026', 'cafe brasil world cup'],
  },
  Mexico: {
    headline: 'Where Mexican Fans Watch the World Cup in LA',
    subhead: 'El Tri fever hits LA hard. Find the bars where the Mexican community celebrates matchday — the loudest, proudest spots in the city.',
    about: 'With the largest Mexican-American population of any US city, LA transforms when El Tri plays. The energy in bars like Escorpión and La Cita is unmatched — Spanish commentary, proper Mexican food, and a city that genuinely believes this is the year.',
    keywords: ['mexico world cup bar los angeles', 'el tri bar los angeles 2026', 'where do mexicans watch world cup la', 'mexican football bar la'],
  },
  England: {
    headline: 'Where England Fans Watch the World Cup in LA',
    subhead: 'Proper pints, English commentary, and 60+ years of hurt. Find the best English pubs and supporter bars across Los Angeles.',
    about: 'There are more English pubs in LA than you'd think — and every one of them fills up the moment England kick off. From the legendary Ye Olde Kings Head in Santa Monica to The Fox and Hounds in Studio City, the Three Lions faithful are well catered for in this city.',
    keywords: ['england world cup bar los angeles', 'english pub world cup la 2026', 'three lions bar los angeles', 'where do england fans watch world cup la'],
  },
  USA: {
    headline: 'Where US Soccer Fans Watch the World Cup in LA',
    subhead: 'The USMNT have home-field advantage in 2026. Find the best bars to watch USA play in Los Angeles.',
    about: 'With USA hosting the 2026 World Cup — and two group stage matches at SoFi Stadium — this is the biggest moment in US soccer history. Find bars showing every USMNT match, from the opening group game to (hopefully) a deep run.',
    keywords: ['usa world cup bar los angeles', 'usmnt watch party los angeles 2026', 'where to watch usa world cup la', 'american soccer bar la'],
  },
  'South Korea': {
    headline: 'Where Korean Fans Watch the World Cup in LA',
    subhead: 'Koreatown comes alive when the Taeguk Warriors play. Find LA's best spots for South Korea World Cup matches.',
    about: 'LA's Koreatown is one of the largest Korean communities outside Asia. When the Taeguk Warriors play, the whole neighbourhood turns into a giant fan zone. The Stadium Club and Normandie Club are ground zero — but the buzz spills into every Korean restaurant with a screen.',
    keywords: ['south korea world cup bar los angeles', 'korea world cup koreatown la 2026', 'taeguk warriors bar los angeles', 'where do koreans watch world cup la'],
  },
  France: {
    headline: 'Where French Fans Watch the World Cup in LA',
    subhead: 'Les Bleus have fans across LA. Find the best spots to watch France in 2026 — from Downtown to Westside.',
    about: 'France's World Cup following in LA is passionate and growing. Les Bleus showed the world their quality in 2018 and 2022 — and in 2026, the French community in LA has proper spots to gather for every match.',
    keywords: ['france world cup bar los angeles', 'les bleus bar los angeles 2026', 'where do french fans watch world cup la', 'french bar world cup la'],
  },
  Germany: {
    headline: 'Where German Fans Watch the World Cup in LA',
    subhead: 'Die Mannschaft's LA faithful gather at proper German pubs with good beer and great atmosphere. Find your spot.',
    about: 'Silver Lake's Red Lion Tavern has been the anchor of LA's German football community for decades. With strong German-American roots across the Westside and valleys, there are solid options for Die Mannschaft fans throughout the city.',
    keywords: ['germany world cup bar los angeles', 'german pub world cup la 2026', 'die mannschaft bar los angeles', 'where do german fans watch world cup la'],
  },
  Portugal: {
    headline: 'Where Portuguese Fans Watch the World Cup in LA',
    subhead: 'Find the best LA bars to watch Portugal in 2026 — Portuguese commentary, custard tarts, and genuine passion.',
    about: 'Portugal's following in LA tends to overlap with the Brazilian community, given the shared language — but there are dedicated spots where the Seleção das Quinas has its own passionate section. With Ronaldo (or whoever leads the line), every match is an event.',
    keywords: ['portugal world cup bar los angeles', 'selecao das quinas bar la 2026', 'where do portuguese fans watch world cup la', 'portugal football bar los angeles'],
  },
  Colombia: {
    headline: 'Where Colombian Fans Watch the World Cup in LA',
    subhead: 'Los Cafeteros have serious LA support. Find the best bars for Colombia World Cup matches — the loudest parties in the city.',
    about: 'LA's Colombian community is one of the most passionate fanbases in the city when Los Cafeteros play. La Cita Bar, La Descarga, and The Short Stop turn into full celebrations for every Colombia match — cumbia, aguardiente, and yellow fever throughout.',
    keywords: ['colombia world cup bar los angeles', 'los cafeteros bar la 2026', 'where do colombians watch world cup la', 'colombian football bar los angeles'],
  },
  Japan: {
    headline: 'Where Japanese Fans Watch the World Cup in LA',
    subhead: 'Little Tokyo and beyond — find LA's best spots to watch the Samurai Blue in 2026.',
    about: 'Japan's Samurai Blue have become a World Cup institution, famous for their giant upsets. In LA, Far Bar in Little Tokyo and Normandie Club in Koreatown are the go-to spots for Japanese fans — and any lover of a classic shock result.',
    keywords: ['japan world cup bar los angeles', 'samurai blue bar los angeles 2026', 'where do japanese fans watch world cup la', 'japan football bar la'],
  },
}

export async function generateStaticParams() {
  return NATIONALITIES.map((team) => ({
    team: team.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ team: string }> }) {
  const { team: teamSlug } = await params
  const team = teamSlugMap[teamSlug]
  if (!team) return { title: 'Team Not Found' }

  const copy = TEAM_COPY[team]
  const flag = TEAM_FLAGS[team]

  return {
    title: `${flag} ${copy.headline} | World Cup Hub LA`,
    description: copy.subhead,
    keywords: copy.keywords.join(', '),
    openGraph: {
      title: `${flag} ${copy.headline}`,
      description: copy.subhead,
      url: `https://worldcup-hub.vercel.app/team/${teamSlug}`,
      siteName: 'World Cup Hub LA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${flag} ${copy.headline}`,
      description: copy.subhead,
    },
    alternates: {
      canonical: `https://worldcup-hub.vercel.app/team/${teamSlug}`,
    },
  }
}

export default async function TeamPage({ params }: { params: Promise<{ team: string }> }) {
  const { team: teamSlug } = await params
  const team = teamSlugMap[teamSlug]
  if (!team) notFound()

  const flag = TEAM_FLAGS[team]
  const copy = TEAM_COPY[team]
  const teamBars = getBarsByTeam(team)

  // Related teams (all except current)
  const relatedTeams = NATIONALITIES.filter((t) => t !== team).slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #00c853, transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00c853' }} />
            World Cup 2026 · Los Angeles
          </div>

          <div className="text-7xl md:text-8xl mb-6 leading-none">{flag}</div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            {copy.headline}
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            {copy.subhead}
          </p>

          <div className="flex gap-8 justify-center text-center">
            <div>
              <span className="text-3xl font-black text-white">{teamBars.length}</span>
              <p className="text-white/40 text-sm mt-1">Bars Listed</p>
            </div>
            <div>
              <span className="text-3xl font-black text-white">
                {new Set(teamBars.map((b) => b.neighbourhood)).size}
              </span>
              <p className="text-white/40 text-sm mt-1">Neighbourhoods</p>
            </div>
          </div>
        </div>
      </section>

      {/* About copy — SEO paragraph */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-white/60 text-lg leading-relaxed text-center">{copy.about}</p>
      </section>

      {/* Bar listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>
              {flag} {team} Bars
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {teamBars.length} {teamBars.length === 1 ? 'Bar' : 'Bars'} for {team} Fans in LA
            </h2>
          </div>
          <Link href="/bars" className="text-white/50 hover:text-white text-sm font-medium transition-colors hidden sm:block">
            Browse all bars →
          </Link>
        </div>

        {teamBars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamBars.map((bar) => (
              <BarCard key={bar.id} bar={bar} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No bars listed yet for {team}.</p>
            <p className="text-white/30 text-sm mt-2">We&apos;re adding new venues every week.</p>
            <Link
              href="/bars"
              className="mt-6 inline-block text-sm font-medium px-6 py-2 rounded-full border border-white/20 text-white/60 hover:text-white transition-colors"
            >
              Browse all bars →
            </Link>
          </div>
        )}
      </section>

      {/* List your bar CTA */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>Bar Owners</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Does your bar show {flag} {team} matches?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Get listed and reach thousands of {team} fans looking for their matchday home in LA. Paid featured listings available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-200"
              style={{ background: '#00c853', color: '#000' }}
            >
              List your bar free →
            </Link>
            <Link
              href="/promote"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm border border-white/20 text-white hover:bg-white/5 transition-all duration-200"
            >
              See paid options →
            </Link>
          </div>
        </div>
      </section>

      {/* Other nationalities */}
      <section className="border-t border-white/10" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-lg font-bold text-white mb-6 text-center">Bars for other nationalities</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {relatedTeams.map((t) => (
              <Link
                key={t}
                href={`/team/${t.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
              >
                {TEAM_FLAGS[t]} {t}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
