// Marks this as a Client Component so it can use hooks like useSearchParams and useEffect
"use client";

import { Title, SubTitle, SubText } from "@/src/components/Text";
import { Button } from "@/src/components/ui/button";
import zustandStore from "@/src/store/zustandStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Check, Package, ShoppingBag, House } from "lucide-react";
import toast from "react-hot-toast";

const SuccessFallback = () => {
  // Pull the resetCart action from the global store to wipe cart items after a completed purchase
  const { resetCart } = zustandStore();

  // useSearchParams is a Next.js hook that reads the current URL's query string parameters
  const searchParams = useSearchParams();

  // Extract the session_id Stripe appended to the success URL — confirms a real payment occurred
  const session_id = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");

  // Run this effect whenever session_id or resetCart changes
  useEffect(() => {
    // Only clear the cart and show the toast if a valid Stripe session_id is present in the URL
    // This prevents the cart from being cleared if someone navigates to this page directly
    if (session_id) {
      // Clear all items from the cart now that the order has been placed
      resetCart();
      // Show a success notification to the user confirming the purchase
      toast.success("Items purchased successfully!");
    }
  }, [session_id, resetCart]); // Re-run if session_id or resetCart reference changes

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="w-24 h-24 rounded-full bg-shop-light-green flex justify-center items-center">
        <Check className="text-white" size={40} />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 max-w-150 mt-6 text-center">
        <Title className="text-darkColor text-2xl sm:text-3xl md:text-4xl">
          Order Placed Successfully!
        </Title>
        <SubTitle className="text-shopLightText font-medium">
          Thank you for your purchase! Your order has been confirmed and
          we&apos;re preparing it for shipment. You&apos;ll receive a
          confirmation email.
        </SubTitle>
        <SubText>
          Order Number: <span className="font-semibold">{orderNumber}</span>
        </SubText>
      </div>
      <div className="mt-4 shadow-lg p-4">
        <SubTitle className="text-center">What happens next?</SubTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-blue-500/50 w-12 h-12 rounded-full flex flex-col items-center justify-center">
              <Package className="text-blue-600" size={32} />
            </div>
            <h3 className="font-semibold text-darkColor">Order Processing</h3>
            <p className="text-shopLightText text-sm w-60 text-center">
              We&apos;re preparing your items for shipment.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-shop-orange/50 w-12 h-12 rounded-full flex items-center justify-center">
              <ShoppingBag className="text-shop-orange" />
            </div>
            <h3 className="font-semibold text-darkColor">Shipping</h3>
            <p className="text-shopLightText text-sm w-60 text-center">
              Your order will be shipped within 2-3 business days
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-shop-light-green/30 w-12 h-12 rounded-full flex items-center justify-center">
              <Check className="text-shop-light-green" />
            </div>
            <h3 className="font-semibold text-darkColor">Delivery</h3>
            <p className="text-shopLightText text-sm w-60 text-center">
              Delivered to your doorstep with tracking updates
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex">
        <Link href="/client">
          <Button variant="default" className="flex items-center gap-2">
            <House size={20} />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/client/shop">
          <Button variant="outline" className="ml-10 flex items-center gap-2">
            <ShoppingBag size={20} />
            Shop More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessFallback;
