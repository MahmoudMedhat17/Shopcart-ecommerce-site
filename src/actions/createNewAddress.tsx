"use server";

import { createClient } from "next-sanity";
import { AddressSchema } from "@/src/components/cart/AddressFields";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_EDITOR_TOKEN,
});

// here we create a new address in sanity.
const createNewAddress = async (data: AddressSchema) => {
  try {
    const newAddressDoc = {
      ...data,
      _type: "address",
    };
    const newAddress = await writeClient.create(newAddressDoc);

    return { success: true, data: newAddress };
  } catch (error) {
    console.log("Failed to create a new address!, Please try again.", error);
  }
};

export default createNewAddress;
