// GlassModel.js
import React, { forwardRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { disposeModel } from "@/utilities/helper";

export const GlassModel = forwardRef((props, ref) => {
  const {scene, nodes, materials } = useGLTF('/assets/glasslogo-transformed.glb')


  useEffect(() => {
    return () => {
      disposeModel(scene)
    }
  }, [scene])
  return (
    <group {...props} dispose={null} scale={0.03} ref={ref} position={[0,0,0]} >
          <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0034.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0034_1.geometry}
          material={materials.MAIN}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_0034_2.geometry}
          material={materials['Material.003']}
        />
      </group>
    </group>
  )
});

useGLTF.preload('/assets/glasslogo-transformed.glb')
