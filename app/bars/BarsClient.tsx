'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import BarCard from '@/components/BarCard'
import BarFilters from '@/components/BarFilters'
import { bars } from '@/lib/bars'
import { Team } from '@/lib/types'

export default function BarsClient() {
  const searchParams = useSearchParams()

  const [neighbourhood, setNeighbourhood] = useState('')
  const [team, setTeam] = useState('')
  const [vibe, setVibe] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (searchParams.get('neighbourhood')) setNeighbourhood(searchParams.get('neighbourhood')!)
    if (searchParams.get('team')) setTeam(searchParams.get('team')!)
    if (searchParams.get('vibe')) setVibe(searchParams.get('vibe')!)
  }, [searchParams])

  const filtered = useMemo(() => {
    return bars
      .filter((bar) => {
        if (neighbourhood && bar.neighbourhood !== neighbourhood) return false
        if (team && !bar.teams.includes(team as Team)) return false
        if (vibe && bar.vibe !== vibe) return false
        if (search) {
          const q = search.toLowerCase()
          if (
            !bar.name.toLowerCase().includes(q) &&
            !bar.neighbourhood.toLowerCase().includes(q) &&
            !bar.about.toLowerCase().includes(q)
          )
            return false
        }
        return true
      })
      .sort((a, b) => {
        if (a.promoted && !b.promoted) return -1
        if (!a.promoted && b.promoted) return 1
        return b.vibeRating - a.vibeRating
      })
  }, [neighbourhood, team, vibe, search])

  const heading = team
    ? `Where ${team} fans watch in LA`
    : 'All Bars'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#00c853' }}>Los Angeles</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{heading}</h1>
        <p className="text-white/50 text-lg">
          {filtered.length} bar{filtered.length !== 1 ? 's' : ''} showing World Cup 2026 matches
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 p-6 mb-10" style={{ background: '#0a0a0a' }}>
        <BarFilters
          neighbourhood={neighbourhood}
          team={team}
          vibe={vibe}
          search={search}
          onNeighbourhood={setNeighbourhood}
          onTeam={setTeam}
          onVibe={setVibe}
          onSearch={setSearch}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">⚽</p>
          <h3 className="text-white font-bold text-xl mb-2">No bars found</h3>
          <p className="text-white/50">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((bar) => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>
      )}
    </div>
  )
}
