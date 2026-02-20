/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    `https://${process.env.REPLIT_DEV_DOMAIN}`,
    `http://${process.env.REPLIT_DEV_DOMAIN}`,
    process.env.REPLIT_DEV_DOMAIN,
    'http://127.0.0.1:5000',
    'http://localhost:5000',
    'https://*.replit.dev',
  ].filter(Boolean),
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
