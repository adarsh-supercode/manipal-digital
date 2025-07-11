'use client'
import React from 'react'
import styles from '../css/testimonial.module.css'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Testimonial({testimonialSection}) {
  return (
    <div className="container ">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        className={styles?.testimonialSlider}
      >
        {testimonialSection.map((item, index) => (
          <SwiperSlide key={index}>
             <div className={styles.quotation}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="201" height="157" viewBox="0 0 201 157" fill="none">
                        <g opacity="0.3">
                            <path d="M90.0387 84.2439H42.9994C39.257 58.7155 64.6837 39.5691 86.224 19.1463L62.0694 0C21.4563 24.252 -0.501953 56 1.04541 99.561V157H90.0387V84.2439Z" fill="#F05A8C"/>
                            <path d="M200.039 84.2439H152.999C149.257 58.7155 174.684 39.5691 196.224 19.1463L172.069 0C131.456 24.252 109.498 56 111.045 99.561V157H200.039V84.2439Z" fill="#F05A8C"/>
                        </g>
                        </svg>
                    </div>
            <div className={`${styles.testimonialContent} padding-top-xl padding-bottom-xl`}>
                <div>
                    <div>
                        <p className={`${styles?.companyName} heading-4 heading-5-md heading-4-sm `}>{item.heading}</p>
                    </div>
                </div>
              
              <div className={`${styles.content} d-flex flex-column gap-50`}>
                <div dangerouslySetInnerHTML={{__html:item.description}} className={`${styles?.aboutContent} text-3 text-3-md text-1-sm color-1`}/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
