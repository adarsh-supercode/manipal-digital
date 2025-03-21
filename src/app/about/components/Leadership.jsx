import React from 'react'
import * as styles from "../css/leadership.module.css"
import Link from 'next/link'
export default function Leadership({leadership}) {
  const{title,heading,leader_informations}=leadership||{}
  return (
    <section className={styles?.LeadershipSection}>
        <div className='container'>
           <div className={styles?.titleWrap}>
            <p className='text-4 uppercase'>{title}</p>
            <p className={`${styles?.LeadershipHeading} heading-4`}>{heading}</p>
           </div>
           <div className={styles?.leadersWrap}>
            {leader_informations.map((info, index) => (
              <div key={index} className={styles?.leaderCard}>
                 <div className={styles?.leaderImg}>
                  <img src={info.image.url}/>
                  <div className={styles?.leaderLinkedin}>
                    <Link href={info.linkedin.url}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M0.317024 8.1314H5.67482V25H0.317024V8.1314ZM3.03179 0C1.19804 0 0 1.25952 0 2.91267C0 4.53183 1.16298 5.82796 2.96167 5.82796H2.99583C4.86464 5.82796 6.02845 4.53177 6.02845 2.91267C5.99339 1.25952 4.8647 0 3.03179 0ZM18.8297 7.73514C15.9857 7.73514 14.7116 9.37173 14.0008 10.5195V8.1314H8.64143C8.71238 9.71387 8.64143 25 8.64143 25H14.0008V15.5794C14.0008 15.0748 14.0359 14.5721 14.1769 14.2107C14.5649 13.2035 15.4467 12.1604 16.9258 12.1604C18.8664 12.1604 19.6414 13.708 19.6414 15.9746V24.9999H25V15.3272C25 10.1459 22.357 7.73514 18.8297 7.73514Z" fill="white"/>
                  </svg></Link>
                  </div>
                 </div>
                 <div className={styles?.leaderDetails}>
                  <p className={`${styles?.leaderName} heading-7`}>{info.name}</p>
                  <p className={`${styles?.leaderPosition} text-1 opacity-05`}>{info.position}</p>
                 </div>
               </div>
            ))}
           </div>
        </div>
    </section>
  )
}