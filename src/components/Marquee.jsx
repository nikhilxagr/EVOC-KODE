/**
 * Infinite horizontal ticker.
 * Uses lightweight pure CSS animation for smooth 60fps performance.
 */
export default function Marquee() {
  const items = [
    'EVOC LABS',
    'CREATIVE ENGINEERING',
    'IMMERSIVE 3D EXPERIENCES',
    'NEXT-GEN COMMERCE',
    'SYSTEM ARCHITECTURE',
    'HIGH PERFORMANCE WEB',
  ]

  return (
    <div className="w-full py-6 border-y border-white/10 bg-[#070912]/60 overflow-hidden select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Render twice so the loop is seamless */}
        {[...items, ...items].map((text, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-400">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mx-6 opacity-75" />
          </div>
        ))}
      </div>
    </div>
  )
}
