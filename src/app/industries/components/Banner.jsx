import React, { useState, useEffect } from 'react';
import * as styles from "../css/banner.module.css";
import Link from 'next/link';

export default function Banner({banner}) {
const { heading, description ,bgVid, poster} = banner || {};
  const [videoSrc, setVideoSrc] = useState('/assets/Indus-banner.webm');

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setVideoSrc(isMobile ? '/assets/industry-mb.webm' : '/assets/Indus-banner.webm');
    };

    handleResize(); // Set initial video on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles?.industriesBannerSection}>
      <video
        src={bgVid.link}
        preload="auto"
        poster={poster.url}
        playsInline
        autoPlay
        muted
        loop
      ></video>

      <div className={styles?.contentWrap}>
        <div className='container'>
          <div className={`${styles?.bannerContentWrap}`}>
            <h1 className='heading-5 heading-1-md heading-1-sm'>
             {heading}
            </h1>
            <p className={`${styles?.bannerText} text-4 text-4-md text-3-sm`}>
            {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}