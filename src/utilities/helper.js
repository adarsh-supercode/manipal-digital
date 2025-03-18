export function generateSEO({ seo = {}, defaultSEO = {}, mySEO = {} }) {
  const {
    title: defaultTitle = "Get all exicting detailes about the Manipal digital",
    description:
      defaultDescription = "By automating routine processes and supporting highly complex valuation processes, we give alternative investment funds unparalleled clarity and liberate investment professionals to create more value.",
  } = defaultSEO;

  const {
    title = defaultTitle,
    description = defaultDescription,
    og_title = title,
    og_description = description,
    og_url = `${process.env.NEXT_PUBLIC_BASE_URL}`,
    og_image = "/favicon.svg",
    twitter_card = "summary_large_image",
    twitter_title = title,
    twitter_description = description,
    twitter_image = "/favicon.svg",
  } = seo;

  return {
    title,
    description,
    ...mySEO,
    openGraph: {
      title: og_title,
      description: og_description,
      url: og_url,
      images: [
        {
          url: Array.isArray(og_image) ? og_image[0]?.url : og_image,
          alt: title || "Manipal digital",
        },
      ],
    },
    twitter: {
      card: twitter_card,
      title: twitter_title,
      description: twitter_description,
      images: [
        Array.isArray(twitter_image) ? twitter_image[0]?.url : twitter_image,
      ],
    },
  };
}