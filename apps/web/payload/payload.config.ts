import path from "path";
import { buildConfig } from "payload/config";
import getStorageConfig from "./storage.config";

const storageConfig = getStorageConfig();

const payloadConfig = buildConfig({
  serverURL: process.env.BASEURL,
  collections: [
    // Your collections here
    ...storageConfig.UploadCollections,
  ],
  globals: [
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },
  plugins: [storageConfig.plugin],
});

export default payloadConfig;
