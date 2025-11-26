/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:8000/api/:path*',
      },
    ];
  },
};
