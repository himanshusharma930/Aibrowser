// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable for better performance
  devIndicators: false,

  // Memory and performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['antd', 'lucide-react', '@jarvis-agent/core', '@ant-design/icons'],
    // Aggressive memory reduction
    memoryBasedWorkersCount: false, // Disable to control manually
    workerThreads: false, // Disable worker threads
    cpus: 1, // Limit CPU usage
  },
  
  // Reduce page data size
  compress: false, // Let nginx handle compression
  poweredByHeader: false,

  // Reduce build memory
  productionBrowserSourceMaps: false,
  
  // Optimize images
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
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


}

module.exports = nextConfig
