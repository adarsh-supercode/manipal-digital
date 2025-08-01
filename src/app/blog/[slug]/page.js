import BlogInnerpage from './BlogInnerpage';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog?acf_format=standard`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.map((item) => ({
    slug: item.slug,
  }));
}

async function getTerms(ids, type) {
  return Promise.all(
    ids.map(id =>
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${type}/${id}`).then(res => res.json())
    )
  );
}

async function getblogBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog?slug=${slug}&acf_format=standard&_embed`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const blog = data[0];

  if (!blog) return null;

  const industryTerms = await getTerms(blog.industry || [], 'industry');
  const serviceTerms = await getTerms(blog.service || [], 'service');

  return {
    ...blog,
    industryTerms,
    serviceTerms,
  };
}

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getblogBySlug(slug);

  if (!blog) {
    return {
      title: 'blog Not Found - Manipal Digital',
      description: 'The blog item you are looking for is not available.',
    };
  }

  const decodedTitle = blog.title.rendered.replace(/&#(\d+);/g, (match, num) => String.fromCharCode(num));

  return {
    title: `${decodedTitle} - Manipal Digital`,
    description: blog.description || "Explore the blog of Manipal Digital.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


async function getAllOurWorkPostsWithTerms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog?_embed&acf_format=standard`, {
    next: { revalidate: 60 },
  });
  const posts = await res.json();

  const enriched = await Promise.all(
    posts.map(async (post) => {
      const industryTerms = await getTerms(post.industry || [], 'industry');
      const serviceTerms = await getTerms(post.service || [], 'service');

      return {
        ...post,
        industryTerms,
        serviceTerms,
      };
    })
  );

  return enriched;
}

export default async function Detail({ params }) {
  const { slug } = await params;

  const blog = await getblogBySlug(slug);
  const allOurWorkPosts = await getAllOurWorkPostsWithTerms();

  if (!blog) return <div>blog not found</div>;

  return <BlogInnerpage blog={blog} allPosts={allOurWorkPosts} />;
}
