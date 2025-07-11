import React, { useState, useRef, useEffect } from 'react';
import * as styles from '../css/whatweoffer.module.css';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const CustomHandle = () => (
  <div className={styles.customHandle}>
    <div className={styles.handleInner}></div>
  </div>
);

export default function WhatWeOffer() {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const contentRefs = useRef([]);

  const data = [
    {
      id: 1,
      type: 'compare',
      title: 'Image Retouching',
      subtitle: '01',
      description: 'We design packaging that stands out and delivers impact.',
      imageBefore: '/assets/imaging-sample-2.jpg',
      imageAfter: '/assets/imaging-sample.jpg',
    },
    {
      id: 2,
      type: 'toggle',
      title: 'Colour correction',
      subtitle: '02',
      description: 'We design packaging that stands out and delivers impact.',
      imageOne: '/assets/color-correction-2.jpg',
      imageTwo: '/assets/color-corrrection.jpg',
    },
    {
      id: 3,
      type: 'slide-toggle',
      title: 'Texture wrapping',
      subtitle: '03',
      description: 'We design packaging that stands out and delivers impact.',
      imageOne: '/assets/before.jpg',
      imageTwo: '/assets/after.jpg',
    },
    {
      id: 4,
      type: 'compare',
      title: 'Texture wrapping',
      subtitle: '04',
      description: 'We design packaging that stands out and delivers impact.',
      imageBefore: '/assets/before-one.jpg',
      imageAfter: '/assets/after-one.jpg',
    },
    {
      id: 5,
      type: 'compare',
      title: 'High end retouching',
      subtitle: '05',
      description: 'We design packaging that stands out and delivers impact.',
      imageBefore: '/assets/before-two.jpg',
      imageAfter: '/assets/after-two.jpg',
    },
    {
      id: 6,
      type: 'compare',
      title: 'Generative AI production',
      subtitle: '06',
      description: 'We design packaging that stands out and delivers impact.',
      imageBefore: '/assets/before-3.jpg',
      imageAfter: '/assets/after-three.jpg',
    },
  ];

  const initialToggleStates = data.reduce((acc, item) => {
    if (item.type === 'toggle' || item.type === 'slide-toggle') {
      acc[item.id] = false;
    }
    return acc;
  }, {});

  const [toggleStates, setToggleStates] = useState(initialToggleStates);

  const handleToggle = (id) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    contentRefs.current.forEach((section) => {
      if (section) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom center',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }).fromTo(
          section,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: 'power3.out' }
        );
      }
    });
  }, []);

  return (
    <div ref={sectionRef} className={styles.WhatWeOfferWrapper}>
      {data.map((item) => (
        <div
          key={item.id}
          ref={(el) => el && contentRefs.current.push(el)}
          className={styles.imagingWrapper}
        >
          <div className={styles.imagingContentWrap}>
            <div className={styles.topContent}>
              {/* <p className="text-6">WHAT WE OFFER</p>
              <h2 className="heading-3">Bringing Your Vision to Life with Expert Imaging</h2> */}
            </div>
            <div className={styles.bottomContent}>
              <h3 className="heading-4 ">{item.subtitle}</h3>
              <h2 className="heading-4">{item.title}</h2>
              <p className="text-4 opacity-08">{item.description}</p>
            </div>
          </div>

          {/* Handle Compare Slider */}
          {item.type === 'compare' && (
            <div className={styles.imagingImageWrap}>
              <ReactCompareSlider
                handle={<CustomHandle />}
                itemOne={<ReactCompareSliderImage src={item.imageBefore} alt="Before" />}
                itemTwo={<ReactCompareSliderImage src={item.imageAfter} alt="After" />}
              />
            </div>
          )}

          {/* Handle Toggle Image */}
          {item.type === 'toggle' && (
            <div className={styles.imagingImageWrap}>
              <Image
                src={toggleStates[item.id] ? item.imageTwo : item.imageOne}
                alt={toggleStates[item.id] ? 'Toggled Image' : 'Original'}
                width={750}
                height={810}
                priority
              />
              <button
                onClick={() => handleToggle(item.id)}
                className={styles.toggleButton}
              >
                <Image
                  src={toggleStates[item.id] ? item.imageOne : item.imageTwo}
                  alt="Toggle"
                  width={50}
                  height={50}
                />
              </button>
            </div>
          )}

          {/* Handle Slide-Toggle */}
          {item.type === 'slide-toggle' && (
            <div className={styles.imagingImageWrap}>
              <div className={styles.imageWrapper}>
                <Image
                  src={toggleStates[item.id] ? item.imageTwo : item.imageOne}
                  alt={toggleStates[item.id] ? 'Toggled Image' : 'Original'}
                  width={750}
                  height={810}
                  priority
                />
              </div>
              <div
                className={styles.toggleBtnWrapper}
                onClick={() => handleToggle(item.id)}
              >
                <div
                  className={`${styles.toggleBtn} ${
                    toggleStates[item.id] ? styles.toggled : ''
                  }`}
                >
                  <Image
                    src={toggleStates[item.id] ? item.imageOne : item.imageTwo}
                    alt={toggleStates[item.id] ? 'Show Original' : 'Show Toggled'}
                    width={35}
                    height={35}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
