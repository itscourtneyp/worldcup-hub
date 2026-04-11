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
      {/* Full-bleed Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#062117]">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A5C2F] via-[#062117] to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(10,92,47,0.25),transparent)]" />

        {/* Subtle field pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.4) 59px, rgba(255,255,255,0.4) 60px)',
          }}
        />

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-20 md:py-0 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-[#D4AF37]/30 rounded-full px-5 py-2 text-sm font-semibold tracking-wide text-[#D4AF37] mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              FIFA World Cup 2026 &middot; Los Angeles
            </div>

            <h1 className="text-[2.75rem] sm:text-6xl md:text-[5.25rem] font-black text-white leading-[1.04] tracking-[-0.02em] mb-6">
              Where your
              <br />
              <span className="text-[#D4AF37]">nation</span> watches
              <br />
              the World Cup.
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-lg leading-relaxed mb-10">
              Discover the LA bars where your community gathers on matchday. Filter by nationality, neighbourhood, and vibe.
            </p>

            <NationalitySelector />
          </div>

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

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
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
            { label: '🇦🇺 Australia', href: '/team/australia' },
            { label: '🇦🇹 Austria', href: '/team/austria' },
            { label: '🇵🇪 Peru', href: '/team/peru' },
            { label: '🇨🇦 Canada', href: '/team/canada' },
            { label: '🇳🇱 Netherlands', href: '/team/netherlands' },
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
      <section className="bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">Featured Picks</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Top bars this<br className="hidden sm:block" /> World Cup
              </h2>
            </div>
            <Link
              href="/bars"
              className="text-white/40 hover:text-[#D4AF37] text-sm font-semibold transition-colors duration-300 hidden sm:flex items-center gap-1.5"
            >
              View all <span className="text-base">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((bar) => (
              <BarCard key={bar.id} bar={bar} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/bars"
              className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#c9a432] text-[#0d0d0d] font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Browse All Bars <span className="text-base">&rarr;</span>
            </Link>
          </div>
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
      <section className="relative bg-[#080808] border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(10,92,47,0.08),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Find your matchday bar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Pick Your Nationality',
                desc: "Select your country from the dropdown. We'll show you where your community watches.",
              },
              {
                step: '02',
                title: 'Browse & Filter',
                desc: 'Explore bars by neighbourhood, vibe, capacity, and features like outdoor screens and commentary language.',
              },
              {
                step: '03',
                title: 'Show Up & Celebrate',
                desc: 'Head to your bar, order a round, and enjoy the beautiful game with fellow fans.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="group relative p-7 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#D4AF37]/20 transition-all duration-500"
              >
                <span className="block text-[#D4AF37]/20 font-black text-6xl leading-none mb-5 group-hover:text-[#D4AF37]/30 transition-colors duration-500">
                  {step}
                </span>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#0A5C2F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_50%,rgba(212,175,55,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(255,255,255,0.04),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            The world&apos;s game.<br />Your city. Your bar.
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-8 text-sm sm:text-base">
            World Cup 2026 kicks off June 11 in Los Angeles. Find your spot before the crowds do.
          </p>
          <Link
            href="/bars"
            className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#c9a432] text-[#0A5C2F] font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide uppercase"
          >
            Explore Bars Now <span className="text-base">&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  )
}
