/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID,
        GOOGLE_DRIVE_PROJECT_ID: process.env.GOOGLE_DRIVE_PROJECT_ID,
        GOOGLE_DRIVE_TOKEN_URI: process.env.GOOGLE_DRIVE_TOKEN_URI,
        GOOGLE_DRIVE_SERECT_KEY: process.env.GOOGLE_DRIVE_SERECT_KEY,
        GOOGLE_DRIVE_REFRESH_TOKEN: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
        AWS_SECRET_ID: process.env.AWS_SECRET_ID,
    }
}

module.exports = nextConfig
