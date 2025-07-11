"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/gridSection.module.css";


gsap.registerPlugin(ScrollTrigger);

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
  const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
  const elementCenter = {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
  };

  const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));
  const translateX = Math.abs(Math.cos(angle) * offsetDistance);
  const translateY = Math.abs(Math.sin(angle) * offsetDistance);

  const maxDistance = Math.sqrt(viewportCenter.width ** 2 + viewportCenter.height ** 2);
  const currentDistance = Math.sqrt((viewportCenter.width - elementCenter.x) ** 2 + (viewportCenter.height - elementCenter.y) ** 2);
  const distanceFactor = currentDistance / maxDistance;

  return {
    x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
    y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
    z: maxZTranslation * distanceFactor,
    rotateX: (elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor,
    rotateY: (elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor,
  };
};

const GridSection = ({banner}) => {

  const {globImg} = banner || {};
  const gridimageSec = useRef();
  const wordIntervalRef = useRef(null);
  const bannerContent = useRef(null);

  useEffect(() => {
    if (!gridimageSec.current) return;

    const grid = document.querySelector(`.${styles.gridSmall}`);
    const gridImages = grid?.querySelectorAll(`.${styles.grid__img}`);
    const overlay = document.querySelector(`.${styles.overlay}`);
    const textElements = document.querySelectorAll(`.${styles.textContainer} p`);
    if (!grid || !gridImages?.length || !overlay) return;

    // Grid animation (always enabled)
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: grid,
        start: "top top",
        end: "bottom+=100% center",
        pin: !isMobile() ? grid : false,
        pinSpacing: !isMobile(),
        scrub: 1,
        anticipatePin: 1,
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(overlay, { opacity: 0, duration: 0.02 }, 0)
      .fromTo(
        gridImages,
        {
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: {
            amount: 0.15,
            from: 'center',
            grid: [4, 9]
          }
        },
        {
          x: (_, el) => calculateInitialTransform(el, 900).x,
          y: (_, el) => calculateInitialTransform(el, 600).y,
          z: (_, el) => calculateInitialTransform(el, _, _, -3000).z, // Z-axis translation
          rotateX: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateX,
          rotateY: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateY,
          autoAlpha: 0,
          scale: 0.4,
          duration: 5.5,
        },
        0.8 
      );


    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
        wordIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <>
    <section className={styles.content + " " + styles.contentFull} ref={gridimageSec}>
      <div className={styles.overlay}></div>
      <div className={styles.gridWrapper}>
        <div
          className={styles.grid + " " + styles.gridSmall}
          data-grid-fourth-v2
          style={{ perspective: "1200px" }}
        >
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className={styles.grid__img}
              style={{
                backgroundImage: `url(/assets/thumb-${i + 1}.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
          {/* {globImg.map((item, i) => (
  <div
    key={i}
    className={styles.grid__img}
    style={{
      backgroundImage: `url(${item.image.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
))} */}

        </div>
      </div>
    </section>
    </>
  );
};

export default GridSection;