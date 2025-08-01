import React from 'react'
import Banner from './Banner'
import Whatsets from './Whatsets'
import Slider from './Slider'

export default function AudioVisualsmain({data}) {
  const {banner, overview, advantage, offer, what_offer } = data || {};
  console.log('what_offer: ', what_offer);
  return (
    <>
    <div>
      <Banner banner={banner} overview={overview}/>
      <Slider offer={what_offer}/>
      <Whatsets advantage={advantage}/>
    </div>
    </>
  )
}