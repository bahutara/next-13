// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
//const { env } = require('./server/env.mjs');

/**
 * @param {{ experimental: { appDir: boolean; }; reactStrictMode: boolean; images: { domains: string[]; formats: string[]; }; }} config
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
});
