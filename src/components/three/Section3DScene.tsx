import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

export type SectionType = "journey" | "skills" | "projects" | "certifications" | "contact";

/* =========================================================================
   1. JOURNEY SCENE: Constellation Nodes, Orbiting Particles & Scroll Light
   ========================================================================= */
function JourneyScene({ progress = 0.5 }: { progress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollLightRef = useRef<THREE.PointLight>(null);
  const nodeCount = 18;

  const [nodes, linePositions] = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 3 - 1;
      pts.push([x, y, z]);
    }

    const lines: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.6) {
          lines.push(...pts[i], ...pts[j]);
        }
      }
    }

    return [pts, new Float32Array(lines)];
  }, []);

  const particlePos = useMemo(() => {
    const count = 350;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      const pointer = state.pointer;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pointer.x * 0.3, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, pointer.y * 0.3, 0.04);
    }

    const targetY = 3.2 - progress * 6.4;
    if (scrollLightRef.current) {
      scrollLightRef.current.position.y = THREE.MathUtils.lerp(scrollLightRef.current.position.y, targetY, 0.1);
    }
  });

  return (
    <>
      <pointLight
        ref={scrollLightRef}
        position={[0, 3.2, 1.5]}
        intensity={4.0}
        color="#f7da90"
        distance={9}
      />
      <group ref={groupRef}>
        {nodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#e8b872" : "#5fd9b4"}
              emissive={idx % 2 === 0 ? "#d4a05a" : "#3bbf9a"}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e8b872" transparent opacity={0.25} />
        </lineSegments>

        <Points positions={particlePos} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color="#5fd9b4"
            size={0.025}
            sizeAttenuation
            depthWrite={false}
            opacity={0.6}
          />
        </Points>
      </group>
    </>
  );
}

/* =========================================================================
   2. SKILLS SCENE: Floating Polyhedra & Skill Cubes
   ========================================================================= */
function SkillsScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.03;
    const pointer = state.pointer;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * 0.15, 0.03);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8} position={[-2.8, 1.2, -1]}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color="#0b0d12" emissive="#5fd9b4" emissiveIntensity={0.4} wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.9} position={[2.9, -1.1, -1.2]}>
        <mesh>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial color="#0b0d12" emissive="#e8b872" emissiveIntensity={0.45} wireframe />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7} position={[-2.2, -1.8, -1.5]}>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#0b0d12" emissive="#3bbf9a" emissiveIntensity={0.35} wireframe />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={0.8} position={[2.4, 1.8, -1.8]}>
        <mesh>
          <torusGeometry args={[0.65, 0.2, 16, 32]} />
          <meshStandardMaterial color="#0b0d12" emissive="#d4a05a" emissiveIntensity={0.4} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

/* =========================================================================
   3. PROJECTS SCENE: Cyber Grid, Floating Prisms & Scroll Light
   ========================================================================= */
function ProjectsScene({ progress = 0.5 }: { progress?: number }) {
  const gridRef = useRef<THREE.Group>(null);
  const scrollLightRef = useRef<THREE.PointLight>(null);

  const particlePos = useMemo(() => {
    const count = 450;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 1;
      const pointer = state.pointer;
      gridRef.current.rotation.x = -0.55 + pointer.y * 0.05;
      gridRef.current.rotation.y = pointer.x * 0.08;
    }

    const targetY = 3.2 - progress * 6.4;
    if (scrollLightRef.current) {
      scrollLightRef.current.position.y = THREE.MathUtils.lerp(scrollLightRef.current.position.y, targetY, 0.1);
    }
  });

  return (
    <>
      <pointLight
        ref={scrollLightRef}
        position={[0, 3.2, 1.5]}
        intensity={4.2}
        color="#f8da72"
        distance={10}
      />

      <group ref={gridRef} position={[0, -2, -2]} rotation={[-0.55, 0, 0]}>
        <gridHelper args={[24, 32, "#e8b872", "#262b38"]} />
      </group>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.6} position={[-3.2, 0.8, -1.5]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color="#12151c" emissive="#5fd9b4" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.7} position={[3.3, -0.6, -1.8]}>
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshStandardMaterial color="#12151c" emissive="#e8b872" emissiveIntensity={0.35} wireframe />
        </mesh>
      </Float>

      <Points positions={particlePos} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#5fd9b4"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </>
  );
}

/* =========================================================================
   4. CERTIFICATIONS SCENE: Golden Emblem & Orbiting Ring
   ========================================================================= */
function CertificationsScene() {
  const knotRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const starPos = useMemo(() => {
    const count = 400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.12;
      knotRef.current.rotation.y += delta * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -1]}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.0, 0.28, 100, 16]} />
          <meshStandardMaterial
            color="#0b0d12"
            emissive="#e8b872"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>

      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 16, 64]} />
          <meshStandardMaterial color="#5fd9b4" emissive="#3bbf9a" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <Points positions={starPos} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#e8b872"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
}

/* =========================================================================
   5. CONTACT SCENE: Interactive Wave Vortex Field
   ========================================================================= */
function ContactScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const countX = 35;
  const countY = 35;
  const numPoints = countX * countY;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(numPoints * 3);
    const init = new Float32Array(numPoints * 3);
    let i = 0;
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = (x / (countX - 1) - 0.5) * 9;
        const v = (y / (countY - 1) - 0.5) * 7;
        pos[i * 3] = u;
        pos[i * 3 + 1] = v;
        pos[i * 3 + 2] = 0;

        init[i * 3] = u;
        init[i * 3 + 1] = v;
        init[i * 3 + 2] = 0;
        i++;
      }
    }
    return [pos, init];
  }, [numPoints]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    for (let i = 0; i < numPoints; i++) {
      const u = initialPositions[i * 3];
      const v = initialPositions[i * 3 + 1];

      const dist = Math.sqrt((u - pointer.x * 4) ** 2 + (v - pointer.y * 3) ** 2);
      const wave = Math.sin(dist * 2 - time * 2.5) * 0.35;
      const baseWave = Math.sin(u * 1.2 + time) * Math.cos(v * 1.2 + time) * 0.25;

      array[i * 3 + 2] = wave + baseWave;
    }
    posAttr.needsUpdate = true;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, pointer.x * 0.15, 0.03);
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -pointer.y * 0.15, 0.03);
  });

  return (
    <group position={[0, 0, -1.2]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#5fd9b4"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </points>
    </group>
  );
}

/* =========================================================================
   LIGHTS & MAIN WRAPPER
   ========================================================================= */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 4]} intensity={1.2} color="#e8b872" />
      <pointLight position={[-5, -4, -3]} intensity={0.9} color="#5fd9b4" />
    </>
  );
}

export default function Section3DScene({
  section,
  progress = 0.5,
}: {
  section: SectionType;
  progress?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div aria-hidden className="absolute inset-0 bg-radial-fade" />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          {section === "journey" && <JourneyScene progress={progress} />}
          {section === "skills" && <SkillsScene />}
          {section === "projects" && <ProjectsScene progress={progress} />}
          {section === "certifications" && <CertificationsScene />}
          {section === "contact" && <ContactScene />}
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-transparent to-obsidian-950/80" />
    </div>
  );
}
