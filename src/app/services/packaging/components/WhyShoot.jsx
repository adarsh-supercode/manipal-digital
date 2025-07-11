import React from 'react'
import * as styles from '../css/whyshoot.module.css'

export default function WhyShoot() {
  return (
    <section>
        <div className='container'>
            <div className={`${styles?.WhyShootContentWrap} vertical-padding-xl`}>
                <h3 className={`${styles?.WhyShootContentTitle} heading-3`}>Why shoot? When you can create</h3>
                <p className={`${styles?.WhyShootContentDesc} heading-6`}>CGI and digital 3D rendering services delivers perfect photorealistic brand assets and product imagery which can be used right across the brand activation landscape - digital and eCommerce channels, social media and on pack.</p>
            </div>
        </div>
    </section>
  )
}
