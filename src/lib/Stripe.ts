import Stripe from "stripe";

// If the stripe secret key is not found then throw an error.
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing stripe secret key!");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
});

export default stripe;
