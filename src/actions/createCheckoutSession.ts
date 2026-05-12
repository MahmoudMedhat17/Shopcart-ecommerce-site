import { Address } from "@/sanity.types";
import { cartItems } from "../store/zustandStore";
import stripe from "../lib/Stripe";

export interface customerDataProps {
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
  customerData: customerDataProps,
  items: getAllProductCountProps,
) => {
  try {
    //check if this email already belongs to a customer / Retreive customer email.
    // Here we check if the customers.data larger than 0 then return the customer id else return empty string.
  } catch (error) {
    console.log("Error creating a checkout session!", error);
    throw error;
  }
};

export default createCheckoutSession;
