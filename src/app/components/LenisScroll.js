// app/components/LenisScroll.js
'use client';  // This marks it as a client-side component

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Adjust the smoothness
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []); // Runs only once on mount

  return null; // This component does not render anything to the DOM
};

export default LenisScroll;
