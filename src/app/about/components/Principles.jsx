"use client";
import GsapSwiper from '@/app/components/Sliders/GsapSwiper';
import React from 'react'
import * as styles from "../css/principle.module.css"
import { useMediaQuery } from "usehooks-ts";
import Slider from '@/app/components/Sliders/Slider';


export default function Principles({legacyBuilt}) {
  const { title , slider,bgVid} = legacyBuilt || {};
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
   <div>
     <div className={styles?.leadersPrincipleSection}>
      {/* <video src="/assets/leadership-principle-bg.webm" autoPlay muted loop playsinline className={styles?.leadersPrinciplebgVideo}></video> */}
     <div className={styles?.leadersPrincipleContent}>
      {isDesktop ? (
        <GsapSwiper title={title} subtitle="Adapt, Evolve, Lead Forward" bgVideo={bgVid.url} slides={slider} />
      ) : (
        <Slider title={title} subtitle="Adapt, Evolve, Lead Forward" bgVideo={bgVid.url} slides={slider} />
      )}
        {/* <AnimatedSlider/> */}
     </div>
    </div>
   </div>
  )
}