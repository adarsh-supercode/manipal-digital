'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../Components.module.css' 

gsap.registerPlugin(ScrollTrigger)

const AnimatedText = ({ text, className = '' }) => {
  const textRef = useRef(null)

  useEffect(() => {
    const words = textRef.current.innerText.split(' ')
    textRef.current.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')

    gsap.fromTo(
      textRef.current.querySelectorAll('.word'),
      {
        color: 'rgba(0, 0, 0, 0.50)',
      },
      {
        color: '#000',
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <div ref={textRef} className={` ${className}`} dangerouslySetInnerHTML={{__html:text}}/>
  )
}

export default AnimatedText
