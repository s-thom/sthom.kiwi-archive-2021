/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules');
const withBundle = require('@next/bundle-analyzer');

module.exports = withPlugins([
  [withBundle({ enabled: process.env.ANALYZE === 'true' })],
  // [withTM(['@react-spring/three'])],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: 'https://sthom.kiwi' },
            { key: 'Permissions-Policy', value: 'interest-cohort=()' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
            { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'none'; script-src 'self' 'unsafe-eval' 'sha256-ZL3g0L0TB6uWAqes8h9yQLqfPnbVV8HIaBwJ2Sii30g=' www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src * data:; font-src 'self'; connect-src 'self' vitals.vercel-insights.com www.gstatic.com www.google-analytics.com; media-src 'self'; prefetch-src 'self'; child-src 'self'; worker-src 'self' blob:; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content; base-uri 'self'; manifest-src 'self'",
            },
          ],
        },
        {
          source: '/.well-known/:slug*',
          headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/posts/:slug*',
          destination: 'https://archive-2020.sthom.kiwi/posts/:slug*',
          permanent: true,
        },
        {
          source: '/projects/:slug*',
          destination: 'https://archive-2020.sthom.kiwi/projects/:slug*',
          permanent: true,
        },
      ];
    },
    images: {
      formats: ['image/avif', 'image/webp'],
    },
  },
]);
