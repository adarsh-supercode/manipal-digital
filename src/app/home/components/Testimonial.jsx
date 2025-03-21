import React from 'react'
import styles from '../css/textAnimate.module.css'
import Image from 'next/image'

export default function Testimonial() {
  return (
    <div className='container'>
        <div>
            <div className={`${styles.testimonialContent} d-flex gap-30`}>
                <div>
                    <h2 className='heading-4 color-1'>We are shaping a future where innovative design, quality, and speed come together to create compelling visual experiences. </h2>
                    <span>
                        <Image
                            src="/assets/profile.png"
                            width={67}
                            height={67}
                            alt='Play Button'
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
