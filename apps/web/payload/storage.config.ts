import { cloudStorage as createCloudStorage } from "@payloadcms/plugin-cloud-storage";
import { azureBlobStorageAdapter } from "@payloadcms/plugin-cloud-storage/azure";
import { PluginOptions } from "@payloadcms/plugin-cloud-storage/dist/types";
import merge from "lodash/merge";

import {
  ImageSize,
  ImageUploadFormatOptions,
} from "payload/dist/uploads/types";
import { CollectionConfig } from "payload/types";

const formatOptions: ImageUploadFormatOptions = {
  format: "webp",
  options: {
    quality: 80,
  },
};

const imageSizes: ImageSize[] = [
  {
    name: "fullscreen",
    width: 2560,
    formatOptions,
  },
  {
    name: "xl",
    width: 1920,
    formatOptions,
  },
  {
    name: "lg",
    width: 1280,
    formatOptions,
  },
  {
    name: "md",
    width: 1024,
    formatOptions,
  },
  {
    name: "sm",
    width: 480,
    formatOptions,
  },
];

const MediaTemplate: Omit<CollectionConfig, "slug"> = {
  access: {
    read: () => true,
  },
  upload: {
    imageSizes,
    formatOptions,
  },
  fields: [
    {
      type: "text",
      name: "alt",
      label: "Alt Text",
    },
  ],
};

const createMediaCollection = (
  partialCollection: Partial<CollectionConfig> & { slug: string }
): CollectionConfig => merge({}, MediaTemplate, partialCollection);

const adapter = azureBlobStorageAdapter({
  connectionString: process.env.AZ_STORAGE_CONNECTION_STRING,
  containerName: process.env.AZ_STORAGE_CONTAINER_NAME,
  allowContainerCreate: true,
  baseURL: process.env.AZ_STORAGE_BASEURL,
});

const getStorageConfig = (
  partialCollections: Partial<CollectionConfig & { slug: string }>[] = []
) => {
  const collections = partialCollections.length
    ? partialCollections.map(createMediaCollection)
    : [createMediaCollection({ slug: "media" })];

  return {
    UploadCollections: collections,
    plugin: createCloudStorage({
      collections: collections.reduce<PluginOptions["collections"]>(
        (acc, collection) => ({
          ...acc,
          [collection.slug]: { adapter, prefix: collection.slug },
        }),
        {}
      ),
    }),
  };
};

export default getStorageConfig;
