"use client";
import React from 'react';
import Marquee from 'react-fast-marquee'; // Import the Marquee component
import styles from '../Components.module.css';

export default function LogoSlider({ label }) {
  const logos = [
    { src: "/assets/netflix.jpg", alt: "Netflix" },
    { src: "/assets/sbi.jpg", alt: "SBI" },
    { src: "/assets/uspa.jpg", alt: "USPA" },
    { src: "/assets/itc.jpg", alt: "ITC" },
    { src: "/assets/myntra.jpg", alt: "Myntra" },
    { src: "/assets/176.png", alt: "Logo" },
    { src: "/assets/177.png", alt: "Logo" },
    { src: "/assets/178.png", alt: "Logo" },
    { src: "/assets/179.png", alt: "Logo" },
    { src: "/assets/180.png", alt: "Logo" },
    { src: "/assets/181.png", alt: "Logo" },
    { src: "/assets/182.png", alt: "Logo" },
    { src: "/assets/183.png", alt: "Logo" },
    { src: "/assets/184.png", alt: "Logo" },
    { src: "/assets/185.png", alt: "Logo" },
    { src: "/assets/186.png", alt: "Logo" },
    { src: "/assets/187.png", alt: "Logo" },
    { src: "/assets/188.png", alt: "Logo" },
    { src: "/assets/189.png", alt: "Logo" },
    { src: "/assets/190.png", alt: "Logo" },
    { src: "/assets/191.png", alt: "Logo" },
    { src: "/assets/192.png", alt: "Logo" },
    { src: "/assets/193.png", alt: "Logo" },
    { src: "/assets/194.png", alt: "Logo" },
    { src: "/assets/195.png", alt: "Logo" },
    // { src: "/assets/196.png", alt: "Logo" },
    { src: "/assets/197.png", alt: "Logo" },
    { src: "/assets/198.png", alt: "Logo" },
    { src: "/assets/199.png", alt: "Logo" },
    { src: "/assets/200.png", alt: "Logo" },
    { src: "/assets/201.png", alt: "Logo" },
    { src: "/assets/202.png", alt: "Logo" },
  ];

  return (
    <div className="padding-top-lg padding-bottom-lg">
      <div className={`${styles.marqueeSlider}`}>
        <div className={`${styles.lineBeforeAfter} text-6 text-5-sm uppercase opacity-06`}>
          {label}
        </div>
        <div className={styles.logoSliderWrapper}>
        <Marquee speed={50} gradient={false}>
          <div className={styles.marquee}>
            {logos.map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.alt} 
                className={styles.logoImage}
              />
            ))}
          </div>
        </Marquee>
        </div>
      </div>
    </div>
  );
}
