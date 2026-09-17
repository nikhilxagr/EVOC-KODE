import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import Scene from './3d/Scene'

export default function Hero() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const sceneWrapperRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2 }
      )
        .fromTo(
          headingRef.current?.children || [],
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          sceneWrapperRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.6'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-12 flex flex-col justify-between overflow-hidden bg-tech-grid"
    >
      {/* Background Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#0066FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-[#00D2FF]/10 blur-[120px] pointer-events-none" />

      {/* Main Hero Split Viewport */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6 lg:py-10">
          {/* Left Column: Storytelling & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Small Company Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]" />
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-300">
                EVOC LABS PVT LTD
              </span>
            </div>

            {/* Dominant Main Heading */}
            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-[-0.03em] leading-[0.95] text-white font-heading uppercase mb-6"
            >
              <div className="overflow-hidden">
                <span>BUILDING</span>
              </div>
              <div className="overflow-hidden">
                <span>IDEAS</span>
              </div>
              <div className="overflow-hidden flex items-baseline gap-2">
                <span>IN</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00D2FF] drop-shadow-[0_0_35px_rgba(0,102,255,0.4)]">
                  CODE.
                </span>
              </div>
            </h1>

            {/* Short Subtitle */}
            <p
              ref={descRef}
              className="max-w-lg text-base sm:text-lg text-gray-400 font-normal leading-relaxed mb-8"
            >
              EVOC KODES is building modern digital experiences, products and
              technology solutions for the future of commerce.
            </p>

            {/* Action CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0077FF] hover:to-[#0066FF] border border-[#0099FF]/40 shadow-[0_0_25px_rgba(0,102,255,0.3)] hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] transition-all duration-300 transform active:scale-95"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#00D2FF]" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wider text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] backdrop-blur-sm transition-all duration-300"
              >
                <span>Start a Project</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div
            ref={sceneWrapperRef}
            className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[580px] w-full relative flex items-center justify-center"
          >
            <Scene />
          </div>
        </div>
      </div>

      {/* Bottom Hero Information Row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-8 border-t border-white/[0.07]">
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl"
        >
          {/* 01 - IDEAS */}
          <div className="flex flex-col group">
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#00D2FF] tracking-wider mb-1">
              01 —
            </span>
            <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-gray-200 group-hover:text-white transition-colors">
              IDEAS
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
              Conceptualization & Architecture
            </span>
          </div>

          {/* 02 - BUILD */}
          <div className="flex flex-col group">
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#00D2FF] tracking-wider mb-1">
              02 —
            </span>
            <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-gray-200 group-hover:text-white transition-colors">
              BUILD
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
              Modern Engineering & Scale
            </span>
          </div>

          {/* 03 - IMPACT */}
          <div className="flex flex-col group">
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#00D2FF] tracking-wider mb-1">
              03 —
            </span>
            <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-gray-200 group-hover:text-white transition-colors">
              IMPACT
            </span>
            <span className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
              Measurable Commerce Growth
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
