"use client";
import React from 'react';
import Marquee from 'react-fast-marquee';
import styles from '../Components.module.css'

export default function LogoSlider() {
  return (
    <div className={`${styles.marqueeSlider} padding-top-sm padding-bottom-xl`} >

        <div className={`${styles.lineBeforeAfter} text-1`}>Our trusted clients</div>
      <div className={`${styles.logoSliderWrapper}`}>

      </div>
      <Marquee speed={100} gradient={false} loop={0}  >
        <img src="/assets/netflix.jpg" alt="1"  style={{ margin: '0 40px'}}  />
        <img src="/assets/sbi.jpg" alt="2"  style={{ margin: '0 40px'}} />
        <img src="/assets/uspa.jpg" alt="3"  style={{ margin: '0 40px'}} />
        <img src="/assets/itc.jpg" alt="4" style={{ margin: '0 40px'}}  />
        <img src="/assets/myntra.jpg" alt="5"  style={{ margin: '0 40px'}} />
      </Marquee>
    </div>
  );
}
