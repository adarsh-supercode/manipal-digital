"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"; 
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useFrame, Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { GlassModel } from "@/app/components/Models/GlassModel";
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts'; 
import { useInView } from 'react-intersection-observer';
import "swiper/css";
import "swiper/css/pagination";
import * as styles from "../css/whatoffers.module.css";

gsap.registerPlugin(ScrollTrigger);

// auto-rotate the model on mobile
function RotatingGroup({ isMobile, modelRef, children }) {
  useFrame((state, delta) => {
    if (isMobile && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; 
    }
  });

  return (
    <group ref={modelRef} rotation={[0, Math.PI, 0]}>
      {children}
    </group>
  );
}

export default function WhatWeOffer({services}) {
  const { bgVid, heading, subHead, sliderImages } = services || {};
  const sectionRef = useRef(null);
  const modelRef = useRef();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { ref: canvasRef, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (isMobile) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 

      return;
    }

    const section = sectionRef.current;
    const swiperEl = section?.querySelector(".swiper");
    if (!section || !swiperEl) return;

    let swiperInstance = null;
    let scrollTriggerInstance = null;
    let rotationTween = null;
    let previousSlideIndex = 0;
    const baseYRotation = Math.PI;
    const totalSlides = sliderImages.length - 1;

    const setup = () => {
      swiperInstance = swiperEl.swiper;

      if (!swiperInstance) {
        console.warn("Swiper not ready yet!");
        return;
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + swiperEl.scrollHeight * 3,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (!modelRef.current) return;

          const progress = self.progress;
          const currentSlideIndex = Math.round(progress * totalSlides);

          if (swiperInstance.activeIndex !== currentSlideIndex) {
            swiperInstance.slideTo(currentSlideIndex);
          }

          if (currentSlideIndex !== previousSlideIndex) {
            rotationTween?.kill();
            rotationTween = gsap.to(modelRef.current.rotation, {
              y: baseYRotation + (Math.PI * 2 * currentSlideIndex),
              duration: 1,
              ease: "power2.out",
            });
            previousSlideIndex = currentSlideIndex;
          }
        },
      });

      ScrollTrigger.refresh();
    };

    if (swiperEl.swiper) {
      setup();
    } else {
      swiperEl.addEventListener("swiper", setup, { once: true });
    }

    return () => {
      scrollTriggerInstance?.kill();
      rotationTween?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname, isMobile]);

  return (
    <div ref={sectionRef} key={pathname} data-cursor="whiteCursor">
      <section className={styles.whatWeOfferWrap}>
        <video
          className={styles.backgroundVideo}
          src={bgVid?.url}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.verticalSliderTitle}>
          <div className="container">
            <div className={styles.titleWrap}>
              <p className="text-5-md uppercase text-6-md text-5-sm">{heading}</p>
              <p className={`${styles.titleWrapContent} heading-3 heading-4-md heading-4-sm`}>
                {subHead}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.WhatweOfferCntWrap}>
        <div className={styles.solutionsModel} ref={canvasRef}>
          <Canvas
            camera={{ fov: 55 }}
            frameloop={inView ? "always" : "never"}
            className={`${styles.solutionsModelCanvas} ${isMobile ? styles.disablePointer : ""}`}
          >
            <RotatingGroup isMobile={isMobile} modelRef={modelRef}>
              <Center>
                <GlassModel />
              </Center>
            </RotatingGroup>
            <Environment files="/assets/reflection.jpg" />
            {!isMobile && <OrbitControls enableZoom={false} enableRotate={false} />}
          </Canvas>
        </div>
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={1}
          spaceBetween={isMobile ? 20 : 0}
          allowTouchMove={true}
          pagination={isMobile ? false : { clickable: true }} 
          navigation={isMobile ? { nextEl: '.swiper-next', prevEl: '.swiper-prev' } : false} 
          modules={[Pagination, Navigation]} 
          className={`${styles.swiper} ${styles.swiperWrapper}`}
        >
            {sliderImages.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={styles.solutionCardContent}>
                  <p className="heading-4 heading-5-md text-1-sm">{slide.name}</p>
                  <p className={`${styles.solutionCardDesc} text-4 text-4-md text-2-sm`}>{slide.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {isMobile && (
          <div className={styles.swiperArrows}>
            <div className="swiper-prev">
                <img src="/assets/leftArrow.svg" alt="left arrow" />
            </div>
            <div className="swiper-next">
            <img src="/assets/right-arrow.svg" alt="right arrow" />
            </div>
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
