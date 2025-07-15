import React from 'react'
import Banner from './Banner'
import WhatweOffer from './WhatweOffer'
import WhatsetApart from './WhatsetApart'
import VideoSection from '@/app/components/VideoSection/VideoSection'
import Whatsets from './Whatsets'
import Slider from './Slider'

export default function AudioVisualsmain({data}) {
  const {banner, overview, showreel, advantage, offer, what_offer } = data || {};
  return (
    <>
    <div>
      <Banner banner={banner} overview={overview}/>
      {/* <WhatweOffer offer={offer}/> */}
      {/* <VideoSection videoSrc={showreel.video.url}/> */}
      {/* <WhatsetApart advantage={advantage}/> */}
      <Slider offer={what_offer}/>
      <Whatsets advantage={advantage}/>
    </div>
    </>
  )
}