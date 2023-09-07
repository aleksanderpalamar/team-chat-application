/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**"
      }
    ],
    domains: [
      "uploadthing.com",
    ]
  }
}

module.exports = nextConfig