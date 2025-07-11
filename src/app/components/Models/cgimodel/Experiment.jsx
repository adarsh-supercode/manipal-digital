'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { Color, MathUtils, MeshPhysicalMaterial, RGBADepthPacking, MeshDepthMaterial } from 'three'; // Import MeshDepthMaterial here
import CustomShaderMaterial from 'three-custom-shader-material';
import { useMediaQuery } from 'usehooks-ts';
import * as styles from "../../Components.module.css";
import { getCachedGeometry } from '../../Geometry/GeometryCache';
import vertexShader from '../../../../../public/shades/vertex.glsl';
import fragmentShader from '../../../../../public/shades/fragment.glsl';
import BlobLoader from '../../BlobLoader';
import { clearGeometryCache } from '../../Geometry/GeometryCache';
import { useThree } from '@react-three/fiber';


const Experiment = ({ shouldReduceQuality, isMobile, onLoaded, setBgGradient, onCanvasClick, setIsGeometryLoaded, isGeometryLoaded }) => {
  const startTime = useRef(performance.now());
  const materialRef = useRef(null);
  const depthMaterialRef = useRef(null);
  const meshRef = useRef();
  const rotationRef = useRef(0);
  const shrinkRef = useRef(null);
  const expandRef = useRef(null);
  const [scaleX, setScaleX] = useState(0);
  const [morphType, setMorphType] = useState(0);
  const [rotationAnimating, setRotationAnimating] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);
  const totalMorphTypes = 5;
  const geometryRef = useRef(null);
  const autoMorphInterval = useRef(null);
  const { gl: renderer } = useThree();

  const morphColors = ['#CF83FA', '#00aaff', '#9738FA', '#53FCF6', '#1094C4'];
  const gradients = [
    "linear-gradient(281deg, #FFC1EB -14.43%, #CF83FA 101.1%)",
    "linear-gradient(282deg, #64B3F9 -10.08%, #C784FF 106.04%)",
    "linear-gradient(282deg, #A652FD 1.66%, #FCBDEF 96.9%)",
    "linear-gradient(282deg, #D7F285 -7.08%, #A1E8FE 46.86%, #77F3C1 94.78%)",
    "linear-gradient(282deg, #60BDD9 13.87%, #FCBDEF 106.04%)"
  ];

  const geometry = useMemo(() => {
    const geo = getCachedGeometry(shouldReduceQuality);
    setIsGeometryLoaded(true);
    return geo;
  }, [shouldReduceQuality]);

  useEffect(() => {
    if (shaderReady && geometry && isGeometryLoaded) {
      let current = 0;
      const target = 1;
      const speed = 0.05;

      const interval = setInterval(() => {
        current = Math.min(current + speed, target);
        setScaleX(current);
        if (current >= target) clearInterval(interval);
      }, 16);

      return () => clearInterval(interval);
    }
  }, [shaderReady, geometry, isGeometryLoaded]);
  const disposeResources = () => {
    if (meshRef.current) {
      const mesh = meshRef.current;

      if (mesh.geometry) {
        mesh.geometry.dispose();
      }

      const disposeMat = (mat, label = 'Material') => {
        if (!mat) return;
        mat.dispose?.();

        if (mat.map) {
          mat.map.dispose();
        }
        if (mat.normalMap) {
          mat.normalMap.dispose();
        }
        if (mat.roughnessMap) {
          mat.roughnessMap.dispose();
        }
        if (mat.envMap) {
          mat.envMap.dispose();
        }
      };

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat, i) => disposeMat(mat, `Material[${i}]`));
      } else {
        disposeMat(mesh.material);
      }
      clearGeometryCache();
    }
  };


  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(morphColors[0]) },
    uGradientStrength: { value: 1.0 },
    uSpeed: { value: 1.2 },
    uNoiseStrength: { value: 0.36 },
    uDisplacementStrength: { value: 0.91 },
    uFractAmount: { value: 1 },
    uMorphType: { value: 0 }
  }), []);
  

  useEffect(() => {
    requestAnimationFrame(() => {
      setShaderReady(true);
      onLoaded();
    });
  }, [onLoaded]);

  const handleClick = () => {
    if (rotationAnimating) return;
    disposeResources();

    setRotationAnimating(true);

    const targetShrinkScale = 0.4;
    const nextMorph = (morphType + 1) % totalMorphTypes;

    clearInterval(shrinkRef.current);
    shrinkRef.current = setInterval(() => {
      setScaleX(prev => {
        const next = Math.max(prev - 0.05, targetShrinkScale);
        if (next === targetShrinkScale) clearInterval(shrinkRef.current);
        return next;
      });
    }, 16);

    setTimeout(() => {
      setMorphType(nextMorph);
      if (morphType === totalMorphTypes - 1 && nextMorph === 0) {
        materialRef.current.uniforms.uMorphType.value = 0;
        depthMaterialRef.current.uniforms.uMorphType.value = 0;
      }
      const newColor = morphColors[nextMorph];
      materialRef.current.uniforms.uColor.value.set(newColor);
      setBgGradient?.(gradients[nextMorph]);
    }, 200);

    setTimeout(() => {
      clearInterval(expandRef.current);
      expandRef.current = setInterval(() => {
        setScaleX(prev => {
          const next = Math.min(prev + 0.05, 1);
          if (next === 1) {
            clearInterval(expandRef.current);
            setRotationAnimating(false);
          }
          return next;
        });
      }, 16);
    }, 300);
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
  
    uniforms.uTime.value = t;
    uniforms.uMorphType.value += (morphType - uniforms.uMorphType.value) * 0.05;
  
    if (meshRef.current) {
      const targetRot = rotationAnimating ? Math.PI : 0;
      rotationRef.current = MathUtils.lerp(rotationRef.current, targetRot, 0.05);
      meshRef.current.rotation.y = rotationRef.current;
    }
  });

  useEffect(() => {
    if (onCanvasClick) onCanvasClick(() => handleClick);
  }, [handleClick, onCanvasClick]);

  if (!geometryRef.current) {
    geometryRef.current = getCachedGeometry(shouldReduceQuality);
  }

  const triggerMorphChange = () => {
    disposeResources();

    const nextMorph = (morphType + 1) % totalMorphTypes;
    setMorphType(nextMorph);
    uniforms.uColor.value.set(morphColors[nextMorph]);
    uniforms.uMorphType.value = nextMorph;
    depthMaterialRef.current.uniforms.uMorphType.value = nextMorph;
    setBgGradient?.(gradients[nextMorph]);
  };

  useEffect(() => {
    autoMorphInterval.current = setInterval(() => {
      triggerMorphChange();
    }, 2000);

    return () => clearInterval(autoMorphInterval.current);
  }, [morphType]);

  useEffect(() => {
    return () => {
      disposeResources();
  
      clearInterval(shrinkRef.current);
      clearInterval(expandRef.current);
      clearInterval(autoMorphInterval.current);

          // Hard GPU cleanup
    renderer.renderLists.dispose();
    renderer.info.reset();
    console.log('Renderer cache cleared');
    };
  }, []);
  
  return (
    <>
      <mesh
        ref={meshRef}
        geometry={geometryRef.current}
        scale={[scaleX, scaleX, scaleX]}
        position={[0, isMobile ? -1.3 : 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshPhysicalMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          opacity={shaderReady ? 1 : 0}
          roughness={0.56}
          metalness={0.63}
          clearcoat={0.76}
          reflectivity={0.46}
          ior={1.22}
          iridescence={0.016}
          flatShading
          silent
        />

        <CustomShaderMaterial
          ref={depthMaterialRef}
          baseMaterial={MeshDepthMaterial}
          vertexShader={vertexShader}
          uniforms={uniforms}
          depthPacking={RGBADepthPacking}
          attach="customDepthMaterial"
          flatShading
          silent
        />
      </mesh>
      <ambientLight intensity={1} />
      <directionalLight intensity={5} position={[-0.4, 9, 6.48]} />
      <directionalLight intensity={5} position={[0.4, -9, -9.48]} />
    </>
  );
};

const Experience = () => {
  const isTablet = useMediaQuery('(max-width: 1199px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isLoaded, setIsLoaded] = useState(false);
  const [bgGradient, setBgGradient] = useState(styles.modelcgiBg);
  const [isGeometryLoaded, setIsGeometryLoaded] = useState(false);
  const [canvasClickHandler, setCanvasClickHandler] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      document.body.classList.remove('loading');
    }
  }, [isLoaded]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={styles.canvasWrapper} data-cursor="clickButton">
      <div className={`${styles.loaderWrapper} ${isGeometryLoaded ? styles.fadeOut : ''}`}>
        {!isGeometryLoaded && <BlobLoader isGeometryLoaded={isGeometryLoaded} />}
      </div>
      <Canvas
        camera={{ position: [0, 0, isTablet ? 9 : 6], fov: 45, near: 0.1, far: 1000 }}
        gl={{ alpha: true }}
        className={styles.modelcgiBg}
        style={{ background: bgGradient, pointerEvents: isLoaded ? 'auto' : 'none' }}
        onClick={() => canvasClickHandler?.()}
      >
        <Suspense fallback={null}>
          <Experiment
            shouldReduceQuality={isTablet}
            isMobile={isMobile}
            onLoaded={handleLoad}
            setBgGradient={setBgGradient}
            onCanvasClick={setCanvasClickHandler}
            setIsGeometryLoaded={setIsGeometryLoaded}
            isGeometryLoaded={isGeometryLoaded}
          />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default Experience;
