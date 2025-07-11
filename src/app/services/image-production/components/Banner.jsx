import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as styles from '../css/banner.module.css';

// Mobile detection using user agent string
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : ''
);

export default function Banner({banner}) {
  const { heading, bImg, aImg } = banner || {};
  const containerRef = useRef(null);

  useEffect(() => {
    if (isMobileDevice) return; // Skip Three.js on mobile

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 0.1, 10
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Geometry & Shader Material
    const geometry = new THREE.PlaneGeometry(width, height);
    const uniforms = {
      u_image2: { value: new THREE.TextureLoader().load('/assets/imagnBgafter.jpg') },
      u_image1: { value: new THREE.TextureLoader().load('/assets/imgnBgbefore.jpg') },
      // u_image2: { value: new THREE.TextureLoader().load(aImg.url) },
      // u_image1: { value: new THREE.TextureLoader().load(bImg.url) },
      u_mouse: { value: new THREE.Vector2(5, 5) },
      u_time: { value: 0.0 },
      u_click: { value: 0.0 },
      u_revealSize: { value: new THREE.Vector2(0.95, 0.25) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 v_uv;
        void main() {
          v_uv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform sampler2D u_image1;
        uniform sampler2D u_image2;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_click;
        uniform vec2 u_revealSize;
        varying vec2 v_uv;

        vec2 hash(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }

        float perlinNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
          float b = dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
          float c = dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
          float d = dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        float fbm(vec2 uv) {
          float value = 0.4;
          float amplitude = 0.6;
          float frequency = 3.0;
          for (int i = 0; i < 4; i++) {
            value += amplitude * perlinNoise(uv * frequency);
            frequency *= 0.8;
            amplitude *= 0.8;
          }
          return value;
        }

        float revealMask(vec2 uv, vec2 center, vec2 size, float time) {
          if (u_click > 0.5) return 1.0;
          float dist = distance(uv, center);
          float noiseEffect = fbm(uv * 5.0 + time * 0.3) * 0.15;
          float radius = min(size.x, size.y) * 0.5 + noiseEffect;
          float mask = smoothstep(radius + 0.005, radius - 0.005, dist);
          return mask;
        }

        void main() {
          vec2 uv = v_uv;
          float mask = revealMask(uv, u_mouse, u_revealSize, u_time);
          vec4 img1 = texture2D(u_image1, uv);
          vec4 img2 = texture2D(u_image2, uv);
          gl_FragColor = mix(img1, img2, mask);
        }
      `,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Mouse Move
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      uniforms.u_mouse.value.set(x, y);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {isMobileDevice ? (
        <div className={styles?.videoWrap} style={{ height: '57vh' }}>
          <video
            src="/assets/imaging-banners.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          style={{ height: '100vh', cursor: 'pointer' }}
          className={styles?.ImagingWrap}
        />
      )}
      <div className={styles?.headingWrap}>
        <div className="container">
          <h1 className="heading-5 heading-2-sm heading-2-md">{heading}</h1>
        </div>
      </div>
    </>
  );
}