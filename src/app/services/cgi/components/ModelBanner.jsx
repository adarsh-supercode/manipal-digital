"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AxesHelper } from 'three';
import { Leva, useControls } from 'leva';
import { Model } from './Model';
import { Environment } from '@react-three/drei';
import styles from '../css/banner.module.css';


export default function ModelBanner() {

  return (
<div style={{ 
  width: '100%', 
  height: '100vh', 
  background: 'linear-gradient(280deg, #9FA0F1 -7.29%, #F9C1D4 29.21%, #C7CBFA 65.69%, #D79EE3 92.15%)' 
}}>      <Leva collapsed={false} />
      <Canvas camera={{ position: [0, 0, 2], fov: 20 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model  />
          <Environment preset="city" background={false} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    <div className="container">
        <div className={styles.bannerTextWrap}>
            <h1 className="heading-1 heading-1-md">CGI</h1>
        </div>
    </div>
    </div>
  );
}
