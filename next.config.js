/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // api end point
    // NEXT_PUBLIC_API_URL: 'http://flatmates-api.host:5000/api/v1',
    NEXT_PUBLIC_API_URL: 'http://generic.host:5001/api/v1',
    NEXT_PUBLIC_API_URL_PRODUCTION: 'https://flatmates-api.yuji-luigi.com/api/v1',
    API_VERSION: 'api/v1',
     // MAPBOX
     MAPBOX_API: '',
     // FIREBASE
     FIREBASE_API_KEY: '',
     FIREBASE_AUTH_DOMAIN: '',
     FIREBASE_PROJECT_ID: '',
     FIREBASE_STORAGE_BUCKET: '',
     FIREBASE_MESSAGING_SENDER_ID: '',
     FIREBASE_APPID: '',
     FIREBASE_MEASUREMENT_ID: '',
     // AWS COGNITO
     AWS_COGNITO_USER_POOL_ID: '',
     AWS_COGNITO_CLIENT_ID: '',
     // AUTH0
     AUTH0_CLIENT_ID: '',
     AUTH0_DOMAIN: '',
  },
}

module.exports = nextConfig
