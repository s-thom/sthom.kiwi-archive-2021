/* eslint-disable import/no-extraneous-dependencies */
// const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withBundle = require('@next/bundle-analyzer');

module.exports = withPlugins([
  [withBundle({ enabled: process.env.ANALYZE === 'true' })],
  [withTM(['@react-spring/three'])],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    webpack5: true,
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
            { key: 'Referrer-Policy', value: 'same-origin' },
            { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
            { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
            {
              key: 'Content-Security-Policy',
              value:
                "default-src 'none'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' vitals.vercel-insights.com www.gstatic.com; media-src 'self'; prefetch-src 'self'; child-src 'self'; worker-src 'self' blob:; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content; manifest-src 'self'",
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
  },
]);
