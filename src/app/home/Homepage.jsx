"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LogoModel } from "../components/Models/LogoModel";
import { usePathname } from "next/navigation";

import GridSection from "./components/GridSection";
import TextAnimate from "./components/TextAnimate";
import VideoSection from "./components/VideoSection";
import LogoSlider from "../components/Marquee/LogoSlider";
import CardStack from "./components/CardStack";
import FeaturedPosts from "./components/FeaturedPosts";
import ShapeZoom from "./components/ShapeZoom";
import Testimonial from "./components/Testimonial";
import MapSection from "./components/MapSection";

import * as styles from "./component.module.css";
import BehindBanner from "./components/behindBanner";
import Industry from "./components/Industry";

gsap.registerPlugin(ScrollTrigger);

// Utility to check for mobile devices
const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768;

export default function Homepage({ data }) {
  const { banner, posts, animateSec, animateVideo, logoMarquee ,content,services, revealSec, testimonialSection,mapSection} = data || {}
  const modelRef = useRef(null)
  const wrapperRef = useRef(null);
  const pathname = usePathname()

  useEffect(() => {
    if (modelRef.current && wrapperRef.current) {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top", 
        end: "bottom bottom", 
        pin: modelRef.current,
        pinSpacing: false,
        scrub: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <>
     <div className={styles?.pinSecWrap} ref={wrapperRef}>
      <GridSection banner={banner} />
      {/* <div className={`${styles.modelNew} ${styles.modelNewflsn} hideMobile`}>
        <div ref={modelRef} className={styles?.modelNewWrap}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 58 }}
            className={styles?.modelNeCanvas}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <LogoModel />
            <OrbitControls autoRotate={true} enableZoom={false} />
          </Canvas>
        </div>
      </div>
      <div className={`${styles.modelNew} ${styles.modelNewSmallsn} hideDesktop`}>
        <div className={styles?.modelNewWrap}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 58 }}
            className={styles?.modelNeCanvas}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <LogoModel />
            <OrbitControls autoRotate={true} enableZoom={false} />
          </Canvas>
        </div>
      </div>
      <TextAnimate /> */}
      <BehindBanner animateSec={animateSec} banner ={banner}/>
      </div>
      <VideoSection animateVideo={animateVideo}/>
      <LogoSlider label={logoMarquee.heading} />
      <Industry content={content}/>
      <CardStack services={services}/>
      <ShapeZoom revealSec={revealSec}/>
      <Testimonial testimonialSection={testimonialSection} />
      <MapSection post={posts} mapSection={mapSection} />
    </>
  );
}