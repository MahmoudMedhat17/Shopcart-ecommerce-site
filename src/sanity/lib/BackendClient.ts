import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion, // Use current date to target latest API
  token: process.env.SANITY_API_EDITOR_TOKEN, // Secret token required for backend mutations
  useCdn: false, // Always false on backend for fresh, uncached data
});
