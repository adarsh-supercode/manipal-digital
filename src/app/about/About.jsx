import React from 'react'
import Banner from './components/Banner'
import OurPurpose from './components/OurPurpose'
import Leadership from './components/Leadership'
import OurClients from './components/OurClients'
import Principles from './components/Principles'
import AboutFutureVision from './components/AboutFutureVision'

export default function About({data}) {
  const{leadership,}=data ||{}
  console.log(data,"about")
  return (
    <div>
        <Banner/>
        <OurClients/>
        <OurPurpose/>
        <Leadership leadership={leadership}/>
        <Principles/>
        <AboutFutureVision/>
    </div>
  )
}
