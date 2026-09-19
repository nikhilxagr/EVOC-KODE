import { useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronDown, Code2, Cpu, Layers, Smartphone, Sparkles, Box } from 'lucide-react'
import gsap from 'gsap'
import Scene from './3d/Scene'

const capabilities = [
  { icon: Code2,      name: 'Web Development'  },
  { icon: Cpu,        name: 'AI Systems'       },
  { icon: Layers,     name: 'Full Stack APIs'  },
  { icon: Smartphone, name: 'Mobile Apps'      },
  { icon: Sparkles,   name: 'UI / UX'          },
  { icon: Box,        name: 'Digital Products' },
]

const bigStats = [
  { value: '50+',  label: 'Products Shipped',  color: '#3B82F6' },
  { value: '2+',   label: 'Years of Building', color: '#818CF8' },
  { value: '99%',  label: 'Uptime Delivered',  color: '#38BDF8' },
  { value: '∞',    label: 'Possibilities',     color: '#34D399' },
]

const tagline = ['IDEA', '→', 'CODE', '→', 'PRODUCT', '→', 'IMPACT']

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page entrance animation
      const el = gsap.timeline({ defaults: { ease: 'power3.out' } })

      el.from('.he-3d', { opacity: 0, scale: 0.92, duration: 0.9 }, 0)
      el.from('.he-badge', { opacity: 0, y: -14, duration: 0.5 }, 0.15)
      el.from('.he-evoc-char', { opacity: 0, y: 60, stagger: 0.04, duration: 0.55 }, 0.25)
      el.from('.he-kodes', { opacity: 0, y: 50, duration: 0.55 }, 0.42)
      el.from('.he-sub', { opacity: 0, y: 16, duration: 0.5 }, 0.55)
      el.from('.he-cta', { opacity: 0, y: 14, stagger: 0.08, duration: 0.45 }, 0.65)
      el.from('.he-mini-stat', { opacity: 0, y: 12, stagger: 0.05, duration: 0.4 }, 0.72)
      el.from('.he-scroll', { opacity: 0, duration: 0.4 }, 0.9)

      const isMobile = window.innerWidth < 768

      // Scroll-driven pinned sequence
      const pin = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=260%',
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // Section 1: Fade hero, reveal capabilities
      pin
        .to('.he-scene0',  { opacity: 0.15, y: -60, ease: 'none' }, 0)
        .to('.he-scroll',  { opacity: 0, ease: 'none' }, 0)
        .to('.he-3d',      { scale: 1.07, ease: 'none' }, 0)
        .to('.he-scene1',  { opacity: 1, x: 0, ease: 'none' }, 0.2)
        .to('.cap-item',   { opacity: 1, x: 0, stagger: 0.06, ease: 'none' }, 0.3)

      // Section 2: Show stats highlight
        .to('.he-scene1',  { opacity: 0, x: 90, ease: 'none' }, 3.0)
        .to('.he-scene0',  { opacity: 0, ease: 'none' }, 3.2)
        .to('.he-3d',      { opacity: 0.3, ease: 'none' }, 3.0)
        .to('.he-scene2',  { opacity: 1, ease: 'none' }, 3.6)
        .to('.stat-big',   { opacity: 1, y: 0, scale: 1, stagger: 0.18, ease: 'none' }, 3.8)

      // Section 3: Show tagline
        .to('.he-scene2',  { opacity: 0, y: -40, ease: 'none' }, 6.5)
        .to('.he-scene3',  { opacity: 1, ease: 'none' }, 7.0)
        .to('.tg-word',    { opacity: 1, y: 0, stagger: 0.22, ease: 'none' }, 7.2)
        .to('.tg-sub',     { opacity: 1, y: 0, ease: 'none' }, 8.5)
        .to('.tg-cta',     { opacity: 1, y: 0, ease: 'none' }, 9.0)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const evocChars = 'EVOC'.split('').map((c, i) => (
    <span key={i} className="he-evoc-char inline-block">{c}</span>
  ))

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-grid overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_40%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 lg:right-10 -translate-y-1/2 w-[580px] h-[580px] bg-gradient-to-br from-cyan-500/18 via-blue-600/14 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Scene */}
      <div
        className="he-3d absolute inset-0 lg:left-auto lg:w-1/2 pointer-events-auto"
        style={{ zIndex: 1 }}
      >
        <Scene />
      </div>

      {/* Hero content */}
      <div
        className="he-scene0 absolute inset-0 flex items-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-4 px-6 lg:px-12 xl:px-16 pt-16 pointer-events-auto">
          <div className="he-badge self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="font-mono text-[11px] font-medium tracking-wider uppercase text-blue-400">
              EVOC Labs
            </span>
          </div>

          <h1 className="font-bebas leading-[0.88] tracking-wider">
            <div className="text-[82px] sm:text-[112px] lg:text-[136px] text-white">
              {evocChars}
            </div>

            <div
              className="he-kodes text-[82px] sm:text-[112px] lg:text-[136px] text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #38BDF8, #3B82F6, #818CF8)',
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
              }}
            >
              KODES
            </div>
          </h1>

          <p className="he-sub text-gray-300 text-sm sm:text-[15px] leading-relaxed max-w-lg font-light mt-1">
            We architect next-gen digital products — AI systems, commerce infrastructure,
            and immersive web experiences that drive real growth.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="#work"
              className="he-cta group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 25px rgba(59,130,246,0.45)' }}
            >
              View Our Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="he-cta inline-flex items-center px-7 py-3.5 rounded-full glass-light text-gray-200 hover:text-white font-medium text-sm transition-all border border-white/12 hover:border-blue-400/40 hover:bg-white/[0.05]"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-3 pt-5 border-t border-white/[0.07] grid grid-cols-4 gap-3">
            {bigStats.map(s => (
              <div key={s.label} className="he-mini-stat">
                <div className="font-bebas text-2xl sm:text-3xl leading-none" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="font-mono text-[9px] text-gray-500 mt-0.5 uppercase tracking-wider leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities card */}
      <div
        className="he-scene1 absolute left-6 lg:left-12 xl:left-16 top-1/2 w-60 lg:w-72 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(-50%) translateX(-90px)', zIndex: 20 }}
      >
        <div
          className="glass rounded-3xl p-5 lg:p-6 border"
          style={{
            borderColor: 'rgba(59,130,246,0.2)',
            boxShadow: '0 0 60px rgba(59,130,246,0.12), 0 24px 48px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-blue-400">
              What We Build
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {capabilities.map(cap => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.name}
                  className="cap-item flex items-center gap-3 py-2 px-2.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-default"
                  style={{ opacity: 0, transform: 'translateX(18px)' }}
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-300 font-light">{cap.name}</span>
                  <div className="ml-auto w-1 h-1 rounded-full bg-blue-400/30 flex-shrink-0" />
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06]">
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
              Scroll to see more ↓
            </span>
          </div>
        </div>
      </div>

      {/* Stats display */}
      <div
        className="he-scene2 absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0, zIndex: 20 }}
      >
        <div className="text-center px-6 w-full max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mb-8">
            By The Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bigStats.map(s => (
              <div
                key={s.label}
                className="stat-big glass rounded-2xl p-5 sm:p-6 text-center border"
                style={{
                  opacity: 0,
                  transform: 'translateY(32px) scale(0.94)',
                  borderColor: `${s.color}22`,
                  boxShadow: `0 0 35px ${s.color}12`,
                }}
              >
                <div
                  className="font-bebas text-[52px] sm:text-[64px] leading-none mb-1"
                  style={{ color: s.color, textShadow: `0 0 40px ${s.color}50` }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tagline display */}
      <div
        className="he-scene3 absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: 0, zIndex: 20 }}
      >
        <div className="text-center px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
            {tagline.map((word, i) => (
              <span
                key={i}
                className={`tg-word font-bebas leading-none ${
                  word === '→'
                    ? 'text-2xl sm:text-3xl text-blue-400/50'
                    : 'text-[52px] sm:text-[72px] lg:text-[90px] text-white'
                }`}
                style={{ opacity: 0, transform: 'translateY(44px)' }}
              >
                {word}
              </span>
            ))}
          </div>
          <p
            className="tg-sub text-gray-400 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed"
            style={{ opacity: 0, transform: 'translateY(22px)' }}
          >
            From spark to shipped product — every sprint, every commit, every breakthrough.
            That's how EVOC KODES builds.
          </p>
          <div
            className="tg-cta mt-8 pointer-events-auto"
            style={{ opacity: 0, transform: 'translateY(22px)' }}
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-blue-500 text-white font-bold text-sm tracking-wide hover:bg-blue-400 transition-all"
              style={{ boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
            >
              Explore EVOC KODES
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="he-scroll absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-600 uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gray-600 animate-bounce" />
      </div>
    </section>
  )
}
