import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { LA_MATCHES, getMatchBySlug } from '@/lib/matches'
import { bars, getBarsByTeam } from '@/lib/bars'
import { TEAM_FLAGS, Team } from '@/lib/types'

export async function generateStaticParams() {
  return LA_MATCHES.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const match = getMatchBySlug(slug)
  if (!match) return { title: 'Match Not Found' }

  return {
    title: match.seoTitle,
    description: match.seoDescription,
    keywords: match.keywords.join(', '),
    openGraph: {
      title: match.seoTitle,
      description: match.seoDescription,
      url: `https://worldcup-hub.vercel.app/matches/${match.slug}`,
      siteName: 'World Cup Hub LA',
    },
    twitter: {
      card: 'summary_large_image',
      title: match.seoTitle,
      description: match.seoDescription,
    },
    alternates: {
      canonical: `https://worldcup-hub.vercel.app/matches/${match.slug}`,
    },
  }
}

// Build team flags string for a bar
function barTeamFlags(teams: Team[]): string {
  return teams.map((t) => TEAM_FLAGS[t] ?? '').join(' ')
}

// FAQ items per match
function getMatchFAQs(match: ReturnType<typeof getMatchBySlug>) {
  if (!match) return []
  const isKnockout = match.stage === 'knockout'
  const isUSA = match.isUSA

  const faqs = [
    {
      q: `Where can I watch ${match.teams} in Los Angeles?`,
      a: `The best bars to watch ${match.teams} in LA are spread across the city — from Santa Monica and Hollywood to Koreatown and Downtown. Use World Cup Hub LA to filter by neighbourhood or supported team to find your perfect matchday spot near you.`,
    },
    {
      q: `What time does ${match.teams} kick off in LA?`,
      a:
        match.timeDisplay !== 'TBC'
          ? `${match.teams} kicks off at ${match.timeDisplay} Pacific Time at ${match.venue}.`
          : `The exact kickoff time for ${match.teams} at ${match.venue} is to be confirmed (TBC). Check back closer to the date for the official kickoff time.`,
    },
    {
      q: isUSA
        ? 'Which LA bars are best for USMNT fans?'
        : `Do LA bars show ${match.teams}?`,
      a: isUSA
        ? "LA's best USMNT bars include Sonny McLean's in Santa Monica, Ye Olde Kings Head, and Busby's East in Mid-City — all known for packed American Outlaws atmospheres. With the World Cup hosted in LA, these spots fill up early on USA matchdays."
        : `Yes — most sports bars in LA will show all World Cup 2026 matches at SoFi Stadium. Browse our full bar directory to find venues near you showing ${match.teams}.`,
    },
    {
      q: isKnockout
        ? 'Where are the best World Cup knockout match bars in LA?'
        : `What is ${match.group} at the 2026 World Cup?`,
      a: isKnockout
        ? 'For knockout rounds, the atmosphere at LA bars peaks dramatically. Top spots for knockout match viewing include The Stadium Club in Koreatown (24 screens), Sonny McLean\'s in Santa Monica, and Ye Olde Kings Head — all of which stay open for extended hours during later rounds.'
        : `${match.group} is one of the group stage sections at the 2026 FIFA World Cup. ${match.venue} is hosting ${match.group} matches as part of the 8-match schedule at the Los Angeles venue.`,
    },
  ]

  return faqs
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const match = getMatchBySlug(slug)
  if (!match) notFound()

  const matchIndex = LA_MATCHES.findIndex((m) => m.slug === slug)
  const prevMatch = matchIndex > 0 ? LA_MATCHES[matchIndex - 1] : null
  const nextMatch = matchIndex < LA_MATCHES.length - 1 ? LA_MATCHES[matchIndex + 1] : null

  // Bars for this match
  const matchBars =
    match.barTeams.length > 0
      ? getBarsByTeam(match.barTeams[0] as Team)
      : bars.sort((a, b) => b.vibeRating - a.vibeRating).slice(0, 6)

  const faqs = getMatchFAQs(match)

  const isKnockout = match.stage === 'knockout'

  // JSON-LD SportsEvent schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: match.teams,
    description: match.seoDescription,
    startDate: match.timeDisplay !== 'TBC' ? `${match.date}T15:00:00-07:00` : match.date,
    location: {
      '@type': 'Place',
      name: 'SoFi Stadium',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1011 S Prairie Ave',
        addressLocality: 'Inglewood',
        addressRegion: 'CA',
        postalCode: '90301',
        addressCountry: 'US',
      },
    },
    sport: 'Soccer',
    url: `https://worldcup-hub.vercel.app/matches/${match.slug}`,
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00c853, transparent)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/matches" className="hover:text-white transition-colors">Matches</Link>
            <span>/</span>
            <span className="text-white/70">{match.teams}</span>
          </nav>

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                match.stage === 'group'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
              }`}
            >
              {match.group}
            </span>
            {match.isUSA && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                🇺🇸 USA Match
              </span>
            )}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
              {match.venue}
            </span>
          </div>

          {/* Teams */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 mb-4 flex-wrap">
              <div className="text-center">
                <div className="text-6xl md:text-8xl leading-none mb-2">{match.flagA}</div>
                <p className="text-white font-black text-xl md:text-2xl">{match.teamA}</p>
              </div>
              <div className="text-center px-4">
                <p className="text-white/30 text-2xl md:text-4xl font-light">vs</p>
                <p className="text-white/40 text-xs mt-1 font-medium">{match.dateShort}</p>
                {match.timeDisplay !== 'TBC' && (
                  <p className="text-white/30 text-xs">{match.timeDisplay}</p>
                )}
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-8xl leading-none mb-2">{match.flagB}</div>
                <p className="text-white font-black text-xl md:text-2xl">{match.teamB}</p>
              </div>
            </div>

            {match.highlight && (
              <div
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(0,200,83,0.15)', border: '1px solid rgba(0,200,83,0.3)', color: '#00c853' }}
              >
                {match.highlight}
              </div>
            )}

            {match.isUSA && (
              <div className="mt-4">
                <Link
                  href="/team/usa"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
                  style={{ background: '#00c853', color: '#000' }}
                >
                  🇺🇸 Find USMNT Bars →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bar Recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>
              Where to Watch
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {match.barTeams.length > 0
                ? `Best Bars for ${match.barTeams[0]} Fans in LA`
                : `Top Bars Showing ${match.teams}`}
            </h2>
          </div>
          <Link
            href="/bars"
            className="text-white/50 hover:text-white text-sm font-medium transition-colors hidden sm:block"
          >
            Browse all bars →
          </Link>
        </div>

        {matchBars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchBars.map((bar) => (
                <Link
                  key={bar.id}
                  href={`/bars/${bar.slug}`}
                  className="group rounded-2xl p-5 transition-all duration-200 hover:border-white/20"
                  style={{
                    background: 'linear-gradient(135deg, #111827, #0d1520)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-black text-lg group-hover:text-[#00c853] transition-colors leading-tight">
                        {bar.name}
                      </h3>
                      <p className="text-white/50 text-sm mt-0.5">{bar.neighbourhood}</p>
                    </div>
                    {bar.promoted && (
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
                        style={{ background: 'rgba(0,200,83,0.15)', color: '#00c853', border: '1px solid rgba(0,200,83,0.3)' }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-white/70 text-sm">{barTeamFlags(bar.teams)}</span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{bar.about}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-white/40">{bar.screens} screens</span>
                      <span className="text-white/20">·</span>
                      <span className="text-xs font-medium text-white/40 capitalize">{bar.vibe}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#00c853' }}>
                      View bar →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {match.barTeams.length === 0 && (
              <div className="text-center mt-8">
                <Link
                  href="/bars"
                  className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-full transition-colors text-black"
                  style={{ background: '#00c853' }}
                >
                  Browse All Bars →
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/40 text-lg">No specific bars listed yet for this match.</p>
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

      {/* FAQ / SEO */}
      <section
        className="border-t border-white/10"
        style={{ background: '#0d1520' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-white font-black text-2xl mb-8">
            {match.teams} — LA Watch Guide
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                <h3 className="text-white font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-t border-white/10" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between gap-4">
            {prevMatch ? (
              <Link
                href={`/matches/${prevMatch.slug}`}
                className="group flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:border-white/20 max-w-xs"
                style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-white/40 text-lg">←</span>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-0.5">Previous</p>
                  <p className="text-white font-bold text-sm group-hover:text-[#00c853] transition-colors">
                    {prevMatch.flagA} {prevMatch.teams} {prevMatch.flagB}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{prevMatch.dateShort}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/matches"
              className="text-white/40 hover:text-white text-sm font-medium transition-colors text-center"
            >
              All Matches
            </Link>

            {nextMatch ? (
              <Link
                href={`/matches/${nextMatch.slug}`}
                className="group flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:border-white/20 max-w-xs text-right"
                style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-0.5">Next</p>
                  <p className="text-white font-bold text-sm group-hover:text-[#00c853] transition-colors">
                    {nextMatch.flagA} {nextMatch.teams} {nextMatch.flagB}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{nextMatch.dateShort}</p>
                </div>
                <span className="text-white/40 text-lg">→</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA — List your bar */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>Bar Owners</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Showing {isKnockout ? 'the World Cup knockout rounds' : match.teams}?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Get listed and reach fans looking for a bar to watch in LA. Free listings available, paid featured spots too.
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
    </>
  )
}
