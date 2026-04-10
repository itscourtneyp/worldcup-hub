import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
  description:
    'Find the best bars in Los Angeles to watch World Cup 2026 matches. Filter by nationality — Argentina, Mexico, Brazil, England, USA, South Korea, Colombia, Japan and more. 30+ curated LA bars.',
  keywords: 'World Cup 2026, LA bars, where to watch World Cup Los Angeles, football bars Los Angeles, soccer bars LA, watch party LA, SoFi Stadium 2026, World Cup bars',
  openGraph: {
    title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
    description: 'Find your country\'s bar in LA. 30+ curated venues filtered by nationality, neighbourhood, and vibe.',
    url: 'https://worldcup-hub.vercel.app',
    siteName: 'World Cup Hub LA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Cup Hub LA — Where to Watch World Cup 2026 in Los Angeles',
    description: 'Find your country\'s bar in LA. 30+ curated venues filtered by nationality, neighbourhood, and vibe.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
