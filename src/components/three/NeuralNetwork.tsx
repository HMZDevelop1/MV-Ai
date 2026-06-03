"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralLines() {
  const linesCount = 30;
  const pointsPerLine = 20;

  const { positions, colors } = useMemo(() => {
    const pos: number[] = [];
    const col: number[] = [];
    for (let i = 0; i < linesCount; i++) {
      const startX = (Math.random() - 0.5) * 8;
      const startY = (Math.random() - 0.5) * 8;
      const startZ = (Math.random() - 0.5) * 8;
      const endX = (Math.random() - 0.5) * 8;
      const endY = (Math.random() - 0.5) * 8;
      const endZ = (Math.random() - 0.5) * 8;
      for (let j = 0; j < pointsPerLine; j++) {
        const t = j / (pointsPerLine - 1);
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(t * Math.PI) * 0.5;
        const z = startZ + (endZ - startZ) * t;
        pos.push(x, y, z);
        const alpha = 0.1 + Math.random() * 0.15;
        col.push(0.86, 0.15, 0.15, alpha);
      }
    }
    return { positions: new Float32Array(pos), colors: new Float32Array(col) };
  }, []);

  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));
    return geo;
  }, [positions, colors]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  );
}

function Nodes() {
  const count = 40;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.06} color="#EF4444" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function NeuralNetworkScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <NeuralLines />
        <Nodes />
      </Canvas>
    </div>
  );
}
