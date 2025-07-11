"use client"
import React, { useEffect } from 'react';
import Banner from './components/Banner';
import OurClients from './components/OurClient';
import IndustriesCategoryTabs from './components/IndustriesCategoryTabs';
import IndustrySection from './components/IndustrySection';
import { useSearchParams } from "next/navigation";

export default function Industries({data}) {
  console.log('data: ', data);
  const { banner, industries, clients } = data || {};
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay to allow rendering
      }
    }
  }, [searchParams]);
  return (
    <div>
      <Banner banner={banner} />
      <OurClients clients={clients}/>
      <IndustriesCategoryTabs industries={industries} />
 {industries?.types?.map((industry, index) => (
  <IndustrySection
    key={index}
    id={industry.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
    title={industry.heading}
    description={industry.description}
    videoSrc={industry.video?.url || ''} 
    poster={industry.bgImg?.url || ''} 
    subDescription={industry.subDesp}
  />
))}

    </div>
  );
}