const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
/** @type {import('next').NextConfig} */

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    NEXT_PUBLIC_API_URL: (() => {
      if (isDev) return 'http://generic.host:5001/api/v1';
      if (isProd) return 'https://flatmates-api.yuji-luigi.com/api/v1';
      if (isStaging) return 'http://generic.host:5001/api/v1';
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
  };

  return {
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: false,
    env,
    images: {
      domains: [
        'flatmates-api.yuji-luigi.com',
        'flatmates.eu-central-1.linodeobjects.com',
        'fastly.picsum.photos',
        'picsum.photos',
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};

module.exports = nextConfig;
