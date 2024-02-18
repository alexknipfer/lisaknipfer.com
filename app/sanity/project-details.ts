declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      SANITY_API_VERSION: string;
    };
  }
}

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } =
  typeof document === 'undefined' ? process.env : window.ENV;

export const projectId = SANITY_PROJECT_ID!;
export const dataset = SANITY_DATASET!;
export const apiVersion = SANITY_API_VERSION!;

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in .env');
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET in .env');
if (!apiVersion) throw new Error('Missing SANITY_API_VERSION in .env');
