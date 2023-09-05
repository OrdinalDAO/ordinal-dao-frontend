const nodeExternals = require('webpack-node-externals');

/** @type {import('next').NextConfig} */
const nextConfig = {
  'output': 'export'
}

module.exports = {
  ...nextConfig,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

