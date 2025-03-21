"use client"
import React, { useEffect, useRef } from 'react'
import styles from '../css/videosection.module.css'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
    const videoContainerRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            videoContainerRef.current,
            { width: "50vw", opacity: 0.8 },
            {
                width: "90vw",
                opacity: 1,
                scrollTrigger: {
                    trigger: videoContainerRef.current,
                    start: "top bottom",
                    end: "top center",
                    scrub: true
                }
            }
        )
    }, [])

    return (
        <div ref={videoContainerRef} className={`${styles.videoConatainer} container`}>
            <div className={`${styles.videoWrap}`}>
                <video autoPlay muted loop preload="auto" className={`${styles.videoPlay}`}>
                    <source src="/assets/showreel.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={`${styles.videoOverlayText} d-flex flex-column justify-content-between`}>
                <h2 className='heading-3 color-4'>A look back to 2024</h2>
                <div className='d-flex gap-30 align-items-center'>
                    <Image
                        src="/assets/play-button.svg"
                        width={60}
                        height={60}
                        alt='Play Button'
                    />
                    <p className={`${styles.overlaySubtext} text-1 color-4`}>Explore Our Creative Journey: Manipal’s Impactful Projects</p>
                </div>
            </div>
        </div>
    )
}
