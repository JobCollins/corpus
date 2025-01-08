import { isServer } from '@tanstack/react-query';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/sign-in',
                destination: '/api/auth/login',
                permanent: true,
              },
              {
                source: '/sign-up',
                destination: '/api/auth/register',
                permanent: true,
              },
        ]
    },

    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    },

    images: {
        // Allow gravatar.com for external image hosting
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'gravatar.com',
            pathname: '/**',
          },
        ],
      },
};


export default nextConfig;
