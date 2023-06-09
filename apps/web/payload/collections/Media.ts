import {
  ImageSize,
  ImageUploadFormatOptions,
} from "payload/dist/uploads/types";
import { CollectionConfig } from "payload/types";

const imageSizes: ImageSize[] = [
  {
    name: "fullscreen",
    width: 2560,
  },
  {
    name: "xl",
    width: 1920,
  },
  {
    name: "lg",
    width: 1280,
  },
  {
    name: "md",
    width: 1024,
  },
  {
    name: "sm",
    width: 480,
  },
];

const resizeOptions = {
  width: 2560,
  withoutEnlargement: true,
};

const formatOptions: ImageUploadFormatOptions = {
  format: "webp",
  options: {
    quality: 80,
  },
};

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    imageSizes,
    resizeOptions,
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
