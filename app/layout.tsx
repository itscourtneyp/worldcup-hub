import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
  description:
    'Find the best bars in Los Angeles to watch World Cup 2026 matches. Filter by nationality — Argentina, Mexico, Brazil, England, Canada, USA and more. 56 curated LA bars.',
  keywords: 'World Cup 2026, LA bars, where to watch World Cup Los Angeles, football bars Los Angeles, soccer bars LA, watch party LA, SoFi Stadium 2026, World Cup bars',
  openGraph: {
    title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
    description: 'Find your country\'s bar in LA. 56 curated venues filtered by nationality, neighbourhood, and vibe.',
    url: 'https://worldcup-hub.vercel.app',
    siteName: 'World Cup Hub LA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
    description: 'Find your country\'s bar in LA. 56 curated venues filtered by nationality, neighbourhood, and vibe.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://worldcup-hub.vercel.app/#website',
      url: 'https://worldcup-hub.vercel.app',
      name: 'World Cup Hub LA',
      description: 'Find the best bars in Los Angeles to watch World Cup 2026 matches, filtered by nationality, neighbourhood, and vibe.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://worldcup-hub.vercel.app/bars?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where can I watch the World Cup 2026 in Los Angeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'World Cup Hub LA lists 56+ curated bars across Los Angeles where you can watch World Cup 2026 matches. Filter by nationality, neighbourhood, or vibe at worldcup-hub.vercel.app.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do Mexican fans watch the World Cup in LA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Top spots for Mexico fans in LA include El Farolito in East LA, El Compadre in Hollywood, La Cita Bar in Downtown, and Escorpión in Mid-City. See the full list at worldcup-hub.vercel.app/team/mexico.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do English fans watch football in Los Angeles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The best bars for England supporters in LA include Ye Olde Kings Head in Santa Monica (LA's oldest British pub), The Greyhound in Silver Lake, Lucky Baldwin's in Pasadena, and The Fox and Hounds. See all at worldcup-hub.vercel.app/team/england.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which bars near SoFi Stadium and the Rose Bowl show World Cup matches?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Lucky Baldwin's Pub in Pasadena is the closest major football bar to the Rose Bowl. For SoFi Stadium, bars in El Segundo, Culver City, and Venice are the best options. See the full map at worldcup-hub.vercel.app.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where do Canadian fans watch the World Cup in LA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Canada is a 2026 World Cup co-host. LA\'s Canadian community watches at Block Heater in Hollywood and The Northern Standard in Silver Lake. See worldcup-hub.vercel.app/team/canada.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
