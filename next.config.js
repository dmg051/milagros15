/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Vercel
  experimental: {
    serverComponentsExternalPackages: ['qrcode']
  },
  images: {
    domains: ['drive.google.com', 'api.airtable.com']
  }
}

module.exports = nextConfig
