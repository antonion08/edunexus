"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(10000 * 3);
    random.inSphere(positions, { radius: 2 });
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4A96D9"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Nebula() {
  const mesh = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.05;
      mesh.current.rotation.y += delta * 0.1;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x -= delta * 0.08;
      mesh2.current.rotation.y -= delta * 0.12;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x += delta * 0.06;
      mesh3.current.rotation.y -= delta * 0.09;
    }
  });

  return (
    <>
      <mesh ref={mesh} position={[0, 0, -1]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#4A96D9"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={mesh2} position={[0, 0, -1.5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#1E3A8A"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={mesh3} position={[0, 0, -1.8]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#0EA5E9"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function Galaxy() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    random.inSphere(positions, { radius: 0.5 });
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group position={[1, 0.5, -0.5]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0EA5E9"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function UniverseBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={["#0F172A"]} />
        <Stars />
        <Nebula />
        <Galaxy />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0EA5E9" />
      </Canvas>
    </div>
  );
} 