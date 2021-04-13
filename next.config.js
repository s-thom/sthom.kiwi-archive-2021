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
    },
  ],
  // [
  //   withPWA,
  //   {
  //     pwa: {
  //       dest: 'public',
  //     },
  //   },
  // ],
  [withTM(['react-spring/three'])],
  {
    reactStrictMode: true,
    future: {
      webpack5: false,
    },
  },
]);
