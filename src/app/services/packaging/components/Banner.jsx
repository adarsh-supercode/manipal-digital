
import React from 'react'
import styles from '../css/banner.module.css'

export default function Banner({banner}) {
    const { heading, bgVid, poster } = banner || {};
  return (
                <section className={styles.packagingBanner}>
                    <video
                        src={bgVid.link}
                        type="video/mp4"
                        preload="auto"
                        poster={poster.url}
                        playsInline
                        autoPlay
                        muted
                        loop
                    ></video>
                    <div className="container">
                        <div className={styles.bannerTextWrap}>
                            <h1 className="heading-1 heading-1-md">{heading}</h1>
                        </div>
                    </div>
                </section>
  )
}
