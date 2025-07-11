import React from 'react'
import * as styles from '../css/purpose.module.css'
export default function OurPurpose({purpose}) {
    const {mission_title,mission_description ,vision_description,vision_title}=purpose || {};
  return (
    <section className={styles?.purposeSection} id="purpose">
       <div className='container'>
            <div className={styles?.purposeContentContainer}>
                <div className={styles?.purposeContentWrap}>
                    <div className={styles?.purposeContent}>
                        <p className='text-6 uppercase opacity-06 text-6-md'>{mission_title}</p>
                        <p className={`${styles?.purposeContentdesc} heading-4 heading-5-md text-1-sm `}>{mission_description}</p>
                    </div>
                    <div className={styles?.horizontalLine}></div>
                </div>
                <div className={styles?.verticalLine}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="50" viewBox="0 0 2 50" fill="none">
                     <path d="M1 0V50" stroke="black" strokeWidth="0.8" strokeDasharray="6 6"/>
                    </svg>
                </div>
                <div className={styles?.purposeContentWrap}>
                    <div className={styles?.horizontalLine}></div>
                    <div className={styles?.purposeContent}>
                        <p className='text-6 uppercase opacity-06 text-6-md'>{vision_title}</p>
                        <p className={`${styles?.purposeContentdesc} heading-4 heading-5-md text-1-sm `}>{vision_description}</p>
                    </div>
                </div>
            </div>
       </div>
    </section>
  )
}
