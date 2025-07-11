'use client'

import React, { useEffect, useRef } from 'react'
import styles from '../css/textanimate.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)


export default function TextAnimate({overview}) {
  const {heading, description, logos, subHead} = overview || {};

  return (
    <div className='container padding-bottom-md padding-top-sm'>
      <div className={`${styles.animateTextWrap} col-lg-6 mt-4 d-flex flex-column  align-items-start`}>
           <div className={styles?.textWrap}>
              <p  className={`${styles.textHeading} heading-3 heading-4-md heading-4-sm`}>
                {heading}
                </p>
                <p className={`${styles?.textDesc} text-1 text-1-md text-2-sm`}>{subHead}</p>
           </div>

            <div className={`${styles.logoContainer} d-flex flex-column gap-30`}>
                <h3 className='text-1 text-1-md text-2-sm '>{description}</h3>
                
            </div>
            <div className={`${styles.logos} gap-40`}>
                {logos?.map((item, index) => (
                  <Image
                    key={index}
                    src={item.logo.url}
                    alt="Logo"
                    className={styles?.animationSubimg}
                    width={159}
                    height={42}
                  />
                ))}
                </div>
        </div>
    </div>
  )
}
