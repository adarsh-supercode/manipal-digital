import React from 'react'
import Contact from './Contact'
import { generateSEO } from '@/utilities/helper';

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}117?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { 
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "Contact Us",
        description: "Our Contact page",
      },
    });
  } else {
    return {};
  }
}



export default async function page() {
    try {
      let response = await fetch(
        `${process.env.SERVER_PAGE_URL}117?acf_format=standard`,
        {
          next: { revalidate: 60 },
        }
      ).then((res) => res.json());
      if (response) {
        return <Contact data={response?.acf} />;
      } else {
        return <div>no Data found</div>;
      }
    } catch (error) {
      console.log(error, "error");
    }
}

