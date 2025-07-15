'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from '../css/slider.module.css'

export default function Slider({offer}) {
  console.log('what_offer: ', offer);
  const {title , heading, bgVid ,slider } = offer || {}
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  // Swiper instance hack to register custom nav refs properly
  const swiperRef = useRef(null)
  const [playingIndex, setPlayingIndex] = useState(null)
  const audioRefs = useRef([]);
  const [isRightHovered, setIsRightHovered] = useState(false);

const handlePlayAudio = (index) => {
  const swiper = swiperRef.current;

  if (playingIndex === index) {
    audioRefs.current[index].pause();
    setPlayingIndex(null);

    // Resume Swiper autoplay when audio stops
    swiper?.autoplay?.start();
  } else {
    audioRefs.current.forEach((audio, i) => {
      if (audio) {
        if (i === index) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
    setPlayingIndex(index);

    // Stop Swiper autoplay when audio plays
    swiper?.autoplay?.stop();
  }
};

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [])

  return (
    <>
    <div className={`${styles.sliderContainer} vertical-padding-sm`}>
      <video
        src={bgVid.url}
        type="video/mp4"
        preload="auto"
        playsInline
        autoPlay
        muted
        loop
        className={styles.backgroundVideo}
      ></video>

      <div className={styles.videoOverlay} />
      <div className={styles.sliderHeaderContent}>
        <p className='color-13 text-6 text-6-md text-5-sm uppercase'>{title}</p>
        <h3 className='color-13 heading-3 heading-4-md heading-4-sm'>{heading}</h3>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className={styles.swiperWrapper}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.9,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
        }}
      >
        {slider.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideContent}
                onClick={() => handlePlayAudio(index)}
                >
              <img
                src={slide.image.url}
                alt={slide.heading}
                className={styles.slideImage}
              />
            {/* Play/Pause Overlay */}
            {slide.audio && (
              <div className={styles.playPauseButton}>
                {playingIndex === index ? (
                  <img src="/assets/pause.svg" alt="Pause"/>
                ) : (
                  <img src="/assets/play.svg" alt="Play"/>
                )}
              </div>
            )}
              <div className={styles.slideTextContainer}>
                <h2 className={`${styles.slideHeading} heading-4 heading-5-md heading-4-sm color-13`}>
                  {slide.heading}
                </h2>
                <p className={`${styles.slideText} text-4 text-4-md text-4-sm color-13`}>
                  {slide.description}
                </p>
              </div>
              {/* Hidden audio element */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={slide.audio.url}
              preload="auto"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
            {/* Custom Navigation Arrows */}
              <div className={styles.arrowContainer}>
                <div ref={prevRef} className={`${styles.arrowButton} ${styles.arrowLeft}  ${isRightHovered ? styles.shiftLeft : ''}`}>
                  <span className={styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                      <path d="M7.93 14.94L0.94 7.95M0.94 7.95L7.93 0.97M0.94 7.95H16.87" stroke="white" strokeWidth="0.71" />
                    </svg>
                  </span>
                </div>
                <div ref={nextRef} className={`${styles.arrowButton} ${styles.arrowRight} 
                d-flex justify-content-end`}
                    onMouseEnter={() => setIsRightHovered(true)}
    onMouseLeave={() => setIsRightHovered(false)}>
                  <span className={styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                      <path d="M9.44 14.94L16.43 7.95M16.43 7.95L9.44 0.97M16.43 7.95H0.51" stroke="white" strokeWidth="0.71" />
                    </svg>
                  </span>
                </div>
              </div>
              {/* <div className={styles.arrowContainer}>
                <div className={styles.arrowWrapper}>
                  <div ref={prevRef} className={`${styles.arrowButton} ${styles.arrowLeft}`}>
                    <span className={styles.arrow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                          <path d="M7.93 14.94L0.94 7.95M0.94 7.95L7.93 0.97M0.94 7.95H16.87" stroke="white" strokeWidth="0.71" />
                        </svg>
                      </span>
                  </div>
                  <div ref={nextRef} className={`${styles.arrowButton} ${styles.arrowRight}`}>
                    <span className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                        <path d="M9.44 14.94L16.43 7.95M16.43 7.95L9.44 0.97M16.43 7.95H0.51" stroke="white" strokeWidth="0.71" />
                      </svg>
                    </span>   
                    </div>
                </div>
              </div> */}

              </>
  )
}
