interface Config {
  readonly baseUrl: string;
  readonly environment: "development" | "production";
  readonly appName: string;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly backendUrl: string;
  readonly reverb: {
    readonly appKey: string;
    readonly host: string;
    readonly port?: number;
    readonly scheme?: string;
  };
}

const config: Config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  environment: import.meta.env.VITE_APP_ENV || "development",
  appName: import.meta.env.VITE_APP_NAME || "Bachelor Girls",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  reverb: {
    appKey: import.meta.env.VITE_REVERB_APP_KEY,
    host: import.meta.env.VITE_REVERB_HOST,
    port: import.meta.env.VITE_REVERB_PORT,
    scheme: import.meta.env.VITE_REVERB_SCHEME,
  },
};

const requiredEnvVars = [
  "VITE_API_BASE_URL",
  "VITE_APP_ENV",
  "VITE_APP_NAME",
  "VITE_REVERB_APP_KEY",
  "VITE_REVERB_HOST",
] as const;

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
