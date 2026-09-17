import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import Logo3D from './Logo3D'

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border border-[#0066FF]/30 animate-ping opacity-25" />
        <div className="absolute w-24 h-24 rounded-2xl bg-[#0066FF]/10 border border-[#00D2FF]/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.3)]">
          <span className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D2FF]">
            N
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Scene() {
  return (
    <div className="w-full h-full min-h-[420px] lg:min-h-[560px] relative flex items-center justify-center">
      {/* Background Radial Core Glow */}
      <div className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#0066FF]/20 to-[#00D2FF]/15 blur-3xl pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Lighting Rig */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 6, 4]} intensity={1.8} />
          <pointLight position={[-3, 2, 3]} color="#0066FF" intensity={4} distance={9} />
          <pointLight position={[3, -2, 2.5]} color="#00D2FF" intensity={2.8} distance={9} />
          <pointLight position={[0, -2, -2]} color="#0044FF" intensity={2.5} />

          {/* 3D Model */}
          <Logo3D />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.65}
            scale={7.5}
            blur={2.4}
            far={4.5}
            color="#002266"
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
