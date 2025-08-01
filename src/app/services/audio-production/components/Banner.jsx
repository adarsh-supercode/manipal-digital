import React from 'react';
import * as styles from "../css/banner.module.css";
import AnimatedText from '@/app/components/Animation/AnimtaionTxt';

export default function Banner({banner , overview}) {
    const { heading, bgVid, poster } = banner || {};
    const { Subheading, description } = overview || {};
    return (
        <>
            <section className={styles?.AudioVisualsBanner}>
                <video
                    src={bgVid.url}
                    type="video/mp4"
                    preload="auto"
                    poster={poster.url}
                    playsInline
                    autoPlay
                    muted
                    loop
                ></video>
                <div className="container">
                    <div className={styles?.bannerTextWrap}>
                        <h1 className="heading-1 heading-1-md heading-2-sm">{heading}</h1>
                    </div>
                </div>
            </section>
            <section className={`${styles?.textWrap} vertical-padding-lg`}>
                <div className='container'>
                    <div className={styles?.IntroContent}>
                        <h2 className={`${styles?.introHeading} heading-3 heading-4-md heading-4-sm`}>{Subheading}</h2>
                        <p className={`${styles?.introDesc} text-1 text-1-md text-2-sm`}>{description}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
