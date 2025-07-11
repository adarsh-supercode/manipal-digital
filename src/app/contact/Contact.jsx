import React from 'react'
import ContactForm from '../components/ContactForm'
import * as styles from "./contact.module.css"
import Link from 'next/link'
export default function Contact({data}) {
    const { content } = data || {};
    
  return (
    <section className={styles?.contactSec}>
        <div className='container'>
            <div className={styles?.contactWrap}>
                <div className={styles?.leftWrap}>
                    <div className={styles?.contactTitleWrap}>
                    <p className='text-1 text-2-md text-1-sm'>{content.title}</p>
                    <h1 className='heading-2 heading-2-md heading-2-sm'>{content.heading}</h1>
                    </div>
                    <Link className={styles?.mailToWrap} href={`mailto:${content.email}`} >
                        <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <g clipPath="url(#clip0_985_1681)">
                                    <rect width="60" height="60" rx="4" fill="url(#paint0_linear_985_1681)"/>
                                    <path d="M15 21.3404C15 20.469 15.3512 19.6332 15.9763 19.0171C16.6014 18.4009 17.4493 18.0547 18.3333 18.0547H41.6667C42.5507 18.0547 43.3986 18.4009 44.0237 19.0171C44.6488 19.6332 45 20.469 45 21.3404V37.769C45 38.6404 44.6488 39.4761 44.0237 40.0923C43.3986 40.7085 42.5507 41.0547 41.6667 41.0547H18.3333C17.4493 41.0547 16.6014 40.7085 15.9763 40.0923C15.3512 39.4761 15 38.6404 15 37.769V21.3404Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 21.0547L30 31.0547L45 21.0547" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_985_1681" x1="4" y1="2" x2="50.5" y2="55" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#F05A8C"/>
                                    <stop offset="1" stopColor="#2D348C"/>
                                    </linearGradient>
                                    <clipPath id="clip0_985_1681">
                                    <rect width="60" height="60" rx="4" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={styles?.emailWrap}>
                            <p>Email us</p>
                            <p className="">{content.email}</p>
                        </div>
                    </Link>
                </div>
                <ContactForm/>
            </div> 
      </div>   
    </section>
  )
}
