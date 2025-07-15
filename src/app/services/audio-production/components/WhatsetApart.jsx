import React from 'react'
import * as styles from "../css/whatsetapart.module.css"
import Image from 'next/image'

export default function WhatsetApart({advantage}) {
  const { heading, description, title ,advantages} = advantage || {};
  return (
    <section className={`${styles?.WhatsetWrap} vertical-padding-lg`}>
        <div className='container'>
            <div className={styles?.textWrap}>
                <p className='text-6 text-6-md uppercase text-5-sm'>{title}</p>
                <div className={styles?.advantageContent}>
                   <p className={`${styles?.textWrapTitle} heading-3 heading-4-md heading-4-sm`}>{heading}</p>
                   <p className={`${styles?.textWrapDesc} text-4 text-5-md text-4-sm`}>{description}</p>
                </div>
            </div>
           <div className={styles?.impactCardWrap}>
            {advantages.map((item, index) => (
              <div className={styles?.impactCard} key={index}>
                  <Image
                  width={48}
                  height={48}
                  src={item.image.url || " "}
                  alt={item.image.alt || "Result Icon"}
                  />
                <div className={styles?.impactCardContent}>
                  <p className="text-3">{item.title}</p>
                  <p className={`${styles?.impactDesc} text-4`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
