require("dotenv").config({
  path: `env/.env.${process.env.APP_ENV || "dev"}`
})

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  images: {
    domains: ["tdsgroup.in"]
  }
}
