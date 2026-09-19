import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl glass border border-white/[0.08] hover:border-white/25 overflow-hidden cursor-pointer flex flex-col flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] transition-all duration-300 select-none"
      style={{
        boxShadow: isHovered
          ? `0 16px 40px -10px ${project.accentColor}20, 0 0 0 1px ${project.accentColor}30`
          : '0 8px 24px -8px rgba(0,0,0,0.5)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0px)',
      }}
    >
      {/* Visual Preview Box */}
      <div
        className="relative h-44 sm:h-48 overflow-hidden flex flex-col justify-between p-5 border-b border-white/[0.06]"
        style={{
          background: `radial-gradient(ellipse at top right, ${project.accentColor}18 0%, #060b15 70%)`,
        }}
      >
        {/* Subtle glow orb */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[50px] pointer-events-none opacity-25 transition-opacity group-hover:opacity-40"
          style={{ background: project.accentColor }}
        />

        {/* Top meta row */}
        <div className="flex items-center justify-between z-10">
          <span className="font-mono text-xs font-bold" style={{ color: project.accentColor }}>
            {project.number}
          </span>
          <span className="font-mono text-[10px] text-gray-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
            {project.year}
          </span>
        </div>

        {/* Faint watermark number in background */}
        <div className="absolute -bottom-4 right-4 font-bebas text-[7rem] leading-none opacity-[0.05] text-white select-none pointer-events-none group-hover:opacity-[0.09] transition-opacity">
          {project.number}
        </div>

        {/* Bottom subtle accent line */}
        <div
          className="h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-16 z-10"
          style={{ background: project.accentColor }}
        />
      </div>

      {/* Card Content — Simple, balanced typography */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#060b15]/60 gap-4">
        <div>
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
            {project.category}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Footer with clean arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
          <span className="text-[11px] tracking-wider uppercase">Case Study</span>
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: project.accentColor }}
          />
        </div>
      </div>
    </div>
  )
}

// Horizontal scroll portfolio showcase
export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [progressPercent, setProgressPercent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        return -(trackWidth - window.innerWidth + 120)
      }

      // Pin section and glide cards horizontally on scroll
      const pin = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: () => `+=${Math.max(window.innerWidth * 1.5, track.scrollWidth - window.innerWidth + 300)}`,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            setProgressPercent(Math.round(progress * 100))
            const idx = Math.min(
              projects.length,
              Math.max(1, Math.round(progress * (projects.length - 1)) + 1)
            )
            setActiveIndex(idx)
          },
        },
      })

      pin.to(track, {
        x: getScrollAmount,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-screen bg-[#030712] overflow-hidden flex flex-col justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 mb-8 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400 font-semibold block mb-1">
              Portfolio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              Selected Work
            </h2>
          </div>

          {/* Simple Progress Counter */}
          <div className="flex items-center gap-4 self-start sm:self-end">
            <span className="font-mono text-xs text-gray-400 tracking-wider">
              {String(activeIndex).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>

            {/* Clean progress line */}
            <div className="w-24 sm:w-32 h-1 rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${Math.max(16, progressPercent)}%`,
                  background: '#3B82F6',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Cards Track */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-6 lg:px-12 flex-nowrap will-change-transform py-2"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 mt-6 flex-shrink-0 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span>Scroll to explore projects</span>
        <span>Click card for details</span>
      </div>

      {/* Clean Modal */}
      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
          onSelectProject={(newProj) => setSelected(newProj)}
        />
      )}
    </section>
  )
}
