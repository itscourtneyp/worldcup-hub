import Link from 'next/link'
import { Metadata } from 'next'
import { LA_MATCHES, Match } from '@/lib/matches'

export const metadata: Metadata = {
  title: 'World Cup 2026 LA Match Schedule — Find a Bar for Every Game | World Cup Hub LA',
  description:
    'Full FIFA World Cup 2026 schedule at SoFi Stadium, Los Angeles. Find the best bars to watch every match — USA vs Paraguay, Belgium vs Iran, and more. 8 matches at SoFi.',
  openGraph: {
    title: 'World Cup 2026 LA Match Schedule — Find a Bar for Every Game',
    description:
      '8 matches at SoFi Stadium, LA. See every date, kickoff time, and find where your community is watching.',
    url: 'https://worldcup-hub.vercel.app/matches',
    siteName: 'World Cup Hub LA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Cup 2026 Los Angeles Match Schedule',
    description: '8 matches at SoFi Stadium — find the best bar for every game in LA.',
  },
  alternates: {
    canonical: 'https://worldcup-hub.vercel.app/matches',
  },
}



const STAGE_STYLE: Record<string, string> = {
  group: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  knockout: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
}

export default function MatchesPage() {
  const groupMatches = LA_MATCHES.filter((m) => m.stage === 'group')
  const knockoutMatches = LA_MATCHES.filter((m) => m.stage === 'knockout')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#00c853' }}>
          SoFi Stadium · Inglewood · LA
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
          World Cup 2026<br />
          <span style={{ color: '#00c853' }}>Los Angeles Schedule</span>
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
          8 matches at SoFi Stadium in Inglewood. Find the best LA bar to watch every game — whether you&apos;re backing the USMNT, supporting your home nation, or just want the best atmosphere in the city.
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="rounded-2xl p-5 mb-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0d1b35, #1a0a0e)', border: '1px solid rgba(0,200,83,0.2)' }}
      >
        {[
          { stat: '8', label: 'Matches at SoFi' },
          { stat: '5', label: 'Group stage games' },
          { stat: 'June 12', label: 'First LA match' },
          { stat: 'July 10', label: 'Quarterfinal' },
        ].map(({ stat, label }) => (
          <div key={label}>
            <p className="text-3xl font-black" style={{ color: '#00c853' }}>{stat}</p>
            <p className="text-white/50 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Group Stage */}
      <section className="mb-14">
        <h2 className="text-white font-black text-2xl mb-6 flex items-center gap-2">
          <span className="text-white/40 text-lg">Group Stage</span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            June 12–25
          </span>
        </h2>
        <div className="space-y-4">
          {groupMatches.map((match) => (
            <MatchCard key={match.date} match={match} />
          ))}
        </div>
      </section>

      {/* Knockout Stage */}
      <section className="mb-14">
        <h2 className="text-white font-black text-2xl mb-6 flex items-center gap-2">
          <span className="text-white/40 text-lg">Knockout Rounds</span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            June 28–July 10
          </span>
        </h2>
        <div className="space-y-4">
          {knockoutMatches.map((match) => (
            <MatchCard key={match.date} match={match} />
          ))}
        </div>
      </section>

      {/* FAQ / SEO section */}
      <section
        className="rounded-3xl border border-white/10 p-8 md:p-10 mb-12"
        style={{ background: '#0d1520' }}
      >
        <h2 className="text-white font-black text-2xl mb-6">
          Where to watch World Cup 2026 in Los Angeles
        </h2>
        <div className="space-y-5 text-white/60 leading-relaxed text-sm">
          <p>
            <strong className="text-white">SoFi Stadium</strong> in Inglewood hosts all 8 LA matches — but for every fan inside the stadium, dozens more are watching from bars across the city. World Cup Hub LA maps the best bars by nationality, neighbourhood, and vibe so you can find your people.
          </p>
          <p>
            <strong className="text-white">USA fans</strong> — head to Sonny McLean&apos;s in Santa Monica, Ye Olde Kings Head, or Busby&apos;s East for packed American Outlaws atmospheres. The USMNT plays at SoFi on June 12 and June 25.
          </p>
          <p>
            <strong className="text-white">Mexican fans</strong> — Boyle Heights, East LA, and Mid-City have the strongest El Tri energy. Escorpión on Melrose and bars along Olympic Blvd in East LA are the cultural centres.
          </p>
          <p>
            <strong className="text-white">British & Irish fans</strong> — Ye Olde Kings Head in Santa Monica has been the English expat hub since 1974. Joxer Daly&apos;s in Culver City and Sonny McLean&apos;s carry strong Irish/British followings.
          </p>
          <p>
            <strong className="text-white">Argentine fans</strong> — LALA&apos;s Argentine Grill in Hollywood is the unofficial home of the Argentine community in LA. Expect Spanish commentary and Malbec all round.
          </p>
          <p>
            <strong className="text-white">Korean fans</strong> — Koreatown is the obvious base — The Stadium Club has 24 screens and pulls massive crowds when South Korea plays.
          </p>
          <p>
            All bars in our directory open early for morning kickoffs. Filter by <Link href="/team" className="underline text-white/80 hover:text-white">nationality</Link>, <Link href="/bars" className="underline text-white/80 hover:text-white">neighbourhood</Link>, or vibe to find your match-day home.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div
        className="rounded-3xl p-10 text-center"
        style={{
          background: 'linear-gradient(135deg, #0a1a10, #0d2212)',
          border: '1px solid rgba(0,200,83,0.3)',
        }}
      >
        <p className="text-4xl mb-4">⚽</p>
        <h2 className="text-white font-black text-3xl mb-3">Find your matchday bar</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          42 bars mapped across LA. Filter by the team you&apos;re backing, where you live, and the vibe you want.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bars"
            className="inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-full transition-colors text-black"
            style={{ background: '#00c853' }}
          >
            Browse All Bars →
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Filter by Nationality
          </Link>
        </div>
      </div>
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const isKnockout = match.stage === 'knockout'
  return (
    <div
      className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-200"
      style={{
        background: match.isUSA
          ? 'linear-gradient(135deg, #0a1535, #0d1b2a)'
          : 'linear-gradient(135deg, #111827, #0d1520)',
        border: match.isUSA
          ? '1px solid rgba(59,130,246,0.4)'
          : isKnockout
          ? '1px solid rgba(245,158,11,0.3)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Date */}
      <div className="shrink-0 text-center md:w-24">
        <p className="text-white font-black text-lg leading-tight">{match.dateShort}</p>
        {match.timeDisplay !== 'TBC' && (
          <p className="text-white/40 text-xs mt-0.5">{match.timeDisplay}</p>
        )}
      </div>

      {/* Match */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1.5">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STAGE_STYLE[match.stage]}`}>
            {match.group}
          </span>
          {match.isUSA && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              🇺🇸 USA Match
            </span>
          )}
        </div>
        <h3 className="text-white font-black text-xl md:text-2xl">
          {isKnockout ? (
            <span className="flex items-center gap-2">
              <span>{match.flagA}</span>
              <span className="text-white/40 font-normal text-base">TBD</span>
              <span className="text-white/30 text-lg">vs</span>
              <span className="text-white/40 font-normal text-base">TBD</span>
              <span>{match.flagB}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 flex-wrap">
              <span>{match.flagA}</span>
              <span>{match.teamA}</span>
              <span className="text-white/30 font-normal text-base">vs</span>
              <span>{match.teamB}</span>
              <span>{match.flagB}</span>
            </span>
          )}
        </h3>
        {match.highlight && (
          <p className="text-white/50 text-sm mt-1">{match.highlight}</p>
        )}
      </div>

      {/* CTA */}
      <div className="shrink-0">
        <Link
          href={`/matches/${match.slug}`}
          className="inline-flex items-center justify-center font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          View match →
        </Link>
      </div>
    </div>
  )
}
