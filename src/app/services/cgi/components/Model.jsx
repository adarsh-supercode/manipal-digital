// src/app/services/cgi/components/Model.jsx

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Model({ position = [0.10, -0.13, 0.33], rotation = [0, -1.5, 0], scale = 0.03 }) {
  const { nodes, materials } = useGLTF('/assets/shoe-latest.glb')

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material && material.isMaterial) {
        material.transparent = false;
        material.opacity = 1;
        material.depthWrite = true;
        material.side = THREE.FrontSide;
      }
    });
  }, [materials]);

  return (
    <group position={position} rotation={rotation} scale={scale} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.blinn11}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.blinn11}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.blinn11}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.blinn11}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_4.geometry}
            material={materials.blinn9}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_5.geometry}
            material={materials.blinn10}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_6.geometry}
            material={materials.blinn7}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_7.geometry}
            material={materials.blinn12}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_8.geometry}
            material={materials.blinn8}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/shoe-latest.glb')