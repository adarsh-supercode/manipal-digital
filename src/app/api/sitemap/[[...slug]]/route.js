const WORDPRESS_URL = 'https://backend.manipal.digital'; 
const FRONTEND_URL = 'https://manipal.digital';

// Regex to replace all occurrences of the backend URL
const HOSTNAME_REGEX = new RegExp(WORDPRESS_URL, 'g');

function replace(content, regex, replacement) {
    return content.replace(regex, replacement);
}

export async function GET(req, { params }) {
    try {
        // Extract the requested sitemap from the URL
        const slug = params.slug ? params.slug.join('/') : 'sitemap_index.xml';

        const upstreamRes = await fetch(`${WORDPRESS_URL}/${slug}`, { redirect: 'manual' });

        if (!upstreamRes.ok) {
            throw new Error(`Failed to fetch sitemap: ${upstreamRes.status}`);
        }

        let content = await upstreamRes.text();
        let contentType = upstreamRes.headers.get('content-type') || 'application/xml';

        // Replace backend URLs with frontend URLs
        content = replace(content, HOSTNAME_REGEX, FRONTEND_URL);

        // Fix XSL reference
        const SITEMAP_XSL_REGEX = /\/\/.*main-sitemap\.xsl/g;
        content = replace(content, SITEMAP_XSL_REGEX, '/sitemap-template.xsl');

        return new Response(content, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'max-age=60',
            },
        });
    } catch (error) {
        console.error("Sitemap proxy error:", error);
        return new Response("Error fetching sitemap", { status: 500 });
    }
}
