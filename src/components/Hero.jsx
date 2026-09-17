import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import Scene from './3d/Scene'

export default function Hero() {
  const heroRef = useRef(null)

  // Simple GSAP entrance animation on initial page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })

      // Sequential reveal: badge -> title lines -> description -> buttons -> 3D scene -> info row
      tl.from('.hero-badge', { opacity: 0, y: 20, delay: 0.15 })
        .from('.hero-title-line', { opacity: 0, y: 35, stagger: 0.15 }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 20 }, '-=0.4')
        .from('.hero-btn', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.4')
        .from('.hero-3d', { opacity: 0, scale: 0.92, duration: 1.1 }, '-=0.6')
        .from('.hero-info-item', { opacity: 0, y: 15, stagger: 0.1 }, '-=0.4')
    }, heroRef)

    // Cleanup GSAP context on unmount to avoid memory leaks
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Content (Split 2-column layout on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 my-auto">
        
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          
          {/* Small Company Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>EVOC LABS PVT LTD</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] uppercase">
            <span className="hero-title-line block">BUILDING</span>
            <span className="hero-title-line block text-gray-200">IDEAS</span>
            <span className="hero-title-line block text-blue-500">IN CODE.</span>
          </h1>

          {/* Supporting Text */}
          <p className="hero-desc mt-6 text-base sm:text-lg text-gray-400 max-w-xl font-normal leading-relaxed">
            We build modern digital experiences, products and technology solutions for the future of commerce.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all cursor-pointer"
            >
              <span>Start a Project</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Scene Viewport */}
        <div className="hero-3d lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[540px] w-full flex items-center justify-center relative">
          <Scene />
        </div>
      </div>

      {/* Small Information Row (Factual project details, no fake stats) */}
      <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="hero-info-item">
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">
            Discipline
          </span>
          <p className="text-sm font-semibold text-gray-200">
            Digital Commerce & Technology
          </p>
        </div>

        <div className="hero-info-item">
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">
            Studio Location
          </span>
          <p className="text-sm font-semibold text-gray-200">
            Mumbai / Remote Worldwide
          </p>
        </div>

        <div className="hero-info-item col-span-2 md:col-span-1">
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">
            Status
          </span>
          <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Accepting New Projects
          </p>
        </div>
      </div>
    </section>
  )
}
