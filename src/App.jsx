import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import About        from './components/About'
import Services     from './components/Services'
import Process      from './components/Process'
import Work         from './components/Work'
import TechStack    from './components/TechStack'
import CTA          from './components/CTA'
import Footer       from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll — driven by GSAP ticker
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true, lerp: 0.08 })
    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Work />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
