import { Suspense } from 'react';
import Industries from './Industries';
import { generateSEO } from '@/utilities/helper';



export async function generateMetadata() {
  const res = await fetch(
    `${process.env.SERVER_PAGE_URL}394?acf_format=standard`, {
      next: { revalidate: 60 },
    }
  );

  if (res.ok) { // 'ok' checks if the status is between 200-299
    const data = await res.json();
    const seoData = data?.yoast_head_json || null;

    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: "Industries",
        description: "Industry page",
      },
    });
  } else {
    return {};
  }
}

export default async function IndustriesPage() {
  try {
    const response = await fetch(
      `${process.env.SERVER_PAGE_URL}394?acf_format=standard`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return <div>Failed to load data</div>;
    }

    const data = await response.json();
    return (
      <Suspense fallback={null}>
        <Industries data={data?.acf} />
      </Suspense>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return <div>Error loading data</div>;
  }
}

