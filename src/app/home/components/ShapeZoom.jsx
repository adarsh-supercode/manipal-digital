"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/shapezoom.module.css';

gsap.registerPlugin(ScrollTrigger);


export default function ShapeZoom({revealSec}) {
  const {title , subTitle , revealTitle , revealSub, backgVid} = revealSec || {}
  useEffect(() => {
    if (!document.querySelector(`.${styles.track}`)) return;
  
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.track}`,
          start: 'top top',
          end: '+=200%',
          scrub: 3,
          pin: true,
          // markers:true,
          pinSpacing: true,
        },
      });
  
      tl.set(
        [`.${styles.starOne}`, `.${styles.starTwo}`, `.${styles.starThree}`, `.${styles.starFour}`],
        { rotate: 0 }
      );
  
      tl.to(`.${styles.img}`, { scale: 30, duration: 30, ease: 'expo.inOut' })
        .to(`.${styles.textInner}`, { y: 0, opacity: 1, duration: 1.5 }, ">-=18.7")
        .to(
          [`.${styles.starOne}`, `.${styles.starTwo}`, `.${styles.starThree}`, `.${styles.starFour}`],
          { rotate: 360, duration:5, ease: 'power2.inOut' },
          "<"
        );
    });
  
    return () => ctx.revert(); // Clean up GSAP when unmounting
  }, []);
  
  
  return (
    <div>

      <div className={styles.track}>
        <div className={styles.overlay}>
          <div className={styles.text}>
          <div className={`${styles.textInner} d-flex flex-column`}>
               <div className={`${styles.textInnerContent} d-flex flex-column gap-30 align-items-center`}>
               <h2 className='heading-2 color-1 heading-4-sm'>              
                   <span className={styles.color2}></span>{revealTitle}</h2>
              <p className='text-4 color-1 text-4-sm'>{revealSub}</p>
               </div>
              <div className={styles.starTwo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="61" height="62" viewBox="0 0 61 62" fill="none">
                  <path d="M24.2826 6.10937C24.1693 5.50517 22.8307 5.50518 22.7174 6.10937C20.8275 16.1923 16.2252 20.7899 6.12958 22.6786C5.52519 22.7917 5.52519 24.132 6.12959 24.2451C16.2252 26.1338 20.8274 30.7314 22.7174 40.8143C22.8307 41.4185 24.1693 41.4185 24.2826 40.8143C26.1725 30.7314 30.7748 26.1338 40.8704 24.2451C41.4748 24.132 41.4748 22.7917 40.8704 22.6786C30.7748 20.7899 26.1726 16.1923 24.2826 6.10937Z" fill="url(#paint0_linear_3107_13821)"/>
                  <path d="M47.5361 39.0056C47.3564 38.4177 45.6437 38.4177 45.4639 39.0056C44.259 42.9473 42.0255 45.1794 38.0803 46.3843C37.4923 46.5638 37.4923 48.2797 38.0803 48.4593C42.0255 49.6641 44.2589 51.8963 45.4639 55.838C45.6436 56.4259 47.3563 56.4259 47.5361 55.838C48.741 51.8963 50.9745 49.6641 54.9197 48.4593C55.5077 48.2797 55.5077 46.5639 54.9197 46.3843C50.9745 45.1795 48.7411 42.9473 47.5361 39.0056Z" fill="url(#paint1_linear_3107_13821)"/>
                  <defs>
                    <linearGradient id="paint0_linear_3107_13821" x1="23.5" y1="0" x2="23.5" y2="46.9237" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F05A8C"/>
                      <stop offset="1" stopColor="#2D348C"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_3107_13821" x1="46.5" y1="32.9453" x2="46.5" y2="61.8982" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F05A8C"/>
                      <stop offset="1" stopColor="#2D348C"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className={styles.starFour}>
              <svg xmlns="http://www.w3.org/2000/svg" width="83" height="84" viewBox="0 0 83 84" fill="none">
                <path d="M32.6696 6.43123C32.5774 5.82346 31.3734 5.82346 31.2813 6.43124C28.854 22.4394 22.1693 29.1161 6.13904 31.5414C5.53108 31.6334 5.53107 32.8386 6.13904 32.9306C22.1692 35.3558 28.8539 42.0326 31.2812 58.0408C31.3734 58.6485 32.5774 58.6485 32.6696 58.0408C35.0969 42.0326 41.7816 35.3559 57.8118 32.9306C58.4197 32.8386 58.4197 31.6334 57.8118 31.5414C41.7816 29.1162 35.097 22.4395 32.6696 6.43123Z" fill="url(#paint0_linear_3107_13824)"/>
                <path d="M64.1212 49.8774C63.9903 49.2768 62.5468 49.2768 62.4159 49.8774C60.7862 57.3562 57.1429 60.9963 49.6554 62.6252C49.0546 62.7559 49.0546 64.2015 49.6554 64.3322C57.1429 65.9611 60.7862 69.6012 62.4159 77.0801C62.5468 77.6807 63.9903 77.6807 64.1212 77.0801C65.7509 69.6012 69.3942 65.9612 76.8817 64.3322C77.4825 64.2015 77.4825 62.756 76.8817 62.6252C69.3942 60.9963 65.751 57.3562 64.1212 49.8774Z" fill="url(#paint1_linear_3107_13824)"/>
                <defs>
                  <linearGradient id="paint0_linear_3107_13824" x1="31.9754" y1="0.3125" x2="31.9754" y2="64.1595" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_3107_13824" x1="63.2686" y1="43.7812" x2="63.2686" y2="83.1762" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                  </linearGradient>
                </defs>
              </svg>
              </div>
              <div className={styles.starOne}>
              <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                <path d="M27.0351 0.973033C26.7994 -0.10807 24.2006 -0.108065 23.965 0.973039C21.0324 14.4259 14.4779 20.9746 1.00945 23.9057C-0.0720133 24.1411 -0.0720084 26.7436 1.00946 26.979C14.4778 29.9101 21.0323 36.4588 23.9649 49.9117C24.2006 50.9928 26.7994 50.9928 27.035 49.9117C29.9676 36.4589 36.5221 29.9102 49.9905 26.979C51.072 26.7436 51.072 24.1412 49.9905 23.9058C36.5222 20.9747 29.9677 14.4259 27.0351 0.973033Z" fill="url(#paint0_linear_3107_13828)"/>
                <defs>
                  <linearGradient id="paint0_linear_3107_13828" x1="26" y1="-12.3047" x2="25.5" y2="60.8847" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F05A8C"/>
                    <stop offset="1" stopColor="#2D348C"/>
                  </linearGradient>
                </defs>
              </svg>
              </div>
              <div className={styles.starThree}>
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                <path d="M19.2826 0.929681C19.1693 0.325486 17.8307 0.325488 17.7174 0.929684C15.8275 11.0126 11.2252 15.6102 1.12958 17.4989C0.525187 17.612 0.525192 18.9523 1.12959 19.0654C11.2252 20.9541 15.8274 25.5517 17.7174 35.6346C17.8307 36.2388 19.1693 36.2388 19.2826 35.6346C21.1725 25.5517 25.7748 20.9541 35.8704 19.0654C36.4748 18.9523 36.4748 17.612 35.8704 17.4989C25.7748 15.6103 21.1726 11.0126 19.2826 0.929681Z" fill="url(#paint0_linear_3107_13827)"/>
                <defs>
                  <linearGradient id="paint0_linear_3107_13827" x1="18.5" y1="-5.17969" x2="18.5" y2="41.744" gradientUnits="userSpaceOnUse">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="722" height="686" viewBox="0 0 722 686" fill="none">
                <path d="M4.40164 346.123C210.787 393.307 323.073 566.975 351.642 681.562C352.964 686.864 361.575 687.092 363.1 681.844C416.478 498.233 544.363 391.382 717.178 346.02C722.443 344.638 722.309 336.484 717.005 335.261C493.894 283.837 393.717 108.734 362.877 4.86867C361.263 -0.568811 351.162 -0.252211 349.844 5.26451C318.201 137.654 190.725 290.775 4.35756 334.217C-1.16944 335.505 -1.13078 344.858 4.40164 346.123Z" fill="white"/>
              </svg>
                </div>
              </div>
            </div>
            <video autoPlay muted loop playsInline preload="auto">
              <source src={backgVid.url} type="video/mp4" />
            </video>
            <div className={`${styles.overlayTextContainer} d-flex flex-column gap-20`}>
            <p className='heading-4 color-13 heading-5-md text-1-sm'>{subTitle}</p>
              <h2 className={`${styles.overlayText} heading-5 color-13 heading-2-md heading-2-sm`}>{title}</h2>
          </div>
          </div>
          <div className={styles.gradient}></div>
        </div>
        
      </div>

    </div>
  );
}
