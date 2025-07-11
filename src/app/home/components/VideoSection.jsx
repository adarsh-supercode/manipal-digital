'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/videosection.module.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { handleVideoClick } from '@/utilities/utils';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = ({animateVideo}) => {
  const {heading, subText, video, poster} = animateVideo || {}
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Combine refs
  const setRefs = (el) => {
    containerRef.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const video = videoRef.current;
    video.play().catch((error) => console.error('Error playing video:', error));

    // GSAP ScrollTrigger animation context
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          width: '400px', 
          scale: 0.8,
          transformOrigin: "center center",
        },
        {
          width: '100%', 
          scale: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            // markers: true, // enable for debugging
          },
        }
      );
    }, containerRef);

    // Clean up GSAP context on unmount
    return () => ctx.revert();
  }, []);

  // Play/pause logic based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div onClick={() => handleVideoClick(videoRef, isMuted, setIsMuted)}>
      <div ref={setRefs} className={styles.videoContainer} data-cursor="audioButton">
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          poster={poster.url}
          className={styles.video}
        >
          <source src={video.url} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.videoOverlayText}>
          <div className='d-flex gap-30 align-items-center'>
            <Image
              src="/assets/play-button.svg"
              width={60}
              height={60}
              alt='Play Button'
            />
            <div>
              <h2 className='heading-3 color-4 text-5-sm'>{heading}</h2>
              <p className={`${styles.overlaySubtext} text-1 color-4 text-5-sm`}>
               {subText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;