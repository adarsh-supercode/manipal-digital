import React from 'react'
import * as styles from "../css/banner.module.css"
import Link from 'next/link'
export default function Banner({banner}) {
  const {heading,description,button,bgVideo, poster}=banner || {}
  return (
    <section className={styles?.aboutBannerSection}>
      <video src={bgVideo.url}        
        type="video/mp4"
        preload="auto"
        poster={poster.url}
        playsInline
        autoPlay
        muted
        loop></video>
      <div className={styles?.contentWrap}>
        <div className='container'>
          <div className={`${styles?.bannerContentWrap} `}>
            <h1 className='heading-5 heading-1-md heading-1-sm'>{heading}</h1>
            <div className={styles?.bannerContentDescWrap}>
              <div className={styles?.bannerContentDesc}>
              <p
                className={`${styles?.bannerText} text-4 text-4-md text-3-sm`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
                <Link className={styles?.aboutbannerBtn} href={button.url}  scroll={true}>{button.title}<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <circle cx="17" cy="17" r="17" fill="white"/>
                  <path d="M7.51562 17.1266H25.9939M25.9939 17.1266L20.5736 11.7063M25.9939 17.1266L20.5736 22.5469" stroke="black"/>
                </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
