"use client"
import React, { useEffect, useRef } from 'react'
import * as styles from "../css/aboutvision.module.css"
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function AboutFutureVision() {
    const visionRef = useRef(null);
    const imagesRef = useRef([]);
    const textRightRef = useRef(null);
    const textLeftRef = useRef(null);
    const mainimgRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        imagesRef.current.forEach((img, index) => {
            let fromVars = {};
            switch (index) {
                case 0: fromVars = { x: -400, y: -400 }; break;
                case 1: fromVars = { x: 400, y: -400 }; break;
                case 2: fromVars = { y: -300 }; break;
                case 3: fromVars = { x: -400, y: 200 }; break;
                case 4: fromVars = { x: 450, y: 250 }; break;
                case 5: fromVars = { x: 100, y: 350 }; break;
                default: fromVars = {};
            }
            gsap.set(img, fromVars); 
        });

        // Pin the section
        ScrollTrigger.create({
            trigger: visionRef.current,
            start: "top+=200 top",
            end: "+=200%",
            pin: true,
            // markers: true,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: visionRef.current,
                start: "top+=200 top",
                end: "bottom top",
                scrub: 2,
            }
        });

        imagesRef.current.forEach((img, index) => {
            let animationDuration = 3 + index * 0.05;
            tl.to(img, {
                x: 0,
                y: 0,
                duration: animationDuration,
                ease: "power3.out",
            }, index * 0.15);
        });
        

        imagesRef.current.forEach((img, index) => {
            tl.fromTo(img,{
                width: "100%",
            }, {
                width: "0", opacity: 1, duration: 3, ease: "power3.out"
            },"<");
        },"<");
        // Text animation as part of timeline
        tl.fromTo(textRightRef.current, {
            x: -1000,
        }, {
            x: 0, opacity: 1, duration: 3, ease: "power3.out"
        },"+=0.2");
        
        tl.fromTo(textLeftRef.current, {
            x: 1000,
        }, {
            x: 0, opacity: 1, duration: 3, ease: "power3.out"
        }, "<");
        tl.fromTo(mainimgRef.current, {
            width: "100%",x:0,
        }, {
            width: "0",x:80, opacity: 1, duration: 3, ease: "power3.out"
        }, "<");
       

    }, []);
    
    return (
      <section className={`${styles?.aboutFutureVisionSection} padding-top-xl`}>
          <div className='container'>
             <div className={styles?.titleWrap}>
               <p className='text-4'>IN SHORT</p>
               <h2 className={`${styles?.AboutFutureVisionTitle} tac heading-4`}>We help shape a clear and effortless future</h2>
             </div>
             <div className={styles?.visionAnimationWrap} ref={visionRef}>
               {[ 
                 "/assets/ab-animation-img1.webp",
                 "/assets/ab-animation-img2.webp",
                 "/assets/ab-animation-img3.webp",
                 "/assets/ab-animation-img4.webp",
                 "/assets/ab-animation-img5.webp",
                 "/assets/ab-animation-img6.webp"
               ].map((src, index) => (
                 <Image 
                   key={index} 
                   src={src} 
                   alt="img" 
                   width={100} 
                   height={100} 
                   className={styles?.animationSubimg}
                   ref={(el) => (imagesRef.current[index] = el)}
                 />
               ))}
             
               <Image src={"/assets/main-animation-img.svg"} alt="img" width={100} height={100} className={styles?.animationSubimg} ref={mainimgRef}/>
               <div className={styles?.animationTextWrap}>
                <p className={styles?.textRight} ref={textRightRef} style={{ transform: "translateX(400px)" }}>manipal</p>
                <p className={styles?.textLeft} ref={textLeftRef} style={{transform: "translateX(-400px)" }}>digital</p>
               </div>
             </div>
          </div>
      </section>
    );
}
