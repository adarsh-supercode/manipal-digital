import React from 'react'
import ImagingMain from './components/ImagingMain'
import { generateSEO } from '@/utilities/helper'

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}158?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

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


export default async function Page() {
     try {
        const response = await fetch(
          `${process.env.SERVER_PAGE_URL}158?acf_format=standard`,
          {
            next: { revalidate: 60 },
          }
        );
    
        if (!response.ok) {
          return <div>Failed to load data</div>;
        }
    
        const data = await response.json();
        return (
            <ImagingMain data={data?.acf} />
        );
      } catch (error) {
        console.error('Fetch error:', error);
        return <div>Error loading data</div>;
      }
}
