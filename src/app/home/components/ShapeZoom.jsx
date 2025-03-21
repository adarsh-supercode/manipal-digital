// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import styles from '../css/shapezoom.module.css';

// gsap.registerPlugin(ScrollTrigger);

// const ShapeZoom = () => {

//   useEffect(() => {

//     gsap.to(`.${styles.img}`, {
//       scale: 30,
//       rotate: 0,
//       ease: 'expo.inOut',
//       scrollTrigger: {
//         trigger: `.${styles.track}`,
//         start: 'top top',
//         end: 'bottom top',
//         pin: true,
//         pinSpacing: true,
//         scrub: true,
//         markers:true,
//       },
//     });

//     gsap.to(`.${styles.textInner}`, {
//       y: 100,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: `.${styles.track}`,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <>
//      <div className={styles.track1}>
//      <div className={styles.track}>
//         <div className={styles.overlay}>
//           <div className={styles.text}>
//             <div className={styles.textInner}>
//               AI-Powered efficiency.<br />
//               Exponentially and responsibly.
//             </div>
//           </div>
//           <div className={styles.shape}>
//             <div className={styles.scale}>
//                 <div className={styles.img}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="617"
//                     height="615"
//                     viewBox="0 0 617 615"
//                     fill="none"
//                   >
//                     <path
//                       d="M308.5 0C290.745 218.264 218.973 289.802 0 307.5C218.973 325.197 290.744 396.737 308.5 615C326.255 396.737 398.027 325.198 617 307.5C398.027 289.803 326.256 218.264 308.5 0Z"
//                       fill="white"
//                     />
//                   </svg>
//                 </div>
//             </div>
//             <div className={styles.videoContainer}>
//             <video autoPlay muted loop preload="auto">
//                 <source
//                     src="https://staging.supercode.in/testing1/background-video.mp4"
//                     type="video/mp4"
//                 />
//                 </video>
//             </div>
//           </div>
//           <div className={styles.gradient}></div>
//         </div>
//       </div>
//      </div>
//     </>
//   );
// };

// export default ShapeZoom;

"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/shapezoom.module.css';

gsap.registerPlugin(ScrollTrigger);


export default function ShapeZoom() {
  useEffect(() => {
    // GSAP and ScrollTrigger code



    // Shape scaling and rotation
    gsap.to(`.${styles.img}`, {
      scale: 30,
      rotate: 0,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: `.${styles.track}`,
        start: 'top -=10%',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Text translation
    gsap.to(`.${styles.textInner}`, {
      y: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger:`.${styles.track}`,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div>

      <div className={styles.track}>
        <div className={styles.overlay}>
          <div className={styles.text}>
          <div className={`${styles.textInner} d-flex flex-column gap-40`}>
                <h2 className='heading-2'>              
                   <span className={styles.color2}> AI-Powered </span>efficiency.
                    <br />
                    Exponentially and responsibly.</h2>
              <p className='heading-7 color-1'>Our team works hand in hand, harnessing AI and the latest technologies to breathe life into your boldest visions, creating digital experiences that captivate audiences and deliver larger impact.</p>
              <div className={styles.starTwo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="61" height="62" viewBox="0 0 61 62" fill="none">
                <path d="M23.5 0.9375C22.1475 17.5907 16.6803 23.049 0 24.3994C16.6803 25.7496 22.1474 31.208 23.5 47.8612C24.8525 31.208 30.3197 25.7497 47 24.3994C30.3197 23.0491 24.8526 17.5907 23.5 0.9375Z" fill="url(#paint0_linear_1547_5229)"/>
                <path d="M46.5 32.8828C45.6655 43.1582 42.2921 46.5261 32 47.3593C42.2921 48.1924 45.6654 51.5603 46.5 61.8357C47.3345 51.5603 50.7079 48.1925 61 47.3593C50.7079 46.5261 47.3346 43.1582 46.5 32.8828Z" fill="url(#paint1_linear_1547_5229)"/>
                <defs>
                    <linearGradient id="paint0_linear_1547_5229" x1="23.5" y1="0.9375" x2="23.5" y2="47.8612" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1547_5229" x1="46.5" y1="32.8828" x2="46.5" y2="61.8357" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                    </linearGradient>
                </defs>
                </svg>
              </div>
              <div className={styles.starOne}>
              <svg xmlns="http://www.w3.org/2000/svg" width="71" height="72" viewBox="0 0 71 72" fill="none">
                <path d="M35.5 0.304688C33.4569 25.4617 25.1979 33.7072 0 35.7471C25.1979 37.7868 33.4568 46.0324 35.5 71.1894C37.5431 46.0324 45.8021 37.787 71 35.7471C45.8021 33.7073 37.5432 25.4617 35.5 0.304688Z" fill="url(#paint0_linear_1547_5236)"/>
                <defs>
                    <linearGradient id="paint0_linear_1547_5236" x1="36" y1="-2" x2="35.5" y2="71.1894" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                    </linearGradient>
                </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.shape}>
            <div className={styles.scale}>
              <div className={styles.rotate}>
                <div className={styles.img}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="617" height="615" viewBox="0 0 617 615" fill="none">
                    <path d="M308.5 0C290.745 218.264 218.973 289.802 0 307.5C218.973 325.197 290.744 396.737 308.5 615C326.255 396.737 398.027 325.198 617 307.5C398.027 289.803 326.256 218.264 308.5 0Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
          <div className={styles.gradient}></div>
        </div>
        {/* <video autoPlay muted loop preload="auto">
              <source src="https://staging.supercode.in/testing1/background-video.mp4" type="video/mp4" />
            </video> */}
      </div>

    </div>
  );
}
