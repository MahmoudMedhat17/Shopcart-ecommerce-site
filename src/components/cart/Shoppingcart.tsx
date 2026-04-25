import { Title } from "@/src/components/Text";
import ProductDetails from "@/src/components/cart/ProductDetails";
import DeliveryAddress from "@/src/components/cart/DeliveryAddress";
import OrderSummary from "@/src/components/cart/OrderSummary";
import zustandStore from "@/src/store/zustandStore";
import Link from "next/link";
import toast from "react-hot-toast";
import { MapPin, ShoppingBag, Trash2 } from "lucide-react";

const Shoppingcart = () => {
  // Here we get the resetCart function from zustand store.
  const { resetCart } = zustandStore();

  // Here this handle resetCart function first it checks with the custom toast if the user clicks on yes then the cart is cleared and if the user clicks on no then the cart is not cleared. This avoids the user from accidentally clearing the cart.
  const handleResetCart = () => {
    toast(
      (sure) => (
        <div className="flex items-center gap-3">
          <span>Clear entire cart?</span>
          <button
            onClick={() => {
              resetCart();
              toast.dismiss(sure.id);
              toast.success("Cart cleared!");
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(sure.id)}
            className="border px-2 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      ),
      { duration: 5000, position: "top-center" },
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2">
        <ShoppingBag className="text-darkColor" />
        <Title className="text-2xl text-darkColor">Shopping Cart</Title>
      </div>

      {/* Main cart details */}
      <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
        {/* Products detail */}
        <div className="border rounded-lg lg:max-w-xl xl:max-w-3xl w-full">
          <ProductDetails />
        </div>
        {/* Shipping address & Order Summary */}
        <div className="flex flex-col flex-1 gap-4 w-full">
          {/* Shipping address */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <Title className="text-xl text-darkColor">Delivery Address</Title>
            </div>
            <DeliveryAddress />
          </div>
          {/* Order summary */}
          <div className="border rounded-lg p-4">
            <Title className="text-xl text-darkColor">Order Summary</Title>
            <OrderSummary />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8 space-y-4 w-full xs:w-fit">
        <button className=" border px-3 py-1 text-center hover:bg-shopLighterBg hoverEffect rounded-lg font-medium">
          <Link href={`/client/shop`}>Continue Shopping</Link>
        </button>
        <button
          onClick={handleResetCart}
          className=" border border-shopRedColor/40 px-3 py-1 text-center flex gap-6 items-center justify-center hover:bg-shopRedColor/10 hoverEffect rounded-lg font-medium text-shopRedColor"
        >
          <Trash2 size={18} /> Clear cart
        </button>
      </div>
    </div>
  );
};

export default Shoppingcart;
