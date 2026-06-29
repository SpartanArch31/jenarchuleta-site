// Sanity project config. projectId + dataset are PUBLIC (safe to commit /
// ship in the client bundle). Env vars override for flexibility.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ac1ruwaz';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
