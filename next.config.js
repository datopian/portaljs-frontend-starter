// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const domains = ["demo.dev.datopian.com", "admin.opendatani.gov.uk"];
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
