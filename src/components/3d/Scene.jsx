import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Generates smooth 3D wave curve
function createWideWaveCurve(scale = 1.0, zOffset = 0, yPhase = 0) {
  const pts = [
    new THREE.Vector3(-7.0 * scale, (2.0 + yPhase) * scale, -2.4 + zOffset),
    new THREE.Vector3(-3.8 * scale, (3.0 + yPhase) * scale, -1.2 + zOffset),
    new THREE.Vector3( 0.0 * scale, (2.2 + yPhase) * scale, -1.8 + zOffset),
    new THREE.Vector3( 3.8 * scale, (2.9 + yPhase) * scale, -1.0 + zOffset),
    new THREE.Vector3( 7.0 * scale, (1.6 + yPhase) * scale, -2.4 + zOffset),

    new THREE.Vector3( 6.5 * scale, (-1.4 + yPhase) * scale, -0.6 + zOffset),
    new THREE.Vector3( 3.6 * scale, (-2.6 + yPhase) * scale, -2.0 + zOffset),
    new THREE.Vector3(-0.2 * scale, (-1.9 + yPhase) * scale, -1.4 + zOffset),
    new THREE.Vector3(-4.0 * scale, (-2.7 + yPhase) * scale, -1.8 + zOffset),
    new THREE.Vector3(-6.5 * scale, (-1.2 + yPhase) * scale, -0.4 + zOffset),
  ]
  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5)
}

// 3D Liquid Chromatic Glass Ribbon (Single-pass GPU-accelerated)
function ChromaticFluidRibbon() {
  const groupRef = useRef()
  const ribbon1Ref = useRef()
  const ribbon2Ref = useRef()
  const glowCoreRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })

  // Optimized lightweight geometries (120x16 segments = silky smooth + 75% less vertices)
  const { geo1, geo2, coreGeo } = useMemo(() => {
    const curve1 = createWideWaveCurve(1.15, -0.5, 0)
    const curve2 = createWideWaveCurve(1.1, 0.3, 0.2)
    const coreCurve = createWideWaveCurve(1.15, -0.5, 0)

    const g1 = new THREE.TubeGeometry(curve1, 140, 0.25, 18, true)
    const g2 = new THREE.TubeGeometry(curve2, 120, 0.16, 16, true)
    const cG = new THREE.TubeGeometry(coreCurve, 100, 0.03, 12, true)
    return { geo1: g1, geo2: g2, coreGeo: cG }
  }, [])

  // Dynamic continuous motion and mouse interaction
  useFrame((state, delta) => {
    // Optimization: Skip calculations if scrolled far past the hero
    if (window.scrollY > window.innerHeight * 1.3) return

    const time = state.clock.getElapsedTime()
    const pointer = state.pointer

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3 + targetRotation.current.y
      groupRef.current.rotation.x = Math.sin(time * 0.45) * 0.2 + targetRotation.current.x
      groupRef.current.rotation.z = Math.cos(time * 0.35) * 0.14

      groupRef.current.position.y = Math.sin(time * 0.8) * 0.22
      groupRef.current.position.x = Math.cos(time * 0.55) * 0.18

      targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, pointer.x * 0.7, 0.06)
      targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, -pointer.y * 0.45, 0.06)
    }

    if (ribbon1Ref.current) {
      ribbon1Ref.current.rotation.z = time * 0.1
    }
    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.z = -time * 0.12
    }
    if (glowCoreRef.current) {
      glowCoreRef.current.material.opacity = 0.4 + Math.sin(time * 2.0) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -3.0]}>
      {/* Primary Chromatic Liquid Chrome Ribbon — Single-pass, zero lag */}
      <mesh ref={ribbon1Ref} geometry={geo1}>
        <meshPhysicalMaterial
          color="#0d1829"
          emissive="#020617"
          metalness={0.88}
          roughness={0.12}
          reflectivity={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          ior={1.55}
          iridescence={1.0}
          iridescenceIOR={1.85}
          iridescenceThicknessRange={[200, 850]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Companion Ribbon */}
      <mesh ref={ribbon2Ref} geometry={geo2}>
        <meshPhysicalMaterial
          color="#101e38"
          metalness={0.85}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          iridescence={1.0}
          iridescenceIOR={1.75}
          iridescenceThicknessRange={[220, 780]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Luminous Inner Core Beam */}
      <mesh ref={glowCoreRef} geometry={coreGeo}>
        <meshBasicMaterial
          color="#38BDF8"
          transparent={true}
          opacity={0.45}
        />
      </mesh>
    </group>
  )
}

// Lighting Rig
function LightingRig() {
  const mouseLightRef = useRef()

  useFrame((state) => {
    if (window.scrollY > window.innerHeight * 1.3) return
    if (mouseLightRef.current) {
      const pointer = state.pointer
      mouseLightRef.current.position.x = pointer.x * 6
      mouseLightRef.current.position.y = pointer.y * 3.5 + 1.5
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[7, 9, 5]} intensity={4.0} color="#FFFFFF" />
      <directionalLight position={[-9, 6, -2]} intensity={3.5} color="#22D3EE" />
      <directionalLight position={[6, -7, -3]} intensity={2.8} color="#C084FC" />
      <directionalLight position={[-6, -5, 5]} intensity={2.2} color="#FB923C" />
      <pointLight
        ref={mouseLightRef}
        position={[0, 2, 2]}
        intensity={3.5}
        color="#38BDF8"
        distance={15}
      />
    </>
  )
}

export default function Scene() {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8.0], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.25]}
      >
        <LightingRig />
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.3}>
          <ChromaticFluidRibbon />
        </Float>
      </Canvas>
    </div>
  )
}
