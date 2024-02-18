declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      SANITY_API_VERSION: string;
    };
  }
}

function loadBrowserEnvironmentVariable(key: keyof Window['ENV']): string {
  const value =
    typeof document === 'undefined' ? process.env[key] : window.ENV[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const ENV = {
  sanity: {
    projectId: loadBrowserEnvironmentVariable('SANITY_PROJECT_ID'),
    dataset: loadBrowserEnvironmentVariable('SANITY_DATASET'),
    apiVersion: loadBrowserEnvironmentVariable('SANITY_API_VERSION'),
  },
};
