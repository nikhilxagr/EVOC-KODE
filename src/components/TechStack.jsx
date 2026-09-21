import { useState, useEffect, useRef } from 'react'
import {
  Code2,
  Server,
  Layers,
  CheckCircle2,
  Activity,
  Database,
  Cpu,
} from 'lucide-react'
import gsap from 'gsap'

// High-fidelity vector SVGs for the 12 core technologies
const CoreIcons = {
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5l-5.6-7.8h-1.4v8.5h1.5v-6.2l5 7c.2.3.5.5.5.5zm1.5-3.5h1.5v3.5H17V13z" />
    </svg>
  ),
  three: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M12 12L3 7" />
      <path d="M12 12l9-5" />
      <path d="M12 12v10" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
      <path d="M10.8 10.3h-2.5v7.2H6.7v-7.2H4.2V8.8h6.6v1.5zm7.3 2.8c0-.7-.4-1.3-1.1-1.6-.7-.4-1.5-.6-2.2-.9-.5-.2-.9-.5-.9-.9 0-.4.3-.7.8-.7.6 0 1.2.3 1.7.7l1-1.1c-.8-.7-1.7-1-2.7-1-1.6 0-2.6.9-2.6 2.2 0 .8.4 1.4 1.2 1.8.7.4 1.6.6 2.3.9.5.2.8.5.8.9 0 .5-.4.8-1 .8-.7 0-1.5-.4-2.1-1.1l-1 1.2c.9 1 2 1.4 3.1 1.4 1.7 0 2.8-.9 2.8-2.3z" fill="#FFFFFF" />
    </svg>
  ),
  gsap: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-.7 2.1-1 3.3-.8 1.4.2 2.4 1.2 3.5 2.3 1.8 1.8 3.8 4 8.2 4 2.7 0 4.3-1.3 5-4-1 .7-2.1 1-3.3.8-1.4-.2-2.4-1.2-3.5-2.3-1.8-1.8-3.8-4-8.2-4zm-8 8c-2.7 0-4.3 1.3-5 4 1-.7 2.1-1 3.3-.8 1.4.2 2.4 1.2 3.5 2.3 1.8 1.8 3.8 4 8.2 4 2.7 0 4.3-1.3 5-4-1 .7-2.1 1-3.3.8-1.4-.2-2.4-1.2-3.5-2.3-1.8-1.8-3.8-4-8.2-4z" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.9 2c-3.1 0-5 1.5-5 3.5v2.5h5.5v1H4.2C2.4 9 1 10.6 1 12.8c0 2.2 1.5 3.7 3.5 3.7h1.9v-2.3c0-1.7 1.4-3.1 3.1-3.1h5.5c1.4 0 2.5-1.1 2.5-2.5V5.5C17.5 3.5 15.6 2 11.9 2zm-1.7 1.7a1 1 0 110 2 1 1 0 010-2zm1.9 18.3c3.1 0 5-1.5 5-3.5V16h-5.5v-1h8.2c1.8 0 3.2-1.6 3.2-3.8 0-2.2-1.5-3.7-3.5-3.7h-1.9v2.3c0 1.7-1.4 3.1-3.1 3.1H8.8c-1.4 0-2.5 1.1-2.5 2.5v3.1c0 2 1.9 3.5 5.6 3.5zm1.7-1.7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  redis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M13 10.5h-2v-2h2v2zm-3 0H8v-2h2v2zm-3 0H5v-2h2v2zm6-3h-2v-2h2v2zm-3 0H8v-2h2v2zm6 0h-2v-2h2v2zm6 5.5c-.5-.4-1.4-.5-2.2-.2-.2-.8-.8-1.5-1.7-1.9l-.6-.3-.3.6c-.3.7-.3 1.4-.1 2-.8.5-2.5.5-4.8.5H2.5c-.3 1.5.2 3.1 1.4 4.3 1.7 1.7 4.5 2.5 8.1 2.5 6.2 0 10-3.3 10.5-6.8.5-.2 1-.5 1.5-.7z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7M8 8l8 8M16 8l-8 8" />
    </svg>
  ),
}

// 12 Flagship Core Technologies
const coreSkills = [
  // Frontend & 3D (6)
  {
    category: 'frontend',
    name: 'React 19',
    role: 'UI Architecture',
    desc: 'Concurrent rendering and modular component pipelines.',
    color: '#61DAFB',
    tag: 'Web / App',
    icon: CoreIcons.react,
  },
  {
    category: 'frontend',
    name: 'Next.js 15',
    role: 'Edge App Framework',
    desc: 'Hybrid SSR, dynamic ISR, and global edge routing.',
    color: '#E2E8F0',
    tag: 'Fullstack',
    icon: CoreIcons.next,
  },
  {
    category: 'frontend',
    name: 'Three.js / WebGL',
    role: 'Spatial 3D Graphics',
    desc: 'Hardware-accelerated shaders and dynamic spatial scenes.',
    color: '#38BDF8',
    tag: '3D Spatial',
    icon: CoreIcons.three,
  },
  {
    category: 'frontend',
    name: 'TypeScript',
    role: 'Strict Type System',
    desc: 'Deterministic interface safety with zero runtime overhead.',
    color: '#3178C6',
    tag: 'Type Safety',
    icon: CoreIcons.ts,
  },
  {
    category: 'frontend',
    name: 'GSAP 3',
    role: 'Kinetic Motion Engine',
    desc: 'Physics-based timeline choreography at silky 120 FPS.',
    color: '#88CE02',
    tag: 'Animation',
    icon: CoreIcons.gsap,
  },
  {
    category: 'frontend',
    name: 'Tailwind CSS v4',
    role: 'Design System Engine',
    desc: 'High-speed modern CSS compiler with clean design tokens.',
    color: '#38BDF8',
    tag: 'Styling',
    icon: CoreIcons.tailwind,
  },

  // Backend & Cloud (6)
  {
    category: 'backend',
    name: 'Node.js',
    role: 'High-Throughput Core',
    desc: 'Non-blocking event loop for scalable concurrent services.',
    color: '#6DA55F',
    tag: 'Async Core',
    icon: CoreIcons.node,
  },
  {
    category: 'backend',
    name: 'Python / FastAPI',
    role: 'High-Performance APIs',
    desc: 'Sub-millisecond endpoints with automatic schema validation.',
    color: '#009688',
    tag: 'Microservices',
    icon: CoreIcons.python,
  },
  {
    category: 'backend',
    name: 'PostgreSQL',
    role: 'Relational & Vector DB',
    desc: 'ACID transactional integrity with pgvector semantic storage.',
    color: '#4169E1',
    tag: 'Persistent Data',
    icon: CoreIcons.postgres,
  },
  {
    category: 'backend',
    name: 'Redis',
    role: 'In-Memory Cache',
    desc: 'Sub-millisecond latency for caching, pub/sub, and sessions.',
    color: '#DC2626',
    tag: 'Ultra-Fast Cache',
    icon: CoreIcons.redis,
  },
  {
    category: 'backend',
    name: 'Docker & K8s',
    role: 'Cloud Orchestration',
    desc: 'Containerized deployments with auto-healing and scaling.',
    color: '#0DB7ED',
    tag: 'Containers',
    icon: CoreIcons.docker,
  },
  {
    category: 'backend',
    name: 'AI & Automation',
    role: 'Intelligent Workflows',
    desc: 'Deterministic agent loops and automated operational pipelines.',
    color: '#818CF8',
    tag: 'Automation',
    icon: CoreIcons.ai,
  },
]

const filterTabs = [
  { id: 'all', label: 'All Core (12)', icon: Layers },
  { id: 'frontend', label: 'Frontend & 3D (6)', icon: Code2 },
  { id: 'backend', label: 'Backend & Cloud (6)', icon: Server },
]

// Precision 3D Card with interactive tilt (mouse + touch), specular light glint, and floating depth
function Tech3DCard({ tech, isCompact = false, isActive = false }) {
  const cardRef = useRef(null)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [transform, setTransform] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  // Mouse hover tracking (desktop)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = ((y - centerY) / centerY) * -13
    const rotY = ((x - centerX) / centerX) * 13

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setGlare({ x: glareX, y: glareY, opacity: 1 })
    setTransform(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(18px) scale(1.035)`
    )
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setGlare((prev) => ({ ...prev, opacity: 0 }))
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)')
  }

  // Touch tracking (mobile)
  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = ((y - centerY) / centerY) * -12
    const rotY = ((x - centerX) / centerX) * 12

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setGlare({ x: glareX, y: glareY, opacity: 0.8 })
    setTransform(
      `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(14px) scale(1.02)`
    )
  }

  const handleTouchEnd = () => {
    setGlare((prev) => ({ ...prev, opacity: 0 }))
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)')
  }

  const isHighlighted = isHovered || isActive

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="group relative w-full h-full rounded-2xl cursor-default select-none transition-transform duration-200 ease-out"
      style={{
        transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
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

      {/* Card Body with Multi-layered Depth */}
      <div
        className={`relative rounded-2xl flex flex-col justify-between overflow-hidden ${
          isCompact ? 'p-4 min-h-[145px]' : 'p-6 h-full min-h-[185px]'
        }`}
        style={{
          background: isHighlighted
            ? 'linear-gradient(145deg, rgba(14, 22, 42, 0.9), rgba(6, 10, 20, 0.98))'
            : 'linear-gradient(145deg, rgba(10, 15, 30, 0.65), rgba(4, 7, 15, 0.85))',
          border: `1px solid ${isHighlighted ? `${tech.color}50` : 'rgba(255, 255, 255, 0.08)'}`,
          boxShadow: isHighlighted
            ? `0 24px 48px -12px ${tech.color}28, 0 0 24px -4px ${tech.color}20, inset 0 1px 0 rgba(255,255,255,0.14)`
            : '0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
        }}
      >
        {/* Top: Icon Badge (Elevated in 3D translateZ: 28px) */}
        <div
          className="flex items-center justify-between"
          style={{ transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
        >
          <div
            className={`${
              isCompact ? 'w-9 h-9 rounded-lg' : 'w-11 h-11 rounded-xl'
            } flex items-center justify-center transition-all duration-300`}
            style={{
              background: `${tech.color}15`,
              border: `1px solid ${tech.color}35`,
              color: tech.color,
              boxShadow: isHighlighted ? `0 0 18px ${tech.color}40` : 'none',
            }}
          >
            {tech.icon}
          </div>

          <span
            className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full truncate max-w-[90px]"
            style={{
              color: tech.color,
              background: `${tech.color}12`,
              border: `1px solid ${tech.color}25`,
            }}
          >
            {tech.tag}
          </span>
        </div>

        {/* Bottom: Name & Specs (Elevated in 3D translateZ: 16px) */}
        <div
          className={`${isCompact ? 'mt-3 space-y-0.5' : 'mt-4 space-y-1.5'}`}
          style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <h4
              className={`font-display font-bold text-white tracking-tight ${
                isCompact ? 'text-sm' : 'text-base sm:text-lg'
              }`}
            >
              {tech.name}
            </h4>
            <span className="font-mono text-[10px] text-gray-500 font-normal truncate">
              {tech.role}
            </span>
          </div>

          {!isCompact && (
            <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
              {tech.desc}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Mobile auto-showcase with zoom transitions
function MobileAutoShowcase({ skills }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState('active') // 'active', 'zoom-out', 'zoom-in'
  const [direction, setDirection] = useState('next') // 'next' or 'prev'
  const [isPaused, setIsPaused] = useState(false)

  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)

  const activeSkill = skills[currentIndex % skills.length] || skills[0]
  const prevSkill = skills[(currentIndex - 1 + skills.length) % skills.length]
  const nextSkill = skills[(currentIndex + 1) % skills.length]

  // Reset index when skills change (e.g. tab filter clicked)
  useEffect(() => {
    setCurrentIndex(0)
    setPhase('active')
  }, [skills])

  const goToNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection('next')
    setPhase('zoom-out')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length)
      setPhase('zoom-in')
      setTimeout(() => setPhase('active'), 280)
    }, 220)
  }

  const goToPrev = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection('prev')
    setPhase('zoom-out')
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length)
      setPhase('zoom-in')
      setTimeout(() => setPhase('active'), 280)
    }, 220)
  }

  // Automatic progression with horizontal directional zoom-out and zoom-in
  useEffect(() => {
    if (isPaused || skills.length <= 1) return

    const INTERVAL = 3200 // 3.2 seconds per skill

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
        setCurrentIndex((prev) => (prev + 1) % skills.length)
        setPhase('zoom-in')

        setTimeout(() => {
          setPhase('active')
        }, 280)
      }, 220)
    }, INTERVAL)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, isPaused, skills.length])

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

  // Touch handlers: Swipe gestures
  const handleTouchStart = (e) => {
    setIsPaused(true)
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      touchStartTime.current = Date.now()
    }
  }

  const handleTouchEnd = (e) => {
    setIsPaused(false)
    if (e.changedTouches && e.changedTouches[0]) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      const deltaY = e.changedTouches[0].clientY - touchStartY.current
      const deltaTime = Date.now() - touchStartTime.current

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
  let cardTransform = 'scale(1) translateX(0px) translateZ(0px)'
  let cardOpacity = 1
  let cardFilter = 'none'

  if (phase === 'zoom-out') {
    const xOffset = direction === 'next' ? -28 : 28
    cardTransform = `scale(0.86) translateX(${xOffset}px) translateZ(-45px)`
    cardOpacity = 0.15
    cardFilter = 'blur(4px)'
  } else if (phase === 'zoom-in') {
    const xOffset = direction === 'next' ? 28 : -28
    cardTransform = `scale(1.05) translateX(${xOffset}px) translateZ(28px)`
    cardOpacity = 0.88
    cardFilter = 'blur(1px)'
  }

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
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
          ← {prevSkill.name}
        </span>
        <span
          className="px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase transition-colors duration-300"
          style={{
            color: activeSkill.color,
            borderColor: `${activeSkill.color}35`,
            backgroundColor: `${activeSkill.color}10`,
          }}
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}
        </span>
        <span
          onClick={goToNext}
          className="truncate max-w-[100px] text-gray-500 hover:text-gray-300 transition-colors text-right cursor-pointer"
        >
          {nextSkill.name} →
        </span>
      </div>

      {/* 3D Showcase Card Viewport */}
      <div
        className="w-full max-w-[340px] px-2 py-2"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        <div
          className="w-full transition-all duration-300 ease-out"
          style={{
            transform: cardTransform,
            opacity: cardOpacity,
            filter: cardFilter,
            willChange: 'transform, opacity, filter',
          }}
        >
          <Tech3DCard tech={activeSkill} isActive={true} />
        </div>
      </div>

      {/* Modern Status Badge & Smooth Progress Bar (No manual move buttons) */}
      <div className="flex flex-col items-center gap-2.5 mt-3 w-full max-w-[320px]">
        {/* Dynamic Skill Badge with Brand Color Tint */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border backdrop-blur-xl shadow-lg transition-all duration-300"
          style={{
            borderColor: `${activeSkill.color}35`,
            boxShadow: `0 0 20px ${activeSkill.color}15`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: activeSkill.color }}
          />
          <span className="font-mono text-xs font-bold" style={{ color: activeSkill.color }}>
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs text-gray-500">/</span>
          <span className="font-mono text-xs text-gray-400">
            {String(skills.length).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs text-gray-600">•</span>
          <span className="font-display font-bold text-xs text-white uppercase tracking-tight">
            {activeSkill.name}
          </span>
        </div>

        {/* Smooth Automatic Progress Bar */}
        <div className="w-44 h-1 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${activeSkill.color}, #38BDF8)`,
            }}
          />
        </div>

        {/* Minimal dot pagination strip */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {skills.map((skill, idx) => {
            const isCurrent = idx === currentIndex
            return (
              <button
                key={`dot-${skill.name}`}
                onClick={() => jumpTo(idx)}
                aria-label={`Jump to ${skill.name}`}
                className="transition-all duration-300 cursor-pointer p-1"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: isCurrent ? '18px' : '5px',
                    height: '5px',
                    backgroundColor: isCurrent ? skill.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isCurrent ? `0 0 8px ${skill.color}60` : 'none',
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

export default function TechStack() {
  const sectionRef = useRef(null)
  const gridStageRef = useRef(null)
  const [activeTab, setActiveTab] = useState('all')

  // Smooth stage parallax on section mouse move (desktop only)
  const handleSectionMouseMove = (e) => {
    if (!gridStageRef.current || window.innerWidth < 768) return
    const rect = gridStageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const tiltX = (y / (rect.height / 2)) * -2.5
    const tiltY = (x / (rect.width / 2)) * 2.5

    gridStageRef.current.style.transform = `perspective(1400px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`
  }

  const handleSectionMouseLeave = () => {
    if (gridStageRef.current) {
      gridStageRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)'
    }
  }

  // Filtered skills
  const filteredSkills =
    activeTab === 'all'
      ? coreSkills
      : coreSkills.filter((s) => s.category === activeTab)

  // GSAP scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-header',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
      gsap.fromTo(
        '.tech-card-item',
        { opacity: 0, y: 20, rotateX: 8 },
        {
          scrollTrigger: { trigger: gridStageRef.current, start: 'top 85%' },
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeTab])

  return (
    <section
      id="tech"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="py-20 sm:py-24 relative overflow-hidden bg-[#030712]"
    >
      <div className="section-line mb-14 sm:mb-16" />

      {/* Subtle ambient lighting gradients (No bubbles) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[450px] h-[250px] bg-cyan-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="tech-header flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-cyan-400 block">
              Core Stack
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
              Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Scale & Speed</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              The 12 primary technologies we rely on to build high-performance, production-grade applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl glass border border-white/[0.08] bg-[#0A0F1E]/80 backdrop-blur-xl">
            {filterTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_16px_rgba(34,211,238,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile view */}
        <div className="block md:hidden mb-12">
          <MobileAutoShowcase skills={filteredSkills} />
        </div>

        {/* Desktop view */}
        <div
          ref={gridStageRef}
          className="hidden md:block transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {filteredSkills.map((tech) => (
              <div key={tech.name} className="tech-card-item">
                <Tech3DCard tech={tech} />
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Strip */}
        <div className="p-5 sm:p-7 rounded-3xl glass border border-white/[0.08] bg-gradient-to-r from-[#090F1E]/90 to-[#060A14]/90 backdrop-blur-2xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>12 Flagship Tools</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base md:text-lg text-white">Curated Foundation</p>
            <p className="font-mono text-[10px] sm:text-[11px] text-gray-500">Zero legacy bloat</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs">
              <Activity className="w-3.5 h-3.5" />
              <span>&lt; 50ms Edge</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base md:text-lg text-white">Global Distribution</p>
            <p className="font-mono text-[10px] sm:text-[11px] text-gray-500">Sub-second load times</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <Database className="w-3.5 h-3.5" />
              <span>ACID Storage</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base md:text-lg text-white">Enterprise Data</p>
            <p className="font-mono text-[10px] sm:text-[11px] text-gray-500">Postgres + Redis caching</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>100% Native</span>
            </div>
            <p className="font-display font-bold text-sm sm:text-base md:text-lg text-white">Container Driven</p>
            <p className="font-mono text-[10px] sm:text-[11px] text-gray-500">Deterministic deployments</p>
          </div>
        </div>
      </div>
    </section>
  )
}
