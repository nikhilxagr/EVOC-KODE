

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Project3DCanvas({
  projectId = 'p01',
  accentColor = '#22D3EE',
  isHovered = false,
  interactive = false, // If true (in modal), user can click & drag to rotate freely
  wireframeMode = false,
  speedMultiplier = 1,
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const isDraggingRef = useRef(false)
  const prevPointerRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef({ x: 0, y: 0 })
  const userRotationRef = useRef({ x: 0.2, y: 0.4 })
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Scene & Camera setup
    const width = container.clientWidth || 300
    const height = container.clientHeight || 200

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = interactive ? 4.2 : 4.6

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const mainColor = new THREE.Color(accentColor)
    const dirLight1 = new THREE.DirectionalLight(mainColor, 2.2)
    dirLight1.position.set(3, 4, 3)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight2.position.set(-3, -2, 2)
    scene.add(dirLight2)

    // 4. Create Project-Specific 3D Geometry
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const elementsToDispose = []

    // Helper material creators
    const createSolidMat = () => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0a1120,
        metalness: 0.85,
        roughness: 0.25,
        emissive: mainColor,
        emissiveIntensity: 0.25,
        wireframe: wireframeMode,
      })
      elementsToDispose.push(mat)
      return mat
    }

    const createWireMat = (opacity = 0.7) => {
      const mat = new THREE.MeshBasicMaterial({
        color: mainColor,
        wireframe: true,
        transparent: true,
        opacity,
      })
      elementsToDispose.push(mat)
      return mat
    }

    const createGlowRingMat = () => {
      const mat = new THREE.MeshBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.55,
      })
      elementsToDispose.push(mat)
      return mat
    }

    // Secondary sub-objects for animations
    let coreMesh = null
    let outerMesh = null
    let ringMesh = null
    let particlesMesh = null

    switch (projectId) {
      case 'p01': {
        // NEXUS STORE — 3D Faceted Cyber Gem + Orbital Ring
        const coreGeo = new THREE.OctahedronGeometry(1.15, 0)
        coreMesh = new THREE.Mesh(coreGeo, createSolidMat())
        rootGroup.add(coreMesh)

        const wireGeo = new THREE.OctahedronGeometry(1.22, 0)
        outerMesh = new THREE.Mesh(wireGeo, createWireMat(0.8))
        rootGroup.add(outerMesh)

        const ringGeo = new THREE.TorusGeometry(1.85, 0.02, 16, 64)
        ringMesh = new THREE.Mesh(ringGeo, createGlowRingMat())
        ringMesh.rotation.x = Math.PI / 2.8
        rootGroup.add(ringMesh)

        elementsToDispose.push(coreGeo, wireGeo, ringGeo)
        break
      }

      case 'p02': {
        // VOXEL AI SUITE — Neural Icosahedron + Pulsing Ring
        const coreGeo = new THREE.IcosahedronGeometry(1.1, 1)
        coreMesh = new THREE.Mesh(coreGeo, createSolidMat())
        rootGroup.add(coreMesh)

        const wireGeo = new THREE.IcosahedronGeometry(1.25, 1)
        outerMesh = new THREE.Mesh(wireGeo, createWireMat(0.75))
        rootGroup.add(outerMesh)

        const ringGeo = new THREE.TorusGeometry(1.75, 0.022, 16, 64)
        ringMesh = new THREE.Mesh(ringGeo, createGlowRingMat())
        ringMesh.rotation.x = Math.PI / 3.5
        rootGroup.add(ringMesh)

        elementsToDispose.push(coreGeo, wireGeo, ringGeo)
        break
      }

      case 'p03': {
        // ORBIT PLATFORM — Cyber Torus Knot + Equatorial Orbit Ring
        const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.22, 80, 16, 2, 3)
        coreMesh = new THREE.Mesh(knotGeo, createSolidMat())
        rootGroup.add(coreMesh)

        const wireGeo = new THREE.TorusKnotGeometry(0.87, 0.23, 40, 8, 2, 3)
        outerMesh = new THREE.Mesh(wireGeo, createWireMat(0.65))
        rootGroup.add(outerMesh)

        const ringGeo = new THREE.TorusGeometry(1.95, 0.018, 16, 64)
        ringMesh = new THREE.Mesh(ringGeo, createGlowRingMat())
        ringMesh.rotation.x = Math.PI / 2.2
        rootGroup.add(ringMesh)

        elementsToDispose.push(knotGeo, wireGeo, ringGeo)
        break
      }

      case 'p04': {
        // EVOC ANALYTICS — Geometric Hyper-Cube Matrix
        const boxGeo = new THREE.BoxGeometry(1.3, 1.3, 1.3)
        coreMesh = new THREE.Mesh(boxGeo, createSolidMat())
        rootGroup.add(coreMesh)

        const wireGeo = new THREE.BoxGeometry(1.45, 1.45, 1.45)
        outerMesh = new THREE.Mesh(wireGeo, createWireMat(0.85))
        rootGroup.add(outerMesh)

        const innerOcta = new THREE.OctahedronGeometry(0.75, 0)
        ringMesh = new THREE.Mesh(innerOcta, createWireMat(0.9))
        rootGroup.add(ringMesh)

        elementsToDispose.push(boxGeo, wireGeo, innerOcta)
        break
      }

      case 'p05': {
        // SHIP INTEL — Vector Hex-Globe with Flight Transit Orbit
        const sphereGeo = new THREE.SphereGeometry(1.15, 16, 12)
        coreMesh = new THREE.Mesh(sphereGeo, createSolidMat())
        rootGroup.add(coreMesh)

        const wireGeo = new THREE.SphereGeometry(1.22, 12, 10)
        outerMesh = new THREE.Mesh(wireGeo, createWireMat(0.7))
        rootGroup.add(outerMesh)

        const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 64)
        ringMesh = new THREE.Mesh(ringGeo, createGlowRingMat())
        ringMesh.rotation.x = Math.PI / 2.4
        ringMesh.rotation.y = Math.PI / 6
        rootGroup.add(ringMesh)

        elementsToDispose.push(sphereGeo, wireGeo, ringGeo)
        break
      }

      case 'p06':
      default: {
        // CHECKOUT BOOST — Triple Kinetic Gyro Rings
        const torus1Geo = new THREE.TorusGeometry(1.5, 0.035, 16, 64)
        coreMesh = new THREE.Mesh(torus1Geo, createGlowRingMat())
        rootGroup.add(coreMesh)

        const torus2Geo = new THREE.TorusGeometry(1.15, 0.03, 16, 64)
        outerMesh = new THREE.Mesh(torus2Geo, createWireMat(0.8))
        outerMesh.rotation.x = Math.PI / 2.5
        rootGroup.add(outerMesh)

        const centerGeo = new THREE.DodecahedronGeometry(0.65, 0)
        ringMesh = new THREE.Mesh(centerGeo, createSolidMat())
        rootGroup.add(ringMesh)

        elementsToDispose.push(torus1Geo, torus2Geo, centerGeo)
        break
      }
    }

    // 5. Ambient Sparkle Points around the object
    const particleCount = 60
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.8 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[i + 2] = radius * Math.cos(phi)
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: mainColor,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    })
    particlesMesh = new THREE.Points(particleGeo, particleMat)
    rootGroup.add(particlesMesh)
    elementsToDispose.push(particleGeo, particleMat)

    // 6. Handle Interaction (Click & Drag if interactive mode)
    const handlePointerDown = (e) => {
      if (!interactive) return
      isDraggingRef.current = true
      prevPointerRef.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerMove = (e) => {
      if (!interactive || !isDraggingRef.current) return
      const deltaX = e.clientX - prevPointerRef.current.x
      const deltaY = e.clientY - prevPointerRef.current.y
      prevPointerRef.current = { x: e.clientX, y: e.clientY }

      rotationVelocityRef.current.x = deltaY * 0.006
      rotationVelocityRef.current.y = deltaX * 0.006

      userRotationRef.current.x += rotationVelocityRef.current.x
      userRotationRef.current.y += rotationVelocityRef.current.y
    }

    const handlePointerUp = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('pointerup', handlePointerUp)

    // 7. Visibility Observer (Pause render loop when card is off-screen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const newW = container.clientWidth
      const newH = container.clientHeight
      if (newW === 0 || newH === 0) return
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    })
    resizeObserver.observe(container)

    // 9. Animation Loop
    let animId = null
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()
      const speed = (isHovered ? 2.4 : 1.0) * speedMultiplier

      // Auto rotation + inertia damping
      if (!isDraggingRef.current) {
        userRotationRef.current.y += delta * 0.45 * speed
        rotationVelocityRef.current.x *= 0.92
        rotationVelocityRef.current.y *= 0.92
        userRotationRef.current.x += rotationVelocityRef.current.x
        userRotationRef.current.y += rotationVelocityRef.current.y
      }

      // Apply rotations to root group
      rootGroup.rotation.x = userRotationRef.current.x
      rootGroup.rotation.y = userRotationRef.current.y

      // Counter rotate sub-parts for cyber kinetic effect
      if (outerMesh) {
        outerMesh.rotation.y = time * 0.3 * speed
        outerMesh.rotation.z = time * 0.15 * speed
      }
      if (ringMesh) {
        ringMesh.rotation.z = -time * 0.4 * speed
      }
      if (particlesMesh) {
        particlesMesh.rotation.y = -time * 0.15
      }

      renderer.render(scene, camera)
    }

    animate()

    // 10. Cleanup
    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('pointerup', handlePointerUp)
      observer.disconnect()
      resizeObserver.disconnect()

      elementsToDispose.forEach((item) => item?.dispose?.())
      renderer.dispose()
      scene.clear()
    }
  }, [projectId, accentColor, wireframeMode, interactive])

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        if (!interactive) return
        isDraggingRef.current = true
        prevPointerRef.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerMove={(e) => {
        if (!interactive || !isDraggingRef.current) return
        const deltaX = e.clientX - prevPointerRef.current.x
        const deltaY = e.clientY - prevPointerRef.current.y
        prevPointerRef.current = { x: e.clientX, y: e.clientY }
        userRotationRef.current.x += deltaY * 0.007
        userRotationRef.current.y += deltaX * 0.007
      }}
      className={`relative w-full h-full select-none ${interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
