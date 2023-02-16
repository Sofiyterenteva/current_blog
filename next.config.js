// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'via.placeholder.com',
    //       port: '',
    //       pathname: '/600/**',
    //     },
    //   ],
    // }
        images: {
          domains: ['via.placeholder.com'],
        },
      
  };
  
  module.exports = nextConfig
  
  
  