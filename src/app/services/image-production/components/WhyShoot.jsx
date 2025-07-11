import React from 'react'
import * as styles from '../css/whyshoot.module.css'
import AnimatedText from '@/app/components/Animation/AnimtaionTxt'
export default function WhyShoot({overview}) {
  const {Subheading, description} = overview || {};
  return (
    <section>
        <div className='container'>
            <div className={`${styles?.imagingWhyShootContentWrap} vertical-padding-xl`}>
                <h3 className={`${styles?.imagingWhyShootContentTitle} heading-3 heading-4-md heading-4-sm `}>{Subheading}</h3>
                <p className={`${styles?.imagingWhyShootContentDesc} text-1 text-1-md text-2-sm`}>{description}</p>
            </div>
        </div>
    </section>
  )
}
