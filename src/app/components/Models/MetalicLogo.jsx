import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const MetalicLogo = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/assets/metalic_logo.glb');

  return (
    <group {...props} dispose={null} scale={0.02} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shape_2003.geometry}
        material={materials['metalloic.001']}
        scale={1.955}
      />
    </group>
  );
});

useGLTF.preload('/assets/metalic_logo.glb');

export default MetalicLogo;
