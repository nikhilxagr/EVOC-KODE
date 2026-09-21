import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, Compass, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'

// 3 Minimal, High-Impact Core Pillars
const pillars = [
  {
    num: '01',
    icon: Code2,
    title: 'Purpose-Built Architecture',
    subtitle: 'Modern Engineering',
    desc: 'Clean React 19 & TypeScript systems built to scale. Zero fragile dependencies, zero technical debt.',
    badge: 'Production Grade',
    color: '#38BDF8',
  },
  {
    num: '02',
    icon: Compass,
    title: 'Spatial 3D Experiences',
    subtitle: 'High-Contrast Craft',
    desc: 'Hardware-accelerated WebGL shaders and tactile kinetic interactions that create lasting brand prestige.',
    badge: 'Spatial 3D',
    color: '#22D3EE',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Direct Builder Access',
    subtitle: 'Zero Bureaucracy',
    desc: 'Direct collaboration with the developers writing your code. Rapid weekly releases with transparent milestones.',
    badge: 'Founder Direct',
    color: '#818CF8',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const boxContainerRef = useRef(null)
  const [boxTilt, setBoxTilt] = useState({ rotX: 0, rotY: 0 })

  // Interactive 3D tilt tracking for the opened box
  const handleMouseMove = (e) => {
    if (!boxContainerRef.current || window.innerWidth < 768) return
    const rect = boxContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotX = (y / (rect.height / 2)) * -4.5
    const rotY = (x / (rect.width / 2)) * 4.5
    setBoxTilt({ rotX, rotY })
  }

  const handleMouseLeave = () => {
    setBoxTilt({ rotX: 0, rotY: 0 })
  }

  const handleTouchMove = (e) => {
    if (!boxContainerRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = boxContainerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left - rect.width / 2
    const y = touch.clientY - rect.top - rect.height / 2
    const rotX = (y / (rect.height / 2)) * -3.5
    const rotY = (x / (rect.width / 2)) * 3.5
    setBoxTilt({ rotX, rotY })
  }

  const handleTouchEnd = () => {
    setBoxTilt({ rotX: 0, rotY: 0 })
  }

  // 3D Box Opening & Expand ScrollTrigger Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      // 1. 3D Vibe Header reveals
      tl.fromTo(
        '.about-header-3d',
        { opacity: 0, y: 35, rotateX: 12 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' }
      )

      // 2. 3D Box Unfolds / Opens like a precision container
      tl.fromTo(
        '.box-lid',
        { rotateX: -65, opacity: 0, transformOrigin: 'top center' },
        { rotateX: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.45'
      )

      tl.fromTo(
        '.box-core',
        { scale: 0.9, translateZ: -40, opacity: 0.3 },
        { scale: 1, translateZ: 10, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.65'
      )

      tl.fromTo(
        '.box-light-burst',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      )

      // 3. The 3 Pillars inside the box cascade forward
      tl.fromTo(
        '.pillar-card',
        { opacity: 0, y: 22, rotateX: 10 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Divider Line */}
      <div className="section-line mb-14 sm:mb-16" />

      {/* Top Header with Sculptural 3D Text Vibe */}
      <div className="about-header-3d space-y-4 sm:space-y-5 max-w-3xl mb-12 sm:mb-16">
        {/* Architectural Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-cyan-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>STUDIO PHILOSOPHY & CRAFT</span>
        </div>

        {/* 3D Vibe Headline */}
        <h2 className="font-round8 text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold uppercase tracking-tight leading-[1.08]">
          <span
            className="block text-transparent bg-clip-text drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFFFFF 35%, #BAE6FD 75%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            We Architect Software
          </span>
          <span
            className="block text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #38BDF8 0%, #22D3EE 50%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 24px rgba(34,211,238,0.3))',
            }}
          >
            For Teams Who Value Craft.
          </span>
        </h2>

        {/* Minimal, Punchy Studio Definition */}
        <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl pt-1">
          EVOC KODES is the digital product and technology studio of EVOC Labs. We partner directly with founders to build high-performance web applications, spatial 3D experiences, and scalable cloud platforms.
        </p>
      </div>

      {/* 3D box container */}
      <div
        className="w-full flex justify-center py-2"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={boxContainerRef}
          className="relative w-full rounded-[28px] sm:rounded-[36px] transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1200px) rotateX(${boxTilt.rotX.toFixed(2)}deg) rotateY(${boxTilt.rotY.toFixed(2)}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Inner Neon Light Burst — Reveals inside the opened box (No bubbles) */}
          <div
            className="box-light-burst pointer-events-none absolute -inset-2 rounded-[36px] opacity-0 transition-opacity blur-[70px] z-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.18) 0%, rgba(59,130,246,0.10) 50%, transparent 80%)',
            }}
          />

          {/* 3D Box Outer Shell */}
          <div
            className="box-core relative z-10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden border border-white/[0.12] bg-gradient-to-br from-[#090F1E]/95 via-[#060A14]/98 to-[#02050E]/95 backdrop-blur-2xl shadow-2xl shadow-black/80"
            style={{
              boxShadow: '0 30px 70px -15px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 35px -8px rgba(34,211,238,0.15)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Top Unfolding Lid Header Bar */}
            <div
              className="box-lid flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-white/[0.08]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-400 font-semibold block">
                    Opened Architectural Vault
                  </span>
                  <h3 className="font-round8 text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                    Studio Foundations
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                <span>BENGALURU STUDIO</span>
                <span>•</span>
                <span className="text-white font-medium">FOUNDED 2024</span>
              </div>
            </div>

            {/* Core Manifesto Statement inside the Box */}
            <div
              className="py-7 max-w-2xl space-y-2"
              style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
            >
              <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-snug">
                "Great software is built by obsessing over user experience, clean architecture, and taking pride in every detail."
              </p>
            </div>

            {/* The 3 Minimal, High-Impact Pillars (Clean 3D Chips) */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2 pb-7"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.num}
                    className="pillar-card rounded-2xl p-5 sm:p-6 glass border border-white/[0.08] hover:border-cyan-400/40 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between select-none"
                    style={{
                      transform: 'translateZ(20px)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div>
                      {/* Top row: Number, Icon, Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="font-mono text-xs font-bold tracking-wider"
                          style={{ color: p.color }}
                        >
                          {p.num}
                        </span>

                        <span
                          className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                          style={{
                            color: p.color,
                            background: `${p.color}15`,
                            border: `1px solid ${p.color}30`,
                          }}
                        >
                          {p.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${p.color}15`,
                            border: `1px solid ${p.color}30`,
                            color: p.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-round8 text-base font-bold text-white tracking-tight leading-tight">
                          {p.title}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-400 font-light leading-relaxed pt-1">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Credentials & Links */}
            <div
              className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ transform: 'translateZ(14px)', transformStyle: 'preserve-3d' }}
            >
              <a
                href="https://www.evoclabs.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
              >
                <span>Explore Parent Studio · EVOC Labs</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex items-center gap-4 font-mono text-[11px] text-gray-500">
                <span>STRICT NDA</span>
                <span>•</span>
                <span>100% IP OWNERSHIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
