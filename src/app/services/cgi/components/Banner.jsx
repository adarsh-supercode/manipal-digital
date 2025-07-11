"use client"
import React, { useEffect } from 'react';
import styles from '../css/banner.module.css';

// Mobile detection using user agent string
// const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//   typeof navigator !== 'undefined' ? navigator.userAgent : ''
// );


export default function Banner({banner}) {
  const {heading, bgVid, poster} = banner || {};

  // useEffect(() => {
  //   if (isMobileDevice) return; // Skip Three.js on mobile
  // });

  return (
    // <div>
    //   <div className="container">
    //     <h1 className={`${styles.bannerText} heading-1 heading-1-md heading-2-sm color-13`}>CGI</h1>
    //   </div>
    //   <Experience />
    // </div>
    <section className={styles.cgiBanner}>
       {/* {isMobileDevice ? ( */}
              <div className={styles?.videoWrap} style={{ height: '100vh' }}>
                <video
                  src={bgVid.url}
                  autoPlay
                  muted
                  loop
                  poster={poster.url}
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            {/* ) : (
              <video
              src="/assets/cgi-banner-v2.webm"
              type="video/mp4"
              preload="auto"
              poster="/assets/cgi-animation.webp"
              playsInline
              autoPlay
              muted
              loop
          ></video>
            )}
    */}
    <div className="container">
        <div className={styles.bannerTextWrap}>
            <h1 className="heading-1 heading-1-md">CGI</h1>
        </div>
    </div>
</section>
  );
}
