import React from 'react'
import Banner from './components/Banner'
import OurPurpose from './components/OurPurpose'
import Leadership from './components/Leadership'
import OurClients from './components/OurClients'
import Principles from './components/Principles'
import AboutFutureVision from './components/AboutFutureVision'

export default function About({data}) {
  const{leadership,banner,clients,purpose,legacyBuilt,culture}=data ||{}
  return (
    <div>
        <Banner banner={banner}/>
        <OurClients clients={clients}/>
        <OurPurpose purpose={purpose}/>
        <Leadership leadership={leadership}/>
        <Principles legacyBuilt={legacyBuilt}/>
        <AboutFutureVision culture={culture}/>
    </div>
  )
}
