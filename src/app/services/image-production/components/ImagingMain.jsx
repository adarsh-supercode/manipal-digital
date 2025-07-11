"use client";
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import React from 'react'
import Banner from './Banner'
import WhyShoot from './WhyShoot'
import WhatWeOffer from './WhatWeOffer'
import VideoSection from '@/app/components/VideoSection/VideoSection'
import Whatsets from './Whatsets'
import CardStacking from './CardStacking';


export default function ImagingMain({data}) {
  console.log('data: ', data);
  const {banner, overview, offer,showreel, advantage} = data || {};
  return (
    <>
    <Banner banner={banner}/>
    <WhyShoot overview={overview}/>
    <CardStacking offer={offer}/>
    {/* <WhatWeOffer/> */}
    <VideoSection videoSrc={showreel.video.url} poster='/assets/imaging-showreel-thumbnail.jpg'/>
    <Whatsets advantage={advantage}/>
    </>
  )
}
