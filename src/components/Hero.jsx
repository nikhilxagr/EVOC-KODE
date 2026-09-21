import { useState, useEffect } from 'react'
import { ArrowUpRight, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'
import Scene from './3d/Scene'

const slides = [
  {
    eyebrow: 'DIGITAL PRODUCT STUDIO',
    titlePrefix: 'Build Apps That ',
    titleHighlight: 'Grow Your Business',
    ctaText: 'Start Your App',
    ctaHref: '#contact',
    subtitle: 'From idea to launch — Android, iOS & responsive web architecture.',
    details: 'Native mobile & web applications engineered with modular architecture, offline data sync, and sub-second touch responsiveness.',
    highlights: ['React Native & Web', 'Production Grade', '4-6 Wk MVP'],
    avatars: ['R', 'S', 'M', '+'],
  },
  {
    eyebrow: 'INTELLIGENT AUTOMATION',
    titlePrefix: 'AI Systems That ',
    titleHighlight: 'Scale Operations',
    ctaText: 'Build AI Platform',
    ctaHref: '#services',
    subtitle: 'Autonomous workflows, deterministic pipelines & live telemetry.',
    details: 'Deterministic agent loops, low-latency LLM orchestration, and automated pipelines that save hundreds of engineering hours.',
    highlights: ['Agentic Loops', 'Vector Search', 'Enterprise SLAs'],
    avatars: ['A', 'I', 'X', '+'],
  },
  {
    eyebrow: 'MARKET-LEADING ARCHITECTURE',
    titlePrefix: 'Next-Gen Products That ',
    titleHighlight: 'Lead Markets',
    ctaText: 'Explore Products',
    ctaHref: '#work',
    subtitle: 'High-conversion commerce architectures & immersive 3D digital experiences.',
    details: 'Hardware-accelerated WebGL graphics, GSAP physics choreography, and headless commerce platforms tailored for market leaders.',
    highlights: ['WebGL 3D', 'Next.js 15 SSR', '100% IP Ownership'],
    avatars: ['E', 'V', 'K', '+'],
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isFading, setIsFading] = useState(false)

  // Auto-advance carousel smoothly every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideTransition((activeSlide + 1) % slides.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [activeSlide])

  const handleSlideTransition = (newIndex) => {
    if (newIndex === activeSlide) return
    setIsFading(true)
    setTimeout(() => {
      setActiveSlide(newIndex)
      setIsFading(false)
    }, 180)
  }

  const current = slides[activeSlide]

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:py-24">
      {/* 3D Chromatic Ribbon (strictly background, visible through translucent glass) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Scene />
      </div>

      {/* Ambient Dark Radial Gradient Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_15%,#030712_85%)] pointer-events-none z-10" />

      {/* Main Glass Hero Card — Translucent crystal glass with backdrop blur */}
      <div className="glass-hero-card relative z-20 w-full max-w-4xl rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 transition-all duration-500">
        <div
          className={`flex flex-col gap-4 sm:gap-6 transition-all duration-200 ${
            isFading ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Top Eyebrow Tag & Highlights Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-cyan-300 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{current.eyebrow}</span>
            </div>

            {/* Technical Highlights Badges */}
            <div className="hidden sm:flex items-center gap-1.5">
              {current.highlights.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[10px] text-gray-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-round8 text-3xl sm:text-5xl lg:text-[60px] text-white font-extrabold leading-[1.08] tracking-tight">
            <span className="text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {current.titlePrefix}
            </span>
            <span
              className="inline-block font-extrabold text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(34,211,238,0.65)]"
              style={{
                backgroundImage: 'linear-gradient(90deg, #38BDF8, #22D3EE, #818CF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {current.titleHighlight}
            </span>
          </h1>

          {/* Descriptive Technical Scope (Eliminates empty space with informative value) */}
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
            {current.details}
          </p>

          {/* CTA & Mobile Highlights Row */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href={current.ctaHref}
              className="group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-gray-950 font-display font-extrabold text-xs sm:text-sm hover:bg-cyan-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-black/80 cursor-pointer"
            >
              <span>{current.ctaText}</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/[0.08] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-950" />
              </div>
            </a>

            {/* Mobile-visible highlights */}
            <div className="flex sm:hidden items-center gap-1.5 flex-wrap">
              {current.highlights.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[9px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Social Proof / Avatars Trust Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/[0.08]">
            <div className="flex items-center -space-x-2">
              {current.avatars.map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0E1726] border-2 border-white/30 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white shadow-md"
                  style={{ zIndex: 10 - i }}
                >
                  {initial}
                </div>
              ))}
            </div>

            <p className="text-[11px] sm:text-xs text-gray-300 font-normal leading-relaxed max-w-lg">
              {current.subtitle}
            </p>
          </div>

          {/* Carousel Pagination Dots Indicator (— • •) */}
          <div className="flex items-center gap-2 pt-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideTransition(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer ${
                  activeSlide === idx
                    ? 'w-8 bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Studio Metrics Strip below card — Fills the lower empty void with signal */}
      <div className="relative z-20 w-full max-w-4xl mt-4 sm:mt-6 grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-2xl glass-hero-card text-center sm:text-left flex flex-col justify-center">
          <span className="font-round8 text-sm sm:text-xl font-bold text-white tracking-tight">4-6 Wks</span>
          <span className="font-mono text-[9px] sm:text-[11px] text-cyan-300 uppercase tracking-wider">MVP Delivery</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl glass-hero-card text-center sm:text-left flex flex-col justify-center">
          <span className="font-round8 text-sm sm:text-xl font-bold text-white tracking-tight">&lt; 50ms</span>
          <span className="font-mono text-[9px] sm:text-[11px] text-blue-300 uppercase tracking-wider">Edge Latency</span>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl glass-hero-card text-center sm:text-left flex flex-col justify-center">
          <span className="font-round8 text-sm sm:text-xl font-bold text-white tracking-tight">100% IP</span>
          <span className="font-mono text-[9px] sm:text-[11px] text-indigo-300 uppercase tracking-wider">Strict Ownership</span>
        </div>
      </div>
    </section>
  )
}
