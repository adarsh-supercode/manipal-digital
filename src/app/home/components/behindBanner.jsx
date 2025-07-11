'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as styles from "../component.module.css"
import { Canvas } from '@react-three/fiber'
import { LogoModel } from '@/app/components/Models/LogoModel'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from '@/app/components/Animation/AnimtaionTxt'
import PrimaryButton from '@/app/components/Buttons/PrimaryButton'
import { useMediaQuery } from "usehooks-ts"

gsap.registerPlugin(ScrollTrigger)

export default function BehindBanner({banner , animateSec}) {
  const { heading,subheadings,description } = banner || {};
  const { button } = animateSec || {};

  const [mounted, setMounted] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 992px)")

  const modelRef = useRef(null)
  const bannerContentRef = useRef(null)
  const timelineRef = useRef(null)
  const behindLogoRef = useRef(null)
  const behindContentWrapRef = useRef(null)

  // Wait until after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const animateWordsSequentially = () => {
    const words = bannerContentRef.current?.querySelectorAll(`.${styles.textContainer} p`)
    if (!words?.length) return

    words.forEach(word => {
      const spans = word.querySelectorAll('span')
      gsap.set(spans, { yPercent: 100, autoAlpha: 0 })
    })

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

    words.forEach(word => {
      const spans = word.querySelectorAll('span')

      tl.fromTo(
        spans,
        { yPercent: 100, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.05,
        }
      ).to(
        spans,
        {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.in',
          stagger: 0.04,
        },
        "+=1.2"
      )
    })

    timelineRef.current = tl
  }

  useEffect(() => {
    if (!mounted || !bannerContentRef.current) return

    ScrollTrigger.create({
      trigger: bannerContentRef.current,
      start: 'top 150%',
      end: 'bottom top',
      onEnter: () => {
        if (!timelineRef.current) {
          animateWordsSequentially()
        }
      },
      onLeave: () => {
        timelineRef.current?.pause()
      },
      onEnterBack: () => {
        timelineRef.current?.play()
      },
      onLeaveBack: () => {
        timelineRef.current?.pause()
      },
    })

    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        if (!behindLogoRef.current || !behindContentWrapRef.current) return

        const contentHeight = behindContentWrapRef.current.scrollHeight
        const logoHeight = behindLogoRef.current.offsetHeight
        const scrollDistance = contentHeight - logoHeight

        const scrollTrigger = ScrollTrigger.create({
          trigger: behindLogoRef.current,
          start: "top top",
          end: `+=100%`,
          pin: behindLogoRef.current,
          pinSpacer: false,
          scrub: true,
        })

        return () => {
          scrollTrigger.kill()
        }
      }
    })

    return () => {
      timelineRef.current?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted])

  // Avoid rendering until component is mounted (fixes hydration)
  if (!mounted) return null

  return (
    <section>
      <div className={styles.behindSecWrap}>

        {/* Model Section - Pinned */}
        <div ref={behindLogoRef} className={styles.behindLogoSecWrap}>
          <div className={styles.behindLogoSec}>
            <div className={`${styles.modelNew} ${styles.modelNewflsn} hideMobile`}>
              <div className={styles.modelNewWrap}>
                <Canvas camera={{ position: [0, 0, 5], fov: 58 }} className={styles.modelNeCanvas}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} />
                  <LogoModel ref={modelRef} />
                  <OrbitControls autoRotate enableZoom={false} />
                </Canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={styles.behindContentWrap} ref={behindContentWrapRef}>
          <div className={styles.behindContent1}>
            <div className={styles.bannerPinWrapper}>
              <div ref={bannerContentRef} className={styles.bannerContent}>
                <div className={styles.alignDiv}>
                  <h1 className={`${styles.bannerText} heading-5 heading-1-sm heading-1-md`}>
                    {heading}
                  </h1>
                  <div className={styles.textContainer}>
                  {subheadings.map((item, index) => (
                    <p key={index} className="heading-5 heading-1-sm heading-1-md">
                      {item.subheading.split("").map((letter, i) => (
                        <span style={{ display: "inline-block" }} key={i}>
                          {letter}
                        </span>
                      ))}
                    </p>
                  ))}
                  </div>
                  <div className={styles.iconContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="69" height="69" viewBox="0 0 69 69" fill="none">
                      <g opacity="0.2">
                        <circle cx="34.5" cy="34.5" r="34" stroke="black" />
                        <path d="M34 16V53.5M34 53.5L45 42.5M34 53.5L23 42.5" stroke="#000026" />
                      </g>
                    </svg>
                    <p className="text-3 text-4-sm">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Canvas */}
          <div className={`${styles.modelNew} ${styles.modelNewSmallsn} hideDesktop ${styles.disableTouch}`}>
            <div className={styles.modelNewWrap}>
              <Canvas camera={{ position: [0, 0, 5], fov: 58 }} className={styles.modelNeCanvas}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <LogoModel />
                <OrbitControls autoRotate enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
          </div>

          {/* Animated Text and CTA */}
          <div className={styles.behindContent2}>
            <div className={`${styles.animateTextWrap} col-lg-9 mt-4 d-flex flex-column gap-50 align-items-start`}>
              <AnimatedText animateSec={animateSec}
                // text="Manipal Digital brings nearly two decades of experience, production excellence and technical expertise in print and digital media to help brands and agencies deliver impactful consumer experiences – whether on a screen or a shelf."
                text={animateSec.animateText}
                className={`${styles.textWrap} heading-4 heading-5-md heading-4-sm`}
              />
              {isDesktop && (
                <PrimaryButton label={button.title} href={button.url} buttonBlack={true} />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}