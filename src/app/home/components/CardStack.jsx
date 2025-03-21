"use client"
import React, { useEffect, useRef } from 'react'
import styles from '../css/cardstack.module.css'
import PrimaryButton from '@/app/components/Buttons/PrimaryButton'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardData = [
  {
    id: 1,
    title: 'Packaging',
    description: 'Bringing together our technical expertise and advanced technology, we transform your concept design into flawless package artwork, turning your vision to life.',
    buttonLabel: 'Know more',
    buttonLink: '#',
    image: '/assets/featured.jpg',
    projectName: 'Project name',
    featuredText: 'Featured',
  },
  {
    id: 2,
    title: 'Branding',
    description: 'Creating a cohesive brand identity that resonates with your target audience and stands out in the market.',
    buttonLabel: 'Learn more',
    buttonLink: '#',
    image: '/assets/featured.jpg',
    projectName: 'Brand name',
    featuredText: 'Featured',
  },
  {
    id: 3,
    title: 'Branding',
    description: 'Creating a cohesive brand identity that resonates with your target audience and stands out in the market.',
    buttonLabel: 'Learn more',
    buttonLink: '#',
    image: '/assets/featured.jpg',
    projectName: 'Brand name',
    featuredText: 'Featured',
  },
  {
    id: 4,
    title: 'Branding',
    description: 'Creating a cohesive brand identity that resonates with your target audience and stands out in the market.',
    buttonLabel: 'Learn more',
    buttonLink: '#',
    image: '/assets/featured.jpg',
    projectName: 'Brand name',
    featuredText: 'Featured',
  }
]

export default function CardStack() {
  const sectionRef = useRef()
  const cardRefs = useRef([])
  useEffect(() => {
    if (sectionRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%", // Increased scroll area
          scrub: 1, // Smooth scrubbing
          pin: true,
          pinSpacing:false,
          markers: true, // Debug markers
        },
      });
  
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top +=10%", 
              end: "+=50%", 
              scrub: 1,
            },
          });
  
          tl.fromTo(
            card,
            { y: 300 * (index + 1), scale: 1,  },
            {
              y: 0,
              duration: 0.1 + index * 0.2, // Add delay based on index
              ease: 'power2.out',
            }
          );
        }
      });
    }
  }, []);
  

  return (
    <div ref={sectionRef} className={`${styles.cardWrapper} container`}>
      <div className='row'>
        <div className='col-lg-6 d-flex gap-10 flex-column'>
          <p className='text-4'>WHAT WE OFFER</p>
          <h2 className='heading-3 color-3'>Capabilities that fuel your business growth</h2>
        </div>
      </div>

     <div>
     <div className={`${styles.cardStackContainer}`}>
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`${styles.cardStackWrapper} ${styles[`cardStackWrapper-${index}`]} d-flex justify-content-between`}
          >
            {/* Left Section */}
            <div>
              <div className='d-flex flex-column align-items-start'>
                <h2 className='heading-2 color-1'>{card.title}</h2>
                <p className='text-1'>{card.description}</p>
                <PrimaryButton href={card.buttonLink} label={card.buttonLabel} />
              </div>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="d-flex flex-column gap-10">
              <div className='d-flex justify-content-between'>
                <p className='text-1 color-1'>{card.featuredText}</p>
                <p className='text-1 color-1'>{card.projectName}</p>
              </div>
              <Image
                src={card.image}
                width={430}
                height={255}
                alt={card.title}
              />
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  )
}
