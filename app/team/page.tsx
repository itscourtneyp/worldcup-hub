import Link from 'next/link'
import { NATIONALITIES, TEAM_FLAGS, Team } from '@/lib/types'
import { bars } from '@/lib/bars'

export const metadata = {
  title: 'World Cup 2026 Bars by Nationality — Los Angeles | World Cup Hub LA',
  description:
    'Find the best bars in Los Angeles for every World Cup 2026 nationality. Argentina, Brazil, Mexico, England, USA and more — filtered by your team.',
  openGraph: {
    title: 'Watch the World Cup with Your Community in LA',
    description: 'Find bars for every World Cup 2026 nationality in Los Angeles.',
    url: 'https://worldcup-hub.vercel.app/team',
    siteName: 'World Cup Hub LA',
  },
  alternates: {
    canonical: 'https://worldcup-hub.vercel.app/team',
  },
}

export default function TeamIndexPage() {
  const teamStats = NATIONALITIES.map((team) => {
    const count = bars.filter((b) => b.teams.includes(team as Team)).length
    return { team: team as Team, count }
  }).sort((a, b) => b.count - a.count)

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00c853' }} />
            World Cup 2026 · Los Angeles
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            Find Bars by <span style={{ color: '#00c853' }}>Nationality</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Every nation has its spot. Pick your team and find where your community watches the World Cup in LA.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamStats.map(({ team, count }) => {
            const slug = team.toLowerCase().replace(/\s+/g, '-')
            return (
              <Link
                key={team}
                href={`/team/${slug}`}
                className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-200"
                style={{ background: '#0a0a0a' }}
              >
                <span className="text-4xl leading-none shrink-0">{TEAM_FLAGS[team]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base group-hover:text-[#00c853] transition-colors">{team}</p>
                  <p className="text-white/40 text-sm">
                    {count} {count === 1 ? 'bar' : 'bars'} in LA
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Don&apos;t see your country?</h2>
          <p className="text-white/50 mb-8">
            We&apos;re adding new bars and nationalities every week. Browse the full directory or list your bar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bars"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-sm transition-all duration-200"
              style={{ background: '#00c853', color: '#000' }}
            >
              Browse all bars →
            </Link>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-sm border border-white/20 text-white hover:bg-white/5 transition-all duration-200"
            >
              List your bar →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
