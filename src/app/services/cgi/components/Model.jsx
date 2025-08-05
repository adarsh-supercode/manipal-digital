// src/app/services/cgi/components/Model.jsx

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Model({ position = [0.10, -0.19, 0.33], rotation = [0, -1.5, 0], scale = 3 }) {
  // ✅ Enable Draco compression
  const { nodes, materials } = useGLTF('/assets/model.glb', true, '/draco-gltf/') 

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material && material.isMaterial) {
        material.transparent = false
        material.opacity = 1
        material.depthWrite = true
        material.side = THREE.FrontSide
      }
    })
  }, [materials])

  return (
    <group position={position} rotation={rotation} scale={scale} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
         <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.blinn11}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.blinn9}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_2.geometry}
        material={materials.blinn10}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_3.geometry}
        material={materials.blinn7}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_4.geometry}
        material={materials.blinn12}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial_5.geometry}
        material={materials.blinn8}
        scale={0.01}
      />
        </group>
      </group>
    </group>
  )
}

// ✅ Preload model with Draco support
useGLTF.preload('/assets/model.glb', true, '/draco-gltf/')
