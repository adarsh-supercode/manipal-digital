import React from 'react'
import Banner from './Banner'
import WhatweOffer from './WhatweOffer'
import WhatsetApart from './WhatsetApart'
import VideoSection from '@/app/components/VideoSection/VideoSection'

export default function AudioVisualsmain({data}) {
  const {banner, overview, showreel, advantage, offer } = data || {};
  return (
    <>
    <div>
      <Banner banner={banner} overview={overview}/>
      <WhatweOffer offer={offer}/>
      {/* <VideoSection videoSrc={showreel.video.url}/> */}
      <WhatsetApart advantage={advantage}/>
    </div>
    </>
  )
}