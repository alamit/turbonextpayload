// next.config.js
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

module.exports = withPayload(
  {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    rewrites: async () => [
      {
        source: "/media/:filename",
        destination: "/api/uploads/media/:filename",
      },
    ],
    webpack: (config, { isServer }) => {
      if (isServer) return config;
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            crypto: false,
          },
        },
      };
    },
  },
  {
    configPath: path.resolve(__dirname, "./payload/payload.config.ts"),
  }
);
