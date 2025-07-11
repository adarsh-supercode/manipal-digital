'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let lenis;
    let rafId;

    const init = () => {
      lenis = new Lenis({
        lerp: 0.08,
        duration: 1.5,
        smoothTouch: false,
        wheelMultiplier: 0.6,
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? 'transform' : 'fixed',
      });

      ScrollTrigger.refresh();
    };

    // Run after next frame
    requestAnimationFrame(init);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [pathname]);

  return <>{children}</>;
}
