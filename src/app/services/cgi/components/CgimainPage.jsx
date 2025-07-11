import React from 'react';
import WhyShoot from './WhyShoot';
import WhatweOffer from './WhatweOffer';
import Whatsets from './Whatsets';
import Banner from './Banner';



export default function CgimainPage({data}) {
  const {banner, overview, services, advantage} = data|| {};
  return (
    <>
      <Banner banner={banner}/>
      <WhyShoot  overview={overview}/>
      <WhatweOffer services={services} />
      <Whatsets advantage={advantage}/>
    </>
  );
}
