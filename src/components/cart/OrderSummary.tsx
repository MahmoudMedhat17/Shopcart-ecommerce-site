import zustandStore from "@/src/store/zustandStore";
import { CreditCard } from "lucide-react";

const OrderSummary = () => {
  const { cart, getSubTotalPrice } = zustandStore();

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex items-center justify-between">
        <span>Subtotal ({cart.length} items)</span>
        <span className="font-semibold">${getSubTotalPrice().toFixed(0)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-shop-light-green">Discount</span>
        <span className="font-semibold">$668.60</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Shipping</span>
        <span className="font-semibold text-shop-light-green">Free</span>
      </div>
      <div className="flex items-center justify-between border-b-2 pb-4">
        <span>Tax</span>
        <span className="font-semibold">$0.00</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xl">Total</span>
        <span>1</span>
      </div>
      <p>Free shipping</p>
      <button className="bg-darkColor text-white py-2 rounded-lg flex items-center justify-center gap-2">
        <CreditCard size={17} />
        Proceed to checkout
      </button>
    </div>
  );
};

export default OrderSummary;
