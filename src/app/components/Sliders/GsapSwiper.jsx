"use client";
import React, { useEffect, useRef } from "react";
import * as styles from "../Components.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function GsapSwiper({ slides, title, subtitle, bgVideo }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const slideElements = gsap.utils.toArray(`.${styles.sliderContent}`);
        const slideCount = slideElements.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${styles.leadersPrincipleSection}`,
            start: "top top",
            // end: `${slideCount * 800}px`,
            end: () => `+=${window.innerHeight * slideCount * 1.5}`,
            scrub: true,
            pin: true,
            // markers: true,
            pinSpacing: true,
            snap: {
              snapTo: gsap.utils.snap(
                Array.from({ length: slideCount }, (_, i) => i / (slideCount - 1))
              ),
              duration: 2,
              ease: "power2.inOut",
            },
          },
        });
    
        // Animate title and subtitle
        tl.fromTo(
          [`.${styles.sliderHeading}`],
          { x: 6000 },
          { x: 0, opacity: 1, duration: 3, ease: "power2.out" }
        );
    
        slideElements.forEach((slide, index) => {
          const image = slide.querySelector(`.${styles.sliderImage}`);
          const imageWrap = slide.querySelector(`.${styles.sliderImageWrap}`);
          const contentWrap = slide.querySelector(`.${styles.sliderContentWrap}`);
          const contentHeadingWrap = slide.querySelector(`.${styles.sliderContentHeading}`);
        
          if (image && contentWrap) {
            if (index === 0) {
              // Show first slide without animation
              gsap.set(image, { x: "0%" });
              gsap.set(imageWrap, { x: "0%" });
              gsap.set(contentWrap, { opacity: 1, x: 0 });
              gsap.set(contentHeadingWrap, { opacity: 1, x: 0 });
              tl.to(contentWrap, { opacity: 0,});
              tl.to(contentHeadingWrap, { opacity: 0, });
            } else {
              // Animate rest of the slides in
              gsap.set(image, { x: "1000" });
              tl.fromTo(image, { x: "1000" }, { x: "0%", duration: 2, ease: "power2.out" }, "<");
        
              if (index === 1) {
                // When 2nd card comes, animate 1st out
                tl.to(slideElements[0].querySelector(`.${styles.sliderContentWrap}`), {
                  display: "none", duration: 3,
                }, "<");
        
                tl.to(slideElements[0].querySelector(`.${styles.sliderContentHeading}`), {
                  opacity: 0, x: -4000, duration: 2,
                }, "<");
              }

              tl.fromTo(contentWrap, { opacity: 0, x: 500 }, { opacity: 1, x: 0, duration: 3 }, "<");
              tl.fromTo(contentHeadingWrap, { opacity: 0, x: 1000 }, { opacity: 1, x: 0, duration: 3 }, "<");
        
              // Exit animation for all except the last
              if (index < slideElements.length - 1) {
                tl.to(contentWrap, { display: "none", duration: 3 });
                tl.to(contentHeadingWrap, { opacity: 0, duration: 3, x: -4000 });
              }
            }
          }
        });        
        return () => {
          window.scrollTo(0, 0); 
          ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
          gsap.globalTimeline.clear(); 
        };
      }, []);
    
      
      useEffect(() => {
        setTimeout(() => {
          ScrollTrigger.refresh(); 
        }, 500);
      }, []);

    return (
      <section className={`${styles?.leadersPrincipleSection}`} ref={sectionRef}>
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className={styles?.leadersPrinciplebgVideo}
      ></video>
      <div className="container">
        <div className={styles?.titleWrap}>
        <p className="text-6 opacity-06 uppercase">{title}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.sliderWrap}>
        <div className={styles?.mainContentwrap}>
          {slides.map((slide, index) => (
          <div className={styles.sliderContent} key={index}>
            <div className={styles?.sliderContentHeading}>
            <h2 className="heading-3 heading-4-md heading-4-sm">{slide.heading}</h2>
            </div>
            <div className={styles?.sliderMainContent}>
            {slide.image && (
              <div className={styles.sliderImageWrap}>
              <Image
                src={slide.image.url}
                alt={`Slider Image ${index + 1}`}
                width={525}
                height={428}
                className={styles.sliderImage}
              />
               </div>
              )}
              {slide.video && (
              <div className={styles.sliderImageWrap}>
              <video
                src={slide.video.url}
                autoPlay
                muted
                loop
                playsInline
                className={styles.sliderImage}
                width={525}
                height={428}
              ></video>
             </div>
              )}
            
            <div className={styles.sliderContentWrap}>
              <h4 className="heading-4 heading-4-md text-1-sm">{slide.description}</h4>
            </div>
            </div>    
          </div>
          ))}
        </div>
        </div>
      </div>
      </section>
    );
}
