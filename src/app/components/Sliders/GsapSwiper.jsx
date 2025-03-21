"use client";
import React, { useEffect, useRef } from "react";
import * as styles from "../Components.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

export default function GsapSwiper({ slides, title, subtitle,bgVideo }) {
    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const descriptionsRef = useRef([]);
    const imageRef = useRef([]);
    let lastIndex = useRef(0);

    useEffect(() => {
        const sectionPrinciples = sectionRef.current;
        const swiper = swiperRef.current?.swiper;

        if (descriptionsRef.current[0] && imageRef.current[0]) {
            gsap.set(descriptionsRef.current[0], { x: 0, opacity: 1 });
            gsap.set(imageRef.current[0], { x: 0, zIndex: 1 });
        }

        if (sectionPrinciples && swiper) {
            ScrollTrigger.create({
                trigger: sectionPrinciples,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    const progress = Math.round((self.progress ) * (swiper.slides.length - 1));
                    const scrollDirection = self.direction;

                    if (progress !== lastIndex.current) {
                        const descExitX = scrollDirection === 1 ? -50 : 100;
                        const descEnterX = scrollDirection === 1 ? 100 : -50;
                        const imgExitX = scrollDirection === 1 ? -500 : 100;
                        const imgEnterX = scrollDirection === 1 ? -500 : 500;

                        gsap.to(descriptionsRef.current[lastIndex.current], {
                            x: descExitX,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.out",
                        });

                        gsap.fromTo(
                            descriptionsRef.current[progress],
                            { x: descEnterX, opacity: 0 },
                            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                        );

                        if (imageRef.current[lastIndex.current]) {
                            gsap.set(imageRef.current[lastIndex.current], { opacity: 1 });
                        }

                        gsap.to(imageRef.current[lastIndex.current], {
                            x: imgEnterX,
                            duration: 1,
                            ease: "power2.out",
                        });

                        gsap.fromTo(
                            imageRef.current[progress],
                            { x: 0, zIndex: 1 },
                            { x: 0, duration: 1, ease: "power2.out" }
                        );

                        lastIndex.current = progress;
                    }

                    swiper.slideTo(progress);
                },
            });
        }
    }, []);

    return (
        <section className={`${styles?.leadersPrincipleSection} padding-bottom-lg`} ref={sectionRef}>
            <video src={bgVideo} autoPlay muted loop playsinline className={styles?.leadersPrinciplebgVideo}></video>
            <div className="container">
                <div className={styles?.titleWrap}>
                    <p className="text-4">{title}</p>
                    <h2 className="heading-3">{subtitle}</h2>
                </div>
            </div>
            <div className="container">
                <Swiper
                    effect="fade"
                    grabCursor={true}
                    slidesPerView={1}
                    spaceBetween={0}
                    allowTouchMove={false}
                    modules={[EffectFade]}
                    className={styles?.principlesSwiper}
                    ref={swiperRef}
                >
                    {slides.map((item, index) => (
                        <SwiperSlide className={styles?.principleCard} key={index}>
                            <div style={{ overflow: "hidden" }}>
                                <Image
                                    src={item.img}
                                    width={525}
                                    height={428}
                                    alt="image"
                                    ref={(el) => (imageRef.current[index] = el)}
                                    style={{
                                        opacity: 1,
                                        transform: index === 0 ? "translateX(0)" : "translateX(50px)",
                                    }}
                                />
                            </div>
                            <p
                                className={`${styles?.description} heading-5`}
                                ref={(el) => (descriptionsRef.current[index] = el)}
                                style={{
                                    opacity: index === 0 ? 1 : 0,
                                    transform: index === 0 ? "translateX(0)" : "translateX(50px)",
                                }}
                            >
                                {item.text}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
