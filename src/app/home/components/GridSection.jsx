"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "../css/gridSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const GridSection = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Adjust the smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out curve
      smooth: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const grid = document.querySelector("[data-grid-fourth-v2]");
    const gridImages = grid.querySelectorAll(`.${styles.grid__img}`);
    const overlay = document.querySelector(`.${styles.overlay}`);

    const calculateInitialTransform = (element, offsetDistance = 250, maxRotation = 300, maxZTranslation = 2000) => {
      const viewportCenter = { width: window.innerWidth / 2, height: window.innerHeight / 2 };
      const elementCenter = {
        x: element.offsetLeft + element.offsetWidth / 2,
        y: element.offsetTop + element.offsetHeight / 2,
      };

      const angle = Math.atan2(Math.abs(viewportCenter.height - elementCenter.y), Math.abs(viewportCenter.width - elementCenter.x));
      const translateX = Math.abs(Math.cos(angle) * offsetDistance);
      const translateY = Math.abs(Math.sin(angle) * offsetDistance);

      const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2));
      const currentDistance = Math.sqrt(Math.pow(viewportCenter.width - elementCenter.x, 2) + Math.pow(viewportCenter.height - elementCenter.y, 2));
      const distanceFactor = currentDistance / maxDistance;

      const rotationX = ((elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor);
      const rotationY = ((elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor);
      const translateZ = maxZTranslation * distanceFactor;

      return {
        x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
        y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
        z: translateZ,
        rotateX: rotationX,
        rotateY: rotationY
      };
    };

    gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: grid,
        start: "top center",
        end: "bottom top",
        pin: grid.parentNode,
        scrub: 0.3,
        toggleActions: "play reverse play reverse",
      },
    })
      .to(overlay, { opacity: 0, duration: 0.02 }, 0)
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
          stagger: { amount: 0.15, from: "center", grid: [5, 5] },
        },
        {
          x: (_, el) => calculateInitialTransform(el, 900).x,
          y: (_, el) => calculateInitialTransform(el, 900).y,
          z: (_, el) => calculateInitialTransform(el, 0, 0, -3000).z,
          rotateX: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateX,
          rotateY: (_, el) => calculateInitialTransform(el, 250, -160, -3000).rotateY,
          autoAlpha: 0,
          scale: 0.4,
        },
        0
      );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.content + " " + styles.contentFull}>
      <div className={styles.overlay}></div>
      <div
        className={styles.grid + " " + styles.gridSmall}
        data-grid-fourth-v2
        style={{ perspective: "1200px" }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.grid__img}
            style={{
              backgroundImage: `url(/assets/thumb-${i + 1}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>

      <div className={styles.bannerContent}>
        <h1 className={`${styles.bannerText} heading-1`}>
          We are a Creative powerhouse for ambitious Brands
        </h1>
      </div>
    </section>
  );
};

export default GridSection;
