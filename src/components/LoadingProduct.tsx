import { Loader2 } from "lucide-react";

const LoadingProduct = () => {
  return (
    <div className="bg-gray-100 min-h-10 flex justify-center items-center w-full">
      <div className="flex items-center gap-4">
        <Loader2 className="animate-spin w-5 h-5 text-shop-dark-green" />
        <span className="text-shop-dark-green font-medium text-lg">
          Loading Products...
        </span>
      </div>
    </div>
  );
};
export default LoadingProduct;
