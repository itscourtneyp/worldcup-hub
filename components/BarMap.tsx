'use client'

import { useEffect, useRef } from 'react'
import type { Bar } from '@/lib/types'
import { TEAM_FLAGS } from '@/lib/types'

interface BarMapProps {
  bars: Bar[]
  selectedTeam?: string
}

const VIBE_COLOURS: Record<string, string> = {
  electric: '#D4AF37',
  rowdy: '#ef4444',
  chill: '#3b82f6',
  local: '#22c55e',
}

export default function BarMap({ bars, selectedTeam }: BarMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    // Dynamic import so SSR doesn't explode
    let L: typeof import('leaflet')
    let map: import('leaflet').Map

    async function initMap() {
      L = (await import('leaflet')).default

      // Fix default icon path issue with webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      if (!mapRef.current || mapInstanceRef.current) return

      map = L.map(mapRef.current, {
        center: [34.052, -118.243],
        zoom: 11,
        zoomControl: true,
      })

      // Dark-themed tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      // Add markers for bars with coordinates
      const validBars = bars.filter((b) => b.lat && b.lng)

      validBars.forEach((bar) => {
        const colour = VIBE_COLOURS[bar.vibe] || '#D4AF37'
        const isPromoted = bar.promoted

        // Custom circle marker
        const marker = L.circleMarker([bar.lat!, bar.lng!], {
          radius: isPromoted ? 10 : 7,
          fillColor: colour,
          color: isPromoted ? '#ffffff' : colour,
          weight: isPromoted ? 2 : 1,
          opacity: 0.9,
          fillOpacity: isPromoted ? 0.95 : 0.75,
        })

        // Team flags string
        const flagStr = bar.teams.slice(0, 3).map((t) => TEAM_FLAGS[t] ?? '').join(' ')

        const popup = L.popup({
          className: 'wch-popup',
          maxWidth: 260,
        }).setContent(`
          <div style="font-family:system-ui,sans-serif;color:#fff;background:#1a1a2e;border-radius:12px;overflow:hidden;">
            <div style="padding:12px 14px;">
              ${isPromoted ? '<div style="font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">★ FEATURED</div>' : ''}
              <div style="font-weight:700;font-size:15px;margin-bottom:2px;">${bar.name}</div>
              <div style="font-size:12px;color:#9ca3af;margin-bottom:6px;">${bar.neighbourhood}</div>
              <div style="font-size:13px;margin-bottom:8px;">${flagStr}</div>
              <div style="font-size:12px;color:#d1d5db;margin-bottom:10px;line-height:1.4;">${bar.about.slice(0, 100)}…</div>
              <a href="/bars/${bar.slug}" style="display:inline-block;background:#D4AF37;color:#000;font-weight:700;font-size:12px;padding:6px 12px;border-radius:6px;text-decoration:none;">View bar →</a>
            </div>
          </div>
        `)

        marker.bindPopup(popup)
        marker.addTo(map)
      })

      // Add SoFi Stadium marker
      const sofiIcon = L.divIcon({
        className: '',
        html: '<div style="background:#D4AF37;border:2px solid #fff;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:10px;">⚽</div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })
      L.marker([33.9535, -118.3392], { icon: sofiIcon })
        .bindPopup('<b>SoFi Stadium</b><br>8 World Cup matches here')
        .addTo(map)

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as import('leaflet').Map).remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-render markers when team filter changes
  useEffect(() => {
    // Future: re-filter markers on selectedTeam change
    // For now the full map shows all bars; team page can link to /bars?team=xxx
  }, [selectedTeam])

  return (
    <>
      {/* Inject Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden"
        style={{ height: '520px', background: '#0d1117' }}
      />
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/50">
        {Object.entries(VIBE_COLOURS).map(([vibe, colour]) => (
          <span key={vibe} className="flex items-center gap-1.5">
            <span style={{ background: colour }} className="w-3 h-3 rounded-full inline-block" />
            {vibe.charAt(0).toUpperCase() + vibe.slice(1)} vibe
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span style={{ background: '#D4AF37', border: '2px solid white' }} className="w-3 h-3 rounded-full inline-block" />
          Featured bar
        </span>
        <span className="flex items-center gap-1.5">⚽ SoFi Stadium</span>
      </div>
    </>
  )
}
