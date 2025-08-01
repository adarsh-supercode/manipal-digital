import Innerpage from './Innerpage';

export const revalidate = 60; // Regenerate every 60s (ISR)

// Generate static paths
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/our-portfolio?acf_format=standard`, {
    next: { revalidate: 60 }
  });
  
  const data = await res.json();

  return data.map(item => ({ slug: item.slug }));
}

// Helper to batch-fetch terms
async function getTerms(ids, type) {
  if (!ids.length) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${type}?include=${ids.join(',')}`,
    {
      next: { revalidate: 60 },
      cache: 'force-cache',
    }
  );
  return res.json();
}

// Fetch all posts and enrich them with shared term lookups
async function getAllOurWorkPostsWithTerms() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/our-portfolio?_embed&acf_format=standard`,
    {
      next: { revalidate: 60 },
      cache: 'force-cache',
    }
  );
  const posts = await res.json();

  const allIndustryIds = [...new Set(posts.flatMap(p => p.industry || []))];
  const allServiceIds = [...new Set(posts.flatMap(p => p.service || []))];

  const [allIndustryTerms, allServiceTerms] = await Promise.all([
    getTerms(allIndustryIds, 'industry'),
    getTerms(allServiceIds, 'service'),
  ]);

  const mapTerms = (ids, terms) =>
    ids.map(id => terms.find(term => term.id === id)).filter(Boolean);

  return posts.map(post => ({
    ...post,
    industryTerms: mapTerms(post.industry || [], allIndustryTerms),
    serviceTerms: mapTerms(post.service || [], allServiceTerms),
  }));
}

// Fetch only the needed portfolio item
async function getPortfolioBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/our-portfolio?slug=${slug}&_embed&acf_format=standard`, {
    next: { revalidate: 60 },
  });
  const [portfolio] = await res.json();
  return portfolio;
}

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const portfolio = await getPortfolioBySlug(slug);
  console.log('portfolio: ', portfolio?.title);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found - Manipal Digital',
      description: 'The portfolio item you are looking for is not available.',
    };
  }

  const decodedTitle = portfolio.title.rendered.replace(/&#(\d+);/g, (match, num) => String.fromCharCode(num));

  return {
    title: `${decodedTitle} - Manipal Digital`,
    description: portfolio.description || "Explore the portfolio of Manipal Digital.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/our-portfolio/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


// Detail Component
export default async function Detail({ params }) {
  const { slug } = await params;

  const portfolio = await getPortfolioBySlug(slug);
  const allPosts = await getAllOurWorkPostsWithTerms();

  if (!portfolio) return <div>Portfolio not found</div>;

  const [industryTerms, serviceTerms] = await Promise.all([
    getTerms(portfolio.industry || [], 'industry'),
    getTerms(portfolio.service || [], 'service'),
  ]);

  portfolio.industryTerms = industryTerms;
  portfolio.serviceTerms = serviceTerms;

  return <Innerpage portfolio={portfolio} allPosts={allPosts} />;
}
