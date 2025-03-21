import React from 'react'
import About from './About'
import { generateSEO } from '@/utilities/helper';

export async function generateMetadata() {
  let response = await fetch(
    `${process.env.SERVER_PAGE_URL}116?acf_format=standard`
  ).then((res) => res.json());
  if (response.status == 200) {
    let data = response.data;
    let seoData = data?.yoast_head_json || null;
    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "About",
        description: "About page",
      },
      // mySEO: {
      //   verification: {
      //     google: "pFosOmh9sSrW01r3Ah_E33P8U82t07Zc-dmngdVexj4",
      //   },
      // },
    });
  } else {
    return {};
  }
}

export default async function page() {
  try {
    let response = await fetch(
      `${process.env.SERVER_PAGE_URL}116?acf_format=standard`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    if (response) {
      return <About data={response?.acf} />;
    } else {
      return <div>no Data found</div>;
    }
  } catch (error) {
    console.log(error, "error");
  }
}