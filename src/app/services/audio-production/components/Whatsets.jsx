"use client"
import React, { useState } from 'react'
import * as styles from "../../cgi/css/whatsets.module.css"
import Link from 'next/link'
import WhatsetsSection from '@/app/components/Sections/WhatSetsSec';
export default function Whatsets({advantage}) {
      const { title, heading, description, advantages ,video} = advantage || {};
      
  return (
    <section className={`${styles?.whatsSetsec} vertical-padding-lg`}>
        <div className='container'>
            <div className={styles?.titleWrap}>
              <p className='text-4 uppercase text-5-sm  text-6-md'>{title}</p>
              <div className={styles?.cgisecContent}>
                  <h2 className={`${styles?.imagingsecHeading} heading-3 heading-4-sm heading-4-md`}>{heading}</h2>
                  <p className={`${styles?.imagingsecDesc} text-4 text-4-sm text-5-md`}>{description}</p>
              </div>
            </div>
            <WhatsetsSection data={advantages} video={video} NoneBgclr={true} />
        </div>
    </section>
  )
}
