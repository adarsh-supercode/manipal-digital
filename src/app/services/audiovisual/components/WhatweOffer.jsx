"use client";
import GsapSwiper from '@/app/components/Sliders/GsapSwiper'
import React from 'react'
import { useMediaQuery } from "usehooks-ts";
import Slider from '@/app/components/Sliders/Slider';

export default function WhatweOffer({offer}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
    <div> 
          {isDesktop ? (
           <GsapSwiper title="WHAT WE OFFER" subtitle="Motion graphics" bgVideo="/assets/leadership-principle-bg.webm" slides={offer.slider} />
          ) : (
            <Slider  title="WHAT WE OFFER" subtitle="Motion graphics" bgVideo="/assets/leadership-principle-bg.webm" slides={offer.slider}  />
          )}
    </div>
    </>
  )
}
