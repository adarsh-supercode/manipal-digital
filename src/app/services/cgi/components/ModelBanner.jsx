"use client";
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { AxesHelper } from 'three';
import { Leva, useControls } from 'leva';
import { Model } from './Model';
import styles from '../css/banner.module.css';
import { useInView } from 'react-intersection-observer';


export default function ModelBanner() {
  const controlsRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = true;

    const timeout = setTimeout(() => {
      controlsRef.current.autoRotate = false;
    }, 2000); // rotate for 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  const AnimatedModel = ({ onLoaded }) => {
    const ref = useRef();
    const [scale, setScale] = useState(0);

    useEffect(() => {
      let timeout = setTimeout(() => {
        setScale(1);
        onLoaded(); // Notify main component that model is loaded
      }, 300); // Delay before starting scale up
      return () => clearTimeout(timeout);
    }, []);

    useFrame(() => {
      if (!ref.current || !inView) return;
      ref.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.05);
    });

    return <Model ref={ref} />;
  };

  return (
<div ref={ref} style={{ 
  width: '100%', 
  height: '100vh', 
  background: 'linear-gradient(280deg, #9FA0F1 -7.29%, #F9C1D4 29.21%, #C7CBFA 65.69%, #D79EE3 92.15%)' 
}}>      <Leva collapsed={false} />
      <Canvas camera={{ position: [0, 0, 2], fov: 20 }} frameloop={inView ? 'always' : 'never'}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense
          fallback={
            <Html fullscreen>
              <div
              >
                <img
                  src="/assets/fallback.jpg"
                  alt="Loading preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onLoad={() => setIsModelLoaded(true)}
                />
              </div>
            </Html>
          }
        >
          <AnimatedModel onLoaded={() => setIsModelLoaded(true)} />
          <Environment preset="city" background={false} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          autoRotate={true}
          enableZoom={inView}
          minDistance={0.8}
          maxDistance={2}
        />
      </Canvas>
    <div className="container">
        <div className={styles.bannerTextWrap}>
            <h1 className="heading-1 heading-1-md">CGI</h1>
        </div>
    </div>
    </div>
  );
}
