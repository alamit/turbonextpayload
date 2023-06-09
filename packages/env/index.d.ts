export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: "development" | "staging" | "production";
      BASEURL: string;
      NEXT_TELEMETRY_DISABLED?: "1";
      PAYLOAD_SECRET: string;
      MONGODB_URI: string;
      MONGODB_DBNAME: string;
      AZ_STORAGE_BASEURL: string;
      AZ_STORAGE_CONNECTION_STRING: string;
      AZ_STORAGE_CONTAINER_NAME: string;
      STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    }
  }
}
