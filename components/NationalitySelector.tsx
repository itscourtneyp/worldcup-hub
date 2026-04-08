'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NATIONALITIES, TEAM_FLAGS, Team } from '@/lib/types'

export default function NationalitySelector() {
  const [selected, setSelected] = useState<Team | ''>('')
  const router = useRouter()

  function handleGo() {
    if (selected) {
      router.push(`/bars?team=${encodeURIComponent(selected)}`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as Team | '')}
        className="w-full sm:flex-1 px-4 py-3.5 rounded-xl text-base text-white border border-white/20 focus:outline-none appearance-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <option value="">Choose a nationality...</option>
        {NATIONALITIES.map((t) => (
          <option key={t} value={t}>{TEAM_FLAGS[t]} {t}</option>
        ))}
      </select>
      <button
        onClick={handleGo}
        disabled={!selected}
        className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold text-black transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: selected ? '#00c853' : '#00c853' }}
      >
        Find Bars
      </button>
    </div>
  )
}
