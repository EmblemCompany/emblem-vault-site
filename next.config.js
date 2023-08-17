const debug = process.env.NODE_ENV !== 'production'
const withTM = require('next-transpile-modules')([
  // 'doka', 
  // 'react-doka', 
  // '@ethereumjs/util',
  // 'micro-ftch', 
  // '@noble/curves', 
  // '@noble/hashes', 
  // '@noble/secp256k1',
  // '@chakra-ui/react',
  // '@chakra-ui/system',
  // 'toasted-notes',
  // '@zag-js/dom-query',
  // '@zag-js/element-size',
  // '@zag-js/focus-visible'
])

module.exports = withTM({
  reactStrictMode: false,
  assetPrefix: '/',
  env: {
    IPFS: process.env.IPFS === 'true' ? 'true' : 'false',
    COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || 'master',
    INFURA_PROJECT_ID: 'a4e978103d87452881d1ea298948aa42',
    MAINTENANCE: false
  },
  devIndicators: {
    autoPrerender: false,
  }
});
// module.exports = {
//   reactStrictMode: false,
//   assetPrefix: !debug ? '.' : '.',
//   env: {
//     IPFS: process.env.IPFS === 'true' ? 'true' : 'false',
//     COMMIT_SHA: process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || 'master',
//     INFURA_PROJECT_ID: 'a4e978103d87452881d1ea298948aa42',
//     MAINTENANCE: false
//   },
//   devIndicators: {
//     autoPrerender: false,
//   },
// }
