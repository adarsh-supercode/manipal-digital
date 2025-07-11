'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimationManager = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
      gsap.globalTimeline.clear(); 
    };
  }, []);  

  useEffect(() => {
    window.scrollTo(0, 0);
    const triggers = ScrollTrigger.getAll();

    triggers.forEach(trigger => {
      trigger.refresh();
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [pathname]);

  return <>
      <div className={pathname} key={pathname}>
        {children}
        </div>
        </>;
};

export default AnimationManager;
