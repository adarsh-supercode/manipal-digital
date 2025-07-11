import React from 'react'
import Banner from './Banner'
import TextAnimate from './TextAnimate'
import Slider from './Slider'
import Whatsets from './Whatsets'
import VideoSection from '@/app/components/VideoSection/VideoSection'


export default function ({data}) {
  const { banner, overview,services, showreel, advantage } = data || {};
  
  return (
    <div>
      <Banner banner={banner}/>
      <TextAnimate overview={overview}/>
      <Slider services={services}/>
      <VideoSection videoSrc={showreel.video.url} poster="/assets/packaging-showreel-thumbnail.jpg"/>
      <Whatsets advantage={advantage}/>
    </div>
  )
}
