import { Suspense } from 'react'
import BarsClient from './BarsClient'

export const metadata = {
  title: 'Bar Directory — World Cup Hub LA',
  description: 'Browse all LA bars showing World Cup 2026 matches. Filter by neighbourhood, team, and vibe.',
}

export default function BarsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-white/5 rounded-xl w-64" />
          <div className="h-6 bg-white/5 rounded w-48" />
        </div>
      </div>
    }>
      <BarsClient />
    </Suspense>
  )
}
