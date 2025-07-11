import React from 'react'
import * as styles from "../css/industry.module.css"
import Link from 'next/link'


export default function Industry({content}) {
    const {title,subTitle ,cards} = content || {};
return (
    <section className={`${styles?.industrySection} padding-bottom-xl`}>
        <div className='container'>
            <div className={styles?.industrytitleWrap}>
                <p className="text-6 text-6-md text-5-sm uppercase">{title}</p>
                <h2 className={`${styles?.industryHeading} heading-3 heading-4-md heading-4-sm`}>{subTitle}</h2>
            </div>
            <div className={styles?.IndustrycardWrap}>
            {cards?.map((data, index) => (
            <Link key={index} href={data.link?.url || "#"}>
              <div className={styles?.Industrycard} data-cursor="bigCursor">
                <img
                  src={data.image?.url || "/placeholder.jpg"}
                  alt={data.Title || "Industry"}
                  className={styles?.IndustrycardImg}
                />
                <div className={styles?.IndustrycardContent}>
                  <p className={`${styles?.IndustrycardContentTitle} heading-4 text-3-md heading-4-sm`}>
                    {data.Title}
                  </p>
                  {data.link?.title && (
                    <div className={styles?.readMoreBtn}>
                      <span className={styles?.cbBtnCtaBorder}></span>
                      <span data-text={data.link.title}>{data.link.title}</span>
                    </div>
                  )}
                </div>
                <div className={styles?.cardGradient}></div>
              </div>
            </Link>
          ))}
            </div>
        </div>
    </section>
)
}
