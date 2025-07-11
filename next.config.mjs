// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['staging.supercode.in'],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.(glsl|vs|fs)$/,
//       use: 'raw-loader',
//     });
//     return config;
//   },
// };

// export default nextConfig;


import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['backend.manipal.digital'],
  },
  webpack(config) {
    // Add alias to resolve 'three/examples/jsm'
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm/loaders': path.resolve('node_modules/three/src/loaders'),
    };

    // Keep the existing rule for GLSL files
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: 'raw-loader',
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml', 
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: true,
      },
      {
        source: '/sitemap_index.xml',
        destination: '/api/sitemap',
        permanent: true,
      },
      {
        source: '/:sitemap(post|page|blog|our-portfolio|industry)-sitemap.xml',
        destination: '/api/sitemap/:sitemap-sitemap.xml',
        permanent: true,
      }, 
    ];
  },
};

export default nextConfig;