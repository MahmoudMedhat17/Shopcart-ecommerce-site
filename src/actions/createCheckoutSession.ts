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
  address: Address | null;
}

export interface getAllProductCountProps {
  product: cartItems["product"];
  quantity: cartItems["quantity"];
}

const createCheckoutSession = async (
  metaData: metaDataProps,
  products: getAllProductCountProps[],
) => {
  try {
    // Handle customer creation or retrieval
    const customers = await stripe.customers.list({
      email: metaData.customerEmail,
      limit: 1,
    });
    // Here we get the customer Id if it exists.
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success/orderNumber=${metaData.orderNumber}`,

      // Where Stripe redirects the customer if they cancel or close the checkout page
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,

      // The list of products the customer is purchasing
      // Each cart item is mapped into a Stripe line_item object
      line_items: products.map(({ product }) => ({
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
            metaData: {
              id: product._id,
            },

            // The product image shown on the checkout page
            // Uses Sanity's urlFor helper to build the image URL; falls back to empty string if no images exist
            image:
              product.images && product.images.length > 0
                ? [urlFor(product.images[0]).url()]
                : "",
          },
        },

        // How many units of this product the customer is buying
        quantity: product.quantity,
      })),

      // Need here to check if there's customerId then use it if not then use the customerEmail
    };
  } catch (error) {
    console.log("Error creating a checkout session!", error);
    throw error;
  }
};

export default createCheckoutSession;
