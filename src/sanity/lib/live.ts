// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Here we get the API token coming from Sanity API
const sanityToken = process.env.SANITY_API_READ_TOKEN;

// And check if the token doesn't exist then show this msg in the console
if (!sanityToken) {
  console.log("Sanity token is not defined in the project!");
}

// If it exists here we set the serverToken to the server API token coming from Sanity and browserToken coming from Sanity. and revalidate to 0 so we don't wait for it change and change automatically in the server.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN,
  fetchOptions: {
    revalidate: 0,
  },
});
