"use server";

import { Address } from "@/sanity.types";
import { cartItems } from "../store/zustandStore";
import stripe from "../lib/Stripe";
import Stripe from "stripe";
import { urlFor } from "../sanity/lib/image";

export interface metaDataProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  addressId: Address | null;
}

export interface getAllProductCountProps {
  product: cartItems["product"];
  quantity: cartItems["quantity"];
}

const createCheckoutSession = async (
  metaData: metaDataProps,
  products: getAllProductCountProps[],
) => {
  console.log("CHECKING CART ITEMS:", JSON.stringify(products, null, 2)); // 👈 ADD THIS
  try {
    // Handle customer creation or retrieval
    const customers = await stripe.customers.list({
      // Search Stripe for existing customers matching this email
      email: metaData.customerEmail,
      // Only fetch 1 result — we just need to know if one exists
      limit: 1,
    });
    // Here we get the customer Id if it exists.
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    // Build the full Stripe checkout session configuration object
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      // "payment" mode means a one-time charge (as opposed to "subscription" or "setup")
      mode: "payment",

      // Automatically generate a Stripe invoice for this payment, useful for record-keeping and sending receipts
      invoice_creation: {
        enabled: true,
      },

      // Restrict the accepted payment methods to credit/debit cards only
      payment_method_types: ["card"],

      // Where Stripe redirects the customer after a successful payment
      // Includes the order number in the URL so the success page can look up and display the order
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/client/success?orderNumber=${metaData.orderNumber}&session_id={CHECKOUT_SESSION_ID}`,

      // Where Stripe redirects the customer if they cancel or close the checkout page
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/client/cart`,

      metadata: {
        orderNumber: metaData.orderNumber,
        customerEmail: metaData.customerEmail,
        customerName: metaData.customerName,
        clerkUserId: metaData.clerkUserId,
        addressId: metaData.addressId?._id ?? "",
      },

      // The list of products the customer is purchasing
      // Each cart item is mapped into a Stripe line_item object
      line_items: products.map(({ product, quantity }) => ({
        price_data: {
          // The currency for this line item — all prices will be charged in USD
          currency: "USD",
          // The price in the smallest currency unit (cents for USD)
          // Stripe requires integers, so we multiply by 100 and round to avoid floating point issues
          unit_amount: Math.round((product.price ?? 0) * 100),

          product_data: {
            // The product name shown to the customer on the Stripe checkout page
            name: product.name ?? "Unkown product",

            // A short description of the product shown on the checkout page
            description: product.description ?? "",

            // Custom metadata attached to the product — useful for referencing back to your Sanity product after payment
            metadata: {
              // Store the Sanity product _id so we can look it up after the webhook fires
              id: product._id,
            },

            // The product image shown on the checkout page
            // Uses Sanity's urlFor helper to build the image URL; falls back to empty array if no images exist
            images:
              product.images && product.images.length > 0
                ? [urlFor(product.images[0]).url()]
                : [],
          },
        },

        // How many units of this product the customer is buying
        quantity,
      })),
    };

    // Need here to check if there's customerId then use it if not then use the customerEmail
    if (customerId) {
      // Attach the existing Stripe customer to the session so their saved details are pre-filled
      sessionPayload.customer = customerId;
    } else {
      // No existing customer found — pass the email so Stripe can create one during checkout
      sessionPayload.customer_email = metaData.customerEmail;
    }
    // Send the fully built payload to Stripe and create the hosted checkout session
    const session = await stripe.checkout.sessions.create(sessionPayload);
    // Return the hosted checkout URL so the client can redirect the user to it
    return session.url;
  } catch (error) {
    console.log("Error creating a checkout session!", error);
    throw error;
  }
};

export default createCheckoutSession;
