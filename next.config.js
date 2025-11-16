// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['antd', 'lucide-react', 'react-icons', '@jarvis-agent/core'],
  },

  // Enable ESLint and TypeScript checks
  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  // Removed: API keys should never be exposed to client
  // Use server-side API routes instead

  // API route configuration
  async headers() {
    return [
      {
        source: '/api/mcp/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // ✅ CODE SPLITTING OPTIMIZATION
  // Enhanced webpack configuration for better chunk splitting and performance
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          // Separate @jarvis-agent framework (high priority)
          jarvisAgent: {
            test: /[\\/]node_modules[\\/]@jarvis-agent[\\/]/,
            name: 'jarvis-agent',
            priority: 30,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Separate Ant Design UI library
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: 'antd-ui',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Separate React and React DOM (always in main, but grouped)
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Vendor code (node_modules)
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // Common code shared between multiple entry points
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            name: 'common',
          },
        },
      },
    };
    return config;
  },
}

module.exports = nextConfig
