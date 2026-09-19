
import { useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, Layers, Cpu } from 'lucide-react'
import gsap from 'gsap'

// Cards describing EVOC's core competencies
const pillars = [
  {
    icon: Code2,
    title: 'Code First',
    desc: 'Every product starts with clean, scalable architecture. We build to last.',
  },
  {
    icon: Cpu,
    title: 'AI Powered',
    desc: 'Intelligence baked into every layer — from agents to analytics to automation.',
  },
  {
    icon: Layers,
    title: 'Commerce Ready',
    desc: 'Purpose-built for D2C and eCommerce growth. Not generic, but specific.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-left',
        { opacity: 0, x: -50 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        }
      )
      gsap.fromTo('.about-pillar',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          opacity: 1, y: 0, stagger: 0.15, duration: 0.75, ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <div className="section-line mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/*  Left: Brand story  */}
        <div className="about-left flex flex-col gap-8">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-cyan-400 block mb-4">
              About EVOC KODES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              The studio where
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ideas become products.
              </span>
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed text-base font-light max-w-lg">
            EVOC KODES is the technology development wing of EVOC Labs — the people who build,
            ship, and scale the tools that power modern D2C commerce. We don't just write code.
            We architect systems, design experiences, and engineer outcomes.
          </p>

          <p className="text-gray-500 leading-relaxed text-sm font-light max-w-lg">
            From AI calling agents and logistics intelligence to immersive storefronts and 
            analytics dashboards — every product we build serves one mission: help brands grow 
            smarter, not harder.
          </p>

          <a
            href="https://www.evoclabs.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200 self-start"
          >
            <span>Visit EVOC Labs</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-6 flex gap-4 items-center font-mono text-xs text-gray-700 tracking-widest uppercase select-none">
            {'IDEA → CODE → PRODUCT → IMPACT'.split(' ').map((word, i) => (
              <span key={i} className={word === '→' ? 'text-cyan-600' : ''}>{word}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="about-pillar group relative p-6 rounded-2xl glass border border-white/[0.06] hover:border-cyan-400/20 transition-all duration-300 hover:bg-[#0D1525]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/50 transition-all duration-300" />

                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/15 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
