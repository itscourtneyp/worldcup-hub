import Link from 'next/link'
import BarCard from '@/components/BarCard'
import NationalitySelector from '@/components/NationalitySelector'
import { getFeaturedBars, bars } from '@/lib/bars'
import { NATIONALITIES } from '@/lib/types'

export default function HomePage() {
  const featured = getFeaturedBars()
  const totalBars = bars.length
  const totalNationalities = new Set(bars.flatMap((b) => b.teams)).size
  const totalNeighbourhoods = new Set(bars.map((b) => b.neighbourhood)).size

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #00c853, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #00c853, transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00c853' }} />
            World Cup 2026 &middot; Los Angeles
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Where does{' '}
            <span style={{ color: '#00c853' }}>[your nationality]</span>
            <br />
            watch the World Cup in LA?
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Find the bars where your community gathers. Filter by nationality, neighbourhood, and vibe.
          </p>

          <NationalitySelector />

          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-16 text-center">
            {[
              { num: String(totalBars), label: 'LA Bars Listed' },
              { num: String(totalNationalities), label: 'Nationalities' },
              { num: String(totalNeighbourhoods), label: 'Neighbourhoods' },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-black text-white">{num}</span>
                <span className="text-white/40 text-sm mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick nationality shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: '🇦🇷 Argentina', href: '/team/argentina' },
            { label: '🇧🇷 Brazil', href: '/team/brazil' },
            { label: '🇲🇽 Mexico', href: '/team/mexico' },
            { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', href: '/team/england' },
            { label: '🇺🇸 USA', href: '/team/usa' },
            { label: '🇰🇷 South Korea', href: '/team/south-korea' },
            { label: '🇫🇷 France', href: '/team/france' },
            { label: '🇩🇪 Germany', href: '/team/germany' },
            { label: '🇵🇹 Portugal', href: '/team/portugal' },
            { label: '🇨🇴 Colombia', href: '/team/colombia' },
            { label: '🇯🇵 Japan', href: '/team/japan' },
            { label: '🇮🇪 Ireland', href: '/team/ireland' },
            { label: '🇪🇸 Spain', href: '/team/spain' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Neighbourhood */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Browse by Neighbourhood</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: '📍 Hollywood', href: '/neighbourhood/hollywood' },
            { label: '📍 Koreatown', href: '/neighbourhood/koreatown' },
            { label: '📍 Santa Monica', href: '/neighbourhood/santa-monica' },
            { label: '📍 Downtown', href: '/neighbourhood/downtown' },
            { label: '📍 East LA', href: '/neighbourhood/east-la' },
            { label: '📍 Silver Lake', href: '/neighbourhood/silver-lake' },
            { label: '📍 Venice', href: '/neighbourhood/venice' },
            { label: '📍 Mid-City', href: '/neighbourhood/mid-city' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Bars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>Featured</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Top Bars This World Cup</h2>
          </div>
          <Link href="/bars" className="text-white/50 hover:text-white text-sm font-medium transition-colors hidden sm:block">
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((bar) => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/bars"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200"
          >
            Browse all bars &rarr;
          </Link>
        </div>
      </section>

      {/* LA Matches at SoFi Stadium */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>SoFi Stadium · Los Angeles</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">World Cup Matches in LA</h2>
            <p className="text-white/40 text-sm mt-3 max-w-xl mx-auto">8 matches at SoFi Stadium. Find your bar before tickets sell out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { date: 'Jun 12', match: 'USA vs Paraguay', round: 'Group Stage', flag1: '🇺🇸', flag2: '🇵🇾', hot: true, note: 'US Tournament Opener' },
              { date: 'Jun 15', match: 'Iran vs New Zealand', round: 'Group Stage', flag1: '🇮🇷', flag2: '🇳🇿', hot: false, note: 'Group G' },
              { date: 'Jun 18', match: 'Switzerland vs Bosnia', round: 'Group Stage', flag1: '🇨🇭', flag2: '🇧🇦', hot: false, note: 'Group Stage' },
              { date: 'Jun 21', match: 'Belgium vs Iran', round: 'Group Stage', flag1: '🇧🇪', flag2: '🇮🇷', hot: false, note: 'Group Stage' },
              { date: 'Jun 25', match: 'USA vs Turkey', round: 'Group Stage', flag1: '🇺🇸', flag2: '🇹🇷', hot: true, note: 'Second US Match in LA' },
              { date: 'Jun 28', match: 'TBD Group Match', round: 'Group Stage', flag1: '⚽', flag2: '⚽', hot: false, note: 'Group Stage' },
              { date: 'Jul 2', match: 'TBD Knockout Match', round: 'Round of 32', flag1: '⚽', flag2: '⚽', hot: false, note: 'Knockout Round' },
              { date: 'Jul 10', match: 'TBD Semifinal', round: 'Semifinal', flag1: '⚽', flag2: '⚽', hot: true, note: 'Global Spotlight' },
            ].map(({ date, match, round, flag1, flag2, hot, note }) => (
              <div
                key={date + match}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
                style={{
                  background: hot ? 'rgba(0,200,83,0.05)' : '#0a0a0a',
                  borderColor: hot ? 'rgba(0,200,83,0.3)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-center min-w-[52px]">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: hot ? '#00c853' : 'rgba(255,255,255,0.4)' }}>
                    {date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <span>{flag1}</span>
                  <span className="text-white/30 text-sm">vs</span>
                  <span>{flag2}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{match}</p>
                  <p className="text-white/40 text-xs">{round} · {note}</p>
                </div>
                {hot && (
                  <span className="text-xs font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: 'rgba(0,200,83,0.15)', color: '#00c853' }}>🔥 Big Day</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/bars"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-200"
              style={{ background: '#00c853', color: '#000' }}
            >
              Find your matchday bar →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>Simple</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Find your perfect matchday bar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pick Your Nationality', desc: 'Select your country from the dropdown. We\'ll show you where your community watches.' },
              { step: '02', title: 'Browse & Filter', desc: 'Explore bars by neighbourhood, vibe, capacity, and features like outdoor screens and commentary language.' },
              { step: '03', title: 'Show Up & Celebrate', desc: 'Head to your bar, order a round, and enjoy the beautiful game with fellow fans.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-6 rounded-2xl border border-white/8" style={{ background: '#0a0a0a' }}>
                <span className="absolute top-4 right-4 font-black text-4xl leading-none" style={{ color: 'rgba(0,200,83,0.1)' }}>{step}</span>
                <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
