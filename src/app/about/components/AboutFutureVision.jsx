"use client"
import React, { useEffect, useRef } from 'react'
import * as styles from "../css/aboutvision.module.css"
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function AboutFutureVision({culture}) {
  const{companyName,description,mainTitle,subDesp,title,teamImages,mainImg}=culture ||{}
  console.log('culture: ', culture);
  const visionRef = useRef(null)
  const imagesRef = useRef([])
  const textRightRef = useRef(null)
  const textLeftRef = useRef(null)
  const mainimgRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const screenWidth = window.innerWidth

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 992px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions

      if (isMobile) {
        // Reset all animations and transforms for mobile
        imagesRef.current.forEach((img) => {
          gsap.set(img, { clearProps: "all" })
        })
        gsap.set(mainimgRef.current, { clearProps: "all" })
        gsap.set(textRightRef.current, { clearProps: "all" })
        gsap.set(textLeftRef.current, { clearProps: "all" })
        return
      }

      // Desktop animation setup
      const mainImgX = screenWidth <= 768 ? 25 : screenWidth <= 1199 ? 35 : 65
      const startDelay = 0.3
      const startPoint = "top+=300 top"
      const endPoint = "+=600%"

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visionRef.current,
          start: startPoint,
          end: endPoint,
          scrub: 3,
          pin: true,
          pinSpacing: true,
          markers: false,
        }
      })

      tl.set(mainimgRef.current, { y: "0px" })

      imagesRef.current.forEach((img, index) => {
        let fromVars = {}
        if (screenWidth <= 1024) {
          switch (index) {
            case 0: fromVars = { x: -250, y: -400 }; break
            case 1: fromVars = { x: 320, y: -350 }; break
            case 2: fromVars = { y: -200 }; break
            case 3: fromVars = { x: -270, y: 255 }; break
            case 4: fromVars = { x: 317, y: 225 }; break
            case 5: fromVars = { x: 0, y: 400 }; break
          }
        } else if (screenWidth <= 1199) {
          switch (index) {
            case 0: fromVars = { x: -350, y: -400 }; break
            case 1: fromVars = { x: 400, y: -350 }; break
            case 2: fromVars = { y: -200 }; break
            case 3: fromVars = { x: -350, y: 200 }; break
            case 4: fromVars = { x: 350, y: 150 }; break
            case 5: fromVars = { x: 0, y: 400 }; break
          }
        } else {
          switch (index) {
            case 0: fromVars = { x: -400, y: -400 }; break
            case 1: fromVars = { x: 400, y: -400 }; break
            case 2: fromVars = { y: -300 }; break
            case 3: fromVars = { x: -400, y: 200 }; break
            case 4: fromVars = { x: 450, y: 250 }; break
            case 5: fromVars = { x: 100, y: 350 }; break
          }
        }

        gsap.set(img, fromVars)

        const animationDuration = 5 + index * 0.2
        tl.to(img, {
          x: 0,
          y: 0,
          duration: animationDuration,
          ease: "power3.out"
        }, startDelay + index * 0.6)
      })

      // Image closing animation
      imagesRef.current.forEach((img, index) => {
        tl.fromTo(img, {
          width: "100%",
        }, {
          width: "0",
          opacity: 1,
          duration: 4,
          ease: "power3.out"
        }, startDelay + index * 0.6)
      })

      const lastImageAnimationEndTime =
        startDelay + (imagesRef.current.length - 1) * 0.6 + 3.5

      // Text animations
      tl.fromTo(textRightRef.current, {
        x: -800,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, lastImageAnimationEndTime)

      tl.fromTo(textLeftRef.current, {
        x: 800,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, lastImageAnimationEndTime)

      // Main image closing
      tl.fromTo(mainimgRef.current, {
        width: "100%", x: 0,
      }, {
        width: "0",
        x: mainImgX,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, lastImageAnimationEndTime)

      ScrollTrigger.refresh()

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section className={styles.aboutFutureVisionSection}>
      <div className="container">
        <div className={styles.titleWrap}>
          <p className="text-6 uppercase opacity-06">{title}</p>
          <h2 className={`${styles.AboutFutureVisionTitle} tac heading-3 heading-4-sm`}>
            {mainTitle}
          </h2>
          <p className={`${styles.desc} text-1 text-1-sm`}>
           {description}
          </p>
          <p className={`${styles.subDesc} text-1 text-1-sm`}>
            {subDesp}
          </p>
        </div>

        <div className={styles.visionAnimationWrap} ref={visionRef}>
          {teamImages.map((item, index) => (
            <img
              key={index}
              src={item.img.url}
              alt={item.img.title || "img"}
              width={100}
              height={100}
              className={`${styles.animationSubimg} ${styles.mobileSubImgs}`}
              ref={(el) => (imagesRef.current[index] = el)}
            />
          ))}
          

          <img
            src={mainImg.url}
            alt={mainImg.title || "img"}
            width={100}
            height={100}
            className={styles.animationSubimg}
            ref={mainimgRef}
          />

          <div className={styles.animationTextWrap}>
            <p className={styles.textRight} ref={textRightRef}>manipal</p>
            <p className={styles.textLeft} ref={textLeftRef}>.digital</p>
          </div>
        </div>

        <div className={styles.animationTextWrapMob}>
          <h3>{companyName}</h3>
        </div>
      </div>
    </section>
  )
}