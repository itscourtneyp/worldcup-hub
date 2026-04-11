'use client'

import { useEffect, useState } from 'react'

const KICKOFF = new Date('2026-06-11T19:00:00-07:00') // 7pm PT, SoFi Stadium opener

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = KICKOFF.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ]

  return (
    <div className="mt-10 mb-2">
      <p className="text-white/35 text-xs font-semibold tracking-[0.15em] uppercase mb-3">
        Kickoff · June 11, 2026 · SoFi Stadium
      </p>
      <div className="flex items-center gap-3 sm:gap-4">
        {units.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-white/[0.06] border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md min-w-[52px] sm:min-w-[64px] text-center">
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/30 text-[10px] font-semibold tracking-widest uppercase mt-1.5">
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-[#D4AF37]/60 text-2xl font-black -mt-5 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
