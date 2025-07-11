export function generateSEO({ seo = {}, defaultSEO = {}, mySEO = {} }) {
  const frontendBaseURL = "https://manipal.digital";
  const defaultImage = "https://manipal.digital/assets/favicon.png?v=1.1";

  const {
    title: defaultTitle = "Get all exciting details about Manipal Digital",
    description: defaultDescription =
      "By automating routine processes and supporting highly complex valuation processes, we give alternative investment funds unparalleled clarity and liberate investment professionals to create more value.",
  } = defaultSEO;

  const {
    title = defaultTitle,
    description = defaultDescription,
    og_title = title,
    og_description = description,
    og_url = "", 
    og_image = defaultImage,
    twitter_card = "summary_large_image",
    twitter_title = title,
    twitter_description = description,
    twitter_image = defaultImage,
    canonical = "",
    robots = {},
  } = seo;

const sanitizeUrl = (url) => {
  try {
    const u = new URL(url, frontendBaseURL);
    const frontend = new URL(frontendBaseURL);
    u.protocol = frontend.protocol;
    u.host = frontend.host;
    return u.href.replace(/([^:]\/)\/+/g, "$1");
  } catch {
    return frontendBaseURL;
  }
};


  const canonicalUrl = canonical ? sanitizeUrl(canonical) : undefined;
  const openGraphUrl = og_url ? sanitizeUrl(og_url) : undefined;

  const isIndexable = robots?.index !== "noindex";
  const isFollowable = robots?.follow !== "nofollow";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: isIndexable,
      follow: isFollowable,
      googleBot: {
        index: isIndexable,
        follow: isFollowable,
        maxVideoPreview: -1,
        maxImagePreview: "large",
        maxSnippet: -1,
      },
    },
    openGraph: {
      title: og_title,
      description: og_description,
      url: openGraphUrl,
      images: [
        {
          url: Array.isArray(og_image) && og_image[0]?.url
            ? og_image[0].url
            : og_image,
          alt: title || "Manipal Digital",
        },
      ],
    },
    twitter: {
      card: twitter_card,
      title: twitter_title,
      description: twitter_description,
      images: [
        Array.isArray(twitter_image) && twitter_image[0]?.url
          ? twitter_image[0].url
          : twitter_image,
      ],
    },
    ...mySEO,
  };
}




export function disposeModel(model) {
  model.traverse((child) => {
    if (child.isMesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          for (const key in material) {
            if (material[key] && material[key].isTexture) {
              material[key].dispose();
            }
          }
          material.dispose();
        });
      }
    }
  });
}
