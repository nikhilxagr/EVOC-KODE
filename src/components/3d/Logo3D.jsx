import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Logo3D() {
  const meshGroupRef = useRef()
  const eclipseArcRef = useRef()
  const outerRingRef = useRef()
  const flareLightRef = useRef()
  const elapsedRef = useRef(0)

  // Extruded geometric N glyph matching EVOC KODES brand
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()

    shape.moveTo(-1.18, -1.18)
    shape.lineTo(-1.18, 0.22)
    shape.lineTo(-0.61, 0.22)
    shape.lineTo(-0.61, 1.04)
    shape.quadraticCurveTo(-0.61, 1.14, -0.48, 1.10)
    shape.lineTo(0.61, -0.06)
    shape.lineTo(0.61, 1.18)
    shape.lineTo(1.18, 1.18)
    shape.lineTo(1.18, -0.22)
    shape.lineTo(0.61, -0.22)
    shape.lineTo(0.61, -1.04)
    shape.quadraticCurveTo(0.61, -1.14, 0.48, -1.10)
    shape.lineTo(-0.61, 0.06)
    shape.lineTo(-0.61, -1.18)
    shape.closePath()

    const extrudeSettings = {
      steps: 2,
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 5,
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    return geo
  }, [])

  // Smooth mouse parallax & orbital animation inspired by the Dribbble eclipse aesthetic
  useFrame((state, delta) => {
    if (!meshGroupRef.current) return

    elapsedRef.current += delta

    // Natural mouse tilt
    const targetRotX = -state.pointer.y * 0.32
    const targetRotY = state.pointer.x * 0.42 + Math.sin(elapsedRef.current * 0.3) * 0.12 + elapsedRef.current * 0.07

    const targetPosX = state.pointer.x * 0.12
    const targetPosY = state.pointer.y * 0.1

    meshGroupRef.current.rotation.x = THREE.MathUtils.damp(
      meshGroupRef.current.rotation.x,
      targetRotX,
      2.5,
      delta
    )
    meshGroupRef.current.rotation.y = THREE.MathUtils.damp(
      meshGroupRef.current.rotation.y,
      targetRotY,
      2.5,
      delta
    )

    meshGroupRef.current.position.x = THREE.MathUtils.damp(
      meshGroupRef.current.position.x,
      targetPosX,
      2.0,
      delta
    )
    meshGroupRef.current.position.y = THREE.MathUtils.damp(
      meshGroupRef.current.position.y,
      targetPosY,
      2.0,
      delta
    )

    // Luminous Eclipse Arc slow orbital drift
    if (eclipseArcRef.current) {
      eclipseArcRef.current.rotation.z = Math.PI / 4 + Math.sin(elapsedRef.current * 0.4) * 0.25
      eclipseArcRef.current.rotation.y = elapsedRef.current * 0.18
    }

    // Outer orbital ring counter-rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.16
      outerRingRef.current.rotation.x += delta * 0.08
    }

    // Move flare light along the arc apex for dramatic edge reflections
    if (flareLightRef.current) {
      const angle = elapsedRef.current * 0.5
      flareLightRef.current.position.x = Math.cos(angle) * 2.2
      flareLightRef.current.position.y = Math.sin(angle) * 1.8
      flareLightRef.current.position.z = Math.sin(angle * 0.8) * 1.2
    }
  })

  return (
    <Float
      speed={1.6}
      rotationIntensity={0.18}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={meshGroupRef}>
        {/* Flare Point Light orbiting the Eclipse Arc */}
        <pointLight
          ref={flareLightRef}
          color="#00D2FF"
          intensity={3.5}
          distance={6}
          decay={2}
        />

        {/* Main 3D Brand Mesh: Crystalline Glass with Blue Refraction */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#e6f2ff"
            emissive="#013cee"
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.25}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transmission={0.9}
            ior={1.54}
            thickness={1.4}
            attenuationColor="#013cee"
            attenuationDistance={1.7}
            transparent={true}
            opacity={0.95}
          />
        </mesh>

        {/* Luminous Bevel Wireframe Edge */}
        <mesh geometry={geometry} scale={1.004}>
          <meshStandardMaterial
            color="#00D2FF"
            emissive="#013cee"
            emissiveIntensity={0.8}
            wireframe={true}
            transparent={true}
            opacity={0.22}
          />
        </mesh>

        {/* Signature Glowing Eclipse Crescent Arc (from Dribbble inspiration) */}
        <group ref={eclipseArcRef} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          {/* Intense Glowing Core Arc */}
          <mesh>
            <torusGeometry args={[2.2, 0.038, 16, 120, Math.PI * 1.35]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#00D2FF"
              emissiveIntensity={2.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Outer Atmospheric Glow Halo for the Arc */}
          <mesh scale={1.015}>
            <torusGeometry args={[2.2, 0.075, 16, 120, Math.PI * 1.35]} />
            <meshStandardMaterial
              color="#0066FF"
              emissive="#0066FF"
              emissiveIntensity={1.8}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>

        {/* Outer Counter-Rotating Ambient Ring */}
        <group ref={outerRingRef} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
          <mesh>
            <torusGeometry args={[2.65, 0.01, 16, 120, Math.PI * 1.8]} />
            <meshStandardMaterial
              color="#013cee"
              emissive="#00D2FF"
              emissiveIntensity={1.2}
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
