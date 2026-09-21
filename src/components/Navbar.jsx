import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

// Navigation links reflecting all core landing page sections
const navSections = [
  { name: 'About',      href: '#about'    },
  { name: 'Services',   href: '#services' },
  { name: 'Process',    href: '#process'  },
  { name: 'Work',       href: '#work'     },
  { name: 'Tech Stack', href: '#tech'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a href="#" className="flex items-center gap-3 group" aria-label="EVOC KODES home">
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
            <img src="/logo.png" alt="EVOC KODES" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-round8 text-base font-extrabold tracking-tight text-white uppercase leading-none">
              EVOC <span className="text-cyan-400">KODES</span>
            </span>
            <span className="font-mono text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
              TECHNOLOGIES
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links for All Sections */}
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

        {/* Right: Contact Form CTA Button (Orange Pill, No Phone Number) */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            className="btn-orange px-6 py-2.5 rounded-full text-xs font-display font-bold tracking-wider uppercase flex items-center gap-1.5"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden text-gray-300 hover:text-white p-1.5 rounded-lg bg-white/[0.04] border border-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#030712]/98 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-6 px-6">
          {navSections.map((sec) => (
            <a
              key={sec.name}
              href={sec.href}
              onClick={() => setOpen(false)}
              className="font-round8 text-2xl sm:text-3xl text-white hover:text-cyan-400 transition-colors uppercase tracking-tight"
            >
              {sec.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-orange mt-4 px-8 py-3.5 rounded-full text-sm font-display font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  )
}
