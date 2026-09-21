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
    // Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -30, duration: 1.1 })
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col overflow-x-hidden w-full max-w-[100vw]">
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