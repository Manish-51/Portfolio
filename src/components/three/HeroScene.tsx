import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#e8b872"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function EmeraldParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#5fd9b4"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function CoreShape(props: ThreeElements["group"]) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const pointer = state.pointer;
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.14;
      outerRef.current.rotation.y += delta * 0.2;
      outerRef.current.rotation.z = THREE.MathUtils.lerp(
        outerRef.current.rotation.z,
        pointer.x * 0.25,
        0.04
      );
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.25;
      innerRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group {...props}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#0b0d12"
          emissive="#e8b872"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#0b0d12"
          emissive="#5fd9b4"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
}

function SceneLights() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 3;
      lightRef.current.position.y = state.pointer.y * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight ref={lightRef} position={[0, 0, 4]} intensity={2.0} color="#f7da90" />
      <pointLight position={[5, 4, 3]} intensity={1.2} color="#e8b872" />
      <pointLight position={[-5, -3, -3]} intensity={1.0} color="#5fd9b4" />
    </>
  );
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div aria-hidden className="absolute inset-0 bg-radial-fade" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
            <CoreShape />
          </Float>
          <ParticleField />
          <EmeraldParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
