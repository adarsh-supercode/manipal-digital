"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "../components/Components.module.css"; 

export default function AnimatedSlider() {
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const slides = gsap.utils.toArray(`.${styles.sliderContent}`);
  const mainContent = document.querySelector(`.${styles.mainContentwrap}`);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `.${styles.sliderWrap}`,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinSpacing: true,
    },
  });

  // Move sliderHeading and mainContentwrap together
  tl.fromTo(
    [`.${styles.sliderHeading}`, ],
    { x: 1000 },
    { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }
  );

  slides.forEach((slide, index) => {
    const image = slide.querySelector(`.${styles.sliderImage}`);
    const contentWrap = slide.querySelector(`.${styles.sliderContentWrap}`);

    if (image && contentWrap) {
      gsap.set(image, { x: "100%" });

      tl.fromTo(
        image,
        { x: "100%" },
        { x: "0%", duration: 2, ease: "power2.out" },
        "<"
      );

      tl.add(
        gsap.fromTo(
          contentWrap,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1 }
        ),
        "<"
      );

      if (index < slides.length - 1) {
        tl.add(gsap.to(contentWrap, { opacity: 0, duration: 0.5 }));
      }
    }
  });
}, []);


  return (
    <div className="container vertical-padding-xl">
 <div className={`${styles.sliderWrap}`}>
      <div className={styles.sliderHeading}>
        <h2 className="heading-3">Adapt, Evolve, Lead Forward</h2>
      </div>

      <div  className={styles?.mainContentwrap}>
          {/* First Slide */}
          <div className={styles.sliderContent}>
            <div className={styles.sliderImageWrap}>
              <Image
                src="/assets/principleImg1.jpg"
                alt="Slider Image"
                width={525}
                height={428}
                className={styles.sliderImage}
              />
            </div>
            <div className={styles.sliderContentWrap}>
              <h4>
                Strong leadership fosters trust, empowering teams to take ownership, embrace challenges, and excel in their roles.
              </h4>
            </div>
          </div>

          {/* Second Slide */}
          <div className={styles.sliderContent}>
            <div className={styles.sliderImageWrap}>
              <Image
                src="/assets/morphGraphic.jpg"
                alt="Slider Image"
                width={525}
                height={428}
                className={styles.sliderImage}
              />
            </div>
            <div className={styles.sliderContentWrap}>
              <h4>
                Strong leadership fosters trust, empowering teams to take ownership, embrace challenges, and excel in their roles.
              </h4>
            </div>
          </div>

          {/* Third Slide */}
          <div className={styles.sliderContent}>
            <div className={styles.sliderImageWrap}>
              <Image
                src="/assets/principleImg1.jpg"
                alt="Slider Image"
                width={525}
                height={428}
                className={styles.sliderImage}
              />
            </div>
            <div className={styles.sliderContentWrap}>
              <h4>
                Strong leadership fosters trust
              </h4>
            </div>
          </div>
        </div>
    </div>
    </div>
   
  );
}
