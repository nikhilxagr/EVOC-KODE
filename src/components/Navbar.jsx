import { useState, useEffect } from 'react'
import {
  X,
  ArrowUpRight,
  Compass,
  Layers,
  Activity,
  Briefcase,
  Cpu,
  Mail,
} from 'lucide-react'

// Navigation sections with descriptive icons for quick mobile navigation
const navSections = [
  { name: 'About',      href: '#about',    icon: Compass   },
  { name: 'Services',   href: '#services', icon: Layers    },
  { name: 'Process',    href: '#process',  icon: Activity  },
  { name: 'Work',       href: '#work',     icon: Briefcase },
  { name: 'Tech Stack', href: '#tech',     icon: Cpu       },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Header background blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {/* Desktop & Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/40'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="EVOC KODES home">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
              <img src="/logo.png" alt="EVOC KODES" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-round8 text-sm sm:text-base font-extrabold tracking-tight text-white uppercase leading-none">
                EVOC <span className="text-cyan-400">KODES</span>
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
                TECHNOLOGIES
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links (>= lg) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
              {navSections.map((sec) => (
                <li key={sec.name}>
                  <a
                    href={sec.href}
                    className="text-xs sm:text-[13px] font-medium text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.08] transition-all duration-200"
                  >
                    {sec.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Desktop CTA: Contact Form Button (>= sm) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-orange px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-display font-bold tracking-wider uppercase flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button — Prominently styled and always visible on mobile/tablet (< lg) */}
          <button
            onClick={() => setOpen(true)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl glass border border-white/15 bg-white/[0.06] text-white hover:text-cyan-400 hover:border-cyan-400/40 active:scale-95 transition-all shadow-md cursor-pointer"
            aria-label="Open quick navigation"
          >
            <div className="w-5 flex flex-col gap-1 items-end justify-center">
              <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
              <span className="w-3.5 h-0.5 bg-cyan-400 rounded-full transition-all" />
              <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col justify-between p-5 sm:p-6 overflow-y-auto lg:hidden">
          {/* Top Bar inside Drawer: Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5"
              aria-label="EVOC KODES home"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5">
                <img src="/logo.png" alt="EVOC KODES" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-round8 text-sm font-extrabold tracking-tight text-white uppercase leading-none">
                  EVOC <span className="text-cyan-400">KODES</span>
                </span>
                <span className="font-mono text-[8px] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
                  TECHNOLOGIES
                </span>
              </div>
            </a>

            {/* High-Contrast Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl glass border border-white/20 bg-white/[0.08] flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400/50 active:scale-95 transition-all cursor-pointer shadow-lg"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Nav Links List */}
          <div className="flex flex-col gap-2.5 my-6 max-w-sm mx-auto w-full">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-400 mb-1">
              Quick Navigation
            </span>

            {navSections.map((sec, idx) => {
              const Icon = sec.icon
              return (
                <a
                  key={sec.name}
                  href={sec.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl glass border border-white/[0.08] hover:border-cyan-400/40 hover:bg-white/[0.04] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                        0{idx + 1}
                      </span>
                      <span className="font-round8 text-base font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                        {sec.name}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )
            })}
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="pt-5 border-t border-white/[0.08] space-y-3.5 max-w-sm mx-auto w-full">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-orange w-full py-3.5 rounded-2xl text-xs font-display font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1">
              <span>BENGALURU STUDIO</span>
              <span>•</span>
              <span className="text-cyan-400">Q4 BOOKINGS OPEN</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
