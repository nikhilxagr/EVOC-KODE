import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#', active: true },
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#05070D]/80 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with exact specification from logo.png */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Stylized N Brand Mark */}
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.1] p-1.5 flex items-center justify-center backdrop-blur-md group-hover:border-[#013cee]/50 group-hover:shadow-[0_0_18px_rgba(1,60,238,0.45)] transition-all duration-300">
            <img
              src="/favicon.svg"
              alt="EVOC KODES Logo Symbol"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(1,60,238,0.6)]"
            />
          </div>

          {/* EVOC KODES Wordmark with Blue Ring 'O' */}
          <div className="flex items-baseline">
            <span className="text-xs font-mono font-medium text-gray-400 mr-2 tracking-widest uppercase">
              EVOC
            </span>
            <div className="font-heading font-black text-lg tracking-wider text-white flex items-center">
              <span>K</span>
              <span className="inline-block w-4 h-4 rounded-full border-[3.5px] border-[#013cee] shadow-[0_0_10px_#013cee] mx-0.5" />
              <span>DES</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-white/[0.03] border border-white/[0.06]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 ${
                link.active
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.active && (
                <span className="absolute inset-0 rounded-full bg-white/[0.08] border border-[#013cee]/40 -z-10 shadow-[0_0_12px_rgba(1,60,238,0.2)]" />
              )}
              <span className="flex items-center gap-1.5">
                {link.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF]" />
                )}
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-[#013cee] to-[#0052CC] hover:from-[#1a55ff] hover:to-[#013cee] border border-[#013cee]/50 shadow-[0_0_20px_rgba(1,60,238,0.3)] hover:shadow-[0_0_28px_rgba(1,60,238,0.55)] transition-all duration-300 transform active:scale-95"
          >
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00D2FF]" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-2 pb-6 bg-[#05070D]/95 border-b border-white/[0.08] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  link.active
                    ? 'text-white bg-[#013cee]/10 border border-[#013cee]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider text-white bg-[#013cee] hover:bg-[#0052CC] shadow-[0_0_15px_rgba(1,60,238,0.35)] transition-all"
            >
              <span>Let's Build</span>
              <ArrowUpRight className="w-4 h-4 text-[#00D2FF]" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
