import { Metadata } from 'next'
import Link from 'next/link'
import { bars } from '@/lib/bars'
import { NATIONALITIES, TEAM_FLAGS, Team } from '@/lib/types'
import BarMapWrapper from '@/components/BarMapWrapper'

export const metadata: Metadata = {
  title: 'World Cup 2026 Bar Map — Los Angeles | World Cup Hub LA',
  description:
    'Interactive map of every bar showing World Cup 2026 matches in Los Angeles. Find your nation\'s spot in Hollywood, Koreatown, Santa Monica, East LA and beyond.',
  keywords: [
    'world cup 2026 bar map los angeles',
    'where to watch world cup la map',
    'world cup bars near me los angeles',
    'world cup watch party map LA 2026',
  ].join(', '),
  openGraph: {
    title: 'World Cup 2026 Bar Map — Los Angeles',
    description: 'Find every World Cup bar in LA on an interactive map. Filter by nationality, neighbourhood, and vibe.',
    url: 'https://worldcup-hub.vercel.app/map',
    siteName: 'World Cup Hub LA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Cup 2026 Bar Map — Los Angeles',
    description: 'Interactive map of LA World Cup bars. Find your nation\'s spot.',
  },
  alternates: {
    canonical: 'https://worldcup-hub.vercel.app/map',
  },
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function MapPage() {
  const barsWithCoords = bars.filter((b) => b.lat && b.lng)
  const totalNeighbourhoods = new Set(bars.map((b) => b.neighbourhood)).size

  // Top teams by bar count
  const teamCounts: Partial<Record<Team, number>> = {}
  for (const bar of bars) {
    for (const team of bar.teams) {
      teamCounts[team] = (teamCounts[team] ?? 0) + 1
    }
  }
  const topTeams = (Object.entries(teamCounts) as [Team, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
          Interactive Map
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          World Cup Bars<br />
          <span className="text-[#D4AF37]">Across LA</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
          {barsWithCoords.length} bars mapped across {totalNeighbourhoods} LA neighbourhoods.
          Click any pin to see bar details and find your nation's spot.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { num: `${barsWithCoords.length}+`, label: 'Bars on map' },
          { num: `${totalNeighbourhoods}`, label: 'Neighbourhoods' },
          { num: `${NATIONALITIES.length}`, label: 'Nations covered' },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="rounded-2xl p-4 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-2xl font-black text-white">{num}</div>
            <div className="text-white/40 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* The map */}
      <div className="mb-10">
        <BarMapWrapper bars={barsWithCoords} />
      </div>

      {/* Quick filter by nationality */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Filter by Nation</h2>
        <div className="flex flex-wrap gap-2">
          {topTeams.map(([team, count]) => (
            <Link
              key={team}
              href={`/team/${toSlug(team)}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e5e7eb',
              }}
            >
              <span>{TEAM_FLAGS[team]}</span>
              <span>{team}</span>
              <span className="text-white/40 font-normal">{count}</span>
            </Link>
          ))}
          <Link
            href="/team"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-[#D4AF37]"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            All nations →
          </Link>
        </div>
      </section>

      {/* CTA for bar owners */}
      <div
        className="rounded-3xl p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #0A2A14 0%, #062117 100%)',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <h3 className="text-2xl font-black text-white mb-3">
          Own a bar? <span className="text-[#D4AF37]">Get on the map.</span>
        </h3>
        <p className="text-white/50 mb-6 max-w-md mx-auto">
          Free listings available. Featured spots get priority placement, a dedicated profile, and 2× weekly social promotion during the tournament.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/claim"
            className="px-6 py-3 rounded-xl font-bold text-black text-sm"
            style={{ background: '#D4AF37' }}
          >
            Claim your listing — free
          </Link>
          <Link
            href="/promote"
            className="px-6 py-3 rounded-xl font-bold text-[#D4AF37] text-sm"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
          >
            See Featured tier →
          </Link>
        </div>
      </div>
    </div>
  )
}
