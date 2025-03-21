"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StackedCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    gsap.to(cards, {
      yPercent: (i) => -100 * i, // Move each card up progressively
      scale: 0.8, // Scale down progressively
      ease: "power2.inOut",
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%", // Controls the length of the pinned effect
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="stacked-section">
      <div
        ref={(el) => (cardsRef.current[0] = el)}
        className="stacked-card card-1"
      >
        <h2>Audio Visuals</h2>
        <p>First Card Content</p>
      </div>
      <div
        ref={(el) => (cardsRef.current[1] = el)}
        className="stacked-card card-2"
      >
        <h2>Packaging</h2>
        <p>Second Card Content</p>
      </div>
      <div
        ref={(el) => (cardsRef.current[2] = el)}
        className="stacked-card card-3"
      >
        <h2>Brand Strategy</h2>
        <p>Third Card Content</p>
      </div>
    </div>
  );
};

export default StackedCards;
