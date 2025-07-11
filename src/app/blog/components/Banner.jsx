import React from 'react'
import * as styles from "../component.module.css"
export default function InsightBanner({data}) {
  const { content } = data || {};
  return (
    <section className={`${styles?.Section} padding-top-xl padding-bottom-sm`}>
      <div className='container'>
        <div className={styles?.titleWrap}>
          <div className={styles?.titleContent}>
            <p className='text-4 text-4-md uppercase text-5-sm'>{content.title}</p>
            <h1 className={`${styles?.heading} heading-2 heading-3-md heading-4-sm`}>{content.heading}</h1>
          </div>
          <div>
            <p className={`${styles?.titledesc} text-1 text-1-md text-4-sm`}>
               {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
