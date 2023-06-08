// next.config.js
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

module.exports = withPayload(
  {
    reactStrictMode: true,
    transpilePackages: ["ui"],
  },
  {
    configPath: path.resolve(__dirname, "./payload/payload.config.ts"),
  }
);
