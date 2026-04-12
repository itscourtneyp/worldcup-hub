'use client'

import dynamic from 'next/dynamic'
import type { Bar } from '@/lib/types'

const BarMapDynamic = dynamic(() => import('@/components/BarMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl flex items-center justify-center"
      style={{ height: '520px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="text-white/30 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin" />
        <span className="text-sm">Loading map…</span>
      </div>
    </div>
  ),
})

interface Props {
  bars: Bar[]
  selectedTeam?: string
}

export default function BarMapWrapper({ bars, selectedTeam }: Props) {
  return <BarMapDynamic bars={bars} selectedTeam={selectedTeam} />
}
