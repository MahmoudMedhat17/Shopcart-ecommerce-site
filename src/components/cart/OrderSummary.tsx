// Marks this as a Client Component so it can use hooks and browser APIs
"use client";

// useState lets us track the loading state during checkout
import { useState } from "react";
// Our global Zustand store — provides cart data and helper functions
import zustandStore from "@/src/store/zustandStore";
// CreditCard icon shown inside the checkout button
import { CreditCard } from "lucide-react";
// Clerk hook to get the currently signed-in user's data
import { useUser } from "@clerk/nextjs";
// Type definition for the metadata object passed to the checkout session
import { metaDataProps } from "@/src/actions/createCheckoutSession";
// Server action that creates a Stripe checkout session and returns the hosted URL
import createCheckoutSession from "@/src/actions/createCheckoutSession";

const OrderSummary = () => {
  // loading: true while the checkout request is in flight, used to disable the button and show feedback
  const [loading, setLoading] = useState(false);

  // Destructure everything we need from the global cart store
  const {
    cart, // The array of items currently in the cart
    getTotalPriceAfterDiscount, // Returns the final total after discounts are applied
    getTotalDiscount, // Returns the total discount amount across all items
    getTotalPrice, // Returns the raw subtotal before any discounts
    getAllProductsCount, // Returns the cart items formatted for the Stripe line_items array
  } = zustandStore();

  // Get the currently authenticated user from Clerk
  const { user } = useUser();

  // Get the address the user selected during checkout from the global store
  const { selectedAddress } = zustandStore();

  // This function to handle checkout functionality.
  const handleCheckOut = async () => {
    // Guard: don't proceed if there's no logged-in user or no address selected
    if (!user || !selectedAddress) return;

    // Show loading state on the button while the request is processing
    setLoading(true);
    try {
      // Build the metadata object that will be attached to the Stripe session
      const metaData: metaDataProps = {
        // Generate a unique order ID using the browser's built-in crypto API
        orderNumber: crypto.randomUUID(),
        // Use the user's primary email address
        customerEmail: user.emailAddresses[0].emailAddress,
        // Use the user's full name, falling back to "Unknown" if not set
        customerName: user.fullName ?? "Unkown",
        // The Clerk user ID, used to link the order back to the user in our system
        clerkUserId: user.id,
        // The shipping address the user selected
        addressId: selectedAddress,
      };

      // Call the server action to create the Stripe checkout session
      // getAllProductsCount() returns the cart items in the shape Stripe expects
      const response = await createCheckoutSession(
        metaData,
        getAllProductsCount(),
      );

      // If Stripe returned a checkout URL, redirect the user to the hosted payment page
      if (response) {
        window.location.href = response;
      }
    } catch (error) {
      // Log any errors that occur during the checkout process
      console.log("Couldn't continue the payment process!", error);
    } finally {
      // Always reset the loading state whether the request succeeded or failed
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex items-center justify-between">
        <span>Subtotal ({cart.length} items)</span>
        <span className="font-semibold">${getTotalPrice().toFixed(0)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-shop-light-green">Discount</span>
        <span className="font-semibold">-${getTotalDiscount().toFixed(0)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Shipping</span>
        <span className="font-semibold text-shop-light-green">
          {getTotalPriceAfterDiscount() > 100 ? "Free" : "$10.00"}
        </span>
      </div>

      <div className="flex items-center justify-between border-b-2 pb-4">
        <span>Tax</span>
        <span className="font-semibold">$0.00</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold text-xl">Total</span>
        <span className="font-semibold">
          ${getTotalPriceAfterDiscount().toFixed(0)}
        </span>
      </div>

      <p className="text-shop-light-green">
        {getTotalPriceAfterDiscount() > 100
          ? "You got free shipping!"
          : "Shipping costs $10.00"}
      </p>

      <button
        disabled={loading}
        onClick={handleCheckOut}
        className="bg-darkColor text-white py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <CreditCard size={17} />
        {loading ? "Loading..." : "Proceed to checkout"}
      </button>
    </div>
  );
};

export default OrderSummary;
