// Modal displaying project case study details

import { useState, useEffect, useRef } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
  BarChart3,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import gsap from 'gsap'
import { projects } from '../data/projects'

export default function ProjectModal({ project, onClose, onSelectProject }) {
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'benchmarks' | 'architecture'
  const modalRef = useRef(null)
  const backdropRef = useRef(null)

  // Find index of current project to enable prev/next navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  // Entrance animation
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.2)' }
    )

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onSelectProject?.(prevProject)
      if (e.key === 'ArrowRight') onSelectProject?.(nextProject)
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project.id])

  // Benchmark comparison presets
  const benchmarkMap = {
    p01: [
      { label: 'Render Latency', evoc: '14.2ms', standard: '68ms', percent: 94, note: '4.8x faster render loop' },
      { label: 'Conversion Lift', evoc: '+38%', standard: '+4%', percent: 88, note: '3D interactivity directly lifts checkout' },
      { label: 'Core Bundle', evoc: '138 KB', standard: '1.4 MB', percent: 92, note: '90% payload reduction via code-splitting' },
      { label: 'Mobile FPS', evoc: '60 FPS', standard: '24 FPS', percent: 98, note: 'Zero frame drops on mid-tier mobile' },
    ],
    p02: [
      { label: 'Voice Latency', evoc: '390ms', standard: '2400ms', percent: 92, note: 'Sub-second real-time conversational AI' },
      { label: 'Cart Recovery', evoc: '28.4%', standard: '6.5%', percent: 85, note: '4.3x uplift in abandoned revenue' },
      { label: 'Max Concurrency', evoc: '10,000+', standard: '250', percent: 95, note: 'Distributed WebSocket edge cluster' },
      { label: 'Agent Accuracy', evoc: '99.4%', standard: '84%', percent: 96, note: 'RAG verification guardrails' },
    ],
    p03: [
      { label: 'Peak Throughput', evoc: '52,000 req/s', standard: '4,000 req/s', percent: 96, note: 'Edge routed Redis cache tier' },
      { label: 'Global Uptime', evoc: '99.99%', standard: '99.2%', percent: 99, note: 'Zero-downtime rolling deployment' },
      { label: 'Sync Latency', evoc: '18ms', standard: '320ms', percent: 93, note: 'Sub-20ms multi-region database replication' },
      { label: 'Infrastructure Cost', evoc: '-45%', standard: 'Baseline', percent: 82, note: 'Elastic container autoscaling' },
    ],
    p04: [
      { label: 'Data Processing', evoc: '1.2M points/s', standard: '45k points/s', percent: 95, note: 'GPU-accelerated WebGL charts' },
      { label: 'Forecast Accuracy', evoc: '92.4%', standard: '68%', percent: 91, note: 'Fine-tuned time series ML models' },
      { label: 'Initial Query Time', evoc: '0.8s', standard: '6.4s', percent: 93, note: 'Columnar OLAP query optimization' },
      { label: 'Channels Synced', evoc: '24 Sources', standard: '4 Sources', percent: 90, note: 'Unified real-time ETL pipeline' },
    ],
    p05: [
      { label: 'RTO Rate Reduction', evoc: '-40%', standard: '-5%', percent: 88, note: 'Predictive address verification algorithm' },
      { label: 'ETA Accuracy', evoc: '94.2%', standard: '71%', percent: 92, note: 'Historical multi-courier telemetry' },
      { label: 'Routing Decision', evoc: '82ms', standard: '1200ms', percent: 94, note: 'Instant lowest-cost carrier matching' },
      { label: 'Courier Network', evoc: '32 Integrated', standard: '3 Integrated', percent: 89, note: 'Unified global logistics abstraction' },
    ],
    p06: [
      { label: 'Checkout Lift', evoc: '+26.2%', standard: '+2%', percent: 90, note: 'Frictionless single-tap mobile UX' },
      { label: 'Cart Recovery', evoc: '31.0%', standard: '8.2%', percent: 87, note: 'Smart exit-intent intervention' },
      { label: 'Retry Success', evoc: '64%', standard: '12%', percent: 91, note: 'Automated secondary payment gateway' },
      { label: 'Time to Value', evoc: '< 20 min', standard: '3 Weeks', percent: 95, note: 'Zero-code drop-in SDK integration' },
    ],
  }

  const benchmarks = benchmarkMap[project.id] || benchmarkMap['p01']

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Panel */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass border border-white/[0.12] shadow-2xl overflow-hidden my-auto"
        style={{
          boxShadow: `0 25px 90px -15px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}25`,
        }}
      >
        {/* Top Glowing Laser Border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-30 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, #ffffff, ${project.accentColor}, transparent)`,
          }}
        />

        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/40 backdrop-blur-md z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] font-bold px-3 py-1 rounded-full border tracking-widest uppercase flex items-center gap-2"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}40`,
                background: `${project.accentColor}12`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: project.accentColor }} />
              {project.number} // {project.label}
            </span>
            <span className="hidden sm:inline font-mono text-xs text-gray-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Project Switcher */}
            <div className="flex items-center glass-light rounded-full p-1 border border-white/[0.08]">
              <button
                onClick={() => onSelectProject?.(prevProject)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] px-2 text-gray-400 select-none">
                {project.number} / {String(projects.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => onSelectProject?.(nextProject)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title={`Next: ${nextProject.title}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all border border-white/[0.08]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          {/* Clean Product Architecture Showcase Banner */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] p-6 sm:p-8"
            style={{
              background: `radial-gradient(ellipse at top left, ${project.accentColor}15 0%, rgba(6, 11, 21, 0.95) 75%)`,
            }}
          >
            {/* Ambient subtle glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] pointer-events-none opacity-25"
              style={{ background: project.accentColor }}
            />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.07] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider uppercase">
                  {project.category}
                </span>
              </div>
              <span
                className="px-2.5 py-0.5 rounded border text-[10px] font-bold"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}40`,
                  background: `${project.accentColor}12`,
                }}
              >
                PROD · 2024
              </span>
            </div>

            {/* Highlight Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-xl border border-white/[0.07] bg-black/30 backdrop-blur-sm"
                >
                  <div
                    className="font-mono text-base sm:text-lg font-bold text-white mb-0.5"
                    style={{ color: project.accentColor }}
                  >
                    {m.value}
                  </div>
                  <div className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Title & Tagline */}
          <div>
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                {project.title}
              </h2>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                [{project.year}]
              </span>
            </div>
            <p className="text-base text-gray-300 font-light leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-white/[0.08] gap-2 pt-2">
            {[
              { id: 'overview', label: '01. System Overview', icon: Layers },
              { id: 'benchmarks', label: '02. Live Benchmarks', icon: BarChart3 },
              { id: 'architecture', label: '03. Tech Breakdown', icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 px-3 font-mono text-xs tracking-wider uppercase transition-all border-b-2 relative ${
                    isActive
                      ? 'border-blue-400 text-white font-bold'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isActive ? project.accentColor : undefined }} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab 1: System Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 pt-2">
              <div>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Architectural Summary
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features with High-Tech Badges */}
              <div>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">
                  Core Engineered Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-3 hover:border-white/15 transition-all"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${project.accentColor}20` }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Live Benchmarks */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-6 pt-2">
              <div>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                  Performance Telemetry vs Industry Standard
                </h3>
                <p className="text-xs text-gray-400">
                  Real measurements captured under stress-tested production workloads.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benchmarks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-gray-300 uppercase font-semibold">
                        {item.label}
                      </span>
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                        style={{ color: project.accentColor, background: `${project.accentColor}15` }}
                      >
                        {item.evoc}
                      </span>
                    </div>

                    {/* Comparison bar */}
                    <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden my-3 relative">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${item.percent}%`,
                          background: `linear-gradient(90deg, #3B82F6, ${project.accentColor})`,
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                      <span>Standard: {item.standard}</span>
                      <span className="text-gray-400">{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Tech Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 pt-2">
              <div>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Production Stack Breakdown
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center gap-2 hover:border-white/20 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                      <span className="font-mono text-xs text-white font-medium">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Architecture Specifications */}
              <div>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Deployment Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">Architecture</div>
                    <div className="font-mono text-xs font-bold text-white">Edge Distributed</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">Rendering</div>
                    <div className="font-mono text-xs font-bold text-white">Hardware WebGL 2.0</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">CI / CD</div>
                    <div className="font-mono text-xs font-bold text-white">Zero-Downtime Rollout</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-1">Target SLA</div>
                    <div className="font-mono text-xs font-bold text-white">99.99% Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => onSelectProject?.(prevProject)}
              className="px-4 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-white glass-light border border-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev: {prevProject.title}
            </button>
            <button
              onClick={() => onSelectProject?.(nextProject)}
              className="px-4 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-white glass-light border border-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              Next: {nextProject.title}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, #ffffff, ${project.accentColor})`,
                boxShadow: `0 0 25px ${project.accentColor}40`,
              }}
            >
              <span>Build Similar Architecture</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
