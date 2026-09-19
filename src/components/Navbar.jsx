
import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { name: 'Work',      href: '#work'      },
  { name: 'Services',  href: '#services'  },
  { name: 'About',     href: '#about'     },
  { name: 'Process',   href: '#process'   },
  { name: 'Tech',      href: '#tech'      },
  { name: 'Contact',   href: '#contact'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  // Darken navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="EVOC KODES home">
          <div className="relative w-8 h-8">
            <img src="/logo.png" alt="EVOC KODES logo" className="w-8 h-8 object-contain" />
            {/* Neon glow ring on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-cyan ring-2 ring-cyan-400/30" />
          </div>
          <span className="font-mono text-sm font-bold tracking-widest text-white uppercase">
            EVOC <span className="text-cyan-400">KODES</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors duration-200 tracking-wide relative group"
              >
                {link.name}
                {/* Underline slide-in */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <div className="hidden md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold font-mono tracking-widest uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 glow-cyan"
          >
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#030712]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-bebas text-5xl text-white hover:text-cyan-400 transition-colors duration-200 tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm tracking-widest uppercase glow-cyan"
          >
            Let's Build
          </a>
        </div>
      )}
    </header>
  )
}
