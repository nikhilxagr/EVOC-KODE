import { ArrowUpRight, Globe, Share2, Link2 } from 'lucide-react'

const footerLinks = {
  'Product': [
    { name: 'Work',     href: '#work'     },
    { name: 'Services', href: '#services' },
    { name: 'Process',  href: '#process'  },
    { name: 'Tech',     href: '#tech'     },
  ],
  'Company': [
    { name: 'About',        href: '#about'                     },
    { name: 'EVOC Labs',    href: 'https://www.evoclabs.com/', external: true },
    { name: 'Contact',      href: '#contact'                   },
  ],
  'Tech': [
    { name: 'React.js',   href: '#' },
    { name: 'Three.js',   href: '#' },
    { name: 'GSAP',       href: '#' },
    { name: 'Tailwind',   href: '#' },
  ],
}

const socials = [
  { icon: Globe,  href: 'https://www.evoclabs.com/', label: 'Website' },
  { icon: Share2, href: '#', label: 'Share'   },
  { icon: Link2,  href: '#', label: 'Links'   },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-[#020610]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="EVOC KODES logo" className="w-8 h-8 object-contain" />
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-white">
                EVOC <span className="text-cyan-400">KODES</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
              The technology development studio of EVOC Labs — building the tools, products, 
              and systems that power the future of commerce.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(s => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full glass-light flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-400/20 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-5">{group}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-light"
                    >
                      {link.name}
                      {link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-600 tracking-widest">
            © {year} EVOC Labs PVT LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[10px] text-gray-600 hover:text-gray-400 transition-colors tracking-widest uppercase">
              Privacy
            </a>
            <a href="#" className="font-mono text-[10px] text-gray-600 hover:text-gray-400 transition-colors tracking-widest uppercase">
              Terms
            </a>
            <span className="font-mono text-[10px] text-gray-700 tracking-widest">
              Made with ⚡ by EVOC KODES
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
