import Link from 'next/link'
import { Bar, TEAM_FLAGS } from '@/lib/types'

const VIBE_STYLES: Record<string, { label: string; className: string }> = {
  rowdy:    { label: 'Rowdy',    className: 'bg-red-500/20 text-red-300 border-red-500/30' },
  electric: { label: 'Electric', className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  chill:    { label: 'Chill',    className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  local:    { label: 'Local',    className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
}

export default function BarCard({ bar }: { bar: Bar }) {
  const vibe = VIBE_STYLES[bar.vibe]

  return (
    <div
      className="card-hover relative rounded-2xl border border-white/8 overflow-hidden flex flex-col"
      style={{ background: '#0a0a0a' }}
    >
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Top row: neighbourhood + vibe */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#00c853' }}>
            {bar.neighbourhood}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 ${vibe.className}`}>
            {vibe.label}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-lg leading-tight">{bar.name}</h3>

        {/* Nationality flags */}
        <div className="flex flex-wrap gap-1.5">
          {bar.teams.map((team) => (
            <span
              key={team}
              title={team}
              className="text-xs bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-white/70"
            >
              {TEAM_FLAGS[team]} {team}
            </span>
          ))}
        </div>

        {/* Vibe rating + capacity */}
        <div className="flex items-center gap-4 text-sm text-white/50">
          <span title="Vibe rating" className="flex items-center gap-1">
            <span style={{ color: '#00c853' }}>&#9733;</span> {bar.vibeRating.toFixed(1)}
          </span>
          <span title="Capacity">
            {bar.capacity} capacity
          </span>
          <span title="Screens">
            {bar.screens} screens
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs text-white/40">
          {bar.features.outdoorScreen && (
            <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5">
              Outdoor screen
            </span>
          )}
          <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5">
            Commentary: {bar.features.commentaryLanguage}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={`/bars/${bar.slug}`}
            className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
