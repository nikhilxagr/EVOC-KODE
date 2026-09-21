// Contact section with inquiry form
import { useState, useEffect, useRef } from 'react'
import {
  ArrowUpRight,
  Mail,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react'
import gsap from 'gsap'

export default function CTA() {
  const sectionRef = useRef(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web App',
    budget: '$10k - $25k',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypes = [
    'Web App',
    '3D / WebGL',
    'AI & Automation',
    'Mobile App',
    'Cloud / API',
  ]

  const budgetRanges = [
    '< $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+',
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setIsSubmitting(true)

    // Simulate sending with a smooth state transition
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'Web App',
      budget: '$10k - $25k',
      message: '',
    })
    setIsSubmitted(false)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-[#030712]"
    >
      <div className="section-line mb-16" />

      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="contact-fade mb-14 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-blue-400 font-semibold block mb-2">
            Contact Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight">
            Let's Build Together.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed mt-3">
            Have a project in mind, an architectural challenge, or looking to scale? Tell us about your vision and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Two-Column Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="contact-fade lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact Card */}
            <div className="p-6 rounded-3xl glass border border-white/[0.08] space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Direct Communication
              </h3>

              <div className="space-y-3">
                <a
                  href="mailto:hello@evoclabs.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-400/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400">Email Address</div>
                    <div className="text-sm font-mono text-white font-medium group-hover:text-blue-400 transition-colors">
                      hello@evoclabs.com
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-blue-400 transition-colors" />
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400">Headquarters</div>
                    <div className="text-sm font-mono text-white font-medium">
                      EVOC Labs PVT LTD · Bengaluru
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-400">Response SLA</div>
                    <div className="text-sm font-mono text-white font-medium">
                      Guaranteed within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect Card */}
            <div className="p-6 rounded-3xl glass border border-white/[0.08] space-y-3.5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                What You Can Expect
              </h3>

              <ul className="space-y-2.5 text-xs text-gray-300 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Technical feasibility and architectural analysis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Transparent timeline, budget, and deliverable breakdown</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>Strict NDA and 100% intellectual property ownership</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="contact-fade lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass border border-white/[0.09] shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                      Message Received!
                    </h3>
                    <p className="text-sm text-gray-300 font-light mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. We've received your project inquiry and will get back to you at{' '}
                      <span className="text-blue-400 font-mono">{formData.email}</span> within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full glass-light border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-gray-400 tracking-wider uppercase block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/50 focus:bg-white/[0.05] text-white text-sm outline-none transition-all placeholder:text-gray-600 font-light"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-gray-400 tracking-wider uppercase block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/50 focus:bg-white/[0.05] text-white text-sm outline-none transition-all placeholder:text-gray-600 font-light"
                      />
                    </div>
                  </div>

                  {/* Project Type Selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-gray-400 tracking-wider uppercase block">
                      Project Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3.5 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all ${
                            formData.projectType === type
                              ? 'bg-blue-600 text-white font-medium border border-blue-400'
                              : 'bg-white/[0.02] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range Selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-gray-400 tracking-wider uppercase block">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`px-3.5 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all ${
                            formData.budget === range
                              ? 'bg-blue-600 text-white font-medium border border-blue-400'
                              : 'bg-white/[0.02] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-gray-400 tracking-wider uppercase block">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about what you're looking to build, desired timeline, or key objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-400/50 focus:bg-white/[0.05] text-white text-sm outline-none transition-all placeholder:text-gray-600 font-light resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center font-mono text-[10px] text-gray-500">
                    We respect your privacy. No spam, ever.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
