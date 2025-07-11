'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import styles from '../css/textAnimate.module.css'
import { Canvas } from '@react-three/fiber'
import PrimaryButton from '@/app/components/Buttons/PrimaryButton'
import AnimatedText from '@/app/components/Animation/AnimtaionTxt'
import { LogoModel } from '@/app/components/Models/LogoModel'
import { OrbitControls } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger)

export default function TextAnimate() {



  return (
    <div className='container padding-bottom-xl'>
      <div className='row gap-40'>
        <div  className={`${styles.modelWrapper} logoContainer col-lg-4`}>
        </div>
        <div className={`${styles?.animateTextWrap} col-lg-6 mt-4 d-flex flex-column gap-50 align-items-start`}>
          <AnimatedText
            text="Manipal Digital brings nearly two decades of experience in visual exellence and technical expertise on print and digital media to give your brand the kind of visual impact and appeal that customers simply cannot resist - whether on a screen or a shelf."
            className={`${styles.textWrap} heading-4 heading-5-md heading-4-sm`}
          />
          <PrimaryButton label={"What We do"} href="#services" blueButton={true}/>
        </div>
      </div>
    </div>
  )
}
