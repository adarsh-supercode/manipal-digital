"use client"
import React, { useEffect, useRef } from 'react'
import styles from '../css/cardstack.module.css'
import PrimaryButton from '@/app/components/Buttons/PrimaryButton'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts';

gsap.registerPlugin(ScrollTrigger)

export default function CardStack({services}) {
  const {subTitle, title , servicesSec} = services || {}
  const isMobile = useMediaQuery('(max-width: 991px)');

  const sectionRef = useRef()
  const cardRefs = useRef([])
  const descRef = useRef([])
  const headingRef = useRef([])
  const countRef = useRef([])
  const buttonRef = useRef([])
  
  useEffect(() => {
    if (isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const desc = descRef.current;
      const heading = headingRef.current;
      const count = countRef.current;
      const button = buttonRef.current;
      const cardHeight = cards[0].offsetHeight;
      const gap = -50;
      const totalCards = cards.length;
      const scrollHeight = (cardHeight + gap) * (totalCards - 1) * 5;  

      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * (cardHeight + gap),
          scale: 1,
          zIndex: i,
          backgroundColor: '#FCDEE8',
          color: "#2D348C"
        });
        if (i === 0) {
          card.style.backgroundColor = '#2D348C'; 
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: scrollHeight,
          scrub: true,
          pin: true,
        },
      });

      let delayPerCard = 5.5; 

      cards.forEach((card, i) => {
        for (let j = i + 1; j < totalCards; j++) {
          const step = (i + 1) * delayPerCard;

          tl.to(cards[j], {
            y: (j - i - 1) * (cardHeight + gap),
            ease: 'none',
            onUpdate: () => {
              const currentY = gsap.getProperty(cards[j], "y");
              if (currentY < 40) {
                gsap.set(cards[j], { backgroundColor: '#2D348C', color: '#FCDEE8' });
                gsap.set(desc[j], { color: '#F8F8F8' });
                gsap.set(heading[j], { color: '#F8F8F8' });
                gsap.set(count[j], { color: '#F8F8F8' });
                gsap.set(button[j], { color: '#F8F8F8', backgroundColor: '', border: "1px solid #F8F8F8" });
              } else {
                gsap.set(cards[j], { backgroundColor: '#FCDEE8', color: '#2D348C' });
                gsap.set(desc[j], { color: '#2D348C' });
                gsap.set(heading[j], { color: '#2D348C' });
                gsap.set(count[j], { color: '#2D348C' });
                gsap.set(button[j], { color: '#2D348C', backgroundColor: '', border: "1px solid #2D348C" });
              }
            },
          }, step);

          if (j === i + 1) {
            tl.to(cards[i], {
              scale: 0.95,
              ease: 'none',
            }, step);
          }
        }
      });

      tl.to({}, { duration: 10 }); 
    }, sectionRef);
  
    return () => {
      ctx.revert();
    }
  }, [isMobile]); 

  return (
    <div className='padding-bottom'>
      <section ref={sectionRef} className={`${styles.cardSection}`} id="services">
        <div className='container'>
          <div className={styles.mainText}>
            <p className='text-6 text-5-sm'>{title}</p>
            <h2 className='heading-3 color-3 heading-4-sm'>{subTitle}</h2>
          </div>
          <div className={`${styles.cardStackContainer}`}>
            {servicesSec?.map((card, index) => (
              <Link  key={index} href={card.link.url} >
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${styles.cardStackWrapper} ${styles[`cardStackWrapper-${index}`]}`}
                  data-cursor="bigCursor"
                >
                  <div className={styles.textMainwrap}>
                    <div className={styles.titleWrap}>
                      <h2 className='heading-2 heading-4-sm' ref={(el) => (headingRef.current[index] = el)}>{card.title}</h2>
                      <div className={styles.cardDescWrap}>
                        <p className={`${styles.description} text-4`} ref={(el) => (descRef.current[index] = el)}>
                          {card.description}
                        </p>
                        <div ref={(el) => (buttonRef.current[index] = el)} className={styles.lightButton}>
                          <span className={styles.cbBtnCtaBorder}></span>
                          <span data-text={card.buttonLabel}>{card.link.title}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={card.thumbnail.url}
                        width={430}
                        height={255}
                        alt={card.thumbnail.alt}
                        className={styles.projectImg}
                      />
                    </div>
                  </div>
                  <div className={styles.cardCountWrap}>
                    <div>
                      <span className={`${styles.cardCount} opacity-01`} ref={(el) => (countRef.current[index] = el)}>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
