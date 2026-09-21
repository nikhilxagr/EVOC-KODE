import { useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, Compass, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'

const principles = [
  {
    num: '01',
    icon: Code2,
    title: 'Purpose-Built Architecture',
    subtitle: 'Modern Engineering',
    desc: 'We write clean, modular React and TypeScript code designed to scale effortlessly. No bloated templates, no fragile dependencies — just rock-solid, production-grade software.',
    tags: ['React 19', 'TypeScript', 'Clean APIs', 'Tailwind'],
  },
  {
    num: '02',
    icon: Compass,
    title: 'Interfaces That Delight',
    subtitle: 'Thoughtful Design',
    desc: 'Every micro-interaction, button placement, and transition is crafted with intention. We design modern, high-contrast digital experiences that your users naturally enjoy using.',
    tags: ['Smooth Motion', 'Spatial Depth', 'Micro-Interactions'],
  },
  {
    num: '03',
    icon: HeartHandshake,
    title: 'Direct Engineer Access',
    subtitle: 'Transparent Partnership',
    desc: 'No agency middlemen or layers of bureaucracy. You work directly with the developers writing your code, with clear communication and fast, reliable delivery cycles.',
    tags: ['Weekly Demos', 'Clear SLAs', 'Direct Slack Access'],
  },
]

const studioFacts = [
  { label: 'Studio Base', value: 'Bengaluru, India', detail: 'Global tech hub' },
  { label: 'Engineering Craft', value: 'Full-Stack & 3D', detail: 'Web, mobile & platforms' },
  { label: 'Code Standard', value: 'TypeScript First', detail: 'Zero technical debt build' },
  { label: 'Collaboration', value: 'Direct Builder Access', detail: 'No agency runaround' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-item',
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power2.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 max-w-7xl mx-auto"
    >
      {/* Section Divider Line */}
      <div className="section-line mb-16" />

      {/* Top Header */}
      <div className="about-item space-y-6 max-w-4xl mb-16">
        {/* Calm, solid badge — zero blinkers */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-cyan-300 font-mono text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>STUDIO PHILOSOPHY & CRAFT</span>
        </div>

        <h2 className="font-round8 text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold uppercase tracking-tight leading-[1.06]">
          We Build Software For Teams <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
            Who Value Craftsmanship.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl pt-1">
          EVOC KODES is the digital product and technology studio of EVOC Labs. We partner directly with founders and teams to build high-performance web applications, mobile platforms, and commerce tools that stand out.
        </p>
      </div>

      {/* Human Studio Manifesto Card & Facts */}
      <div className="about-item grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left: Studio Manifesto */}
        <div className="lg:col-span-7 rounded-[32px] glass border border-white/[0.12] p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#090F1E]/85 to-[#060A14]/90 backdrop-blur-2xl">
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 tracking-wider uppercase">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>How We Work</span>
            </div>

            <p className="text-xl sm:text-2xl text-white font-display font-bold leading-snug">
              "Great software isn't built on buzzwords or shortcuts. It's built by obsessing over user experience, writing clean code, and taking pride in every detail."
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
              We reject fragile templates and bloated enterprise layers. Every project starts with a deep understanding of your business goals, followed by clean architecture, deliberate design decisions, and battle-tested code.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <a
              href="https://www.evoclabs.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore Parent Studio · EVOC Labs</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="flex items-center gap-2 font-mono text-xs text-gray-500 tracking-wider">
              <span>BENGALURU STUDIO</span>
              <span>•</span>
              <span className="text-white font-medium">FOUNDED 2024</span>
            </div>
          </div>
        </div>

        {/* Right: Studio Standards & Credibility Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {studioFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl glass border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 bg-white/[0.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                  {fact.label}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/80" />
              </div>

              <div className="font-round8 text-xl sm:text-2xl font-bold text-white mb-0.5">
                {fact.value}
              </div>

              <p className="font-mono text-xs text-gray-500">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Engineering & Design Principles */}
      <div className="about-item grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p) => {
          const Icon = p.icon
          return (
            <div
              key={p.num}
              className="group rounded-3xl glass border border-white/[0.08] hover:border-cyan-400/30 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 bg-[#070D1B]/60"
            >
              <div>
                {/* Header with Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                    {p.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-300 transition-colors group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                  {p.subtitle}
                </div>
                <h3 className="font-round8 text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                  {p.desc}
                </p>
              </div>

              {/* Tags footer */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-gray-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
