
"use client"
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function MorphModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/assets/morphing.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Icosphere"
          castShadow
          receiveShadow
          geometry={nodes.Icosphere.geometry}
          material={nodes.Icosphere.material}
          morphTargetDictionary={nodes.Icosphere.morphTargetDictionary}
          morphTargetInfluences={nodes.Icosphere.morphTargetInfluences}
          position={[3.817, 0, 0]}
          scale={1.436}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/morphing.glb')