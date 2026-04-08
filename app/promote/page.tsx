import Link from 'next/link'

export const metadata = {
  title: 'Promote Your Bar — World Cup Hub LA',
  description: 'Advertise your LA bar to thousands of football fans ahead of World Cup 2026. Choose from Free, Featured, or Premium listing packages.',
}

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    badge: null,
    description: 'Get listed and be discoverable by local football fans with zero cost.',
    features: [
      'Basic bar profile page',
      'Listed in the directory',
      'Neighbourhood & vibe filters',
      'Team allegiance tags',
      'Address & hours display',
    ],
    missing: [
      'Promoted badge',
      'Priority placement',
      'Highlighted card',
      'Featured on homepage',
      'Analytics dashboard',
    ],
    cta: 'Claim Free Listing',
    href: '/claim',
    ctaStyle: 'border border-white/20 text-white hover:bg-white/10',
  },
  {
    name: 'Featured',
    price: '$99',
    period: '/month',
    highlight: true,
    badge: '★ Most Popular',
    description: 'Stand out from the crowd with a promoted listing seen by thousands of fans.',
    features: [
      'Everything in Free',
      '★ Promoted badge on card',
      'Priority placement in results',
      'Gold-highlighted card border',
      'Featured on homepage grid',
      'Social media mention',
    ],
    missing: [
      'Premium card treatment',
      'Analytics dashboard',
      'Dedicated page spotlight',
    ],
    cta: 'Get Featured',
    href: '/claim?tier=featured',
    ctaStyle: 'bg-red-600 hover:bg-red-500 text-white',
  },
  {
    name: 'Premium',
    price: '$299',
    period: '/month',
    highlight: false,
    badge: '⭐ Maximum Exposure',
    description: 'Own the top of the directory. Maximum visibility for the biggest tournament in history.',
    features: [
      'Everything in Featured',
      '⭐ Premium badge & gold border',
      'Top of ALL search results',
      'Homepage hero placement',
      'Dedicated spotlight section',
      'Analytics dashboard',
      'Custom bar description edit',
      'Social media spotlight post',
      'Direct booking link support',
    ],
    missing: [],
    cta: 'Go Premium',
    href: '/claim?tier=premium',
    ctaStyle: 'bg-yellow-500 hover:bg-yellow-400 text-black font-bold',
  },
]

export default function PromotePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#00c853' }}>Grow Your Business</p>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
          Reach every football fan<br />
          <span className="text-red-500">in Los Angeles</span>
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
          World Cup 2026 is the biggest sporting event in history — and it's happening right here in LA. Make sure your bar is the one fans find first.
        </p>
      </div>

      {/* Event context banner */}
      <div
        className="rounded-2xl p-6 mb-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0d1b35, #1a0a0e)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {[
            { stat: '5M+', label: 'Expected visitors to LA for World Cup' },
            { stat: '16', label: 'Matches hosted at SoFi Stadium' },
            { stat: '64', label: 'Total matches worldwide' },
            { stat: 'June–July', label: '2026 tournament window' },
          ].map(({ stat, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-yellow-400">{stat}</p>
              <p className="text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className="relative rounded-3xl flex flex-col overflow-hidden"
            style={{
              background: tier.highlight
                ? 'linear-gradient(145deg, #1a0a14, #200a1e)'
                : 'linear-gradient(145deg, #111827, #0d1520)',
              border: tier.highlight
                ? '1px solid rgba(220,38,38,0.5)'
                : tier.name === 'Premium'
                ? '1px solid rgba(245,158,11,0.4)'
                : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {tier.highlight && (
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)' }} />
            )}
            {tier.name === 'Premium' && (
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)', backgroundSize: '200% 100%' }} />
            )}

            <div className="p-7 flex flex-col flex-1">
              {tier.badge && (
                <span className={`self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                  tier.name === 'Premium'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {tier.badge}
                </span>
              )}

              <h2 className="text-white font-black text-2xl mb-1">{tier.name}</h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-5xl font-black text-white">{tier.price}</span>
                <span className="text-white/40 pb-2">{tier.period}</span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-6">{tier.description}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
                {tier.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/20">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block text-center font-semibold py-3.5 rounded-2xl transition-all duration-200 text-sm ${tier.ctaStyle}`}
              >
                {tier.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="rounded-3xl border border-white/10 p-8 md:p-10 mb-12" style={{ background: '#0d1520' }}>
        <h2 className="text-white font-black text-3xl mb-8">Frequently asked questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: 'When does billing start?',
              a: 'Billing starts when your listing goes live. We\'ll invoice you monthly and you can cancel any time — no contracts.',
            },
            {
              q: 'How quickly will my bar be listed?',
              a: 'Free and Featured listings go live within 24 hours. Premium listings are reviewed and published same day.',
            },
            {
              q: 'Can I change tiers later?',
              a: 'Absolutely. Start free, upgrade to Featured for the group stage, go Premium for the knockouts. It\'s fully flexible.',
            },
            {
              q: 'What is the analytics dashboard?',
              a: 'Premium subscribers get a simple dashboard showing page views, clicks, and filter impressions for their listing.',
            },
            {
              q: 'Do you offer multi-location deals?',
              a: 'Yes — if you operate multiple bars or a bar chain, contact us for a group rate.',
            },
            {
              q: 'Is this only for World Cup 2026?',
              a: 'World Cup is our launch focus, but we plan to cover major tournaments year-round including Copa América, Euros, and club football.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white font-semibold text-sm mb-2">{q}</p>
              <p className="text-white/50 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div
        className="rounded-3xl p-10 text-center"
        style={{ background: 'linear-gradient(135deg, #1a0a0e, #2d0a0a)', border: '1px solid rgba(220,38,38,0.3)' }}
      >
        <p className="text-4xl mb-4">⚽</p>
        <h2 className="text-white font-black text-3xl mb-3">Ready to get started?</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Don't miss the biggest sporting event in LA history. Get your bar in front of the right fans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/claim"
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-full transition-colors"
          >
            Claim Your Free Listing
          </Link>
          <a
            href="mailto:hello@worldcuphubla.com?subject=Premium%20Listing%20Enquiry"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Talk to Us →
          </a>
        </div>
      </div>
    </div>
  )
}
