import { 
    createImageUrlBuilder, 
    createCurrentUserHook,
    createClient
 } from "next-sanity";

 export const config = {
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
     apiVersion: '2021-08-31',
     useCdn: process.env.NODE_ENV === "production",
 }

// set up the client for fetching the data in the getProps page function
export const sanityClient = createClient(config);

// Helper Functions in sanity documentation /docs/image-url
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Helper Functions for current user logged in account
export const useCurrentUser = createCurrentUserHook(config);