'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,useReactCompareSliderRef
} from 'react-compare-slider';
import { useMediaQuery } from 'usehooks-ts';
import styles from './../css/cardstack.module.css';



const CustomHandle = () => (
  <div className={styles.customHandle}>
    <div className={styles.handleInner}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="28" viewBox="0 0 11 28" fill="none">
  <line y1="0.5" x2="11" y2="0.5" stroke="black"/>
  <line y1="9.5" x2="11" y2="9.5" stroke="black"/>
  <line y1="18.5" x2="11" y2="18.5" stroke="black"/>
  <line y1="27.5" x2="11" y2="27.5" stroke="black"/>
</svg></div>
  </div>
);
const CardStacking = ({offer}) => {
  const{categories} = offer || {};
  const contentRefs = useRef([]);
  const compareSliderRefs = useRef([]);
  compareSliderRefs.current = [];
  contentRefs.current = [];
  const isMobile = useMediaQuery('(max-width: 767px)');

  const data = [
    {
      id: 1,
      type: 'compare',
      title: 'Generative AI production',
      subtitle: '01',
      description: 'Highly realistic models using advanced Generative AI tools and skilled human oversight.',
      imageBefore: '/assets/before-3.jpg',
      imageAfter: '/assets/after-three.jpg'
    },
    {
      id: 2,
      type: 'compare',
      title: 'Superimposition',
      subtitle: '02',
      description: 'Professional image editing can save you the time and hassle of multiple photoshoots and outfit changes.',
      imageBefore: '/assets/superimposing-after.jpg',
      imageAfter: '/assets/superimposing-before.jpg'
    },
    {
      id: 3,
      type: 'compare',
      title: 'Texture Wrapping',
      subtitle: '03',
      description: 'Add or change the pattern or material of the same design, be it a bag, garment or a piece of furniture.',
      imageBefore: '/assets/before-one.jpg',
      imageAfter: '/assets/after-one.jpg'
    },
    {
      id: 4,
      type: 'compare',
      title: 'High End Retouching',
      subtitle: '04',
      description: 'Why shoot every variant in your collection, when we can recreate every micro-detail?',
      imageBefore: '/assets/highend-before.jpg',
      imageAfter: '/assets/highend-after.jpg'
    },
  
    {
      id: 5,
      type: 'toggle',
      title: 'Colour Correction',
      subtitle: '05',
      description: 'Get true-to-life colours on your product image, and showcase the variants available.',
      imageOne: '/assets/color-correction-2.jpg',
      imageTwo: '/assets/color-corrrection.jpg'
    },
    {
      id: 6,
      type: 'image',
      title: 'Ecommerce Edits',
      subtitle: '06',
      description: 'Change of background, colours correction and ensuring consistent image size, done at scale.',
      imageBefore: '/assets/ecom.jpg',
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
      [id]: !prev[id]
    }));
  };
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const cards = gsap.utils.toArray(`.${styles.stackCard}`);
    let stickDistance = 0;
  
    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: "center center"
    });
  
    cards.forEach((card) => {
      let scaleDown = gsap.to(card, {
        transformOrigin: "50% " + (lastCardST.start + stickDistance)
      });
  
      ScrollTrigger.create({
        trigger: card,
        start: "center center",
        end: () => lastCardST.start + stickDistance,
        pin: true,
        markers: false,
        pinSpacing: false,
        ease: "none",
        animation: scaleDown,
        toggleActions: "restart none none reverse"
      });
    });
    let toggleInterval;
  
    if (isMobile) {
      compareSliderRefs.current.forEach((sliderRef) => {
        if (!sliderRef?.setPosition) return;
        let pos = 50;
        let dir = 1;
  
        const move = () => {
          pos += dir * 0.5;
          if (pos >= 90) dir = -1;
          if (pos <= 10) dir = 1;
  
          sliderRef.setPosition(pos);
          requestAnimationFrame(move);
        };
  
        move();
      });

      const toggleableIds = data.filter(item => item.type === 'toggle').map(item => item.id);
      let toggleIndex = 0;
    
      toggleInterval = setInterval(() => {
        handleToggle(toggleableIds[toggleIndex]);
        toggleIndex = (toggleIndex + 1) % toggleableIds.length;
      }, 1000);
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (toggleInterval) clearInterval(toggleInterval);
    };
  }, []);
  
  
  return (
    <section className={styles.cardStacking}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="cardStacking__cards" data-cursor="whiteCursor">
            {categories.map((item, index) => {
            const serialNumber = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) contentRefs.current[index] = el;
                  }}
                  className={styles.stackCard}
                >
                  <div className={styles.imagingContentWrap} >
                    <div className={styles.topContent}>
                      {/* <p className="text-6">WHAT WE OFFER</p>
                      <h2 className="heading-3">Bringing Your Vision to Life with Expert Imaging</h2> */}
                    </div>
                    <div className={styles.bottomContent}>
                      <h3 className="heading-4 text-2-sm">{serialNumber}</h3>
                      <h2 className="heading-4">{item.heading}</h2>
                      <p className="text-4 opacity-08 text-2-sm">{item.description}</p>
                    </div>
                  </div>

                  {/* Handle Compare Slider */}
                  {item.type.value === 'compare' && (
                <div className={styles.imagingImageWrap} data-cursor="blackCursor">
                  <ReactCompareSlider
                    ref={(el) => {
                      if (el) compareSliderRefs.current[index] = el;
                    }}
                    handle={<CustomHandle />}
                    itemOne={<ReactCompareSliderImage src={item.imgOne.url} alt="Before" className={styles?.CompareSliderImg} />}
                    itemTwo={<ReactCompareSliderImage src={item.imgTwo.url} alt="After" className={styles?.CompareSliderImg} />}
                  />
                </div>
              )}

                  {/* Handle Compare Slider */}
                  {item.type.value === 'image' && (
                    <div className={styles.imagingImageWrap} data-cursor="blackCursor">
                      <img src={item.imgOne.url} alt="Before" width={750} height={810} />
                     
                    </div>
                  )}

                  {/* Handle Toggle Image */}
                  {item.type.value === 'toggle' && (
                    <div className={styles.imagingImageWrap} data-cursor="blackCursor">
                      <img src={toggleStates[item.id] ? item.imgTwo.url : item.imgOne.url} alt="Toggle" width={750} height={810}  />
                      <button onClick={() => handleToggle(item.id)} className={styles.toggleButton}>
                        <div className={styles.toggleButtonSvg}>
                         
                            <svg className={styles?.rotateAnimation} width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.5317 53.6096C29.6862 55.9325 27.455 56.8699 24.9291 55.9506C22.4145 55.0353 21.2905 52.8256 22.1401 50.4914C22.8091 48.6534 24.4159 47.6419 26.1956 47.9449L25.7647 49.1289C24.5939 49.0476 23.6187 49.727 23.1877 50.911C22.5885 52.5574 23.4349 54.0914 25.3406 54.785C27.2463 55.4786 28.8807 54.8475 29.4799 53.2012C29.915 52.0059 29.617 50.8248 28.7242 50.155L29.151 48.9823C30.6476 49.9229 31.2007 51.7715 30.5317 53.6096Z" fill="#2D348C"/>
                            <path d="M27.2438 40.8349L33.5039 45.116L35.6616 41.9686L36.563 42.585L33.7403 46.7024L26.5789 41.8048L27.2438 40.8349Z" fill="#2D348C"/>
                            <path d="M36.2297 30.7198L41.9511 37.242L41.0654 38.0157L35.3441 31.4935L36.2297 30.7198Z" fill="#2D348C"/>
                            <path d="M50.2343 32.0063C48.0265 33.1183 45.7556 32.2735 44.5408 29.8757C43.3314 27.4886 44.0237 25.1111 46.2422 23.9937C47.9891 23.1139 49.8548 23.4775 50.9469 24.916L49.8215 25.4828C49.0224 24.6223 47.8451 24.4494 46.7198 25.0162C45.1551 25.8042 44.7227 27.4999 45.6393 29.309C46.5558 31.1181 48.1812 31.7774 49.746 30.9893C50.882 30.4172 51.4732 29.3536 51.2799 28.2551L52.3945 27.6937C52.8432 29.4025 51.9813 31.1265 50.2343 32.0063Z" fill="#2D348C"/>
                            <path d="M55.9379 20.5965L56.9996 25.4006L59.7127 19.7708L61.0842 19.4708L59.0423 23.6886L63.0033 27.9322L61.6669 28.2245L58.4952 24.8278L57.3802 27.123L57.8101 29.0681L56.6612 29.3194L54.7891 20.8478L55.9379 20.5965Z" fill="#2D348C"/>
                            <path d="M77.259 28.9721L76.1309 28.6399L78.5793 20.3166L79.7074 20.6488L78.6542 24.2291L82.7752 25.4426L83.8284 21.8623L84.9565 22.1945L82.5082 30.5179L81.3801 30.1857L82.4671 26.4903L78.3461 25.2767L77.259 28.9721Z" fill="#2D348C"/>
                            <path d="M90.8587 35.0904L86.3119 32.3826L90.7576 24.9322L95.3044 27.64L94.751 28.5674L91.2146 26.4614L89.8249 28.7903L93.0108 30.6875L92.4758 31.5841L89.2899 29.6868L87.8818 32.0466L91.4182 34.1526L90.8587 35.0904Z" fill="#2D348C"/>
                            <path d="M95.025 38.5991L94.1956 37.7654L100.357 31.6576L102.668 33.9801C103.98 35.2987 104.06 36.774 102.909 37.9145C102.057 38.7593 101.02 38.9421 100.011 38.4215L98.6558 42.2486L97.7333 41.3213L99.0282 37.7568L97.4625 36.183L95.025 38.5991ZM100.437 33.2347L98.2039 35.448L99.6935 36.9453C100.464 37.7194 101.321 37.7479 102.029 37.0467C102.745 36.3371 102.68 35.4891 101.918 34.7235L100.437 33.2347Z" fill="#2D348C"/>
                            <path d="M103.756 50.2451L101.073 45.6838L108.561 41.3022L111.244 45.8635L110.312 46.4089L108.225 42.8612L105.884 44.2309L107.764 47.4269L106.863 47.9541L104.983 44.7581L102.611 46.1459L104.698 49.6936L103.756 50.2451Z" fill="#2D348C"/>
                            <path d="M110.294 64.8694L111.302 64.8421L111.407 68.5005L110.399 68.5279L110.294 64.8694Z" fill="#2D348C"/>
                            <path d="M102.949 86.2798C104.08 84.0815 106.412 83.4309 108.803 84.6588C111.183 85.8813 112.021 88.2138 110.885 90.4227C109.991 92.1622 108.269 92.9643 106.541 92.4411L107.117 91.3206C108.269 91.5478 109.322 90.9959 109.898 89.8754C110.7 88.3174 110.052 86.6899 108.248 85.7635C106.444 84.837 104.743 85.2584 103.942 86.8165C103.36 87.9476 103.508 89.1565 104.309 89.9325L103.739 91.0423C102.372 89.9221 102.055 88.0192 102.949 86.2798Z" fill="#2D348C"/>
                            <path d="M104.609 99.3643L98.9336 94.3337L96.3977 97.1853L95.5805 96.4609L98.8979 92.7306L105.39 98.4856L104.609 99.3643Z" fill="#2D348C"/>
                            <path d="M94.4206 108.274L89.5609 101.086L90.5366 100.43L95.3963 107.617L94.4206 108.274Z" fill="#2D348C"/>
                            <path d="M80.6825 105.242C83.0122 104.415 85.1593 105.538 86.064 108.069C86.9646 110.589 85.9798 112.861 83.6388 113.692C81.7953 114.346 79.9899 113.751 79.0869 112.187L80.2743 111.766C80.9593 112.72 82.1056 113.039 83.2931 112.617C84.9442 112.032 85.5857 110.403 84.9032 108.494C84.2206 106.584 82.6907 105.726 81.0395 106.312C79.8407 106.737 79.1209 107.718 79.175 108.832L77.9988 109.25C77.7679 107.498 78.8391 105.896 80.6825 105.242Z" fill="#2D348C"/>
                            <path d="M73.5901 115.849L73.1397 110.949L69.7417 116.196L68.3433 116.321L70.8984 112.392L67.5013 107.686L68.8638 107.563L71.5841 111.331L72.9782 109.193L72.7959 107.209L73.9671 107.104L74.7614 115.743L73.5901 115.849Z" fill="#2D348C"/>
                            <path d="M53.4876 104.873L54.5653 105.344L51.0907 113.294L50.013 112.823L51.5076 109.403L47.5707 107.684L46.0761 111.104L44.9984 110.633L48.473 102.683L49.5507 103.154L48.008 106.683L51.945 108.403L53.4876 104.873Z" fill="#2D348C"/>
                            <path d="M40.761 97.1048L44.9334 100.36L39.5872 107.193L35.4147 103.938L36.0802 103.087L39.3255 105.619L40.9966 103.483L38.0731 101.202L38.7164 100.38L41.64 102.661L43.3333 100.497L40.0881 97.9648L40.761 97.1048Z" fill="#2D348C"/>
                            <path d="M37.0673 93.1048L37.7858 94.0357L30.9062 99.3219L28.9046 96.7286C27.7681 95.2561 27.8738 93.7826 29.1584 92.7956C30.11 92.0644 31.1617 92.013 32.0975 92.6559L33.9219 89.0294L34.721 90.0649L32.9895 93.4384L34.3459 95.1959L37.0673 93.1048ZM31.025 97.7476L33.518 95.832L32.2276 94.16C31.5604 93.2956 30.7129 93.1598 29.9231 93.7667C29.1238 94.3809 29.0821 95.2302 29.7419 96.0851L31.025 97.7476Z" fill="#2D348C"/>
                            <path d="M29.8617 80.4584L31.9522 85.32L23.9737 88.7283L21.8832 83.8667L22.8764 83.4425L24.5024 87.2237L26.9963 86.1583L25.5315 82.7519L26.4916 82.3417L27.9564 85.7481L30.4835 84.6686L28.8575 80.8874L29.8617 80.4584Z" fill="#2D348C"/>
                            <path d="M25.4734 69.8098L24.4655 69.8266L24.3988 66.1672L25.4066 66.1504L25.4734 69.8098Z" fill="#2D348C"/>
                            </svg>

                        </div>
                        <img src={toggleStates[item.id] ? item.imgOne.url : item.imgTwo.url} alt="Toggle"  className={styles?.toggleImg}/>
                      </button>
                    </div>
                  )}

                  {/* Handle Slide-Toggle */}
                  {item.type === 'slide-toggle' && (
                    <div className={styles.imagingImageWrap} data-cursor="blackCursor">
                      <div className={styles.imageWrapper}>
                        <Image src={toggleStates[item.id] ? item.imageTwo : item.imageOne} alt="Slide Toggle" width={750} height={810} priority />
                      </div>
                      <div className={styles.toggleBtnWrapper} onClick={() => handleToggle(item.id)}>
                        <div className={`${styles.toggleBtn} ${toggleStates[item.id] ? styles.toggled : ''}`}>
                          <Image src={toggleStates[item.id] ? item.imageOne : item.imageTwo} alt="Slide Toggle" width={35} height={35} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};

export default CardStacking;
