'use client';
import * as styles from "../components.module.css";

export default function Banner({data}) {
  const { content } = data || {};

  return (
    <section className={`${styles?.portfolioSection} padding-top-xl`}>
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
  );
}
