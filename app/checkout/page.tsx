'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const TIERS = {
  featured: { name: 'Featured', price: '$49', period: '/month' },
  premium: { name: 'Premium', price: '$299', period: '/month' },
}

type TierKey = keyof typeof TIERS

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { tier?: string }
}) {
  const tierKey = (searchParams.tier as TierKey) ?? 'featured'
  const tier = TIERS[tierKey] ?? TIERS.featured

  const [status, setStatus] = useState<'loading' | 'redirecting' | 'fallback' | 'error'>(
    'loading'
  )
  const [fallbackEmail, setFallbackEmail] = useState('hello@worldcuphubla.com')

  useEffect(() => {
    async function startCheckout() {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: tierKey }),
        })
        const data = await res.json()

        if (data.url) {
          setStatus('redirecting')
          window.location.href = data.url
        } else if (data.fallback) {
          setFallbackEmail(data.email || 'hello@worldcuphubla.com')
          setStatus('fallback')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('fallback')
      }
    }

    startCheckout()
  }, [tierKey])

  const mailtoSubject = encodeURIComponent(`Payment — ${tier.name} Listing`)
  const mailtoBody = encodeURIComponent(
    `Hi,\n\nI'd like to upgrade to the ${tier.name} listing (${tier.price}${tier.period}).\n\nBar Name: \nContact Name: \n\nPlease send a payment link.\n\nThanks!`
  )
  const mailtoLink = `mailto:${fallbackEmail}?subject=${mailtoSubject}&body=${mailtoBody}`

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0f1a' }}
    >
      <div className="w-full max-w-md">
        {/* Tier badge */}
        <div className="text-center mb-8">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              background: 'rgba(220,38,38,0.15)',
              color: '#ef4444',
              border: '1px solid rgba(220,38,38,0.3)',
            }}
          >
            {tier.name} Listing
          </span>
          <div className="flex items-end justify-center gap-1">
            <span className="text-5xl font-black text-white">{tier.price}</span>
            <span className="text-white/40 pb-2 text-lg">{tier.period}</span>
          </div>
        </div>

        {/* Loading state */}
        {(status === 'loading' || status === 'redirecting') && (
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: 'linear-gradient(145deg, #111827, #0d1520)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="mb-6">
              <div
                className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent mx-auto animate-spin"
              />
            </div>
            <p className="text-white font-semibold text-lg mb-2">
              {status === 'redirecting'
                ? 'Redirecting to payment…'
                : 'Setting up your payment…'}
            </p>
            <p className="text-white/40 text-sm">
              You&apos;ll be taken to our secure payment page
            </p>
          </div>
        )}

        {/* Fallback state — no Stripe configured */}
        {status === 'fallback' && (
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #111827, #0d1520)',
              border: '1px solid rgba(220,38,38,0.3)',
            }}
          >
            <div
              className="h-1 w-full"
              style={{
                background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)',
              }}
            />
            <div className="p-8">
              <div className="text-4xl mb-4 text-center">📧</div>
              <h2 className="text-white font-black text-2xl mb-2 text-center">
                Pay by Invoice
              </h2>
              <p className="text-white/50 text-sm text-center leading-relaxed mb-8">
                Reply to our email and we&apos;ll send your payment link within{' '}
                <strong className="text-white/70">1 hour</strong>. No card details needed
                until you&apos;re ready.
              </p>

              <a
                href={mailtoLink}
                className="flex items-center justify-center gap-2 w-full font-bold text-lg py-4 rounded-2xl transition-colors mb-4"
                style={{
                  background: '#dc2626',
                  color: '#fff',
                }}
              >
                📬 Send Payment Request
              </a>

              <p className="text-white/30 text-xs text-center">
                Or email us directly:{' '}
                <a
                  href={`mailto:${fallbackEmail}`}
                  className="underline text-white/50 hover:text-white transition-colors"
                >
                  {fallbackEmail}
                </a>
              </p>

              <div
                className="mt-6 rounded-xl p-4 text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start gap-3 text-white/50">
                  <span className="text-lg">✅</span>
                  <p>
                    Once payment is confirmed, your{' '}
                    <strong className="text-white/70">{tier.name} listing</strong> goes live
                    within <strong className="text-white/70">24 hours</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div
            className="rounded-3xl p-8 text-center"
            style={{
              background: 'linear-gradient(145deg, #111827, #0d1520)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-white font-semibold mb-4">Something went wrong</p>
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-2xl transition-colors"
              style={{ background: '#dc2626', color: '#fff' }}
            >
              Contact Us to Pay
            </a>
          </div>
        )}

        <p className="text-center mt-6">
          <Link href="/promote" className="text-white/30 text-sm hover:text-white/60 transition-colors">
            ← Back to packages
          </Link>
        </p>
      </div>
    </div>
  )
}
