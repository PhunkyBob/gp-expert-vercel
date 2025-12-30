"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import * as THREE from "three"

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const speed = 0.01 + Math.random() / 50
      
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      
      const x = 2.5 * Math.cos(theta) * Math.sin(phi)
      const y = 2.5 * Math.sin(theta) * Math.sin(phi)
      const z = 2.5 * Math.cos(phi)
      
      temp.push({ t, speed, x, y, z })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    
    mesh.current.rotation.y += 0.001
    mesh.current.rotation.z += 0.001
    
    particles.forEach((particle, i) => {
      let { t, speed, x, y, z } = particle
      particle.t += speed
      
      const noise = Math.sin(state.clock.elapsedTime * speed + x) * 0.2
      
      dummy.position.set(
        x + noise,
        y + noise,
        z + noise
      )
      
      const scale = 0.03 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.01
      dummy.scale.setScalar(scale)
      
      dummy.lookAt(0, 0, 0)
      dummy.updateMatrix()
      
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
    </instancedMesh>
  )
}

function MainSphere() {
    const mesh = useRef<THREE.Mesh>(null)
    
    useFrame((state) => {
        if (!mesh.current) return
        const t = state.clock.getElapsedTime()
        const scale = 1 + Math.sin(t) * 0.02
        mesh.current.scale.set(scale, scale, scale)
        mesh.current.rotation.y += 0.002
    })

    return (
        <Sphere ref={mesh} args={[2.2, 64, 64]}>
            <meshStandardMaterial 
                color="#0a0e27" 
                wireframe 
                emissive="#1e3a8a"
                emissiveIntensity={0.8}
                transparent
                opacity={0.15}
                roughness={0.5}
                metalness={0.8}
            />
        </Sphere>
    )
}

function InnerCore() {
    return (
        <Sphere args={[1.8, 32, 32]}>
            <meshBasicMaterial color="#0a0e27" />
        </Sphere>
    )
}

export default function DataGlobe() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fbbf24" />
        
        <InnerCore />
        <MainSphere />
        <Particles count={800} />
        
        <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
