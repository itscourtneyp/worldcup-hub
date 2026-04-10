'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚽</span>
            <span className="text-white">WorldCup</span>
            <span style={{ color: '#00c853' }}>Hub</span>
            <span className="hidden sm:inline text-xs font-normal text-white/40 ml-1 border border-white/20 rounded px-1.5 py-0.5">LA 2026</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/bars" className="text-white/70 hover:text-white transition-colors">Find Bars</Link>
            <Link href="/team" className="text-white/70 hover:text-white transition-colors">By Nationality</Link>
            <Link href="/neighbourhood/hollywood" className="text-white/70 hover:text-white transition-colors">Neighbourhoods</Link>
            <Link href="/claim" className="text-white/70 hover:text-white transition-colors">Add Your Bar</Link>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-4 text-sm font-medium">
            <Link href="/bars" className="text-white/70 hover:text-white transition-colors" onClick={() => setOpen(false)}>Find Bars</Link>
            <Link href="/team" className="text-white/70 hover:text-white transition-colors" onClick={() => setOpen(false)}>By Nationality</Link>
            <Link href="/neighbourhood/hollywood" className="text-white/70 hover:text-white transition-colors" onClick={() => setOpen(false)}>Neighbourhoods</Link>
            <Link href="/claim" className="text-white/70 hover:text-white transition-colors" onClick={() => setOpen(false)}>Add Your Bar</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
