import { Title } from "@/src/components/Text";
import { ShoppingBag } from "lucide-react";
import ProductDetails from "@/src/components/cart/ProductDetails";
import ShippingAddress from "@/src/components/cart/ShippingAddress";
import OrderSummary from "@/src/components/cart/OrderSummary";

const Shoppingcart = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2">
        <ShoppingBag className="text-darkColor" />
        <Title className="text-2xl text-darkColor">Shopping Cart</Title>
      </div>

      {/* Main cart details */}
      <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
        {/* Products detail */}
        <div className="border rounded-lg max-w-3xl w-full">
          <ProductDetails />
        </div>
        {/* Shipping address & Order Summary */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Shipping address */}
          <div className="border rounded-lg">
            <ShippingAddress />
          </div>
          {/* Order summary */}
          <div className="border rounded-lg p-4">
            <Title className="text-2xl text-darkColor">Order Summary</Title>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppingcart;
