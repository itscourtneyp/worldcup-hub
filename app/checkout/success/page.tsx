import Link from 'next/link'

const TIER_INFO: Record<string, string> = {
  featured: 'Featured',
  premium: 'Premium',
}

export const metadata = {
  title: 'Payment Confirmed — World Cup Hub LA',
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; session_id?: string }>
}) {
  const { tier } = await searchParams
  const tierName = TIER_INFO[tier || ''] || 'Featured'

  return (
    <div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
      style={{ background: '#0a0f1a' }}
    >
      <p className="text-6xl mb-6">&#9989;</p>
      <h1 className="text-4xl font-black text-white mb-4">Payment confirmed!</h1>
      <p className="text-white/60 text-lg leading-relaxed mb-3">
        Your <span className="text-white font-semibold">{tierName}</span> listing will be live
        within 24 hours.
      </p>
      <p className="text-white/40 text-sm mb-10">
        Questions?{' '}
        <a
          href="mailto:hello@worldcuphubla.com"
          className="text-red-400 hover:text-red-300 underline transition-colors"
        >
          hello@worldcuphubla.com
        </a>
      </p>
      <Link
        href="/bars"
        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-full transition-colors"
      >
        Browse Bars
      </Link>
    </div>
  )
}
