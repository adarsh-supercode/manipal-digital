import React from 'react'
import { generateSEO } from '@/utilities/helper';
import * as styles from "./privacy.module.css"
export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}431?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { // 'ok' checks if the status is between 200-299
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "privacy",
        description: "privacy page",
      },
    });
  } else {
    return {};
  }
}


export default async function Page() {
    try {
      const response = await fetch(
        `${process.env.SERVER_PAGE_URL}431?acf_format=standard`,
        {
          next: { revalidate: 60 },
        }
      );
      const data = await response.json();
  
      if (data && data.title && data.title.rendered) {
        return (
          <div className={styles?.ContentMainwrap}>
            <div className={styles?.PrivacyWrap}>
              <div className="container">
                <h1 className="heading-1 heading-2-md heading-1-sm">{data.title.rendered}</h1>
                <div className={styles?.privacyContentWrap}>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.content.rendered }}
                    className={styles?.privacyContent}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <div>No Data Found</div>;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return <div>Something went wrong</div>;
    }
  }