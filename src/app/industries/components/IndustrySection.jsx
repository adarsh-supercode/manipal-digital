'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import * as styles from "../css/industrySection.module.css"
import VideoSection from '@/app/components/VideoSection/VideoSection'
import Link from 'next/link'

const IndustrySection = ({ id, title, subtitle, description, images, videoSrc ,poster, subDescription}) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
  }, [mounted])

  return (
    <section id={id} className={`${styles.sectionWrapper} vertical-padding-lg ${id === 'fashion' ? styles.fashionBackground : ''}`}>
      <div className="container">
        <div className={`${styles.textBlock} `}>
          <h2 className="heading-2 heading-4-sm">{title}</h2>
          <div className={styles.textBlockRight}>
            <h3 className="heading-4 text-1-sm">{subtitle}</h3>
            <p className="text-4">{description}</p>

          </div>
        </div>
      </div>

      <div className={styles.swiperWrapper}>
        {/* Conditionally render video or swiper */}
        {videoSrc ? (
          <>
          <VideoSection videoSrc={videoSrc} poster={poster} />
          <div className='container'>
          <Link href="/fair-use-policy" className="text-7 color-14"> {subDescription} </Link>
          </div>
          </>
          
        ) : (
          <>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides
              loop
              breakpoints={{
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 2.2 },
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                setTimeout(() => {
                  if (prevRef.current && nextRef.current && swiperRef.current.params?.navigation) {
                    swiperRef.current.params.navigation.prevEl = prevRef.current
                    swiperRef.current.params.navigation.nextEl = nextRef.current
                    swiperRef.current.navigation.destroy()
                    swiperRef.current.navigation.init()
                    swiperRef.current.navigation.update()
                  }
                }, 0)
              }}
              modules={[Navigation]}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img className={styles.slideImage} src={img} alt={`${title} ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.arrowContainer}>
              <div ref={prevRef} className={styles.arrowButton}>
                <span className={styles.arrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M7.93294 14.9375L0.94092 7.95397M0.94092 7.95397L7.93294 0.970441M0.94092 7.95397H16.8672" stroke="white" strokeWidth="0.705882" />
                  </svg>
                </span>
              </div>
              <div ref={nextRef} className={styles.arrowButton}>
                <span className={styles.arrow}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M9.44206 14.9375L16.4341 7.95397M16.4341 7.95397L9.44206 0.970441M16.4341 7.95397H0.507812" stroke="white" strokeWidth="0.705882" />
                  </svg>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default IndustrySection