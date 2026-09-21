import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, Layers, Cpu, Smartphone, Palette, Box } from 'lucide-react'
import gsap from 'gsap'

const services = [
  {
    number: '01',
    title: 'Web Development',
    subtitle: 'Frontend Engineering',
    icon: Code2,
    description:
      'Pixel-perfect, interactive web experiences built on modern React architecture with GSAP animations and WebGL polish.',
    tech: ['React 19', 'Next.js 15', 'TypeScript', 'GSAP', 'Three.js'],
    color: '#22D3EE',
  },
  {
    number: '02',
    title: 'Full-Stack Systems',
    subtitle: 'Backend & APIs',
    icon: Layers,
    description:
      'Scalable cloud-native backends, real-time APIs, and distributed system architectures that handle any load.',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'K8s'],
    color: '#3B82F6',
  },
  {
    number: '03',
    title: 'AI Solutions',
    subtitle: 'Intelligence Layer',
    icon: Cpu,
    description:
      'Voice AI calling agents, autonomous commerce automation, LLM integrations, and machine learning pipelines.',
    tech: ['LLM Orchestration', 'Python', 'FastAPI', 'RAG', 'Agents'],
    color: '#818CF8',
  },
  {
    number: '04',
    title: 'Mobile Experiences',
    subtitle: 'Cross-Platform Apps',
    icon: Smartphone,
    description:
      'Fast, responsive mobile applications and PWAs with touch-first interactions built for high conversion.',
    tech: ['React Native', 'PWA', 'Expo', 'Tailwind v4', 'Native APIs'],
    color: '#34D399',
  },
  {
    number: '05',
    title: 'UI / UX Engineering',
    subtitle: 'Design Systems',
    icon: Palette,
    description:
      'Design systems, motion design, and production-quality interfaces that feel premium and perform flawlessly.',
    tech: ['Figma', 'GSAP 3', 'Framer', 'Design Systems', 'Tailwind'],
    color: '#F59E0B',
  },
  {
    number: '06',
    title: 'Digital Products',
    subtitle: 'Idea → Shipped',
    icon: Box,
    description:
      'End-to-end product builds — from research and architecture to MVP launch and post-release iteration.',
    tech: ['Product Strategy', 'React', 'Node', 'Cloud', 'Analytics'],
    color: '#F472B6',
  },
]

// Mobile auto-showcase with zoom transitions & touch gestures
function MobileServiceAutoShowcase({ services }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState('active') // 'active', 'zoom-out', 'zoom-in'
  const [direction, setDirection] = useState('next') // 'next' or 'prev'
  const [isPaused, setIsPaused] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [touchTilt, setTouchTilt] = useState({ rotX: 0, rotY: 0 })

  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const cardRef = useRef(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)

  const activeService = services[currentIndex % services.length] || services[0]
  const prevService = services[(currentIndex - 1 + services.length) % services.length]
  const nextService = services[(currentIndex + 1) % services.length]
  const Icon = activeService.icon

  const goToNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection('next')
    setPhase('zoom-out')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
      setPhase('zoom-in')
      setTimeout(() => setPhase('active'), 280)
    }, 220)
  }

  const goToPrev = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection('prev')
    setPhase('zoom-out')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
      setPhase('zoom-in')
      setTimeout(() => setPhase('active'), 280)
    }, 220)
  }

  // Automatic progression with horizontal directional zoom-out and zoom-in
  useEffect(() => {
    if (isPaused || services.length <= 1) return

    const INTERVAL = 3400 // 3.4 seconds per service

    // Animate progress bar fill smoothly
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      void progressRef.current.offsetWidth // trigger reflow
      progressRef.current.style.transition = `width ${INTERVAL - 350}ms linear`
      progressRef.current.style.width = '100%'
    }

    timerRef.current = setTimeout(() => {
      setDirection('next')
      setPhase('zoom-out')

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length)
        setPhase('zoom-in')

        setTimeout(() => {
          setPhase('active')
        }, 280)
      }, 220)
    }, INTERVAL)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, isPaused, services.length])

  // Direct jump by tapping any indicator dot
  const jumpTo = (idx) => {
    if (idx === currentIndex) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection(idx > currentIndex ? 'next' : 'prev')
    setPhase('zoom-out')
    setTimeout(() => {
      setCurrentIndex(idx)
      setPhase('zoom-in')
      setTimeout(() => setPhase('active'), 280)
    }, 200)
  }

  // Touch handlers: Swipe gestures + subtle 3D tilt + specular glint
  const handleTouchStart = (e) => {
    setIsPaused(true)
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      touchStartTime.current = Date.now()
    }
  }

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = Math.max(-10, Math.min(10, ((y - centerY) / centerY) * -10))
    const rotY = Math.max(-10, Math.min(10, ((x - centerX) / centerX) * 10))

    const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100))

    setGlare({ x: glareX, y: glareY, opacity: 0.7 })
    setTouchTilt({ rotX, rotY })
  }

  const handleTouchEnd = (e) => {
    setIsPaused(false)
    setGlare((prev) => ({ ...prev, opacity: 0 }))
    setTouchTilt({ rotX: 0, rotY: 0 })

    if (e.changedTouches && e.changedTouches[0]) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      const deltaY = e.changedTouches[0].clientY - touchStartY.current
      const deltaTime = Date.now() - touchStartTime.current

      // Horizontal swipe detection (> 35px, predominantly horizontal, < 650ms)
      if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1 && deltaTime < 650) {
        if (deltaX < 0) {
          goToNext()
        } else {
          goToPrev()
        }
      }
    }
  }

  // Calculate dynamic transform based on zoom phase and horizontal direction
  let cardTransform = `perspective(1100px) rotateX(${touchTilt.rotX.toFixed(1)}deg) rotateY(${touchTilt.rotY.toFixed(1)}deg) scale(1) translateX(0px) translateZ(0px)`
  let cardOpacity = 1
  let cardFilter = 'none'

  if (phase === 'zoom-out') {
    const xOffset = direction === 'next' ? -28 : 28
    cardTransform = `perspective(1100px) scale(0.86) translateX(${xOffset}px) translateZ(-45px)`
    cardOpacity = 0.15
    cardFilter = 'blur(4px)'
  } else if (phase === 'zoom-in') {
    const xOffset = direction === 'next' ? 28 : -28
    cardTransform = `perspective(1100px) scale(1.05) translateX(${xOffset}px) translateZ(28px)`
    cardOpacity = 0.88
    cardFilter = 'blur(1px)'
  }

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Horizontal Breadcrumb / Peek Context Bar */}
      <div className="flex items-center justify-between w-full max-w-[340px] px-3 mb-1.5 text-[10px] font-mono">
        <span
          onClick={goToPrev}
          className="truncate max-w-[100px] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
        >
          ← {prevService.title}
        </span>
        <span
          className="px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase transition-colors duration-300"
          style={{
            color: activeService.color,
            borderColor: `${activeService.color}35`,
            backgroundColor: `${activeService.color}10`,
          }}
        >
          {activeService.number} / 0{services.length}
        </span>
        <span
          onClick={goToNext}
          className="truncate max-w-[100px] text-gray-500 hover:text-gray-300 transition-colors text-right cursor-pointer"
        >
          {nextService.title} →
        </span>
      </div>

      {/* 3D Showcase Card Viewport */}
      <div
        className="w-full max-w-[340px] px-2 py-2"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        <div
          ref={cardRef}
          className="w-full transition-all duration-300 ease-out"
          style={{
            transform: cardTransform,
            opacity: cardOpacity,
            filter: cardFilter,
            willChange: 'transform, opacity, filter',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Active Service Card in Mobile */}
          <div
            className="relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[300px] border shadow-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(14, 22, 42, 0.94), rgba(6, 10, 20, 0.98))',
              borderColor: `${activeService.color}45`,
              boxShadow: `0 24px 50px -12px ${activeService.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
          >
            {/* Specular Glint Sheen Layer */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
              style={{
                background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18), transparent 70%)`,
                opacity: glare.opacity,
              }}
            />

            {/* Top row: Number, Subtitle Badge, Icon */}
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-bold tracking-widest" style={{ color: activeService.color }}>
                  {activeService.number}
                </span>
                <span
                  className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{
                    color: activeService.color,
                    background: `${activeService.color}12`,
                    border: `1px solid ${activeService.color}25`,
                  }}
                >
                  {activeService.subtitle}
                </span>
              </div>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                style={{
                  borderColor: `${activeService.color}35`,
                  background: `${activeService.color}15`,
                  color: activeService.color,
                  boxShadow: `0 0 16px ${activeService.color}35`,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Middle: Title & Description */}
            <div className="my-4 space-y-2 relative z-10">
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {activeService.title}
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {activeService.description}
              </p>
            </div>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.08] relative z-10">
              {activeService.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border text-gray-300"
                  style={{ borderColor: `${activeService.color}25`, background: `${activeService.color}08` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <a
              href="#contact"
              className="mt-3 flex items-center justify-between text-xs font-semibold pt-2 border-t border-white/[0.06] group relative z-10"
              style={{ color: activeService.color }}
            >
              <span className="tracking-wider uppercase font-mono text-[10px]">Start Project With This</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Modern Status Badge & Smooth Progress Bar */}
      <div className="flex flex-col items-center gap-2.5 mt-2 w-full max-w-[320px]">
        {/* Dynamic Service Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border backdrop-blur-xl shadow-lg transition-all duration-300"
          style={{
            borderColor: `${activeService.color}35`,
            boxShadow: `0 0 20px ${activeService.color}15`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: activeService.color }}
          />
          <span className="font-mono text-xs font-bold" style={{ color: activeService.color }}>
            {activeService.number}
          </span>
          <span className="font-mono text-xs text-gray-500">/</span>
          <span className="font-mono text-xs text-gray-400">
            0{services.length}
          </span>
          <span className="font-mono text-xs text-gray-600">•</span>
          <span className="font-display font-bold text-xs text-white uppercase tracking-tight">
            {activeService.title}
          </span>
        </div>

        {/* Smooth Automatic Progress Bar */}
        <div className="w-44 h-1 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${activeService.color}, #38BDF8)`,
            }}
          />
        </div>

        {/* Minimal dot pagination strip */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {services.map((service, idx) => {
            const isCurrent = idx === currentIndex
            return (
              <button
                key={`dot-${service.number}`}
                onClick={() => jumpTo(idx)}
                aria-label={`Jump to ${service.title}`}
                className="transition-all duration-300 cursor-pointer p-1"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: isCurrent ? '18px' : '5px',
                    height: '5px',
                    backgroundColor: isCurrent ? service.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isCurrent ? `0 0 8px ${service.color}60` : 'none',
                  }}
                />
              </button>
            )
          })}
        </div>

        <span className="font-mono text-[9px] text-gray-500 tracking-wider">
          Auto-cycling in 3D • Swipe or hold to inspect
        </span>
      </div>
    </div>
  )
}

// Desktop 3D flip card
function ServiceCard({ service, index }) {
  const Icon = service.icon
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="service-card flip-card h-72 cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} service — hover to see details`}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <div
        className="flip-card-inner h-full w-full rounded-2xl relative"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="flip-card-front absolute inset-0 w-full h-full flex flex-col justify-between p-7 rounded-2xl glass border border-white/[0.07] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${service.color}08, transparent)`,
          }}
        >
          {/* Top: number + icon */}
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs font-bold tracking-widest" style={{ color: service.color }}>
              {service.number}
            </span>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ borderColor: `${service.color}30`, background: `${service.color}10` }}
            >
              <Icon className="w-5 h-5" style={{ color: service.color }} />
            </div>
          </div>

          {/* Center decorative large number */}
          <div className="font-bebas text-8xl opacity-[0.06] text-white leading-none select-none">
            {service.number}
          </div>

          {/* Bottom: title */}
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-1">{service.title}</h3>
            <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: service.color }}>
              {service.subtitle}
            </span>
          </div>

          {/* Hover hint */}
          <div className="absolute bottom-4 right-5 text-[10px] font-mono text-gray-600 tracking-widest">
            HOVER →
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 w-full h-full flex flex-col justify-between p-7 rounded-2xl border overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, #0A0F1E, #0D1525)`,
            borderColor: `${service.color}30`,
          }}
        >
          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)` }} />

          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase mb-3 block" style={{ color: service.color }}>
              {service.number} — {service.subtitle}
            </span>
            <p className="text-sm text-gray-300 leading-relaxed font-light">{service.description}</p>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {service.tech.map(t => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded border text-gray-400"
                style={{ borderColor: `${service.color}25`, background: `${service.color}08` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: service.color }}>
            <span className="tracking-wider">Learn more</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50, rotateX: 15 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.1, duration: 0.8, ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="section-line mb-12" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
        <div>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400 block mb-3 sm:mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            What We Build
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 max-w-sm font-light leading-relaxed">
          Full-cycle digital products engineered with precision architecture and immersive 3D craft.
        </p>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <MobileServiceAutoShowcase services={services} />
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 perspective-1200">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}
