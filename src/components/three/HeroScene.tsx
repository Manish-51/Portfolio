import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.6;
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
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#e8b872"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

function CoreShape(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
    const pointer = state.pointer;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.2,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} {...props}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshStandardMaterial
        color="#12151c"
        emissive="#3bbf9a"
        emissiveIntensity={0.25}
        roughness={0.25}
        metalness={0.75}
        wireframe
      />
    </mesh>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#e8b872" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#5fd9b4" />
    </>
  );
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    // Static, non-animated fallback: a gentle radial gradient rather than
    // a spinning 3D scene, respecting the user's motion preference.
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-radial-fade"
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
            <CoreShape />
          </Float>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
