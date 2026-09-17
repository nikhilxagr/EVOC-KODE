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
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D2FF] p-[1.5px] shadow-[0_0_15px_rgba(0,102,255,0.35)]">
            <div className="w-full h-full bg-[#05070D] rounded-[7px] flex items-center justify-center">
              {/* Stylized N / Tech mark */}
              <span className="font-heading font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00D2FF]">
                K
              </span>
            </div>
          </div>
          <div className="flex items-center tracking-wider text-sm font-heading font-bold text-white">
            <span>EV</span>
            <span className="text-[#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">O</span>
            <span>C</span>
            <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-gray-300">
              KODES
            </span>
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
                <span className="absolute inset-0 rounded-full bg-white/[0.08] border border-[#0066FF]/30 -z-10 shadow-[0_0_12px_rgba(0,102,255,0.15)]" />
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
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0077FF] hover:to-[#0066FF] border border-[#0099FF]/40 shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_25px_rgba(0,102,255,0.45)] transition-all duration-300 transform active:scale-95"
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
                    ? 'text-white bg-[#0066FF]/10 border border-[#0066FF]/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-all"
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
