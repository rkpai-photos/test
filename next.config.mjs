/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.edgestore.dev',
      },
    ],
  },
  transpilePackages: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    // add other packages as needed
  ],
};

export default nextConfig;
