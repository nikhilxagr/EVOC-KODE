import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Logo3D() {
  const meshGroupRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const elapsedRef = useRef(0)

  // Generate the exact stylized N symbol from the EVOC KODES brand specification (logo.png)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()

    // Key vertices mathematically extracted from logo.png:
    // Left shoulder -> rise to peak -> 45° diagonal -> right shoulder -> close
    shape.moveTo(-1.18, -1.18) // Bottom-left corner of left shoulder
    shape.lineTo(-1.18, 0.22)  // Top-left corner of left shoulder
    shape.lineTo(-0.61, 0.22)  // Inner step of left shoulder
    shape.lineTo(-0.61, 1.04)  // Rise to left peak
    shape.quadraticCurveTo(-0.61, 1.14, -0.48, 1.10) // Smooth rounded apex
    shape.lineTo(0.61, -0.06)  // 45° diagonal upper edge
    shape.lineTo(0.61, 1.18)   // Rise to right top shoulder
    shape.lineTo(1.18, 1.18)   // Top-right corner of right shoulder
    shape.lineTo(1.18, -0.22)  // Bottom-right corner of right shoulder
    shape.lineTo(0.61, -0.22)  // Inner step of right shoulder
    shape.lineTo(0.61, -1.04)  // Down to right bottom valley
    shape.quadraticCurveTo(0.61, -1.14, 0.48, -1.10) // Smooth rounded valley apex
    shape.lineTo(-0.61, 0.06)  // 45° diagonal lower edge
    shape.lineTo(-0.61, -1.18) // Left inner edge
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

  // Interactive mouse parallax reaction & continuous smooth rotation
  useFrame((state, delta) => {
    if (!meshGroupRef.current) return

    elapsedRef.current += delta

    // Normalized mouse pointer coordinates (-1 to 1) with smooth spring damping
    const targetRotX = -state.pointer.y * 0.38
    const targetRotY = state.pointer.x * 0.48 + elapsedRef.current * 0.22

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

    // Subtle counter-rotation for technical orbital rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.32
      ringRef1.current.rotation.x += delta * 0.16
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.24
      ringRef2.current.rotation.z -= delta * 0.18
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.25}
      floatIntensity={0.55}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={meshGroupRef}>
        {/* Main 3D Brand Mesh: High-end Translucent Glass & EVOC Electric Blue Attenuation */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#e2f0ff"
            emissive="#013cee"
            emissiveIntensity={0.3}
            roughness={0.12}
            metalness={0.32}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            transmission={0.89}
            ior={1.52}
            thickness={1.3}
            attenuationColor="#013cee"
            attenuationDistance={1.75}
            transparent={true}
            opacity={0.93}
          />
        </mesh>

        {/* Outer Beveled Edge / Holographic Luminescence */}
        <mesh geometry={geometry} scale={1.004}>
          <meshStandardMaterial
            color="#00D2FF"
            emissive="#013cee"
            emissiveIntensity={0.75}
            wireframe={true}
            transparent={true}
            opacity={0.22}
          />
        </mesh>

        {/* Technical Orbital Halo Rings */}
        <group ref={ringRef1} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[2.05, 0.012, 16, 64]} />
            <meshStandardMaterial
              color="#013cee"
              emissive="#00D2FF"
              emissiveIntensity={0.85}
              transparent
              opacity={0.42}
            />
          </mesh>
        </group>

        <group ref={ringRef2} rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
          <mesh>
            <torusGeometry args={[2.35, 0.008, 16, 64]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#013cee"
              emissiveIntensity={0.65}
              transparent
              opacity={0.28}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
