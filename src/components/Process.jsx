

import { useEffect, useRef } from 'react'
import { Lightbulb, PenTool, Code2, Rocket, BarChart2 } from 'lucide-react'
import gsap from 'gsap'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discover & Strategize',
    description:
      'We deep-dive into your business goals, audience, and tech constraints. The output is a clear product architecture and roadmap — not a vague proposal.',
    duration: '1 – 2 weeks',
    color: '#38BDF8',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design & Prototype',
    description:
      'High-fidelity wireframes and interactive prototypes built in Figma. Every interaction, state, and edge case is modeled before a line of code is written.',
    duration: '1 – 3 weeks',
    color: '#818CF8',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build & Integrate',
    description:
      'Agile engineering sprints with weekly demos. Clean, documented, testable code. CI/CD pipelines from day one — no last-minute integration surprises.',
    duration: '3 – 10 weeks',
    color: '#3B82F6',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Deploy',
    description:
      'Zero-downtime production launch with real-time monitoring, rollback capability, and performance budget validation. We celebrate go-lives, not firefighting.',
    duration: '1 week',
    color: '#34D399',
  },
  {
    number: '05',
    icon: BarChart2,
    title: 'Measure & Iterate',
    description:
      'Post-launch telemetry, conversion analysis, and iterative improvements. Real data drives every decision — we stay in the loop long after launch.',
    duration: 'Ongoing',
    color: '#F59E0B',
  },
]

export default function Process() {
  const sectionRef  = useRef(null)
  const progressRef = useRef(null)

  const stepRefs = useRef([])
  const numRefs  = useRef([])
  const dotRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const count = steps.length

      // Set initial hidden state for steps 1 to 4
      steps.forEach((_, i) => {
        if (i > 0) {
          gsap.set(stepRefs.current[i], { opacity: 0, y: 70 })
          gsap.set(numRefs.current[i],  { opacity: 0, y: 12 })
          gsap.set(dotRefs.current[i],  { opacity: 0.2, scale: 0.7 })
        }
      })

      // Pinned scroll timeline
      const pin = gsap.timeline({
        scrollTrigger: {
          trigger:       sectionRef.current,
          pin:           true,
          pinSpacing:    true,
          start:         'top top',
          end:           `+=${(count - 1) * 100}%`,
          scrub:         1.2,
          anticipatePin: 1,
        },
      })

      // First step entrance
      pin.from(stepRefs.current[0], { opacity: 0, y: 50, ease: 'none' }, 0)

      // For each transition: current step exits, next one enters
      steps.forEach((_, i) => {
        if (i >= count - 1) return

        const at = i * 2 + 1.6

        pin.to(stepRefs.current[i],     { opacity: 0, y: -55, ease: 'none' }, at)
        pin.to(numRefs.current[i],      { opacity: 0, y: -10, ease: 'none' }, at)
        pin.to(stepRefs.current[i + 1], { opacity: 1, y: 0,   ease: 'none' }, at)
        pin.to(numRefs.current[i + 1],  { opacity: 1, y: 0,   ease: 'none' }, at)
        pin.to(dotRefs.current[i],      { opacity: 0.2, scale: 0.7, ease: 'none' }, at)
        pin.to(dotRefs.current[i + 1],  { opacity: 1,   scale: 1,   ease: 'none' }, at)
        pin.to(progressRef.current, {
          height: `${((i + 1) / (count - 1)) * 100}%`,
          ease: 'none',
        }, at)
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative h-screen bg-[#030712] overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />

      {/* ── All content in ONE centered container ──── */}
      <div className="absolute inset-0 flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-12 xl:px-16">

        {/* Section header */}
        <div className="mb-10">
          <div className="section-line mb-5" />
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-blue-400 block mb-1">
            How We Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
            Our Process
          </h2>
        </div>

        {/* Main row: left indicator + right card */}
        <div className="flex items-center gap-8 lg:gap-14">

          {/* ── Left: Step number + progress bar + dots ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4 w-20 lg:w-28">

            {/* Big step number — all stacked, only one visible at a time */}
            <div className="relative h-20 w-full flex items-center justify-center">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={el => numRefs.current[i] = el}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span
                    className="font-bebas text-[72px] sm:text-[88px] leading-none"
                    style={{ color: step.color, textShadow: `0 0 40px ${step.color}50` }}
                  >
                    {step.number}
                  </span>
                </div>
              ))}
            </div>

            {/* Vertical progress bar */}
            <div className="relative w-px h-24 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div
                ref={progressRef}
                className="absolute top-0 left-0 right-0 rounded-full"
                style={{
                  height: '0%',
                  background: 'linear-gradient(to bottom, #38BDF8, #3B82F6)',
                }}
              />
            </div>

            {/* Step dots */}
            <div className="flex flex-col gap-2.5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={el => dotRefs.current[i] = el}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: step.color,
                    opacity:   i === 0 ? 1   : 0.2,
                    transform: i === 0 ? 'scale(1)' : 'scale(0.7)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Step cards (stacked, one visible at a time) ── */}
          <div className="flex-1 relative" style={{ minHeight: '260px' }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  ref={el => stepRefs.current[i] = el}
                  className="absolute top-0 left-0 right-0"
                  style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'none' : 'translateY(70px)' }}
                >
                  <div
                    className="glass rounded-3xl p-7 sm:p-9 border relative overflow-hidden"
                    style={{
                      borderColor: `${step.color}22`,
                      boxShadow:   `0 0 60px ${step.color}0D, 0 20px 40px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Subtle top glow line */}
                    <div
                      className="absolute top-0 left-1/4 right-1/4 h-px"
                      style={{ background: `linear-gradient(90deg,transparent,${step.color}55,transparent)` }}
                    />

                    {/* Icon + duration */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{ background: `${step.color}12`, borderColor: `${step.color}28` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      <span
                        className="font-mono text-[10px] px-3 py-1.5 rounded-full border"
                        style={{ color: step.color, borderColor: `${step.color}28`, background: `${step.color}0A` }}
                      >
                        {step.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      {step.description}
                    </p>

                    {/* Step label */}
                    <div className="mt-5 font-mono text-[10px] text-gray-700 tracking-widest">
                      STEP {step.number} / {String(steps.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll hint at bottom */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] text-gray-700 tracking-[0.3em] uppercase">
        Scroll to explore each step
      </div>
    </section>
  )
}