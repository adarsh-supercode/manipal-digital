import React from 'react'
import Banner from './components/Banner'
import Industries from './components/Industries'
import { generateSEO } from '@/utilities/helper';

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}118?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { 
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "Our Portfolio",
        description: "Our Portfolio page",
      },
    });
  } else {
    return {};
  }
}


export default async function page() {

    try {
      let response = await fetch(
        `${process.env.SERVER_PAGE_URL}118?acf_format=standard`,
        {
          next: { revalidate: 60 },
        }
      ).then((res) => res.json());
      if (response) {
        return (
            <div>
      <Banner data={response?.acf}/>
      <Industries/>
    </div>
    );
      } else {
        return <div>no Data found</div>;
      }
    } catch (error) {
      console.log(error, "error");
    }
}
