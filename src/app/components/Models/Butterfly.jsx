"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

function BlobButterfly() {
  const meshRef = useRef();

  // Higher subdivision for smoother shape
  const geometry = useRef(new THREE.IcosahedronGeometry(1, 15)).current;

  // Save the base/original positions
  const basePositions = useRef(Float32Array.from(geometry.attributes.position.array));

  // Morph control
  const { morphValue } = useControls({
    morphValue: { value: 0, min: 0, max: 1, step: 0.001 },
  });

  const createButterflyShape = (geometry, morphValue) => {
    const position = geometry.attributes.position;
    const vertexCount = position.count;
  
    for (let i = 0; i < vertexCount; i++) {
      const baseX = basePositions.current[i * 3];
      const baseY = basePositions.current[i * 3 + 1];
      const baseZ = basePositions.current[i * 3 + 2];
  
      let x = baseX;
      let y = baseY;
      let z = baseZ;
  
      if (morphValue > 0) {
        const wingInfluence = Math.abs(baseX) > 0.2; // exclude center body
        const topWing = baseY > 0;
        const wingCurve = Math.exp(-Math.pow(baseY * 2, 2)); // taper ends
  
        if (wingInfluence) {
          // Strong X widening and Y lift
          x *= 1 + morphValue * 4 * wingCurve;
          y *= 1 + morphValue * 1.5 * (topWing ? 1 : -1) * wingCurve;
          z += Math.sin(baseX * 10) * morphValue * 0.2;
        } else {
          // Body stays tight, slight elongation
          y *= 1 + morphValue * 0.2;
          x *= 1 - morphValue * 0.3;
        }
      }
  
      position.setXYZ(i, x, y, z);
    }
  
    position.needsUpdate = true;
  };

  useFrame(() => {
    createButterflyShape(geometry, morphValue);
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#FF69B4" flatShading />
    </mesh>
  );
}

export default BlobButterfly;
