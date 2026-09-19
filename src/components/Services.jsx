
import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, Layers, Cpu, Smartphone, Sparkles, Box } from 'lucide-react'
import gsap from 'gsap'

const services = [
  {
    number: '01',
    title: 'Web Development',
    subtitle: 'Frontend Engineering',
    icon: Code2,
    description:
      'Pixel-perfect, interactive web experiences built on modern React architecture with GSAP animations and WebGL polish.',
    tech: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Three.js'],
    color: '#22D3EE',
    gradient: 'from-cyan-500/20 to-blue-600/10',
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
    gradient: 'from-blue-500/20 to-indigo-600/10',
  },
  {
    number: '03',
    title: 'AI Solutions',
    subtitle: 'Intelligence Layer',
    icon: Cpu,
    description:
      'Voice AI calling agents, autonomous commerce automation, LLM integrations, and machine learning pipelines.',
    tech: ['LLM', 'Python', 'FastAPI', 'RAG', 'Agents'],
    color: '#818CF8',
    gradient: 'from-indigo-500/20 to-purple-600/10',
  },
  {
    number: '04',
    title: 'Mobile Experiences',
    subtitle: 'Cross-Platform Apps',
    icon: Smartphone,
    description:
      'Fast, responsive mobile applications and PWAs with touch-first interactions built for high conversion.',
    tech: ['React Native', 'PWA', 'Expo', 'Tailwind', 'Native APIs'],
    color: '#34D399',
    gradient: 'from-emerald-500/20 to-cyan-600/10',
  },
  {
    number: '05',
    title: 'UI / UX Engineering',
    subtitle: 'Design Systems',
    icon: Sparkles,
    description:
      'Design systems, motion design, and production-quality interfaces that feel premium and perform flawlessly.',
    tech: ['Figma', 'GSAP', 'Framer', 'Storybook', 'Tailwind'],
    color: '#F59E0B',
    gradient: 'from-amber-500/20 to-orange-600/10',
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
    gradient: 'from-pink-500/20 to-rose-600/10',
  },
]

// Individual flip card
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
    <section id="services" ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto">
      <div className="section-line mb-12" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400 block mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            What We Build
          </h2>
        </div>
        <p className="text-sm text-gray-400 max-w-sm font-light leading-relaxed">
          Hover each card to reveal the details — from tech stacks to what we actually deliver.
        </p>
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 perspective-1200">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}
