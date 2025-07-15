import React from 'react'
import AudioProduction from './components/AudioProduction'
import { generateSEO } from '@/utilities/helper'

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}1077?acf_format=standard`
    , {
      next: { revalidate: 60 },
    });

  if (res.ok) {
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "CGI Services",
        description: "Explore our CGI services and offerings.",
      },
    });
  } else {
    return {};
  }
}

export default async function page() {
 
   try {
      const response = await fetch(
        `${process.env.SERVER_PAGE_URL}1077?acf_format=standard`,
        {
          next: { revalidate: 60 },
        }
      );
  
      if (!response.ok) {
        return <div>Failed to load data</div>;
      }
  
      const data = await response.json();
      return (
          <AudioProduction data={data?.acf} />
      );
    } catch (error) {
      console.error('Fetch error:', error);
      return <div>Error loading data</div>;
    }
}
