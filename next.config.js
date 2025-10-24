/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_GUESTS: process.env.AIRTABLE_TABLE_GUESTS,
    AIRTABLE_PAT: process.env.AIRTABLE_PAT,
    SITE_URL: process.env.SITE_URL,
    EVENT_DATE: process.env.EVENT_DATE,
    EVENT_TITLE: process.env.EVENT_TITLE,
    EVENT_ADDRESS: process.env.EVENT_ADDRESS,
    EVENT_MAP_URL: process.env.EVENT_MAP_URL,
    MUSIC_MP3_URL: process.env.MUSIC_MP3_URL,
    WHATSAPP_PHONE: process.env.WHATSAPP_PHONE,
    CHECKIN_PIN: process.env.CHECKIN_PIN,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_EVENT_DATE: process.env.EVENT_DATE,
    NEXT_PUBLIC_EVENT_TITLE: process.env.EVENT_TITLE,
    NEXT_PUBLIC_EVENT_ADDRESS: process.env.EVENT_ADDRESS,
    NEXT_PUBLIC_EVENT_MAP_URL: process.env.EVENT_MAP_URL,
    NEXT_PUBLIC_MUSIC_MP3_URL: process.env.MUSIC_MP3_URL,
    NEXT_PUBLIC_WHATSAPP_PHONE: process.env.WHATSAPP_PHONE,
  },
}

module.exports = nextConfig
