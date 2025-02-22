/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
  },
  transpilePackages: [
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    // add other packages as needed
  ],
};

export default nextConfig;
