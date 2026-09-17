import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Logo3D() {
  const meshGroupRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()

  // Generate the stylized geometric 'N' shape inspired by the EVOC KODES brand
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()

    // Dimensions for balanced proportions
    const w = 1.05
    const h = 1.25
    const barW = 0.48

    // Trace the continuous boundary of the geometric 'N'
    shape.moveTo(-w, -h)
    shape.lineTo(-w, h)
    shape.lineTo(-w + barW, h)
    shape.lineTo(w - barW, -h + 0.95)
    shape.lineTo(w - barW, h)
    shape.lineTo(w, h)
    shape.lineTo(w, -h)
    shape.lineTo(w - barW, -h)
    shape.lineTo(-w + barW, h - 0.95)
    shape.lineTo(-w + barW, -h)
    shape.closePath()

    const extrudeSettings = {
      steps: 2,
      depth: 0.36,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 4,
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    return geo
  }, [])

  const elapsedRef = useRef(0)

  // Interactive mouse reaction & gentle continuous rotation
  useFrame((state, delta) => {
    if (!meshGroupRef.current) return

    elapsedRef.current += delta

    // Normalized mouse pointer coordinates (-1 to 1)
    const targetRotX = -state.pointer.y * 0.4
    const targetRotY = state.pointer.x * 0.5 + elapsedRef.current * 0.22

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

    // Subtle counter-rotation for tech rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.35
      ringRef1.current.rotation.x += delta * 0.15
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.25
      ringRef2.current.rotation.z -= delta * 0.2
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.25}
      floatIntensity={0.6}
      floatingRange={[-0.15, 0.15]}
    >
      <group ref={meshGroupRef}>
        {/* Main 3D Stylized 'N' Body: High-end Glass & Metal Physical Material */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#d8ebff"
            emissive="#0033aa"
            emissiveIntensity={0.25}
            roughness={0.12}
            metalness={0.35}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transmission={0.88}
            ior={1.5}
            thickness={1.2}
            attenuationColor="#0066FF"
            attenuationDistance={1.8}
            transparent={true}
            opacity={0.92}
          />
        </mesh>

        {/* Outer Accent Edge / Luminous Holographic Bevel */}
        <mesh geometry={geometry} scale={1.004}>
          <meshStandardMaterial
            color="#00D2FF"
            emissive="#0088FF"
            emissiveIntensity={0.7}
            wireframe={true}
            transparent={true}
            opacity={0.18}
          />
        </mesh>

        {/* Subtle Tech Orbital Halo Rings */}
        <group ref={ringRef1} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[2.0, 0.012, 16, 64]} />
            <meshStandardMaterial
              color="#0066FF"
              emissive="#00D2FF"
              emissiveIntensity={0.8}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>

        <group ref={ringRef2} rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
          <mesh>
            <torusGeometry args={[2.3, 0.008, 16, 64]} />
            <meshStandardMaterial
              color="#00D2FF"
              emissive="#0066FF"
              emissiveIntensity={0.6}
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
