"use client";

import { Html, RoundedBox, Float } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { MutableRefObject, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { techGroups } from "@/data/portfolio";

function Box({ position, scale, color = "#11151b", emissive = "#000000", radius = 0.08 }: {
  position: [number, number, number]; scale: [number, number, number]; color?: string; emissive?: string; radius?: number;
}) {
  return (
    <RoundedBox position={position} scale={scale} radius={radius} smoothness={4}>
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.7} roughness={0.45} metalness={0.55} />
    </RoundedBox>
  );
}

function Desk() {
  return (
    <group position={[0, -0.1, 0]}>
      <Box position={[0, 0, 0]} scale={[6.4, 0.22, 2.7]} color="#171a20" />
      <Box position={[-2.4, -1.5, 0]} scale={[0.22, 3, 2]} />
      <Box position={[2.4, -1.5, 0]} scale={[0.22, 3, 2]} />
      <Box position={[0, 1.65, -0.45]} scale={[3.8, 2.25, 0.18]} color="#0a0d11" emissive="#081f32" />
      <Box position={[0, 0.65, -0.4]} scale={[0.16, 1.1, 0.16]} />
      <Box position={[0, 0.15, -0.4]} scale={[1.25, 0.1, 0.6]} />
      <Box position={[0, 0.15, 0.62]} scale={[2.25, 0.12, 0.72]} color="#10141a" />
      <Box position={[1.85, 0.17, 0.65]} scale={[0.55, 0.16, 0.78]} />
      <Box position={[-2.0, 0.9, 0.36]} scale={[1.85, 1.12, 0.11]} color="#0c1015" emissive="#112941" />
      <Box position={[-2.0, 0.25, 0.36]} scale={[1.6, 0.12, 1.0]} />
      <group position={[2.55, 0.72, -0.25]} rotation={[0, 0, -0.2]}>
        <mesh><cylinderGeometry args={[0.09, 0.09, 1.6, 16]} /><meshStandardMaterial color="#262d36" metalness={0.8} /></mesh>
        <mesh position={[0.34, 0.78, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.42, 0.65, 24]} /><meshStandardMaterial color="#222831" emissive="#f2d7ad" emissiveIntensity={0.35} /></mesh>
        <pointLight position={[0.3, 0.62, 0.05]} intensity={2.3} distance={5} color="#ffd8a8" />
      </group>
      <Html transform position={[0, 1.66, -0.31]} scale={0.36} distanceFactor={7} occlude="blending">
        <div className="monitor-code" aria-hidden="true">
          <span className="code-muted">// john.lorens</span><br />
          <span>const</span> <b>craft</b> = <span className="code-accent">"web experiences"</span>;<br />
          <span>build</span>(craft);<i className="code-cursor" />
        </div>
      </Html>
    </group>
  );
}

const techItems = techGroups.flatMap((group) => group.items);

function TechCloud({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const visibleItems = mobile ? techItems.slice(0, 10) : techItems;
  return (
    <group position={[8, 1.25, -10]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <ringGeometry args={[1.6, 6.4, 64]} />
        <meshBasicMaterial color="#18324b" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      {visibleItems.map((tech, i) => {
        const angle = (i / visibleItems.length) * Math.PI * 2;
        const radius = 2.7 + (i % 3) * 0.72;
        const pos: [number, number, number] = [Math.cos(angle) * radius, ((i % 5) - 2) * 0.62, Math.sin(angle) * radius];
        return <TechCard key={`${tech}-${i}`} label={tech} position={pos} reduced={reduced} delay={i * 0.05} />;
      })}
    </group>
  );
}

function TechCard({ label, position, reduced }: { label: string; position: [number, number, number]; reduced: boolean; delay: number }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    const target = hovered ? 1.14 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 1 - Math.exp(-delta * 9));
    ref.current.rotation.y += delta * 0.08;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.65 + position[0]) * 0.08;
  });
  const stop = (e: ThreeEvent<PointerEvent>) => e.stopPropagation();
  return (
    <group ref={ref} position={position} onPointerEnter={(e) => { stop(e); setHovered(true); }} onPointerLeave={(e) => { stop(e); setHovered(false); }}>
      <RoundedBox args={[1.5, 0.62, 0.14]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color={hovered ? "#17334b" : "#111820"} emissive={hovered ? "#1c6ba3" : "#06121d"} emissiveIntensity={hovered ? 1.1 : 0.45} metalness={0.5} roughness={0.35} />
      </RoundedBox>
      <Html center transform position={[0, 0, 0.09]} scale={0.28} distanceFactor={6}>
        <div className="three-label">{label}</div>
      </Html>
    </group>
  );
}

function ProjectWall() {
  return (
    <group position={[-5.5, 0.9, -20]}>
      <Box position={[0, 0.2, 0]} scale={[7.5, 4.4, 0.25]} color="#0b0f14" emissive="#091e30" />
      {["FACETIME", "INTERVIEW AI"].map((label, i) => (
        <group key={label} position={[i === 0 ? -1.85 : 1.85, 0.25, 0.22]}>
          <RoundedBox args={[3.2, 2.75, 0.14]} radius={0.12} smoothness={4}>
            <meshStandardMaterial color="#101820" emissive={i === 0 ? "#102f4a" : "#1c2446"} emissiveIntensity={0.8} roughness={0.3} metalness={0.45} />
          </RoundedBox>
          <Html center transform position={[0, 0, 0.1]} scale={0.34} distanceFactor={7}>
            <div className="project-screen">
              <span>PROJECT / 0{i + 1}</span>
              <strong>{label}</strong>
              <div><i /><i /><i /></div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function TimelineScene({ progress, reduced }: { progress: MutableRefObject<number>; reduced: boolean }) {
  const beam = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!beam.current || reduced) return;
    const local = THREE.MathUtils.clamp((progress.current - 0.5) / 0.22, 0, 1);
    beam.current.scale.x = Math.max(0.02, local);
  });
  return (
    <group position={[6, 0.9, -30]}>
      <mesh ref={beam} position={[0, 0, 0]} scale={[0.02, 1, 1]}>
        <boxGeometry args={[8, 0.055, 0.055]} />
        <meshBasicMaterial color="#67c7ff" />
      </mesh>
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh><sphereGeometry args={[0.15, 24, 24]} /><meshStandardMaterial color="#a9ddff" emissive="#4fb8ff" emissiveIntensity={1.5} /></mesh>
          <Html center transform position={[0, 0.7, 0]} scale={0.28} distanceFactor={7}>
            <div className="timeline-label"><small>0{i + 1}</small><strong>{["WEB", "FRONTEND", "BACKEND", "FULL-STACK", "CREATIVE"][i]}</strong></div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function CodeStation() {
  return (
    <group position={[0, 0.4, -40]} rotation={[0, 0.05, 0]}>
      <Box position={[0, 0, 0]} scale={[5.8, 0.28, 3.0]} />
      <Box position={[0, 1.55, -0.2]} scale={[5.1, 2.65, 0.2]} color="#090d12" emissive="#102c45" />
      <Html center transform position={[0, 1.55, -0.06]} scale={0.45} distanceFactor={7}>
        <pre className="code-screen" aria-hidden="true"><code>{`const developer = {\n  name: "John Lorens",\n  role: "Full-Stack Developer",\n  passion: "Building digital experiences",\n  status: "Always learning"\n};`}<i className="code-cursor" /></code></pre>
      </Html>
    </group>
  );
}

function Terminal() {
  return (
    <group position={[0, 0.3, -50]}>
      <Box position={[0, 0, 0]} scale={[6.5, 0.24, 2.7]} />
      <Box position={[0, 1.7, -0.55]} scale={[5.7, 2.7, 0.2]} color="#080d11" emissive="#06291f" />
      <Html center transform position={[0, 1.7, -0.42]} scale={0.43} distanceFactor={7}>
        <div className="terminal-screen" aria-hidden="true">
          <span>$ john --status</span>
          <strong>AVAILABLE FOR IDEAS, PROJECTS & OPPORTUNITIES</strong>
          <span className="terminal-prompt">$ _</span>
        </div>
      </Html>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 32;
      a[i * 3 + 1] = Math.random() * 9 - 2;
      a[i * 3 + 2] = -Math.random() * 58 + 5;
    }
    return a;
  }, [count]);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.008; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#b7dcf4" transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

export default function SceneWorld({ progress, reduced, mobile }: { progress: MutableRefObject<number>; reduced: boolean; mobile: boolean }) {
  const key = reduced ? "reduced" : "motion";
  return (
    <group key={key}>
      <color attach="background" args={["#06080b"]} />
      <fog attach="fog" args={["#06080b", 12, 38]} />
      <ambientLight intensity={0.48} />
      <directionalLight position={[5, 8, 4]} intensity={1.35} color="#a9d9ff" />
      <pointLight position={[-4, 3, -14]} intensity={14} distance={16} color="#336bff" />
      <pointLight position={[7, 4, -30]} intensity={13} distance={16} color="#67d2ff" />
      <Particles count={mobile ? 60 : reduced ? 90 : 260} />
      <Float speed={reduced ? 0 : 0.5} rotationIntensity={reduced ? 0 : 0.05} floatIntensity={reduced ? 0 : 0.08}><Desk /></Float>
      <TechCloud reduced={reduced} mobile={mobile} />
      <ProjectWall />
      <TimelineScene progress={progress} reduced={reduced} />
      <CodeStation />
      <Terminal />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, -25]}>
        <planeGeometry args={[42, 72]} />
        <meshStandardMaterial color="#080a0e" roughness={0.72} metalness={0.22} />
      </mesh>
    </group>
  );
}
