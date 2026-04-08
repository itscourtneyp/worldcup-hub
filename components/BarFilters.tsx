'use client'

import { Neighbourhood, Team, Vibe, TEAM_FLAGS, NATIONALITIES } from '@/lib/types'

const NEIGHBOURHOODS: Neighbourhood[] = [
  'Hollywood', 'Silver Lake', 'Santa Monica', 'Downtown',
  'WeHo', 'Venice', 'Echo Park', 'Koreatown',
  'Los Feliz', 'Mid-City', 'Highland Park', 'Valley',
]

const VIBES: { value: Vibe; label: string }[] = [
  { value: 'rowdy', label: 'Rowdy' },
  { value: 'electric', label: 'Electric' },
  { value: 'chill', label: 'Chill' },
  { value: 'local', label: 'Local' },
]

interface Props {
  neighbourhood: string
  team: string
  vibe: string
  search: string
  onNeighbourhood: (v: string) => void
  onTeam: (v: string) => void
  onVibe: (v: string) => void
  onSearch: (v: string) => void
}

export default function BarFilters({
  neighbourhood, team, vibe, search,
  onNeighbourhood, onTeam, onVibe, onSearch,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search bars..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 border border-white/10 focus:outline-none transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: search ? '#00c853' : undefined }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Nationality */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Nationality</label>
          <select
            value={team}
            onChange={(e) => onTeam(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ background: '#111111' }}
          >
            <option value="">All Nationalities</option>
            {NATIONALITIES.map((t) => (
              <option key={t} value={t}>{TEAM_FLAGS[t]} {t}</option>
            ))}
          </select>
        </div>

        {/* Neighbourhood */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Neighbourhood</label>
          <select
            value={neighbourhood}
            onChange={(e) => onNeighbourhood(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ background: '#111111' }}
          >
            <option value="">All Neighbourhoods</option>
            {NEIGHBOURHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Vibe */}
        <div>
          <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Vibe</label>
          <select
            value={vibe}
            onChange={(e) => onVibe(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ background: '#111111' }}
          >
            <option value="">All Vibes</option>
            {VIBES.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter pills */}
      {(neighbourhood || team || vibe) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {team && (
            <span className="flex items-center gap-1 text-xs rounded-full px-3 py-1" style={{ background: 'rgba(0,200,83,0.15)', color: '#00c853', border: '1px solid rgba(0,200,83,0.3)' }}>
              {TEAM_FLAGS[team as Team]} {team}
              <button onClick={() => onTeam('')} className="ml-1 hover:text-white">&times;</button>
            </span>
          )}
          {neighbourhood && (
            <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1">
              {neighbourhood}
              <button onClick={() => onNeighbourhood('')} className="ml-1 hover:text-white">&times;</button>
            </span>
          )}
          {vibe && (
            <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-3 py-1">
              {VIBES.find(v => v.value === vibe)?.label}
              <button onClick={() => onVibe('')} className="ml-1 hover:text-white">&times;</button>
            </span>
          )}
          <button
            onClick={() => { onNeighbourhood(''); onTeam(''); onVibe(''); }}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
