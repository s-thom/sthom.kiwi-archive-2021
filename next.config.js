/* eslint-disable import/no-extraneous-dependencies */
// const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

module.exports = withPlugins([
  [withTM(['@react-spring/three'])],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    webpack5: true,
    async headers() {
      return [
        {
          source: '/.well-known/:slug*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Permissions-Policy',
              value: 'interest-cohort=()',
            },
          ],
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
