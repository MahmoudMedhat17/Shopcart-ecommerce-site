// Import Next.js server utilities for handling incoming requests and sending responses
import { NextRequest, NextResponse } from "next/server";

// Import the headers helper to read HTTP request headers on the server
import { headers } from "next/headers";

// Import the Stripe TypeScript types (used for type annotations like Stripe.Event)
import Stripe from "stripe";

// Import the configured Stripe client instance from our local lib file
import stripe from "@/src/lib/Stripe";

// Import the metadata type shape used when creating a Stripe checkout session
import { metaDataProps } from "@/src/actions/createCheckoutSession";
// Import the backendClient — Sanity client with write permissions, needed to create/update documents
import { backendClient } from "@/src/sanity/lib/BackendClient";

// import { client } from "@/src/sanity/lib/client";

// Define and export the POST handler — Next.js will call this for POST requests to /api/webhook
export async function POST(request: NextRequest) {
  // Read the raw request body as plain text (Stripe requires the raw body for signature verification)
  const body = await request.text();

  // Read all incoming HTTP headers from the request
  const headersList = await headers();

  // Extract the Stripe-Signature header — Stripe sends this with every webhook to prove authenticity
  const signature = headersList.get("stripe-signature");

  // Read the webhook secret from environment variables (set in .env, never exposed to the client)
  const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET;

  // If the webhook secret is missing from env, return a 400 error — we can't verify events without it
  if (!webhookSecretKey) {
    return NextResponse.json(
      { error: "Webhook key is not found!" },
      { status: 400 },
    );
  }

  // If there's no Stripe-Signature header, the request didn't come from Stripe — reject it
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Declare the event variable that will hold the verified Stripe event object
  let event: Stripe.Event;

  try {
    // Verify the webhook signature and parse the event — throws if the signature is invalid
    event = stripe.webhooks.constructEvent(body, signature, webhookSecretKey);
  } catch (error) {
    // Log the failure reason for debugging
    console.log(`Webhook signature verification failed.`, error);

    // Extract a readable error message, or fall back to "Unknown error"
    const message = error instanceof Error ? error.message : "Unknown error";

    // Return 400 with the error message so Stripe knows the webhook was rejected
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Only process the event if the Stripe checkout session was successfully completed
  if (event.type === "checkout.session.completed") {
    // Cast the event data to the Stripe Checkout Session type to access its properties
    const session = event.data.object as Stripe.Checkout.Session;
    // If the session has an invoice attached, retrieve the full Invoice object from Stripe; otherwise null
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    // Pass the session and invoice to the helper that saves the order to Sanity
    await orderInSanity(session, invoice);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Helper function that saves the completed order to Sanity CMS
const orderInSanity = async (
  session: Stripe.Checkout.Session, // the completed Stripe checkout session
  invoice: Stripe.Invoice | null, // the Stripe invoice if one was generated, otherwise null
) => {
  try {
    // Destructure the fields we need from the completed session object
    const {
      id,
      total_details,
      amount_total,
      payment_intent,
      metadata,
      currency,
    } = session;
    // Destructure our custom metadata fields that were attached during checkout session creation
    const { orderNumber, customerEmail, customerName, clerkUserId, addressId } =
      metadata as unknown as metaDataProps & { addressId: string };
    // Parse the address from a JSON string back into an object — guard against null to avoid a parse error
    // const parsedAddress = address ? JSON.parse(address) : null;
    // Fetch all line items (products) from this session, expanding the product details on each price
    const lineItemsWithProducts = await stripe.checkout.sessions.listLineItems(
      id,
      {
        expand: ["data.price.product"],
      },
    );

    // Typed array that will hold each purchased product formatted for Sanity's order document
    const sanityProducts: {
      _key: string; // unique key required by Sanity for array items
      _type: string;
      product: { _type: string; _ref: string }; // Sanity reference pointing to the product document
      quantity: number; // how many units the customer bought
      price: number; // actual price paid per unit (in dollars, not cents)
    }[] = [];

    // Array that will hold product IDs and quantities — intended for a future stock update function
    const stockUpdate: { productId: string; quantity: number }[] = [];

    // Map over each line item to extract product info and quantity, then prepare for Sanity
    lineItemsWithProducts.data.map((item) => {
      // Get the Sanity product document ID stored in the Stripe product's metadata
      const productId = (item.price?.product as Stripe.Product).metadata.id;

      // Use the purchased quantity, defaulting to 0 if somehow missing
      const quantity = item.quantity || 0;

      // Get the actual price paid per unit from Stripe (in cents), convert to dollars
      const pricePaid = item.price?.unit_amount
        ? item.price.unit_amount / 100
        : 0;

      // Push a formatted Sanity reference object into the sanityProducts array
      sanityProducts.push({
        _key: crypto.randomUUID(), // generate a unique key for this array item
        _type: "ordersData",
        product: {
          _type: "reference", // tells Sanity this is a reference to another document
          _ref: productId, // the actual Sanity document ID of the product
        },
        quantity,
        price: Math.floor(pricePaid), // store the actual price paid per unit
      });

      // Also store the product ID and quantity for the stock update (not yet implemented)
      stockUpdate.push({ productId, quantity });
    });

    const addressDoc = addressId
      ? await backendClient.fetch(
          `*[_type == "address" && _id == $addressId][0]`,
          { addressId },
        )
      : null;

    // Build the full order document object that matches the Sanity order schema
    const orderDoc = {
      _type: "order", // Sanity document type
      orderNumber: orderNumber, // our custom order number from metadata
      stripeCheckoutSessionId: id, // Stripe session ID for reference
      stripePaymentIntent: payment_intent, // Stripe payment intent ID
      customerName, // customer's full name from metadata
      stripeCustomerId: customerEmail, // using email as the Stripe customer identifier
      customerEmail: customerEmail, // customer's email address
      clerkUserId: clerkUserId, // Clerk auth user ID to link order to an account
      products: sanityProducts, // array of purchased products built above
      status: "paid", // mark the order as paid immediately
      currency, // currency code (e.g. "usd") from the session
      amountDiscount: total_details?.amount_discount // discount amount in smallest currency unit (cents)
        ? total_details.amount_discount
        : 0,
      totalPrice: amount_total ? amount_total / 100 : 0, // total charged in smallest currency unit (cents)
      orderDate: new Date().toISOString(), // timestamp of when this order was processed
      invoice: invoice // attach invoice details if one was generated
        ? {
            invoiceId: invoice.id, // session ID
            number: invoice.number, // human-readable invoice number from Stripe
            hosted_invoice_url: invoice.hosted_invoice_url, // URL where customer can view/download the invoice
          }
        : null,
      address: addressDoc
        ? {
            state: addressDoc.state, // state/region from the parsed address
            zip: addressDoc.zipCode, // postal/zip code
            city: addressDoc.city, // city name
            address: addressDoc.address, // street address line
            name: addressDoc.fullName, // recipient name on the address
          }
        : null, // if no address was provided, store null
    };

    // Save the completed order document to Sanity CMS using the backend (write-enabled) client
    await backendClient.create(orderDoc);
    // Update the stock level for each purchased product
    await updateStockLevel(stockUpdate);

    return NextResponse.json({ success: "Stock Updated!" }, { status: 200 });
  } catch (error) {
    // Log the full error for server-side debugging
    console.error("Error processing order:", error);
    // Return a 400 response so Stripe knows the order processing failed
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 },
    );
  }
};

// Loops through each purchased product and decrements its stock count in Sanity
const updateStockLevel = async (
  stockUpdate: { productId: string; quantity: number }[], // array of products and how many were bought
) => {
  // Iterate over each product that needs its stock updated
  for (const { productId, quantity } of stockUpdate) {
    try {
      // Fetch the current product document from Sanity by its ID
      const product = await backendClient.getDocument(productId);

      // Guard: if the product doesn't exist or its stock field isn't a number, warn and skip
      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`,
        );
      }

      // Calculate new stock: subtract purchased quantity, floor at 0 to avoid negative stock
      const newStock = Math.max(product?.stock - quantity, 0);

      // Patch the product document in Sanity, setting the updated stock value
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      // Log the error if fetching or patching the product fails
      console.log("Can't update the stock level of the products!", error);
      // Return a 400 response so the caller knows this stock update failed
      return NextResponse.json(
        { error: "Can't update the stock level of the products!" },
        { status: 400 },
      );
    }
  }
};
