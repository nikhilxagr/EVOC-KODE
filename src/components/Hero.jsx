import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Scene from './3d/Scene'

const slides = [
  {
    eyebrow: 'DIGITAL PRODUCT STUDIO',
    titlePrefix: 'Build Apps That ',
    titleHighlight: 'Grow Your Business',
    ctaText: 'Start Your App',
    ctaHref: '#contact',
    subtitle: 'From idea to launch — Android & iOS development made simple.',
    avatars: ['R', 'S', 'M', '+'],
  },
  {
    eyebrow: 'INTELLIGENT AUTOMATION',
    titlePrefix: 'AI Systems That ',
    titleHighlight: 'Scale Operations',
    ctaText: 'Build AI Platform',
    ctaHref: '#services',
    subtitle: 'Autonomous calling agents, intelligent workflows & real-time telemetry.',
    avatars: ['A', 'I', 'X', '+'],
  },
  {
    eyebrow: 'MARKET-LEADING ARCHITECTURE',
    titlePrefix: 'Next-Gen Products That ',
    titleHighlight: 'Lead Markets',
    ctaText: 'Explore Products',
    ctaHref: '#work',
    subtitle: 'High-conversion commerce architectures & immersive 3D digital experiences.',
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712] px-4 sm:px-6 lg:px-8 py-24">
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <Scene />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,transparent_15%,#030712_85%)] pointer-events-none z-10" />

      <div className="glass-hero-card relative z-20 w-full max-w-4xl rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 transition-all duration-500">
        <div
          className={`flex flex-col gap-6 sm:gap-7 transition-all duration-200 ${
            isFading ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Top Eyebrow Tag — Clean, static, no blinker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-cyan-300 font-mono text-[11px] uppercase tracking-widest self-start backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{current.eyebrow}</span>
          </div>

          <h1 className="font-round8 text-4xl sm:text-5xl lg:text-[62px] text-white font-extrabold leading-[1.08] tracking-tight">
            <span className="text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {current.titlePrefix}
            </span>
            <span
              className="inline-block font-extrabold text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.7)]"
              style={{
                backgroundImage: 'linear-gradient(90deg, #38BDF8, #22D3EE, #818CF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {current.titleHighlight}
            </span>
          </h1>

          <div className="pt-1">
            <a
              href={current.ctaHref}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-950 font-display font-extrabold text-sm sm:text-base hover:bg-cyan-50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-2xl shadow-black/80 cursor-pointer"
            >
              <span>{current.ctaText}</span>
              <div className="w-6 h-6 rounded-full bg-black/[0.08] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-950" />
              </div>
            </a>
          </div>

          {/* Social Proof / Avatars Trust Row — High Contrast */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-4">
            {/* Overlapping Avatar Badges (R) (S) (M) (+) */}
            <div className="flex items-center -space-x-2">
              {current.avatars.map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0E1726] border-2 border-white/30 flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold text-white shadow-md"
                  style={{ zIndex: 10 - i }}
                >
                  {initial}
                </div>
              ))}
            </div>

            {/* Subtitle description text — High Opacity text-gray-200 */}
            <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {current.subtitle}
            </p>
          </div>

          {/* Carousel Pagination Dots Indicator (— • •) */}
          <div className="flex items-center gap-2 pt-2">
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
    </section>
  )
}
