import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const groups = [
  {
    label: 'Frontend',
    direction: 'left',   // CSS animation direction
    color: '#38BDF8',    // group accent
    items: [
      { name: 'React',        abbr: 'Re',   color: '#61DAFB' },
      { name: 'Next.js',      abbr: 'N ▲',  color: '#FFFFFF' },
      { name: 'TypeScript',   abbr: 'TS',   color: '#3178C6' },
      { name: 'Tailwind CSS', abbr: 'TW',   color: '#38BDF8' },
      { name: 'GSAP',         abbr: 'GS',   color: '#88CE02' },
      { name: 'Three.js',     abbr: '3D',   color: '#049EF4' },
      { name: 'Vite',         abbr: 'V⚡',  color: '#BD34FE' },
      { name: 'Framer',       abbr: 'Fr',   color: '#FF3366' },
    ],
  },
  {
    label: 'Backend',
    direction: 'right',
    color: '#3B82F6',
    items: [
      { name: 'Node.js',      abbr: 'No',   color: '#6DA55F' },
      { name: 'Python',       abbr: 'Py',   color: '#3670A0' },
      { name: 'FastAPI',      abbr: 'FA',   color: '#009688' },
      { name: 'PostgreSQL',   abbr: 'PG',   color: '#316192' },
      { name: 'Redis',        abbr: 'Re',   color: '#DC2626' },
      { name: 'GraphQL',      abbr: 'GQ',   color: '#E10098' },
      { name: 'REST API',     abbr: 'API',  color: '#F59E0B' },
      { name: 'WebSockets',   abbr: 'WS',   color: '#10B981' },
    ],
  },
  {
    label: 'AI / ML',
    direction: 'left',
    color: '#818CF8',
    items: [
      { name: 'LLMs',         abbr: 'AI',   color: '#818CF8' },
      { name: 'RAG',          abbr: 'RG',   color: '#A78BFA' },
      { name: 'AI Agents',    abbr: 'AG',   color: '#C084FC' },
      { name: 'OpenAI',       abbr: 'OA',   color: '#10A37F' },
      { name: 'Langchain',    abbr: 'LC',   color: '#F59E0B' },
      { name: 'Whisper',      abbr: 'WH',   color: '#3B82F6' },
      { name: 'HuggingFace',  abbr: 'HF',   color: '#FFB703' },
      { name: 'Pinecone',     abbr: 'Pi',   color: '#00D4AA' },
    ],
  },
  {
    label: 'DevOps',
    direction: 'right',
    color: '#34D399',
    items: [
      { name: 'Docker',       abbr: 'Do',   color: '#0DB7ED' },
      { name: 'Kubernetes',   abbr: 'K8s',  color: '#326CE5' },
      { name: 'AWS',          abbr: 'AWS',  color: '#FF9900' },
      { name: 'GitHub CI',    abbr: 'CI',   color: '#9CA3AF' },
      { name: 'Vercel',       abbr: 'V▲',   color: '#E2E8F0' },
      { name: 'Nginx',        abbr: 'Nx',   color: '#009639' },
      { name: 'Terraform',    abbr: 'TF',   color: '#7B42BC' },
      { name: 'Cloudflare',   abbr: 'CF',   color: '#F6821F' },
    ],
  },
]

// Individual tech card with hover highlight
function TechCard({ tech }) {
  const ref = useRef(null)

  const handleEnter = () => {
    if (ref.current) {
      ref.current.style.borderColor = `${tech.color}35`
      ref.current.style.boxShadow   = `0 8px 28px ${tech.color}18`
      ref.current.style.transform   = 'translateY(-4px) scale(1.03)'
    }
  }
  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.borderColor = ''
      ref.current.style.boxShadow   = ''
      ref.current.style.transform   = ''
    }
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex-shrink-0 w-[130px] sm:w-[148px] flex flex-col items-center justify-center gap-3 py-5 px-3 rounded-2xl glass border border-white/[0.06] cursor-default"
      style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
    >
      {/* Icon box with brand color tint */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs"
        style={{
          background: `${tech.color}14`,
          border:     `1px solid ${tech.color}28`,
          color:       tech.color,
          letterSpacing: '0.05em',
        }}
      >
        {tech.abbr}
      </div>
      {/* Name */}
      <span className="font-mono text-[10px] text-gray-400 text-center leading-tight tracking-wide">
        {tech.name}
      </span>
    </div>
  )
}

// Marquee row component
function TechRow({ group }) {
  const items = [...group.items, ...group.items] // duplicate for seamless loop
  const cls   = group.direction === 'left' ? 'animate-marquee' : 'animate-marquee-right'

  return (
    <div className="overflow-hidden">
      <div className={`${cls} gap-4 py-2`}>
        {items.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header slides in
      gsap.fromTo('.ts-header',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        }
      )
      // Each row fades in with stagger
      gsap.fromTo('.ts-row',
        { opacity: 0, y: 20 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="tech" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="section-line mb-14" />

      {/* Header */}
      <div className="ts-header max-w-7xl mx-auto px-6 mb-10">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400 block mb-3">
          Technology
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
          Our Stack
        </h2>
      </div>

      {/* 4 auto-scrolling rows */}
      <div className="flex flex-col gap-4">
        {groups.map(group => (
          <div key={group.label} className="ts-row">
            {/* Group label — fixed left, not inside scroll */}
            <div className="max-w-7xl mx-auto px-6 mb-2">
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ color: group.color }}
              >
                {group.label}
              </span>
            </div>
            <TechRow group={group} />
          </div>
        ))}
      </div>
    </section>
  )
}
