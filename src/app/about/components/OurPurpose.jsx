import React from 'react'
import * as styles from '../css/purpose.module.css'
export default function OurPurpose() {
  return (
    <section className={styles?.purposeSection}>
       <div className='container'>
            <div className={styles?.purposeContentContainer}>
                <div className={styles?.purposeContentWrap}>
                    <div className={styles?.purposeContent}>
                        <p className='text-4 uppercase'>OUR MISSION</p>
                        <p className='heading-4'>We bring brand stories to life with designs that connect and inspire.</p>
                    </div>
                    <div className={styles?.horizontalLine}></div>
                </div>
                <div className={styles?.purposeContentWrap}>
                    <div className={styles?.horizontalLine}></div>
                    <div className={styles?.purposeContent}>
                        <p className='text-4 uppercase'>OUR VISION</p>
                        <p className='heading-4'>To shape digital experiences that make every brand unforgettable</p>
                    </div>
                </div>
            </div>
       </div>
    </section>
  )
}
