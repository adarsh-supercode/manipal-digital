// import React from 'react';
// import { useGLTF } from '@react-three/drei';

// export function HelmetModel({ modelPath = '/assets/helmet-transformed.glb', ...props }) {
//   const { nodes, materials } = useGLTF(modelPath);

//   return (
  
//     <group {...props} dispose={null} scale={0.109} >
//       <group position={[0,0.09,0]} >
//       {nodes._polySurface26_Helmet_main_cushion_0 && materials.Helmet_main_cushion && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes._polySurface26_Helmet_main_cushion_0.geometry}
//           material={materials.Helmet_main_cushion}
//         />
//       )}
//       {nodes.pCube11_Helmet_main_cushion_0 && materials.Helmet_main_cushion && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.pCube11_Helmet_main_cushion_0.geometry}
//           material={materials.Helmet_main_cushion}
//         />
//       )}
//       {nodes.polySurface8_Helmet_shell_0 && materials.Helmet_shell && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface8_Helmet_shell_0.geometry}
//           material={materials.Helmet_shell}
//         />
//       )}
//       {nodes.polySurface16_Helmet_visor_0 && materials.Helmet_visor && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface16_Helmet_visor_0.geometry}
//           material={materials.Helmet_visor}
//           position={[0, 0.903, 0]}
//           scale={[1, 1.089, 1]}
//         />
//       )}
//       {nodes.polySurface26_Helmet_buckle_0 && materials.Helmet_buckle && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface26_Helmet_buckle_0.geometry}
//           material={materials.Helmet_buckle}
//           position={[0.172, -16.351, 1.046]}
//           rotation={[-0.099, 0.012, -0.001]}
//           scale={[13.932, 33.351, 16.524]}
//         />
//       )}
//       {nodes.polySurface29_Helmet_bukle_strap_0 && materials.Helmet_bukle_strap && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface29_Helmet_bukle_strap_0.geometry}
//           material={materials.Helmet_bukle_strap}
//           position={[0, -13.74, 0]}
//           rotation={[-0.142, 0, 0]}
//           scale={[13.932, 21.017, 16.524]}
//         />
//       )}
//       {nodes.polySurface30_Helmet_bukle_strap_0 && materials.Helmet_bukle_strap && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface30_Helmet_bukle_strap_0.geometry}
//           material={materials.Helmet_bukle_strap}
//           position={[0, -13.523, 0]}
//           rotation={[-0.142, 0, 0]}
//           scale={[13.932, 23.761, 16.524]}
//         />
//       )}
//       {nodes.polySurface31_Helmet_buckle_0 && materials.Helmet_buckle && (
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.polySurface31_Helmet_buckle_0.geometry}
//           material={materials.Helmet_buckle}
//         />
//       )}
//       </group>
//     </group>
//   );
// }
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function HelmetModel({ modelPath = '/assets/good-year-transformed.glb', ...props }) {
  const { nodes, materials } = useGLTF(modelPath);

  return (
  
    <group {...props} dispose={null} scale={20} rotation={[0,1.4,0.3]} position={[0.8,3.4,0]} >

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom_sole.geometry}
        material={materials['Bottom.001']}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.collar.geometry}
        material={materials['body.001']}
        position={[0.002, 0.059, -0.002]}
        rotation={[-0.17, -0.263, 0.258]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.laces.geometry}
        material={materials.Lace}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.max_protect.geometry}
        material={materials['max_protect.002']}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface7.geometry}
        material={materials.standardSurface1}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stitch.geometry}
        material={materials.stitches}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tag.geometry}
        material={materials.blue_max_protect}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.transf.geometry}
        material={materials['Back_plastic.001']}
        position={[0, 0.001, 0]}
        rotation={[1.332, 0.249, 2.349]}
        scale={0.01}
      />
    </group>
  );
}
