/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.edgestore.dev',  // This will match any subdomain of edgestore.dev
        }
      ]
    }
  };
  
  export default nextConfig;