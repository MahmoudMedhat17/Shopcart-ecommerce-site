"use client";

import { useState } from "react";
import zustandStore from "@/src/store/zustandStore";
import { CreditCard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { customerDataProps } from "@/src/actions/createCheckoutSession";

const OrderSummary = () => {
  const [loading, setLoading] = useState(false);
  const { cart, getTotalPriceAfterDiscount, getTotalDiscount, getTotalPrice } =
    zustandStore();
  const { user } = useUser();
  const { selectedAddress } = zustandStore();

  // This function to handle checkout functionality.
  const handleCheckOut = () => {
    setLoading(true);
    try {
      const customerData: customerDataProps = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unkown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "",
        clerkUserId: user?.id ?? "",
        address: selectedAddress,
      };
      // Need to work on creating the session for stripe.
      console.log(customerData);
    } catch (error) {
      console.log("Couldn't continue the payment process!", error);
    } finally {
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
