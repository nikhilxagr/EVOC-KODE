export default function Marquee() {
  const items = [
    'WEB DEVELOPMENT',
    'AI',
    'FULL STACK',
    'DIGITAL PRODUCTS',
    'DESIGN',
    'INNOVATION',
    'COMMERCE',
  ]

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/[0.08] bg-[#070B14]/70 backdrop-blur-md select-none">
      {/* Edge gradient mask for smooth fade in/out at sides */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070D] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070D] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="animate-marquee flex items-center">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gray-300 font-medium px-4">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] mx-3" />
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-gray-300 font-medium px-4">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF] mx-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
