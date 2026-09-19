// 3D Globe component for the Hero section using Three.js and React Three Fiber
import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

const GLOBE_RADIUS = 2.15

// City coordinates for globe markers
const GLOBAL_HUBS = [
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, code: 'SFO' },
  { name: 'New York',      lat: 40.7128, lon: -74.0060,  code: 'NYC' },
  { name: 'London',        lat: 51.5074, lon: -0.1278,   code: 'LON' },
  { name: 'Frankfurt',     lat: 50.1109, lon: 8.6821,    code: 'FRA' },
  { name: 'Bengaluru',     lat: 12.9716, lon: 77.5946,   code: 'BLR' },
  { name: 'Singapore',     lat: 1.3521,  lon: 103.8198,  code: 'SIN' },
  { name: 'Tokyo',         lat: 35.6762, lon: 139.6503,  code: 'TYO' },
  { name: 'Sydney',        lat: -33.8688, lon: 151.2093, code: 'SYD' },
  { name: 'Dubai',         lat: 25.2048, lon: 55.2708,   code: 'DXB' },
  { name: 'São Paulo',     lat: -23.5505, lon: -46.6333, code: 'GRU' },
]

// Convert lat/long coordinates to a 3D position vector
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// Point cloud distributed evenly across the sphere surface
function GlobePointCloud({ radius = GLOBE_RADIUS, isHovered }) {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 3200
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle formula

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY * (radius + 0.03)
      const z = Math.sin(theta) * radiusAtY * (radius + 0.03)
      const yPos = y * (radius + 0.03)

      pos[i * 3] = x
      pos[i * 3 + 1] = yPos
      pos[i * 3 + 2] = z

      const rand = Math.random()
      if (rand > 0.88) {
        col[i * 3] = 1.0
        col[i * 3 + 1] = 1.0
        col[i * 3 + 2] = 1.0
      } else if (rand > 0.45) {
        col[i * 3] = 0.22
        col[i * 3 + 1] = 0.74
        col[i * 3 + 2] = 0.97
      } else {
        col[i * 3] = 0.23
        col[i * 3 + 1] = 0.51
        col[i * 3 + 2] = 0.96
      }
    }
    return { positions: pos, colors: col }
  }, [radius])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.material.size = isHovered ? 0.034 + Math.sin(t * 3) * 0.005 : 0.028
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  )
}

// Latitude and longitude guide lines
function GlobeWireframeGrid({ radius = GLOBE_RADIUS }) {
  return (
    <group>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius + 0.015, 0.018, 16, 100]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
      </mesh>

      {/* Latitude parallels */}
      {[-60, -30, 30, 60].map((lat) => {
        const rad = (lat * Math.PI) / 180
        const r = (radius + 0.012) * Math.cos(rad)
        const y = (radius + 0.012) * Math.sin(rad)
        return (
          <mesh key={lat} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.008, 12, 80]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
          </mesh>
        )
      })}

      {/* Longitude meridians */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, idx) => (
        <mesh key={idx} rotation={[0, angle, 0]}>
          <torusGeometry args={[radius + 0.012, 0.007, 12, 100]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

// City marker with pulse effect
function HubBeacon({ hub, radius = GLOBE_RADIUS }) {
  const pos = useMemo(() => latLonToVector3(hub.lat, hub.lon, radius + 0.04), [hub, radius])
  const pingRef = useRef()

  useFrame(({ clock }) => {
    if (pingRef.current) {
      const t = (clock.getElapsedTime() * 1.5 + (hub.lon % 3)) % 1
      const scale = 1 + t * 2.2
      pingRef.current.scale.set(scale, scale, scale)
      pingRef.current.material.opacity = Math.max(0, (1 - t) * 0.8)
    }
  })

  const normal = useMemo(() => pos.clone().normalize(), [pos])
  const lookAtTarget = useMemo(() => pos.clone().add(normal), [pos, normal])

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      <mesh ref={pingRef} onUpdate={(self) => self.lookAt(lookAtTarget)}>
        <ringGeometry args={[0.03, 0.07, 24]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={normal.clone().multiplyScalar(0.06)} onUpdate={(self) => self.lookAt(lookAtTarget)}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// Curved lines connecting city hubs
function ConnectionArc({ fromHub, toHub, radius = GLOBE_RADIUS, speed = 0.8, offset = 0 }) {
  const p1 = useMemo(() => latLonToVector3(fromHub.lat, fromHub.lon, radius + 0.04), [fromHub, radius])
  const p2 = useMemo(() => latLonToVector3(toHub.lat, toHub.lon, radius + 0.04), [toHub, radius])

  const { curve, points } = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
    const distance = p1.distanceTo(p2)
    const elevation = 1 + Math.min(0.5, (distance / (radius * 2)) * 0.45)
    mid.normalize().multiplyScalar((radius + 0.04) * elevation)

    const c = new THREE.QuadraticBezierCurve3(p1, mid, p2)
    const pts = c.getPoints(50)
    return { curve: c, points: pts }
  }, [p1, p2, radius])

  const packetRef = useRef()

  useFrame(({ clock }) => {
    if (packetRef.current) {
      const t = (clock.getElapsedTime() * speed + offset) % 1
      const pt = curve.getPoint(t)
      packetRef.current.position.copy(pt)
    }
  })

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  return (
    <group>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.35} />
      </line>

      <mesh ref={packetRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  )
}

// Outer decorative orbital rings
function OrbitalGimbalRings({ radius = GLOBE_RADIUS }) {
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12
      ring1Ref.current.rotation.x = Math.PI / 3.2 + Math.sin(t * 0.2) * 0.05
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.15
      ring2Ref.current.rotation.z = Math.PI / 2.6
    }
  })

  return (
    <group>
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[radius * 1.35, 0.015, 16, 100]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
        </mesh>
        <mesh position={[radius * 1.35, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[radius * 1.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#818CF8" transparent opacity={0.25} />
        </mesh>
        <mesh position={[0, radius * 1.6, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>
    </group>
  )
}

// Interactive globe mesh with drag controls
function InteractiveGlobe({ isHovered }) {
  const globeGroupRef = useRef()
  const isDraggingRef = useRef(false)
  const prevPointerRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef({ x: 0, y: 0 })
  const userRotationRef = useRef({ x: 0.18, y: 0.6 })

  // Hub connections
  const arcConnections = [
    { from: GLOBAL_HUBS[0], to: GLOBAL_HUBS[6], speed: 0.45, offset: 0.0 },
    { from: GLOBAL_HUBS[0], to: GLOBAL_HUBS[1], speed: 0.6,  offset: 0.3 },
    { from: GLOBAL_HUBS[1], to: GLOBAL_HUBS[2], speed: 0.5,  offset: 0.1 },
    { from: GLOBAL_HUBS[2], to: GLOBAL_HUBS[3], speed: 0.7,  offset: 0.4 },
    { from: GLOBAL_HUBS[3], to: GLOBAL_HUBS[8], speed: 0.55, offset: 0.2 },
    { from: GLOBAL_HUBS[8], to: GLOBAL_HUBS[4], speed: 0.65, offset: 0.5 },
    { from: GLOBAL_HUBS[4], to: GLOBAL_HUBS[5], speed: 0.5,  offset: 0.15 },
    { from: GLOBAL_HUBS[5], to: GLOBAL_HUBS[6], speed: 0.55, offset: 0.35 },
    { from: GLOBAL_HUBS[5], to: GLOBAL_HUBS[7], speed: 0.4,  offset: 0.6 },
    { from: GLOBAL_HUBS[2], to: GLOBAL_HUBS[9], speed: 0.45, offset: 0.25 },
  ]

  useFrame((state, delta) => {
    const group = globeGroupRef.current
    if (!group) return

    const pointer = state.pointer
    const autoSpeed = isHovered ? 0.42 : 0.18

    if (!isDraggingRef.current) {
      userRotationRef.current.y += delta * autoSpeed
      userRotationRef.current.x = THREE.MathUtils.lerp(
        userRotationRef.current.x,
        0.18 + pointer.y * 0.25,
        0.05
      )

      rotationVelocityRef.current.x *= 0.92
      rotationVelocityRef.current.y *= 0.92
      userRotationRef.current.x += rotationVelocityRef.current.x
      userRotationRef.current.y += rotationVelocityRef.current.y
    }

    group.rotation.x = userRotationRef.current.x
    group.rotation.y = userRotationRef.current.y
  })

  return (
    <group
      ref={globeGroupRef}
      onPointerDown={(e) => {
        isDraggingRef.current = true
        prevPointerRef.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerMove={(e) => {
        if (!isDraggingRef.current) return
        const deltaX = e.clientX - prevPointerRef.current.x
        const deltaY = e.clientY - prevPointerRef.current.y
        prevPointerRef.current = { x: e.clientX, y: e.clientY }

        rotationVelocityRef.current.x = deltaY * 0.005
        rotationVelocityRef.current.y = deltaX * 0.005

        userRotationRef.current.x += rotationVelocityRef.current.x
        userRotationRef.current.y += rotationVelocityRef.current.y
      }}
      onPointerUp={() => {
        isDraggingRef.current = false
      }}
    >
      {/* Dark core sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshStandardMaterial
          color="#060d1b"
          metalness={0.92}
          roughness={0.2}
          emissive="#1e3a8a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Atmospheric outer glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.025, 48, 48]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <GlobePointCloud radius={GLOBE_RADIUS} isHovered={isHovered} />
      <GlobeWireframeGrid radius={GLOBE_RADIUS} />

      {GLOBAL_HUBS.map((hub) => (
        <HubBeacon key={hub.name} hub={hub} radius={GLOBE_RADIUS} />
      ))}

      {arcConnections.map((arc, i) => (
        <ConnectionArc
          key={i}
          fromHub={arc.from}
          toHub={arc.to}
          radius={GLOBE_RADIUS}
          speed={arc.speed}
          offset={arc.offset}
        />
      ))}

      <OrbitalGimbalRings radius={GLOBE_RADIUS} />
    </group>
  )
}

export default function Scene() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0.4, 6.2], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 5, 4]} intensity={2.2} color="#38BDF8" />
        <directionalLight position={[-6, -4, -3]} intensity={1.2} color="#818CF8" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#FFFFFF" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <InteractiveGlobe isHovered={isHovered} />
        </Float>

        <Sparkles
          count={80}
          size={1.6}
          speed={0.3}
          color="#38BDF8"
          opacity={0.6}
          scale={9}
        />
      </Canvas>
    </div>
  )
}
