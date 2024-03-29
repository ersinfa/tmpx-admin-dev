// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // domains
  images: {
    domains: [
      'localhost:3000',
      'tmpx-public-bucket-new.s3.eu-central-1.amazonaws.com',
      'https://tmpx-bucket.s3.us-west-1.amazonaws.com',
    ],
  },
};
export default config;
