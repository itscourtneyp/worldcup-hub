import { notFound } from 'next/navigation'
import Link from 'next/link'
import { bars } from '@/lib/bars'
import { Neighbourhood } from '@/lib/types'
import {
  NEIGHBOURHOODS,
  NEIGHBOURHOOD_COPY,
  getBarsByNeighbourhood,
  neighbourhoodToSlug,
  slugToNeighbourhood,
} from '@/lib/neighbourhoods'
import BarCard from '@/components/BarCard'

export async function generateStaticParams() {
  return NEIGHBOURHOODS.map((n) => ({
    neighbourhood: neighbourhoodToSlug(n),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighbourhood: string }>
}) {
  const { neighbourhood: slug } = await params
  const neighbourhood = slugToNeighbourhood(slug)
  if (!neighbourhood) return { title: 'Neighbourhood Not Found' }

  const copy = NEIGHBOURHOOD_COPY[neighbourhood]

  return {
    title: `${copy.headline} | World Cup Hub LA`,
    description: copy.subhead,
    openGraph: {
      title: copy.headline,
      description: copy.subhead,
      url: `https://worldcup-hub.vercel.app/neighbourhood/${slug}`,
      siteName: 'World Cup Hub LA',
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.headline,
      description: copy.subhead,
    },
    alternates: {
      canonical: `https://worldcup-hub.vercel.app/neighbourhood/${slug}`,
    },
  }
}

export default async function NeighbourhoodPage({
  params,
}: {
  params: Promise<{ neighbourhood: string }>
}) {
  const { neighbourhood: slug } = await params
  const neighbourhood = slugToNeighbourhood(slug)
  if (!neighbourhood) notFound()

  const copy = NEIGHBOURHOOD_COPY[neighbourhood]
  const neighbourhoodBars = getBarsByNeighbourhood(neighbourhood)
  const totalBars = bars.length

  // Related neighbourhoods (all except current)
  const relatedNeighbourhoods = NEIGHBOURHOODS.filter(
    (n) => n !== neighbourhood
  ).slice(0, 9)

  // JSON-LD ItemList for neighbourhood bars
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best World Cup 2026 Bars in ${neighbourhood}, Los Angeles`,
    description: copy.about,
    url: `https://worldcup-hub.vercel.app/neighbourhood/${neighbourhoodToSlug(neighbourhood)}`,
    numberOfItems: neighbourhoodBars.length,
    itemListElement: neighbourhoodBars.map((bar, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BarOrPub',
        name: bar.name,
        url: `https://worldcup-hub.vercel.app/bars/${bar.slug}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: bar.address,
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        ...(bar.phone ? { telephone: bar.phone } : {}),
        ...(bar.website ? { sameAs: [bar.website] } : {}),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: bar.vibeRating.toFixed(1),
          bestRating: '5',
          worstRating: '1',
          ratingCount: '24',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00c853, transparent)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-6 backdrop-blur-sm">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#00c853' }}
            />
            World Cup 2026 · Los Angeles
          </div>

          <div className="text-5xl md:text-6xl mb-6 leading-none">📍</div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            {copy.headline}
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            {copy.subhead}
          </p>

          <div className="flex gap-8 justify-center text-center">
            <div>
              <span className="text-3xl font-black text-white">
                {neighbourhoodBars.length}
              </span>
              <p className="text-white/40 text-sm mt-1">
                {neighbourhoodBars.length === 1 ? 'Bar Listed' : 'Bars Listed'}
              </p>
            </div>
            <div>
              <span className="text-3xl font-black text-white">{totalBars}</span>
              <p className="text-white/40 text-sm mt-1">LA Total</p>
            </div>
          </div>
        </div>
      </section>

      {/* About copy — SEO paragraph */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-white/60 text-lg leading-relaxed text-center">
          {copy.about}
        </p>
      </section>

      {/* Bar listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{ color: '#00c853' }}
            >
              {neighbourhood} Bars
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {neighbourhoodBars.length === 0
                ? `No bars listed yet in ${neighbourhood}`
                : `${neighbourhoodBars.length} ${neighbourhoodBars.length === 1 ? 'Bar' : 'Bars'} in ${neighbourhood}`}
            </h2>
          </div>
          <Link
            href="/bars"
            className="text-white/50 hover:text-white text-sm font-medium transition-colors hidden sm:block"
          >
            Browse all bars →
          </Link>
        </div>

        {neighbourhoodBars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighbourhoodBars.map((bar) => (
              <BarCard key={bar.id} bar={bar} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No bars listed yet in {neighbourhood}.
            </p>
            <p className="text-white/30 text-sm mt-2">
              We&apos;re adding new venues every week — or submit your local bar
              below.
            </p>
            <Link
              href="/bars"
              className="mt-6 inline-block text-sm font-medium px-6 py-2 rounded-full border border-white/20 text-white/60 hover:text-white transition-colors"
            >
              Browse all LA bars →
            </Link>
          </div>
        )}
      </section>

      {/* List your bar CTA */}
      <section className="border-t border-white/10" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: '#00c853' }}
          >
            Bar Owners in {neighbourhood}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Is your bar showing World Cup matches?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Get listed and reach thousands of fans searching for the best spots
            in {neighbourhood} for World Cup 2026. Free listing, paid featured
            options available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-200"
              style={{ background: '#00c853', color: '#000' }}
            >
              List your bar free →
            </Link>
            <Link
              href="/promote"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-sm border border-white/20 text-white hover:bg-white/5 transition-all duration-200"
            >
              See paid options →
            </Link>
          </div>
        </div>
      </section>

      {/* Other neighbourhoods */}
      <section
        className="border-t border-white/10"
        style={{ background: '#080808' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-lg font-bold text-white mb-6 text-center">
            Bars in other neighbourhoods
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {relatedNeighbourhoods.map((n) => (
              <Link
                key={n}
                href={`/neighbourhood/${neighbourhoodToSlug(n)}`}
                className="text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
              >
                📍 {n}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
