import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-2xl">⚽</span>
              <span className="text-white">WorldCup</span>
              <span style={{ color: '#00c853' }}>Hub</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The destination for football fans in Los Angeles to find the best bars showing World Cup 2026 matches.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Navigate</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/bars" className="hover:text-white transition-colors">Bar Directory</Link></li>
              <li><Link href="/claim" className="hover:text-white transition-colors">Add Your Bar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">For Bar Owners</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Get your bar in front of thousands of football fans ahead of World Cup 2026.
            </p>
            <Link
              href="/claim"
              className="inline-block text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              style={{ background: '#00c853' }}
            >
              List Your Bar
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-white/30 text-xs">
          <span>&copy; 2026 WorldCup Hub. All rights reserved.</span>
          <span>World Cup 2026 &middot; Los Angeles &middot; June&ndash;July 2026</span>
        </div>
      </div>
    </footer>
  )
}
