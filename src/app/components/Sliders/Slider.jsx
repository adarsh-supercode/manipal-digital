"use client";
import React, { useRef, useState } from "react";
import * as styles from "../Components.module.css";
import style from "./slider.module.css"; 
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Slider({ slides, title, subtitle, bgVideo }) {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const pathname = usePathname(); 


  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={style.leadersPrincipleSection} ref={sectionRef}>
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className={`${style.leadersPrinciplebgVideo} ${
          pathname.includes("/audiovisual") ? style.audioVisualVideoClass : ""
        }`} // Check if pathname contains "/audiovisual"
      ></video>
      <div className={style.mainWrap}>
        <div className="container">
          <div className={style.titleWrap}>
            <p className="text-6 opacity-06 uppercase">{title}</p>
          </div>
        </div>

        <div className="container">
          <div className={style.sliderWrap}>
            <div className={style.mainContentwrap}>
              {slides.map((slide, index) => (
                <div key={index} className={style.sliderContent}>
                  <div className={`${style.sliderContentHeading} padding-top-sm`}>
                    <h2 className="heading-3 heading-4-md heading-4-sm">
                      {slide.heading}
                    </h2>
                  </div>
                  <div className={`${style.sliderMainContent} padding-top-sm`}>
                    {slide.image && (
                      <div className={`${style.sliderImageWrap}`}>
                        <Image
                          src={slide.image.url}
                          alt={`Slider Image ${index + 1}`}
                          width={525}
                          height={428}
                          className={style.sliderImageWrapMobile}
                        />
                      </div>
                    )}
                    {slide.video && (
                      <div className={style.sliderImageWrap}>
                        <video
                          src={slide.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className={style.sliderImage}
                          height={200}
                        ></video>
                      </div>
                    )}
                    <div className={style.sliderContentWrap}>
                      <h4 className="heading-4 heading-4-md text-1-sm mt-2">
                        {slide.description}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}