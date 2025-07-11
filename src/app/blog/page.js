import React from 'react'
import InsightBanner from './components/Banner'
import Blogs from './components/Blogs'
import { generateSEO } from '@/utilities/helper';

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}671?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { 
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "Insights & Trends",
        description: "Insights & Trends page",
      },
    });
  } else {
    return {};
  }
}


export default async function page() {
      try {
        let response = await fetch(
          `${process.env.SERVER_PAGE_URL}671?acf_format=standard`,
          {
            next: { revalidate: 60 },
          }
        ).then((res) => res.json());
        if (response) {
          return (
              <div>
        <InsightBanner data={response?.acf}/>
         <Blogs/>
      </div>
      );
        } else {
          return <div>no Data found</div>;
        }
      } catch (error) {
        console.log(error, "error");
      }
}