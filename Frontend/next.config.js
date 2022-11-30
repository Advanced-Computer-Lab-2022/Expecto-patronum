/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ibb.co', 'cancham.org.eg'], //your-external-link-hostname
  },
}

module.exports = nextConfig
