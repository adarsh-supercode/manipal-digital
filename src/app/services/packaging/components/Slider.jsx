'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from '../css/swiper.module.css'
import Image from 'next/image'

export default function Slider({services}) {
  const { heading, subHead, sliderImages } = services || {}
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    if (
      mounted &&
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params?.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current
      swiperRef.current.params.navigation.nextEl = nextRef.current

      swiperRef.current.navigation.destroy()
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [mounted, isMobile])

  // Add mobile touch pause handlers
  const handleTouchStart = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop()
    }
  }

  const handleTouchEnd = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start()
    }
  }

  return (
    <div>
      <div className={styles.videoContainer}>
        <video autoPlay muted loop playsInline preload="auto">
          <source
            src="https://staging.supercode.in/testing1/background-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.sliderWrapper}>
          <div className="container">
            <div className={`${styles.swiperContent}`}>
              <div className="d-flex gap-10 flex-column padding-bottom-lg">
                <p className="text-6 color-4 text-6-md uppercase">{heading}</p>
                <h2 className="heading-3 color-4 heading-4-md heading-4-sm">
                  {subHead}
                </h2>
              </div>

              {mounted && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  centeredSlides={false}
                  loop={true}
                  speed={600}
                  autoplay={{
                    delay: isMobile ? 2000 : 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 8 },
                    480: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 2.2, spaceBetween: 12 },
                    991: { slidesPerView: 2.5, spaceBetween: 20 },
                    1024: { slidesPerView: 3.4, spaceBetween: 20 },
                    1280: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                    setTimeout(() => {
                      if (
                        prevRef.current &&
                        nextRef.current &&
                        swiperRef.current &&
                        swiperRef.current.params.navigation
                      ) {
                        swiperRef.current.params.navigation.prevEl = prevRef.current
                        swiperRef.current.params.navigation.nextEl = nextRef.current
                        swiperRef.current.navigation.destroy()
                        swiperRef.current.navigation.init()
                        swiperRef.current.navigation.update()
                      }
                    }, 0)
                  }}
                  onSlideChange={(swiper) => {
                    if (isMobile) {
                      const allSlides = document.querySelectorAll(`.${styles.slider} .swiper-slide`)
                      allSlides.forEach((slide) => {
                        slide.classList.remove(styles.flipped)
                      })
                  
                      const activeSlide = swiper.slides[swiper.activeIndex]
                      if (activeSlide) {
                        setTimeout(() => {
                          activeSlide.classList.add(styles.flipped)
                        }, 1500) 
                      }
                    }
                  }}
                  className={`${styles.slider}`}
                  data-cursor="dragButton"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {sliderImages.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                          <div className={styles.flipCardFront}>
                            <Image
                              src={slide.image.url}
                              alt={slide.alt}
                              width={340}
                              height={430}
                              className={styles.slideImage}
                            />
                            <p className={styles.swiperHeading}>{slide.text}</p>
                          </div>
                          <div className={styles.flipCardBack}>
                            <div className={styles.flipCardBackOverlay}></div>
                            <Image
                              src={slide.image}
                              alt={slide.alt}
                              width={340}
                              height={430}
                              className={styles.slideImage}
                            />
                            <p className={styles.flipText}>{slide.description}</p>
                          </div>
                        </div>
                        <div className={styles.blackOverlay}>
                          <p className="text-1 text-1-sm">{slide.name}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Custom Navigation Arrows */}
              <div className={styles.arrowContainer}>
                <div ref={prevRef} className={`${styles.arrowButton} ${styles.arrowLeft}`}>
                  <span className={styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                      <path d="M7.93 14.94L0.94 7.95M0.94 7.95L7.93 0.97M0.94 7.95H16.87" stroke="white" strokeWidth="0.71" />
                    </svg>
                  </span>
                </div>
                <div ref={nextRef} className={`${styles.arrowButton} ${styles.arrowRight} d-flex justify-content-end`}>
                  <span className={styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none">
                      <path d="M9.44 14.94L16.43 7.95M16.43 7.95L9.44 0.97M16.43 7.95H0.51" stroke="white" strokeWidth="0.71" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}