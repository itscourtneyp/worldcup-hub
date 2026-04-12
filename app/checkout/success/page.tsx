import Link from 'next/link'

export const metadata = {
  title: 'Payment Confirmed — World Cup Hub LA',
  description: 'Your featured listing on World Cup Hub LA is being set up.',
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { tier?: string; session_id?: string }
}) {
  const tierName =
    searchParams.tier === 'premium' ? 'Premium' : 'Featured'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0f1a' }}
    >
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Payment confirmed!
        </h1>

        <p className="text-white/60 text-xl leading-relaxed mb-2">
          Your <strong className="text-white">{tierName} listing</strong> will be live
          within 24 hours.
        </p>
        <p className="text-white/40 text-base mb-10">
          We&apos;ll email you when it&apos;s published. For questions, reach us at{' '}
          <a
            href="mailto:hello@worldcuphubla.com"
            className="underline text-white/60 hover:text-white transition-colors"
          >
            hello@worldcuphubla.com
          </a>
        </p>

        {/* What's next */}
        <div
          className="rounded-3xl p-8 mb-8 text-left"
          style={{
            background: 'linear-gradient(145deg, #111827, #0d1520)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h2 className="text-white font-bold text-lg mb-5">What happens next</h2>
          <div className="space-y-4">
            {[
              {
                icon: '📋',
                title: 'We review your listing',
                desc: 'Our team checks and publishes your bar profile within 24 hours.',
              },
              {
                icon: '📧',
                title: 'You get a confirmation email',
                desc: "We'll send the link to your live listing so you can see exactly how fans will find you.",
              },
              {
                icon: '⚽',
                title: 'Fans start finding you',
                desc: "Your listing appears in search results, nationality filters, and neighbourhood guides immediately.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">{title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bars"
            className="inline-flex items-center justify-center font-bold py-3.5 px-8 rounded-full transition-colors"
            style={{ background: '#dc2626', color: '#fff' }}
          >
            Browse All Bars →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-semibold py-3.5 px-8 rounded-full transition-colors"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
