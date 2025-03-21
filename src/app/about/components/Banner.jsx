import React from 'react'
import * as styles from "../css/banner.module.css"
import Link from 'next/link'
export default function Banner() {
  return (
    <section className={styles?.aboutBannerSection}>
      <div className='container'>
        <div className={`${styles?.bannerContentWrap} `}>
          <h1 className='heading-1'>Bringing Stories to Life</h1>
          <div className={styles?.bannerContentDesc}>
            <p className={`${styles?.bannerText} text-1`}>Over 12 years of delivering disruptive, effective and meaningful content and tech solutions supporting the digital transformation of brands</p>
            <Link className={styles?.aboutbannerBtn} href={"#"}>Let’s know more<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <circle cx="17" cy="17" r="17" fill="#F8F8F8"/>
                  <path d="M16.7543 7.88489V26.3631M16.7543 26.3631L22.1746 20.9429M16.7543 26.3631L11.334 20.9429" stroke="black"/>
                </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
