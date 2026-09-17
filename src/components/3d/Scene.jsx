import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Logo3D from './Logo3D'

/**
 * Three.js Scene container.
 * Sets up Canvas, Camera, Lights, and hosts the 3D Logo object.
 */
export default function Scene() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 2]} // Crisp rendering on high-DPI screens
        gl={{ antialias: true, alpha: true }}
      >
        {/* Base ambient light for overall scene visibility */}
        <ambientLight intensity={0.7} />

        {/* Key directional light to highlight the beveled edges */}
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#ffffff" />

        {/* Accent rim light for the futuristic blue glow */}
        <pointLight position={[-4, -3, 2]} intensity={2.0} color="#00d2ff" />

        {/* Fallback while 3D assets load */}
        <Suspense fallback={null}>
          <Logo3D />
        </Suspense>
      </Canvas>
    </div>
  )
}
