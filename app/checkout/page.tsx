'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

const TIER_INFO: Record<string, { name: string; price: string }> = {
  featured: { name: 'Featured', price: '$49/mo' },
  premium: { name: 'Premium', price: '$299/mo' },
}

function CheckoutFlow() {
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier') || 'featured'
  const info = TIER_INFO[tier] || TIER_INFO.featured

  const [status, setStatus] = useState<'loading' | 'fallback' | 'error'>('loading')

  useEffect(() => {
    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url
        } else {
          setStatus('fallback')
        }
      })
      .catch(() => {
        setStatus('error')
      })
  }, [tier])

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="w-12 h-12 border-4 border-white/20 border-t-red-500 rounded-full animate-spin" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Setting up your payment...</h1>
          <p className="text-white/50">
            {info.name} listing &middot; {info.price}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #111827, #0d1520)',
          border: '1px solid rgba(220,38,38,0.3)',
        }}
      >
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)' }}
        />
        <div className="p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-400 mb-2">
            {info.name} Listing
          </p>
          <p className="text-4xl font-black text-white mb-6">{info.price}</p>

          <h2 className="text-xl font-bold text-white mb-2">Pay by Invoice</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Reply to our outreach email and we&apos;ll send a payment link within 1 hour.
          </p>

          <a
            href={`mailto:hello@worldcuphubla.com?subject=${encodeURIComponent(`${info.name} Listing Payment`)}`}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-2xl transition-colors mb-4"
          >
            Email hello@worldcuphubla.com
          </a>

          <p className="text-white/30 text-xs">
            Once payment is confirmed, your listing goes live within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="w-12 h-12 border-4 border-white/20 border-t-red-500 rounded-full animate-spin" />
            <p className="text-white/50">Loading...</p>
          </div>
        }
      >
        <CheckoutFlow />
      </Suspense>
    </div>
  )
}
