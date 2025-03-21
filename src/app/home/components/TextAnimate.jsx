'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import styles from '../css/textAnimate.module.css'
import Marquee from 'react-marquee-slider';
import PrimaryButton from '@/app/components/Buttons/PrimaryButton'

gsap.registerPlugin(ScrollTrigger)

export default function TextAnimate() {
  const textRef = useRef(null)

  useEffect(() => {
    const words = textRef.current.innerText.split(' ')
    textRef.current.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')

    gsap.fromTo(
      textRef.current.querySelectorAll('.word'),
      {
        color: 'rgba(0, 0, 0, 0.50)', // Faded color
      },
      {
        color: '#000', // Final color
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%', // Start animation when section is 80% in view
          end: 'top 40%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <div className='container vertical-padding-xl'>
      <div className='row gap-40'>
      <div className='logoContainer col-lg-4'>
      <Image
      src="/assets/shape-image.jpg"
      width={409}
      height={424}
      alt='Shape logo'
    />
      </div>
      <div className='animateTextWrap col-lg-6 mt-4 d-flex flex-column gap-50 align-items-start'>
        <p ref={textRef} className={`${styles.textWrap} heading-5`}>
          Backed by 40+ years of industry experience, we combine creative intelligence and technical excellence to redefine your brand experience across digital channels and overcome production challenges.
        </p>
        <PrimaryButton label={"What We do"} href={"#"} buttonBlack={true}/>
      </div>
      </div>
      
    </div>
  )
}
