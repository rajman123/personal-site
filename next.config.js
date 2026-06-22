/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  // PREVIEW ONLY (so it rides nginx :80 at /site). REMOVE this line before deploying to Vercel (which serves at root).
  basePath: '/site',
};

module.exports = nextConfig;
