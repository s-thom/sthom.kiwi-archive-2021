/* eslint-disable import/no-extraneous-dependencies */
// const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withImages = require('next-images');

module.exports = withPlugins([
  [
    withImages,
    {
      inlineImageLimit: false,
      future: {
        webpack5: true,
      },
    },
  ],
  [withTM(['react-spring/three'])],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    future: {
      webpack5: true,
    },
    images: {
      domains: ['images.prismic.io'],
    },
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
