import Link from 'next/link'

export const metadata = {
  title: 'Claim Your Bar Listing — World Cup Hub LA',
  description: 'Add your LA bar to World Cup Hub and get in front of thousands of football fans ahead of World Cup 2026.',
}

export default function ClaimPage() {
  const mailtoBody = encodeURIComponent(
    `Hi World Cup Hub team,\n\nI'd like to claim/add my bar to your directory.\n\nBar Name: \nAddress: \nPhone: \nWebsite: \nNeighbourhood: \nTeams supported: \nAtmosphere/vibe: \nNumber of screens: \nOpening hours: \nAnything else: \n\nThanks!`
  )
  const mailtoLink = `mailto:hello@worldcuphubla.com?subject=Claim%20My%20Bar%20Listing&body=${mailtoBody}`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#00c853' }}>For Bar Owners</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Claim Your Listing</h1>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
          Get your bar in front of thousands of football fans looking for their World Cup 2026 home in Los Angeles. It starts completely free.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: '⚽', title: 'Targeted traffic', desc: 'Reach fans actively searching for bars to watch specific matches and teams.' },
          { icon: '📍', title: 'Free to start', desc: 'A basic listing with your address, hours, and team allegiances costs nothing.' },
          { icon: '📈', title: 'Boost visibility', desc: 'Upgrade to Featured or Premium to appear at the top of search results.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-white/10 p-5 text-center" style={{ background: '#0d1520' }}>
            <p className="text-3xl mb-3">{icon}</p>
            <h3 className="text-white font-bold mb-1.5">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Contact form area */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{ border: '1px solid rgba(220,38,38,0.3)', background: 'linear-gradient(145deg, #111827, #0d1520)' }}
      >
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)' }} />
        <div className="p-8 md:p-10">
          <h2 className="text-white font-bold text-2xl mb-2">Get in touch</h2>
          <p className="text-white/50 text-sm mb-8">
            Fill in the details below and send us an email. We'll get your bar listed within 24 hours.
          </p>

          {/* Fields preview (visual only — mailto handles submission) */}
          <div className="space-y-4 mb-8">
            {[
              { label: 'Bar Name', placeholder: 'e.g. The Greyhound', type: 'text' },
              { label: 'Address', placeholder: 'Full street address', type: 'text' },
              { label: 'Your Email', placeholder: 'you@yourbar.com', type: 'email' },
              { label: 'Phone', placeholder: '(310) 555-0100', type: 'tel' },
              { label: 'Website', placeholder: 'https://yourbar.com', type: 'url' },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  disabled
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 border border-white/10 text-sm cursor-not-allowed opacity-60"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Additional Info</label>
              <textarea
                placeholder="Teams supported, number of screens, vibe, anything else..."
                disabled
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/20 border border-white/10 text-sm resize-none cursor-not-allowed opacity-60"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
            </div>
          </div>

          <a
            href={mailtoLink}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-2xl transition-colors"
          >
            📧 Send Claim Request
          </a>

          <p className="text-white/30 text-xs text-center mt-4">
            Opens your email client. Alternatively, email us directly at{' '}
            <a href="mailto:hello@worldcuphubla.com" className="text-white/50 hover:text-white transition-colors underline">
              hello@worldcuphubla.com
            </a>
          </p>
        </div>
      </div>

      {/* Packages teaser */}
      <div className="mt-10 rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: '#0d1520' }}>
        <div>
          <p className="text-white font-semibold">Want maximum visibility?</p>
          <p className="text-white/50 text-sm">Explore Featured and Premium listing packages to appear at the top.</p>
        </div>
        <Link
          href="/promote"
          className="shrink-0 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
        >
          View Packages →
        </Link>
      </div>
    </div>
  )
}
