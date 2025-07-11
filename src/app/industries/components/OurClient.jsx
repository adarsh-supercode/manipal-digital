import LogoSlider from '@/app/components/Marquee/LogoSlider'
import React from 'react'

export default function OurClients({clients}) {
  return (
    <div>
      <LogoSlider label={clients.heading}/>
    </div>
  )
}
