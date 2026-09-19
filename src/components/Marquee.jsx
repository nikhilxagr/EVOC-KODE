import { Zap } from 'lucide-react'

// Items shown in the scrolling ticker
const items = [
  'React.js', 'Three.js', 'TypeScript', 'Next.js', 'Node.js',
  'AI Agents', 'WebGL', 'GSAP', 'Python', 'PostgreSQL',
  'Tailwind CSS', 'Docker', 'Redis', 'D2C Commerce', 'Lenis',
  'Framer', 'Vite', 'FastAPI', 'LLM', 'Cloud Native',
]

// Single item pill
function Tag({ label }) {
  return (
    <div className="inline-flex items-center gap-2.5 mx-5 px-5 py-2 rounded-full glass border border-white/[0.06] flex-shrink-0">
      <Zap className="w-3 h-3 text-cyan-400 flex-shrink-0" />
      <span className="font-mono text-xs text-gray-400 tracking-widest uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

export default function Marquee() {
  // Duplicate list so the loop is seamless
  const all = [...items, ...items]

  return (
    <div className="py-8 overflow-hidden border-y border-white/[0.05] bg-[#050914]">
      <div className="animate-marquee">
        {all.map((item, i) => (
          <Tag key={`${item}-${i}`} label={item} />
        ))}
      </div>
    </div>
  )
}
