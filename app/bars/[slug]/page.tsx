import { notFound } from 'next/navigation'
import Link from 'next/link'
import { bars, getBarBySlug } from '@/lib/bars'
import { TEAM_FLAGS } from '@/lib/types'

export async function generateStaticParams() {
  return bars.map((bar) => ({ slug: bar.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bar = getBarBySlug(slug)
  if (!bar) return { title: 'Bar Not Found' }
  return {
    title: `${bar.name} — World Cup Hub LA`,
    description: bar.about.slice(0, 160),
  }
}

const VIBE_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  rowdy:    { label: 'Rowdy',    bg: 'rgba(239,68,68,0.15)',    text: '#fca5a5' },
  electric: { label: 'Electric', bg: 'rgba(234,179,8,0.15)',    text: '#fde047' },
  chill:    { label: 'Chill',    bg: 'rgba(59,130,246,0.15)',   text: '#93c5fd' },
  local:    { label: 'Local',    bg: 'rgba(34,197,94,0.15)',    text: '#86efac' },
}

export default async function BarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bar = getBarBySlug(slug)
  if (!bar) notFound()

  const vibe = VIBE_STYLES[bar.vibe]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/bars" className="hover:text-white transition-colors">Bars</Link>
        <span>/</span>
        <span className="text-white/70">{bar.name}</span>
      </nav>

      <div
        className="rounded-3xl overflow-hidden mb-8"
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-start gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1" style={{ background: 'rgba(0,200,83,0.15)', color: '#00c853' }}>
              {bar.neighbourhood}
            </span>
            <span
              className="text-xs font-bold rounded-full px-3 py-1"
              style={{ background: vibe.bg, color: vibe.text }}
            >
              {vibe.label}
            </span>
            {bar.promoted && (
              <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full px-3 py-1">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{bar.name}</h1>
          <p className="text-white/50 text-base mb-6">{bar.address}</p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-white/40 text-sm font-medium">Nationalities:</span>
            {bar.teams.map((team) => (
              <Link key={team} href={`/bars?team=${encodeURIComponent(team)}`} className="flex items-center gap-1.5 text-sm bg-white/5 border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 transition-colors">
                <span className="text-xl leading-none">{TEAM_FLAGS[team]}</span>
                <span className="text-white/70">{team}</span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Vibe Rating', value: `${bar.vibeRating.toFixed(1)} / 5.0` },
              { label: 'Capacity', value: `${bar.capacity} people` },
              { label: 'Screens', value: `${bar.screens}` },
              { label: 'Commentary', value: bar.features.commentaryLanguage },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 border border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-white/40 text-xs mb-1">{label}</p>
                <p className="text-white text-sm font-semibold leading-tight">{value}</p>
              </div>
            ))}
          </div>

          {bar.features.outdoorScreen && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm rounded-full px-3 py-1" style={{ background: 'rgba(0,200,83,0.1)', color: '#00c853' }}>
              Outdoor screen available
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 p-6" style={{ background: '#0a0a0a' }}>
            <h2 className="text-white font-bold text-xl mb-4">About</h2>
            <p className="text-white/60 leading-relaxed text-base">{bar.about}</p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="px-6 pt-6 pb-3">
              <h2 className="text-white font-bold text-xl">Location</h2>
            </div>
            <div
              className="relative h-64 flex items-center justify-center"
              style={{ background: 'linear-gradient(145deg, #050505, #111)' }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
              <div className="relative text-center">
                <p className="text-5xl mb-3">📍</p>
                <p className="text-white font-semibold text-sm">{bar.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(bar.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors"
                  style={{ color: '#00c853' }}
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: '#0a0a0a' }}>
            <h3 className="text-white font-bold text-base mb-4">Contact & Info</h3>
            <ul className="space-y-3 text-sm">
              {bar.phone && (
                <li className="flex items-start gap-2 text-white/60">
                  <a href={`tel:${bar.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">{bar.phone}</a>
                </li>
              )}
              {bar.website && (
                <li className="flex items-start gap-2 text-white/60">
                  <a href={bar.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors break-all">
                    {bar.website.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
              <li className="text-white/60">{bar.hours}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 p-5" style={{ background: '#0a0a0a' }}>
            <h3 className="text-white font-bold text-base mb-3">Atmosphere</h3>
            <div className="rounded-xl p-3 text-center" style={{ background: vibe.bg }}>
              <p className="font-bold text-lg" style={{ color: vibe.text }}>{vibe.label}</p>
              <p className="text-white/60 text-sm mt-1">{bar.vibeRating.toFixed(1)} / 5.0</p>
            </div>
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              {bar.vibe === 'rowdy' && 'Expect a loud, passionate crowd. Standing room only for big matches. Come early.'}
              {bar.vibe === 'electric' && 'High energy with singing and chanting. Great for groups who want the full matchday experience.'}
              {bar.vibe === 'chill' && 'Relaxed atmosphere — enjoy the game without the crush. Good for couples or casual fans.'}
              {bar.vibe === 'local' && 'A proper neighbourhood local. The regulars know their football and you\'ll feel at home.'}
            </p>
          </div>

          <div
            className="rounded-2xl p-5 text-center"
            style={{ background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.2)' }}
          >
            <p className="text-white/60 text-xs mb-3 leading-relaxed">Are you the owner of {bar.name}?</p>
            <Link
              href="/claim"
              className="block text-center text-black font-semibold text-sm py-2.5 rounded-xl transition-colors"
              style={{ background: '#00c853' }}
            >
              Claim This Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/bars" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
          &larr; Back to Bar Directory
        </Link>
      </div>
    </div>
  )
}
