"use server";
import React from "react";
import Homepage from "./home/Homepage";
import { generateSEO } from "@/utilities/helper";

export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}9?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { // 'res.ok' checks for 200-299 status codes
    const data = await res.json();

    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "Manipal Digital",
        description: "",
      },
    });
  } else {
    return {};
  }
}


export default async function page() {
  try {
    let response = await fetch(
      `${process.env.SERVER_PAGE_URL}9?acf_format=standard`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
  
    if (response) {
      return <Homepage data={response?.acf} />;
    } else {
      return <div>no Data found</div>;
    }
  } catch (error) {
    console.log(error, "error");
  }
}
