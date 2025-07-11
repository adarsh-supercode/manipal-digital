'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './videosection.module.css'
import { useInView } from 'react-intersection-observer'
import { usePathname } from 'next/navigation'
import { handleVideoClick } from '@/utilities/utils'

const VideoSection = ({ videoSrc, poster = '' }) => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const pathname = usePathname()
  const isAudio = pathname === '/services/audiovisual'

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  // Combine refs for GSAP and InView
  const setRefs = (el) => {
    containerRef.current = el
    inViewRef(el)
  }

  // ✅ Sync video muted state if isAudio is true
  useEffect(() => {
    if (isAudio && videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }, [isAudio])

  // ✅ GSAP scroll animation
  useEffect(() => {
    if (!containerRef.current) return

    animationRef.current = gsap.fromTo(
      containerRef.current,
      { scale: 0.7 },
      {
        scale: 0.9,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 3,
          once: false,
        },
      }
    )

    return () => {
      animationRef.current?.kill()
    }
  }, [])

  // ✅ Play/pause on inView
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (inView) {
      video.play().catch(() => {}) // Autoplay fallback
    } else {
      video.pause()
    }
  }, [inView])

  // ✅ Click handler: force mute if isAudio
  const handleVideoWrapClick = () => {
    const video = videoRef.current
    if (!video) return

    const shouldBeMuted = isAudio ? true : !isMuted
    video.muted = shouldBeMuted
    setIsMuted(shouldBeMuted)
    video.play().catch(() => {})
  }

  return (
    <div className={styles?.videoWrap} onClick={handleVideoWrapClick}>
      <div className={`${styles?.videoSection} container`}>
        <div ref={setRefs} className={styles.videoContainer}>
          <video
            data-cursor="audioButton"
            ref={videoRef}
            src={videoSrc}
            loop
            muted={isAudio ? true : isMuted}
            playsInline
            poster={poster}
            className={styles.video}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default VideoSection
