import GsapSwiper from '@/app/components/Sliders/GsapSwiper';
import React from 'react'
import * as styles from "../css/principle.module.css"
export default function Principles() {
    const homeSlides = [
        { img: "/assets/principleImg1.jpg", text: "Strong leadership fosters trust, empowering teams to take ownership, embrace challenges, and excel in their roles." },
        { img: "/assets/morphGraphic.jpg", text: "Strong leadership fosters trust, empowering teams to take embrace challenges, and excel in their roles." },
        { img: "/assets/principleImg1.jpg", text: "Strong leadership fosters trust, empowering teams to take ownership and excel in their roles." }
    ];
  return (
   <div>
     <div className={styles?.leadersPrincipleSection}>
      {/* <video src="/assets/leadership-principle-bg.webm" autoPlay muted loop playsinline className={styles?.leadersPrinciplebgVideo}></video> */}
     <div className={styles?.leadersPrincipleContent}>
     <GsapSwiper
            title="LEADERSHIP PRINCIPLES"
            subtitle="Adapt, Evolve, Lead Forward"
            bgVideo="/assets/leadership-principle-bg.webm"
            slides={homeSlides}
        />
     </div>
    </div>
   </div>
  )
}