/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
    serverActions: true,
  },

  webpack: (config, options) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })

    // if (
    //   process.env.SENTRY === 'true' &&
    //   process.env.NEXT_PUBLIC_SENTRY_DSN &&
    //   isProd
    // ) {
    //   config.plugins.push(
    //     sentryWebpackPlugin({
    //       org: 'inneis-site',
    //
    //       project: 'springtide',
    //       authToken: process.env.SENTRY_AUTH_TOKEN,
    //     }),
    //   )
    // }

    return config
  },
}

module.exports = nextConfig
