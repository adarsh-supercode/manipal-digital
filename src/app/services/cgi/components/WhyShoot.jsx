import React from 'react'
import * as styles from '../css/whyshoot.module.css'
import AnimatedText from '@/app/components/Animation/AnimtaionTxt'
export default function WhyShoot({overview}) {
  const {heading, description} = overview || {};
  return (
    <section>
        <div className='container'>
            <div className={`${styles?.WhyShootContentWrap} vertical-padding-xl`}>
                <h3 className={`${styles?.WhyShootContentTitle} heading-3 heading-4-md heading-4-sm`}>{heading}</h3>
                <p className={`${styles?.WhyShootContentDesc} text-1 text-1-md text-2-sm`}>{description}</p>
            </div>
        </div>
    </section>
  )
}
